const Donation = require("../models/Donation");
const mongoose = require("mongoose");

const donate = async (req, res) => {
    try {
        const { userId, item, description, location, quantity, img_url } = req.body;

        if (!userId || !item || !description || !location || !quantity) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (!location.latitude || !location.longitude) {
            return res.status(400).json({ error: "Location must include latitude and longitude" });
        }

        const donation = new Donation({
            userId,
            item,
            description,
            location,
            quantity,
            img_url
        });
        await donation.save();

        res.status(200).json({ message: "Donation created successfully!" });
    } catch (error) {
        console.error("Error creating donation:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getAllDonations = async (req, res) => {
    try {
        const donations = await Donation.find().populate("userId", "name email");

        if (!donations || donations.length === 0) {
            return res.status(404).json({ message: "No donations found" });
        }

        res.json(donations);
    } catch (error) {
        console.error("Error fetching donations:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    donate,
    getAllDonations
};

