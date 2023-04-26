import { signin, signup, getProfile } from "../api/authAPI";
// import { setMessage } from "../features/messageSlice";
import Cookies from "js-cookie";

const TOKEN_KEY = "_t4gd-*-";

export const auth = {
	isAuthenticated,
	getToken,
	login,
	logout,
	register,
	getUser,
};

function isAuthenticated() {
	return !!getToken();
}

function getToken() {
	return JSON.parse(localStorage.getItem("token"));
}

async function getUser() {
	const token = Cookies.get("access-token");
	const user = await getProfile(token);
	return user;
}

async function login({ username, password }) {
	try {
		const { token, user } = await signin({ username, password });
		return { token, user };
	} catch (err) {
		console.log(err);
		return { error: err.response.data.message };
	}
}

async function register(data) {
	try {
		const response = await signup(data);
		// thunkAPI.dispatch(setMessage(response.data.message));
		return { response };
	} catch (err) {
		// thunkAPI.dispatch(setMessage(err.message));
		// return thunkAPI.rejectWithValue();
		return err;
	}
}

async function logout() {
	try {
		Cookies.remove("refresh-token");
		Cookies.remove("access-token");
		localStorage.clear();
		return {
			success: true,
		};
	} catch (err) {}
}
