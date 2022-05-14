const express = require("express");
const router = express.Router();
const requireLogin = require("../middlewares/requireLogin");

const { getProfile } = require("../controllers/profile.controller");

// /**
//  * @route   GET /api/user/:id
//  * @access  Private
//  * @desc    Get a user with id
//  */
router.get("/user/:id", requireLogin, getProfile);

module.exports = router;
