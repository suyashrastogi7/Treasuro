const router = require("express").Router();
const { check } = require("express-validator");

//controllers
const {
    createOrder,
    verifyPayment,
} = require("../controllers/payment.controller");
const requireLogin = require("../middlewares/requireLogin");

/**
 * @route   GET /api/payment/createorder
 * @access  Public
 * @desc    Creates a razorpay order for payment
 */

router.get(
    "/createorder",
    [
        check("username", "username is required").not().isEmpty(),
        check("currency", "currency is required").not().isEmpty(),
        check("amount", "amount is required").not().isEmpty(),
    ],
    requireLogin,
    createOrder
);

/**
 * @route   POST /api/payment/create-order
 * @access  Public
 * @desc    Creates a razorpay order for payment
 */

router.post(
    "/verifypayment",
    [
        check("username", "username is required").not().isEmpty(),
        check("orderId", "orderId is required").not().isEmpty(),
        check("razorpay_payment_id", "razorpay_payment_id is required")
            .not()
            .isEmpty(),
        check("razorpay_order_id", "razorpay_order_id is required")
            .not()
            .isEmpty(),
        check("razorpay_signature", "razorpay_signature is required")
            .not()
            .isEmpty(),
    ],
    requireLogin,
    verifyPayment
);

module.exports = router;
