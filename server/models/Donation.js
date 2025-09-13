const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    userId : String,
    item: String,
    description: String,
    location: {
        latitude: String,
        longitude: String
    },
    quantity: String,
    img_url: String,
    
});

module.exports = mongoose.model("Donation", donationSchema);
