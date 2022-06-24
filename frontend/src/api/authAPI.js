import axios from "axios";

import { NETWORK_LATENCY } from "../utils/constants";

export function signin({ username, password }) {
    return new Promise((resolve, reject) => {
        try {
            const response = axios.post(
                "http://localhost:5000/api/auth/signin",
                { username, password }
            );
            const { token, user } = response.data;
            return resolve({ token, user });
        } catch (err) {
            console.log(err);
            return reject(err);
        }
    });
}

export function signup({ data }) {
    return new Promise((resolve, reject) => {
        try {
            const response = axios.post(
                "http://localhost:5000/api/auth/signup",
                data
            );
            const { token, user } = response.data;
            return resolve({ token, user });
        } catch (err) {
            console.log(err);
            return reject(err);
        }
    });
}

export function signout() {
    return new Promise((resolve) => {
        setTimeout(resolve, NETWORK_LATENCY);
    });
}
