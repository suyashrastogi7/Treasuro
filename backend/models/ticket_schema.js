const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ticketSchema = new mongoose.Schema({
    ticketID: { type: String, required: true },
    payment: {
        verified: {
            type: Boolean,
            required: true,
            default: false,
        },
        paymentID: { type: String },
    },
    userID: {
        type: Schema.Types.ObjectId,
        ref: "User",
        default: null,
    },
});

module.exports = mongoose.model("ticket", ticketSchema);
