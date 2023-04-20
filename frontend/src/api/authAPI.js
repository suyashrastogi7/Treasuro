// import { AxiosPrivate } from "../utils/config";
// import axios from "../utils/config";
import axios from "axios";

export function signin({ username, password }) {
	return new Promise(async (resolve, reject) => {
		try {
			const emailOrUsername = username;
			const response = await axios.post(
				`http://localhost:5000/api/auth/signin`,
				{
					emailOrUsername,
					password,
				}
			);
			console.log(response);
			const { token, user } = response.data;
			setTimeout(() => {}, 3000);
			return resolve({ token, user });
		} catch (err) {
			console.log("Error", err);
			return reject(err);
		}
	});
}

export function signup(data) {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`http://localhost:5000/api/auth/signup`,
				data
			);
			const { token, user } = response.data;
			console.log("Response ==> ", response);
			return resolve({ token, user });
		} catch (err) {
			console.log(err);
			return reject(err);
		}
	});
}

export function getProfile() {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.get(
				`http://localhost:5000/api/profile/getuser`
			);
			const { user } = response.data;
			return resolve({ user });
		} catch (err) {
			console.log(err);
			return reject(err);
		}
	});
}

// export function renewAccess(refresh) {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const response = await axios.post(`/auth/refresh`, {
//                 refresh: refresh,
//             });
//             if (response.status === 400) {
//                 return reject(response.data);
//             }
//             const { token } = response.data;
//             resolve({ token });
//         } catch (err) {
//             console.log(err);
//             return reject(err);
//         }
//     });
// }
