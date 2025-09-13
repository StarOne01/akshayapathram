const Org = require("../models/Org");
const Donar = require("../models/Donar");

// ADD ORGANIZATION DETAILS
const addOrgDetails = async (req, res) => {
    try {
        const { user_id, address, size, log_id } = req.body;

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
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// ADD DONOR DETAILS
const addDonorDetails = async (req, res) => {
    try {
        const { user_id, donation } = req.body;

        let donor = await Donar.findOne({ user_id });
        if (!donor) {
            donor = new Donar({
                user_id,
                donations: [donation]
            });
        } else {
            donor.donations.push(donation);
        }

        await donor.save();
        res.json({ message: "Donor donation added successfully", donor });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    addOrgDetails,
    addDonorDetails
};
