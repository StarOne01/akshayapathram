const mongoose = require("mongoose");
const Donation = require("./Donation");

const donorSchema = new mongoose.Schema({
    donations: [Donation.schema],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Donar", donorSchema);
