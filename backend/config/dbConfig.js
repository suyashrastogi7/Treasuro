const mongoose = require("mongoose");

module.exports = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URI, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
		});
	} catch (error) {
		process.exit(1);
	}
};

// added to heroku
