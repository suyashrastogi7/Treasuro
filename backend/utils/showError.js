module.exports = (error, res) => {
	console.log(error);
	res.status(500).json({
		error,
		message: "Something went wrong",
	});
};
