const mongoose = require("mongoose");

const beneficiarySchema = new mongoose.Schema({
    name: String,
    age: Number,
    address: String,
    contact: String
});

module.exports = mongoose.model("Beneficiary", beneficiarySchema);