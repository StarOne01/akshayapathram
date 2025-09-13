const express = require("express");
const users = require("../models/Org");


const router = express.Router();

// GET all organization names
const fetchNgo =  async (req, res) => {
    try {
        // Find users with role = "organization", only return "name"
        const organizations = await User.find({ role: "organization" }, "name");

        if (!organizations || organizations.length === 0) {
            return res.status(404).json({ message: "No organizations found" });
        }

        res.json(organizations);
    } catch (err) {
        console.error("Error fetching organizations:", err);
        res.status(500).json({ message: "No organizations found" });
    }
};

module.exports = {
    fetchNgo
}
