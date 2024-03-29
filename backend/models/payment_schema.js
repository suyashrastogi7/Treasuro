const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: false,
        },
        orderId: {
            type: String,
            required: true,
        },
        razorpay_payment_id: {
            type: String,
            required: true,
            unique: true,
        },
        razorpay_order_id: {
            type: String,
            required: true,
        },
        razorpay_signature: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);
