const { default: mongoose } = require("mongoose");
const Org = require("../models/Org");

const toRad = (deg) => (deg * Math.PI) / 180;

function distanceKmHaversine(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const dφ = toRad(lat2 - lat1);
  const dλ = toRad(lon2 - lon1);

  const a =
    Math.sin(dφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(dλ / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * POST /recommend
 * body: { latitude: number, longitude: number, radiusKm?: number }
 * Returns organizations within radius (default 40km) sorted by a score that
 * prioritizes closer NGOs and those with higher need/size.
 */
async function sorted(req, res) {
  try {
    const { latitude: lat, longitude: lon, radiusKm = 40 } = req.body;

    if (typeof lat !== 'number' || typeof lon !== 'number') {
      return res.status(400).json({ error: 'latitude and longitude must be numbers' });
    }

    // Fetch approved organizations that have an address
    const orgs = await Org.find({ is_approved: true }).lean();

    const results = orgs
      .map((org) => {
        const orgLat = Number(org.address?.latitude);
        const orgLon = Number(org.address?.longitude);
        if (Number.isNaN(orgLat) || Number.isNaN(orgLon)) return null;

        const distance = distanceKmHaversine(lat, lon, orgLat, orgLon);

        // Normalize size (higher size -> more capacity/need). If not set, assume neutral value.
        const size = typeof org.size === 'number' ? org.size : 0;

        // Score: lower is better. We combine distance (km) and an inverse of size so
        // that NGOs with greater need (smaller size) are prioritized slightly.
        // The weights can be tuned: here distance has primary weight.
        const sizeFactor = size > 0 ? 1 / Math.log2(size + 2) : 1; // smaller size -> larger factor
        const score = distance * 0.8 + sizeFactor * 10 * 0.2; // distance dominates

        return {
          id: org._id,
          name: org.name || null,
          distance: Number(distance.toFixed(2)),
          size: size,
          score,
          address: org.address,
          is_approved: org.is_approved
        };
      })
      .filter(Boolean)
      .filter((o) => o.distance <= radiusKm)
      .sort((a, b) => a.score - b.score);

    res.json({ count: results.length, radiusKm, results });
  } catch (error) {
    console.error('Error calculating recommendations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  sorted,
};