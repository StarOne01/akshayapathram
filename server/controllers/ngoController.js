const express = require("express");
const Org = require("../models/Org");


const router = express.Router();

// GET all organization names
const fetchNgo =  async (req, res) => {
    try {
        const organizations = await Org.find({}, "name");

        if (!organizations || organizations.length === 0) {
            return res.status(404).json({ message: "No organizations found" });
        }

        res.json(organizations);
    } catch (error) {
        console.error("Error fetching organizations:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    fetchNgo
}
