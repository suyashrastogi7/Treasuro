const crypto = require("crypto");
const showError = require("../utils/showError");
const Razorpay = require("razorpay");
const jwt = require("jsonwebtoken");
const shortid = require("shortid");

const Order = require("../models/order_schema");
const User = require("../models/user_schema");
const Payment = require("../models/payment_schema");

const { purchaseTicket } = require("./ticket.controller");

let instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const id = jwt.decode(token)?.user.id;
        const user = await User.findOne({
            _id: id,
        });
        const options = {
            amount: 4000,
            currency: "INR",
            receipt: shortid.generate(),
            notes: {
                username: user.username,
            },
        };
        const data = await instance.orders.create(options);
        console.log(data);
        const order = new Order({
            username: user.username,
            orderId: data.id,
            amount: data.amount,
        });
        order.save();
        return res.status(200).json({
            order,
            message: "Order created successfully",
        });
    } catch (err) {
        showError(err, res);
    }
};

const verifyPayment = async (req, res) => {
    try {
        // getting the details back from our font-end
        const {
            orderCreationId,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
        } = req.body;

        const token = req.headers.authorization.split(" ")[1];
        const id = jwt.decode(token)?.user.id;
        const user = await User.findOne({
            _id: id,
        });
        // Creating our own digest
        // The format should be like this:
        // digest = hmac_sha256(orderCreationId + "|" + razorpay_payment_id, secret);
        const shasum = crypto.createHmac("sha256", "w2lBtgmeuDUfnJVp43UpcaiT");

        shasum.update(`${orderCreationId}|${razorpay_payment_id}`);

        const digest = shasum.digest("hex");

        // comaparing our digest with the actual signature
        if (digest !== razorpay_signature)
            return res
                .status(400)
                .json({
                    msg: "Payment Failed : Signature Mismatch!",
                    success: false,
                });

        // THE PAYMENT IS LEGIT & VERIFIED
        // YOU CAN SAVE THE DETAILS IN YOUR DATABASE IF YOU WANT

        const payment = new Payment({
            username: user.username,
            orderId: orderCreationId,
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
        });
        payment.save();

        res.status(200).json({
            msg: "success",
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            success: true,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

module.exports = {
    createOrder,
    verifyPayment,
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
