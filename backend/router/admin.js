const router = require("express").Router();
const { check } = require("express-validator");

//controllers
const { signIn, signUp } = require("../controllers/admin.controller");

/**
 * @route   POST /api/admin/signup
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
 * @route   POST /api/admin/signin
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

module.exports = router;
