const router = require("express").Router();
const { check } = require("express-validator");

//controllers
const { signIn, signUp } = require("../controllers/auth.controller");

/**
 * @route   POST /api/auth/signup
 * @access  Public
 * @desc    Register user
 */
router.post(
  "/signup",
  [
    check("name", "name is required").not().isEmpty(),
    check("username", "username is required").not().isEmpty(),
    check("email", "email is required").isEmail(),
    check("rollno", "rollno is required").not().isEmpty(),
    check("phoneno", "phoneno is required").not().isEmpty(),
    check("image", "College ID image is required").not().isEmpty(),
    check("password", "password is required. Length should be between 8-32")
      .not()
      .isEmpty()
      .isLength({ max: 32, min: 8 }),
  ],

  signUp
);

/**
 * @route   POST /api/auth/s/ignin
 * @access  Public
 * @desc    Register user
 */
router.post(
  "/signin",
  [
    check("emailOrUsername", "email or username is required").exists(),
    check("password", "password is required").exists(),
  ],
  signIn
);

/**
 * @route   POST /api/auth/verify-account
 * @access  Public
 * @desc    Verify email of user
 */

// router.get("/verify-user/:token", authController.verifyAccount);

app.post("/payment-verification", (req, res) => {
  const SECRET = "12343210";

  console.log(req.body);

  const shasum = crypto.createHmac("sha256", SECRET);
  shasum.update(JSON.stringify(req.body));
  const digest = shasum.digest("hex");

  console.log(req.headers);

  if (digest === req.headers["x-razorpay-signature"]) {
    req.locals.paymentVerified = true;
  } else {
    req.locals.paymentVerified = false;
  }

  console.log(req.body);
  res.redirect("/signup");
});

/**
 * @route   POST /api/auth/razorpay
 * @access  Public
 * @desc    Make payment and create the order;
 */

// router.post("razorpay", authController.makePayment);

app.post("/razorpay");
