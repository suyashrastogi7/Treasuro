const User = require("../models/user_schema");

const showError = require("../utils/showError.js");

const getLeaderboard = async (req, res) => {
  User.find()
    .then((leaderboard) => {
      let leaderboardTruncate = leaderboard.map((user) => ({
        name: user.name,
        score: user.score,
      }));
      leaderboardTruncate.sort(function (a, b) {
        return b.score - a.score;
      });
      return res.status(200).json({ leaderboard: leaderboardTruncate });
    })
    .catch((error) => {
      console.log(error.message);
      showError(error, res);
    });
};

module.exports = {
  getLeaderboard,
};
