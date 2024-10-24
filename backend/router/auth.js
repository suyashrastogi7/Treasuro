const router = require("express").Router();
const { check } = require("express-validator");
// const requireLogin = require("../middlewares/requireLogin");

//controllers
const {
	signIn,
	signUp,
	refreshToken,
} = require("../controllers/auth.controller");

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
 * @route   POST /api/auth/s/ignins
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
 * @route   POST /api/auth/refresh
 * @access  Public
 * @desc    Register user
 */
router.post("/refresh", refreshToken);

module.exports = router;
