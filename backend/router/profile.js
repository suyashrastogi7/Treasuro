const router = require("express").Router();

// middleware
const requireLogin = require("../middlewares/requireLogin");

// controllers
const {
	getProfile,
	//   editUser,
	//   deleteProfile,
} = require("../controllers/profile.controller");

/**
 * @route   GET /api/profile
 * @access  private
 * @desc    get user profile if logged in
 */
router.post("/getuser", getProfile);

module.exports = router;
