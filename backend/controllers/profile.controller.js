// Routes for logged in user's profile
const User = require("../models/user_schema");
const jwt = require("jsonwebtoken");
const showError = require("../utils/showError.js");

const getProfile = async (req, res) => {
	try {
		const access = req.body;
		console.log("TOKEN AT PROFILE ==> ", access);
		// const token = req.decoded;
		const id = jwt.decode(access.access)?.user.id;
		const user = await User.findOne({
			_id: id,
		});
		if (user) {
			res.status(200).json({
				user: {
					name: user.name,
					username: user.username,
					email: user.email,
					tickets: user.ticketsPurchased.tickets,
					rollno: user.rollno,
					phoneno: user.phoneno,
					attempts: user.attempts,
					active: user.active,
					score: user.score,
					level: user.level,
					image: user.image,
				},
			});
		}
		res.status(401);
	} catch (error) {
		console.log(error);
		showError(error, res);
	}
};
module.exports = {
	getProfile,
};
