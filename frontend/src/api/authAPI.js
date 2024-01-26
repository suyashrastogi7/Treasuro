import { dispatchApi } from "../network/apiClient";
import { API_METHOD } from "./Constants";

export function signin({ username, password }) {
	return new Promise(async (resolve, reject) => {
		try {
			const emailOrUsername = username;
			const response = await dispatchApi({
				endPoint: `/api/auth/signin`,
				reqParam: {
					emailOrUsername,
					password,
				},
				method: API_METHOD.POST,
				publicApi: true
			});
			const { token, user } = response.data;
			if (token != null && user != null) {
				localStorage.setItem("user", JSON.stringify(user));
				localStorage.setItem("token", JSON.stringify(token));
			}
			return resolve({ token, user });
		} catch (err) {
			return reject(err);
		}
	});
}

export function signup(data) {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await dispatchApi({
				endPoint: `/api/auth/signup`,
				reqParam: data,
				method: API_METHOD.POST,
				publicApi: true
			})
			const { success } = response.data;
			return resolve({ success });
		} catch (err) {
			return reject(err);
		}
	});
}

export function getProfile() {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await dispatchApi({
				endPoint: `/profile/getuser`,
				method: API_METHOD.GET
			});
			const { user } = response;
			return resolve({ user });
		} catch (err) {
			return reject(err);
		}
	});
}
