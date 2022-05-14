const router = require("express").Router();
const requireLogin = require("../middlewares/requireLogin");
const checkIfActive = require("../middlewares/checkIfActive");

// controllers
const { getLeaderboard } = require("../controllers/leaderboard.controller");

/**
 * @route   GET /api/leaderboard
 * @access  private
 * @desc    get list of users their respectice points
 */
router.get("/", [requireLogin, checkIfActive], getLeaderboard);

module.exports = router;
