/*
 * this is the middleware for checking if user is reviewed
 */
const User = require("../models/user_schema");

module.exports = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.id);
		if (!user.active)
			return res.status(400).json({
				error: "Your accounts need to be verified by MMIL team first",
				active: user.active,
			});
		next();
	} catch (error) {
		return res.status(404).json({
			error: "You need to be logged in",
		});
	}
};
