const { default: mongoose } = require("mongoose");
const Org = require("../models/Org");

const toRad = deg => (deg * Math.PI) / 180;

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

function sorted() {
    const orgsM = mongoose.model("Org", Org)
    const orgs = orgsM.collection.find({})
    dist = []
    orgs.map((x) => {
        dist.push(distanceKmHaversine (x.address.latitude, ))
    })

    Math.sort(...dist)
}

module.exports = {
    sorted
}