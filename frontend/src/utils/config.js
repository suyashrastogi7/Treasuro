import axios from "axios";
import { auth } from "./auth";

const customAxios = axios.create({
	baseURL: ``,
	timeout: 10000,
});

customAxios.interceptors.request.use(
	(config) => {
		const token = auth.getToken().access;
		if (token) {
			config.headers["Authorization"] = "Bearer " + token;
		}
		// config.headers['Content-Type'] = 'application/json';
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

customAxios.interceptors.response.use(
	(response) => {
		return response;
	},
	function (error) {
		const originalRequest = error.config;

		if (
			error.response.status === 401 &&
			originalRequest.url === "https://treasuro.in/api/auth/refresh"
		) {
			return Promise.reject(error);
		}

		if (error.response.status === 403 && !originalRequest._retry) {
			originalRequest._retry = true;
			const refreshToken = auth.getToken().refresh;
			return axios
				.post("https://treasuro.in/api/auth/refresh", {
					refresh: refreshToken,
				})
				.then((res) => {
					if (res.status === 403) {
						return Promise.reject(res);
					}
					if (res.status === 200) {
						auth.setToken({ ...auth.getToken(), refresh: res.data });
						axios.defaults.headers.common["Authorization"] =
							"Bearer " + auth.getToken()?.access;
						return axios(originalRequest);
					}
				});
		}
		return Promise.reject(error);
	}
);

customAxios.interceptors.response.use(
	(res) => res,
	(err) => {
		throw new Error(err.response.data.message);
	}
);

export default customAxios;
