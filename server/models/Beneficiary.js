const mongoose = require("mongoose");

const beneficiarySchema = new mongoose.Schema({
    name: String,
    age: Number,
    address: String,
    contact: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    is_approved: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Beneficiary", beneficiarySchema);