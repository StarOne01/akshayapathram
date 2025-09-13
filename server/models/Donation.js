const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    item: String,
    description: String,
    location: {
        latitude: String,
        longitude: String
    },
    quantity: String,
    img_url: String,
    preferred_org: String
});

module.exports = mongoose.model("Donation", donationSchema);
