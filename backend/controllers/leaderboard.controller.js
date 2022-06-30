const User = require("../models/user_schema");
const jwt = require("jsonwebtoken");

const showError = require("../utils/showError.js");

const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await User.find({});
        const leaderboardTruncate = leaderboard.map((user) => ({
            name: user.name,
            pts: user.score,
            username: user.username,
        }));
        leaderboardTruncate.sort(function (a, b) {
            return b.pts - a.pts;
        });
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(200).json({ leaderboard: leaderboardTruncate });
        }
        const id = jwt.decode(token)?.user.id;
        const user = await User.findOne({
            _id: id,
        });
        const _my_position = leaderboardTruncate.map((el, idx) => {
            if (el.username === user.username) return idx + 1;
        });
        const mine = {
            pos: _my_position[1],
            name: user.name,
            pts: user.score,
        };
        return res.status(200).json({ leaderboard: leaderboardTruncate, mine });
    } catch (error) {
        console.log(error.message);
        showError(error, res);
    }
};

module.exports = {
    getLeaderboard,
};
