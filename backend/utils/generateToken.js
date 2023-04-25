const jwt = require("jsonwebtoken");
const UserToken = require("../models/token_schema.js");

module.exports = (user) => {
	const payload = {
		user: {
			id: user.id,
		},
	};
	const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
		expiresIn: "1m",
	});
	const refreshToken = jwt.sign(payload, process.env.JWT_SECRET_REFRESH, {
		expiresIn: "20d",
	});
	return { access: accessToken, refresh: refreshToken };
};
