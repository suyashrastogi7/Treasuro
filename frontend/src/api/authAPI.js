import axios from "../utils/config";

export function signin({ username, password }) {
    return new Promise(async (resolve, reject) => {
        try {
            const emailOrUsername = username;
            const response = await axios.post(
                "http://localhost:5000/api/auth/signin",
                { emailOrUsername, password }
            );
            const { token, user } = response.data;
            return resolve({ token, user });
        } catch (err) {
            console.log(err);
            return reject(err);
        }
    });
}

export function signup(data) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/signup",
                data
            );
            const { token, user } = response.data;
            console.log(response);
            return resolve({ token, user });
        } catch (err) {
            console.log(err);
            return reject(err);
        }
    });
}

export function getProfile({ token }) {
    return new Promise(async (resolve, reject) => {
        let config = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };
        try {
            const response = await axios.get(
                "http://localhost:5000/api/profile/getuser",
                config
            );
            const { user } = response.data;
            return resolve({ user });
        } catch (err) {
            console.log(err);
            return reject(err);
        }
    });
}

export function renewAccess(refresh) {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/refresh",
                {
                    refresh: refresh,
                }
            );
            if (response.status === 400) {
                return reject(response.data);
            }
            const { token } = response.data;
            resolve({ token });
        } catch (err) {
            console.log(err);
            return reject(err);
        }
    });
}
