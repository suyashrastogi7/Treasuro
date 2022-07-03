const router = require("express").Router();
const { check } = require("express-validator");

//controllers
const {
    createOrder,
    verifyPayment,
} = require("../controllers/payment.controller");

/**
 * @route   GET /api/payment/createorder
 * @access  Public
 * @desc    Creates a razorpay order for payment
 */

router.get("/createorder", createOrder);

/**
 * @route   POST /api/payment/verifypayment
 * @access  Public
 * @desc    Creates a razorpay order for payment
 */

router.post(
    "/verifypayment",
    // [
    //     check("orderId", "orderId is required").not().isEmpty(),
    //     check("razorpay_payment_id", "razorpay_payment_id is required")
    //         .not()
    //         .isEmpty(),
    //     check("razorpay_order_id", "razorpay_order_id is required")
    //         .not()
    //         .isEmpty(),
    //     check("razorpay_signature", "razorpay_signature is required")
    //         .not()
    //         .isEmpty(),
    // ],
    verifyPayment
);

module.exports = router;
