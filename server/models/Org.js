const mongoose = require("mongoose");

const orgSchema = new mongoose.Schema({
    is_approved: {
        type: Boolean,
        default: false
    },
    address: {
        latitude: { type: Number, required: true },
        longitude: { type: Number, required: true }
    },
    size: Number,
    log_id: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    preferedId: mongoose.Schema.Types.ObjectId,

    cert_id: String,
});

module.exports = mongoose.model("Org", orgSchema);
