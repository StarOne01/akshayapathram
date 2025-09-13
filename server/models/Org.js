const mongoose = require("mongoose");

const orgSchema = new mongoose.Schema({
    name: String,
    phno: String,
    password: String,
    is_approved: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Org", orgSchema);
