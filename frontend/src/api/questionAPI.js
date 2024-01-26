import { dispatchApi } from "../network/apiClient";
import { API_METHOD } from "./Constants";

export function getQuestion() {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await dispatchApi({
				endPoint: `/api/question/getone`,
				method: API_METHOD.GET
			});
			const { question, level } = response.data;
			return resolve({ level, question });
		} catch (err) {
			return reject(err);
		}
	});
}

export function postAnswer(data) {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await dispatchApi({
				endPoint: `/api/question/ans`,
				reqParam: data,
				method: API_METHOD.POST
			});
			const { success, msg } = response.data;
			return resolve({ success, msg });
		} catch (err) {
			return reject(err);
		}
	});
}
