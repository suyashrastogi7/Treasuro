/*
 *this is the middleware for authorization and preventing from routing without the registration
 */
const User = require("../models/user_schema");
const jwt = require("jsonwebtoken");
const JWT_TOKEN = process.env.JWT_SECRET;

module.exports = (req, res, next) => {
	const { Authorization } = req.headers;
	if (!Authorization) {
		return res.status(401).json({
			error: "You must be logged in",
		});
	}
	const token = Authorization.replace("Bearer ", "");

	jwt.verify(token, JWT_TOKEN, (err, payload) => {
		if (err) {
			return res.status(401).json({
				error: "You must be logged in",
			});
		}

		const {
			user: { id },
		} = payload;

		User.findById(id)
			.select("-password")
			.select("-timestamp")
			.select("-__v")
			.select("-image")
			.then((userData) => {
				if (!userData) {
					return res.status(400).json({
						error: "You need to be logged-in",
					});
				}
				req.user = userData;
				next();
			})
			.catch((error) => {
				return res.status(404).json({
					error: "You need to be logged in",
				});
			});
	});
};
