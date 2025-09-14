const Org = require('../models/Org');
const AdminRequest = require('../models/AdminRequests');
const User = require('../models/User');
const Donor = require('../models/Donor');

// List pending organization requests
const listPendingOrgs = async (req, res) => {
  try {
    const pending = await Org.find({ is_approved: false });
    res.json({ pending });
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

// Get user information by ID
const getUserById = async (req, res) => {
  try {
    const { user_id } = req.params;
    
    // Find the user by ID
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Initialize response object with user data
    const userInfo = {
      user: {
        _id: user._id,
        name: user.name,
        phno: user.phno,
        role: user.role
      }
    };

    // Check if user is associated with a donor profile
    const donor = await Donor.findOne({ user_id: user_id });
    if (donor) {
      userInfo.donor = donor;
    }

    // Check if user is associated with an organization
    const org = await Org.findOne({ user_id: user_id });
    if (org) {
      userInfo.organization = org;
    }

    res.json({
      message: 'User information retrieved successfully',
      data: userInfo
    });

  } catch (err) {
    console.error('Error getting user by ID:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  listPendingOrgs,
  approveOrg,
  denyOrg,
  getUserById
};
