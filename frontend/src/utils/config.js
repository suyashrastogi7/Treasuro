import axios from "axios";
import Cookies from "js-cookie";

const customAxios = axios.create({
	baseURL: ``,
	timeout: 10000,
});

customAxios.interceptors.request.use(
	(config) => {
		const token = Cookies.get("access-token");
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
			originalRequest.url === "http://localhost:5000/api/auth/refresh"
		) {
			return Promise.reject(error);
		}

		if (error.response.status === 403 && !originalRequest._retry) {
			originalRequest._retry = true;
			const refreshToken = Cookies.get("refresh-token");
			return axios
				.post("http://localhost:5000/api/auth/refresh", {
					refresh: refreshToken,
				})
				.then((res) => {
					if (res.status === 403) {
						return Promise.reject(res);
					}
					if (res.status === 200) {
						Cookies.set("refresh-token", res.data);
						axios.defaults.headers.common["Authorization"] =
							"Bearer " + Cookies.get("access-token");
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
