const mongoose = require("mongoose");
const Donation = require("./Donation");

const donorSchema = new mongoose.Schema({
    donotion : [Donation]
});

module.exports = mongoose.model("Donar", donorSchema);
