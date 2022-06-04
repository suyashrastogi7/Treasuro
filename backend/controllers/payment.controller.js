import crypto from "crypto";
const Razorpay = require("razorpay");

const Order = require("../models/order_schema");
const Payment = require("../models/payment_schema");

let instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});
/* 
    Options for order Creation
    {
        username: "suyash@123",
        amount: 50000, 
        currency: "INR",
        receipt: "receipt#1",
    } 
*/
export const createOrder = async (req, res, next) => {
    try {
        var data = instance.orders.create(req.body);
        var order = new Order(req.body.username, data.id, data.amount);
        order.save();
        res.send({
            success: true,
            data: data,
        });
    } catch (err) {
        res.send({
            success: false,
            data: err,
        });
    }
};
/*
    Order response
    {
        "id": "order_DBJOWzybf0sJbb",
        "entity": "order",
        "amount": 50000,
        "amount_paid": 0,
        "amount_due": 39900,
        "currency": "INR",
        "receipt": "order_rcptid_11",
        "status": "created",
        "attempts": 0,
        "notes": [],
        "created_at": 1566986570
    }
*/
/*
    Checkout Response  
    {
        "razorpay_payment_id": "pay_29QQoUBi66xm2f",
        "razorpay_order_id": "order_9A33XWu170gUtm",
        "razorpay_signature": "9ef4dffbfd84f1318f6739a3ce19f9d85851857ae648f114332d8401e0949a3d"
    }
*/
export const verifyPayment = async (req, res, next) => {
    var {
        username,
        orderId,
        razorpay_payment_id,
        razorpay_order_id,
        razorpay_signature,
    } = req.body;
    try {
        let generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(
                orderId + "|" + razorpay_payment_id,
                process.env.RAZORPAY_KEY_SECRET
            )
            .digest("hex");
        if (generated_signature == razorpay_signature) {
            console.log("Payment Successful");
            const payment = new Payment({
                username,
                orderId,
                razorpay_payment_id,
                razorpay_order_id,
                razorpay_signature,
            });
            payment.save();
            res.status(200).send({
                status: "success",
                message: "Payment Successful",
            });
        } else {
            console.log("Payment Failed");
            res.status(403).send({
                status: "failed",
                message: "Payment Failed",
            });
        }
        console.log("Try payment");
    } catch (err) {
        console.log(err);
    }
};
