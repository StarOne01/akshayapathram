const Org = require('../models/Org');
const AdminRequest = require('../models/AdminRequests');

// List pending organization requests
const listPendingOrgs = async (req, res) => {
  try {
    const pending = await Org.find({ is_approved: false });
    res.json({ count: pending.length, pending });
  } catch (err) {
    console.error('Error listing pending orgs:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Approve org
const approveOrg = async (req, res) => {
  try {
    const { orgId } = req.params;
    const org = await Org.findById(orgId);
    if (!org) return res.status(404).json({ error: 'Org not found' });

    org.is_approved = true;
    await org.save();

    // Record admin action
    await AdminRequest.create({ userId: org.user_id });

    res.json({ message: 'Organization approved', org });
  } catch (err) {
    console.error('Error approving org:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Deny org
const denyOrg = async (req, res) => {
  try {
    const { orgId } = req.params;
    const org = await Org.findById(orgId);
    if (!org) return res.status(404).json({ error: 'Org not found' });

    // Remove the org record.
    await Org.deleteOne({ _id: orgId });

    // Record admin action
    await AdminRequest.create({ userId: org.user_id });

    res.json({ message: 'Organization denied and removed' });
  } catch (err) {
    console.error('Error denying org:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  listPendingOrgs,
  approveOrg,
  denyOrg
};
