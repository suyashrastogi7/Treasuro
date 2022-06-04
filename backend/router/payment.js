const router = require("express").Router();

//controllers
const {
    createOrder,
    verifyPayment,
} = require("../controllers/payment.controller");

/**
 * @route   POST /api/payment/create-order
 * @access  Public
 * @desc    Creates a razorpay order for payment
 */

router.post(
    "/payment/create-order",
    [
        check("username", "username is required").not().isEmpty(),
        check("currency", "currency is required").not().isEmpty(),
        check("amount", "amount is required").not().isEmpty(),
    ],
    createOrder
);

/**
 * @route   POST /api/payment/create-order
 * @access  Public
 * @desc    Creates a razorpay order for payment
 */

router.post(
    "/payment/verify-payment",
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
    verifyPayment
);

module.exports = router;
