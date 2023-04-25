const signAdminToken = (adminID) => {
	return new Promise((resolve, reject) => {
		jwt.sign(
			{ adminID },
			process.env.ADMIN_SECRET,
			{
				expiresIn: "3d",
			},
			(err, token) => {
				if (err) {
				}
				resolve(token);
			}
		);
	});
};

// const verifyAdminToken = () => {

//     const headerString =
// };
