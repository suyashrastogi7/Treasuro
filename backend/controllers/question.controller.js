const Question = require("../models/question_schema");
const jwt = require("jsonwebtoken");
const User = require("../models/user_schema");
const { validationResult } = require("express-validator");
const showError = require("../utils/showError.js");

const getQuestion = async (req, res) => {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const id = jwt.decode(token)?.user.id;
		const user = await User.findOne({
			_id: id,
		});
		Question.findOne({ level: user?.level })
			.select("-_id")
			.select("-answer")
			.select("-__v")
			.then((question) => {
				return res.status(200).json({
					question,
				});
			})
			.catch((error) => {
				showError(error, res);
				return res.status(201).json({
					error,
				});
			});
	} catch (err) {
		return res.status(201).json({
			err,
		});
	}
};

const createQuestion = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			message: errors.array(),
		});
	}

	const { question, answer, level } = req.body;

	try {
		// create new question
		const newQuestion = new Question({
			question,
			answer,
			level,
		});

		await newQuestion.save();

		return res.status(200).json({
			question,
			answer,
			level,
		});
	} catch (error) {
		showError(error, res);
	}
};

const answerQuestion = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({
			message: errors.array(),
		});
	}
	const { data, token } = req.body;
	const id = jwt.decode(token)?.user.id;
	const user = await User.findOne({
		_id: id,
	});
	try {
		if (user.attempts > 0) {
			const question = await Question.findOne({ level: user.level });
			if (data === question.answer) {
				user.level++;
				user.score += 10;
				user.timestamp = Date.now();
				await user.save();
				return res.status(200).json({ success: true, msg: "Correct Answer!" });
			}
			user.attempts--;
			user.score -= 2;
			await user.save();
			return res.status(200).json({ success: false, msg: "Wrong Answer!" });
		} else
			return res
				.status(400)
				.json({ result: "No Attempts Left, Please purchase Tickets" });
	} catch (error) {
		showError(error, res);
	}
};
module.exports = {
	getQuestion,
	createQuestion,
	answerQuestion,
};
