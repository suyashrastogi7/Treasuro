const TOKEN_KEY = "token";

export const auth = {
	isAuthenticated,
	getToken,
	logout,
	getUser,
	isUserAvailable,
	setUser,
	setToken,
};

function getToken() {
	return JSON.parse(localStorage.getItem(TOKEN_KEY));
}

function getUser() {
	return JSON.parse(localStorage.getItem("user"));
}

function setToken(token) {
	localStorage.setItem(TOKEN_KEY, token);
}

function setUser(user) {
	localStorage.setItem("user", user);
}

function isAuthenticated() {
	return !!getToken();
}

function isUserAvailable() {
	return !!localStorage.getItem("user");
}

async function logout() {
	try {
		localStorage.clear();
		return {
			success: true,
		};
	} catch (err) {}
}
