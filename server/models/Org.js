const mongoose = require("mongoose");

const orgSchema = new mongoose.Schema({
    is_approved: {
        type: Boolean,
        default: false
    },
    address: {
        latitude: String,
        longitude: String
    },
    size: Number,
    log_id: String,
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("Org", orgSchema);
