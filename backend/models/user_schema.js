const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	username: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	rollno: {
		type: String,
		required: true,
		unique: true,
	},
	phoneno: {
		type: Number,
		required: true,
		unique: true,
	},
	level: {
		type: Number,
		default: 1,
	},
	score: {
		type: Number,
		default: 0,
	},
	image: {
		type: String,
		default: "",
		required: false,
	},
	active: {
		type: Boolean,
		default: false,
	},
	attempts: {
		type: Number,
		default: 0,
	},
	verified: {
		type: Boolean,
		default: false,
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
	ticketsPurchased: {
		tickets: [
			{
				id: String,
				use: {
					type: Number,
					default: 3,
				},
			},
		],
	},
});

module.exports = mongoose.model("User", UserSchema);
