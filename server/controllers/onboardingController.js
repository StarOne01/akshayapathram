const Org = require("../models/Org");
const Donor = require("../models/Donor");

// ADD ORGANIZATION DETAILS
const addOrgDetails = async (req, res) => {
    try {
        const { user_id, address, size, log_id } = req.body;

        if (!user_id || !address || !size || !log_id) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (!address.latitude || !address.longitude) {
            return res.status(400).json({ error: "Address must include latitude and longitude" });
        }

        let org = await Org.findOne({ user_id });
        if (!org) {
            org = new Org({
                user_id,
                address,
                size,
                log_id,
                is_approved: false
            });
        } else {
            org.address = address;
            org.size = size;
            org.log_id = log_id;
        }

        await org.save();
        res.json({ message: "Organization details added/updated successfully", org });
    } catch (error) {
        console.error("Error adding/updating organization details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// ADD DONOR DETAILS
const addDonorDetails = async (req, res) => {
    try {
        const { user_id, donation } = req.body;

        if (!user_id || !donation) {
            return res.status(400).json({ error: "All fields are required" });
        }

        let donor = await Donor.findOne({ user_id });
        if (!donor) {
            donor = new Donor({
                user_id,
                donations: [donation]
            });
        } else {
            donor.donations.push(donation);
        }

        await donor.save();
        res.json({ message: "Donor donation added successfully", donor });
    } catch (error) {
        console.error("Error adding donor details:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    addOrgDetails,
    addDonorDetails
};
