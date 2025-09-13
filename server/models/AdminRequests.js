const mongoose = require("mongoose");

const adminRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

module.exports = mongoose.model("AdminRequest", adminRequestSchema);