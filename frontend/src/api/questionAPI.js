import { AxiosPrivate } from "../utils/config";

export function getQuestion() {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosPrivate.get(`/question/getone`);
            const { question, level } = response.data.question;
            console.log(question);
            return resolve({ level, question });
        } catch (err) {
            console.log(err);
            return reject(err);
        }
    });
}

export function postAnswer(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await AxiosPrivate.post(`/question/ans`, data);
            const { success, msg } = response.data;
            console.log(success, msg);
            return resolve({ success, msg });
        } catch (err) {
            console.log(err);
            return reject(err);
        }
    });
}
