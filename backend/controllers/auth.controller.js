const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const checkRegex = require("../middlewares/checkRegex");
// const { sendMail } = require("../utils/mail");

const User = require("../models/user_schema");
const RefreshToken = require("../models/refresh_schema");

const showError = require("../utils/showError.js");
const generateToken = require("../utils/generateToken");
const { verifyToken } = require("../utils/verifyToken");
const { cloudinary } = require("../utils/cloudinary");

const refreshToken = async (req, res) => {
	const { refresh } = req.body;
	if (refresh == null) {
		return res.status(403).json({ message: "Refresh Token is required!" });
	}
	try {
		let refreshToken = await RefreshToken.findOne({ token: refresh });
		if (!refreshToken) {
			res.status(403).json({
				message: "Refresh token is not in database!",
			});
			return;
		}
		if (RefreshToken.verifyExpiration(refreshToken)) {
			RefreshToken.findByIdAndRemove(refreshToken._id, {
				useFindAndModify: false,
			}).exec();

			res.status(403).json({
				message: "Refresh token was expired. Please make a new signin request",
			});
			return;
		}
		let newAccessToken = jwt.sign(
			{ id: refreshToken.user._id },
			process.env.JWT_SECRET,
			{
				expiresIn: process.env.JWT_EXPIRATION,
			}
		);
		return res.status(200).json({
			access: newAccessToken,
			refresh: refreshToken.token,
		});
	} catch (err) {
		return res.status(500).send({ message: err });
	}
};

const signUp = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			message: errors.array(),
		});
	}

	try {
		let { name, username, password, rollno, phoneno, email, image } = req.body;

		const user = await User.findOne({
			$or: [{ username }, { email }, { phoneno }, { rollno }],
		});
		//id user exists return error
		if (user) {
			return res
				.status(400)
				.send({ message: "User with given details already exists" });
		}

		checkRegex({ rollno, phoneno }, res);

		const newUser = new User({
			name,
			username,
			password,
			rollno,
			phoneno,
			email,
		});

		// image

		const uploadedResponse = await cloudinary.uploader.upload(image, {
			folder: `treasuro-db-22/${newUser.name + "--" + newUser.rollno}`,
		});

		newUser.image = uploadedResponse.secure_url;
		// newUser.image = "";

		// encrypt the password
		const salt = await bcrypt.genSalt(12);
		newUser.password = await bcrypt.hash(newUser.password, salt);

		console.log(newUser);

		// generate jwt for user
		await newUser.save();
		return res.status(200).json({
			success: true,
		});
	} catch (error) {
		showError(error, res);
	}
};

const signIn = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			message: errors.array(),
		});
	}
	let { emailOrUsername, password } = req.body;

	// emailOrUsername = emailOrUsername.toLowercase();

	try {
		// check user with email exist or not
		const user = await User.findOne({
			$or: [{ username: emailOrUsername }, { email: emailOrUsername }],
		});
		console.log(user)

		if (!user) {
			return res.status(422).json({
				message: "User not registered",
			});
		}
		// match hash password
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(422).json({
				message: "Invalid credentials",
			});
		}
		// generate token
		const token = generateToken(user);

		return res.status(200).json({
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
				verified: user.verified,
			},
			token,
		});
	} catch (error) {
		showError(error, res);
	}
};

module.exports = {
	signUp,
	signIn,
	refreshToken,
};
