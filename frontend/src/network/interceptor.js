import { Responses } from "./apiClient";

const isAuthorizationTokenExpiredError = error => {
	return (error?.response?.data?.responseCode==="E00001");
};

export const ResponseInterceptor = () => {
	const onResponse = async res => {
		const {
			data: {message, status},
			headers,
		} = res;

		if (message === 'Wrong authentication token') {
			// store.dispatch(logout());
			if (status === Responses.failure) {

			}
		} else {
			return Promise.resolve(res);
		}
	  
		const {httpMetric} = res.config.metadata;
		httpMetric.setHttpResponseCode(res.status);
		httpMetric.setResponseContentType(headers['content-type']);
		await httpMetric.stop();
	};

	const onRejected = async error => {
		try {
			if (isAuthorizationTokenExpiredError(error)) {
			  	// store.dispatch(logout());
			}
		} 
		finally {
			// if (error.response) {
			//   error.response = transformResponse(error.response);
			// }
			return Promise.reject(error.response);
		}
	};

	return {onResponse, onRejected};
}
