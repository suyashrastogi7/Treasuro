// import { AxiosPrivate } from "../utils/config";
import axios from "axios";

export function getQuestion(token) {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.get(
				`http://localhost:5000/api/question/getone`,
				{
					headers: {
						"Content-type": "application/json",
						Authorization: `Bearer ` + token,
					},
				}
			);
			const { question, level } = response.data.question;
			return resolve({ level, question });
		} catch (err) {
			console.log(err);
			return reject(err);
		}
	});
}

export function postAnswer(data, token) {
	console.log("TOKEN IN API ==> ", token);
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.post(
				`http://localhost:5000/api/question/ans`,
				data,
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: "Bearer " + token,
					},
				}
			);
			const { success, msg } = response.data;
			console.log(success, msg);
			return resolve({ success, msg });
		} catch (err) {
			console.log(err);
			return reject(err);
		}
	});
}
