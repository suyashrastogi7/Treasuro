import axios from "../utils/config";

export function getQuestion(token) {
    return new Promise(async (resolve, reject) => {
        let config = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };
        try {
            const response = await axios.get(
                `${process.env.REACT_APP_URL}api/question/getone`,
                config
            );
            const { question, level } = response.data.question;
            console.log(question);
            return resolve({ level, question });
        } catch (err) {
            console.log(err);
            return reject(err);
        }
    });
}

export function postAnswer(token, data) {
    return new Promise(async (resolve, reject) => {
        let config = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_URL}api/question/ans`,
                config,
                data
            );
            const { success } = response.data;
            console.log(success);
            return resolve({ success });
        } catch (err) {
            console.log(err);
            return reject(err);
        }
    });
}
