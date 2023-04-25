module.exports = (error, res) => {
	res.status(500).json({
		error,
		message: "Something went wrong",
	});
};
