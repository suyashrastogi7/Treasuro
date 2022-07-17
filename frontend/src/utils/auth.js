import { signin, signup, getProfile } from "../api/authAPI";
// import { setMessage } from "../features/messageSlice";
import Cookies from "js-cookie";

const TOKEN_KEY = "_t4gd-*-";

export const auth = {
    isAuthenticated,
    getToken,
    login,
    logout,
    register,
    getUser,
};

function isAuthenticated() {
    return !!getToken();
}

function getToken() {
    return localStorage.getItem("access-token");
}

async function getUser() {
    const user = await getProfile();
    return user;
}

async function login({ username, password, rememberMe }) {
    const { token, user } = await signin({ username, password });
    Cookies.set("access-token", token.access, {
        path: "/",
        expires: 1,
    });
    Cookies.set("refresh-token", token.refresh, {
        path: "/",
        expires: 5,
    });
    if (rememberMe) {
        localStorage.setItem("access-token", token.access);
        localStorage.setItem(TOKEN_KEY, token.refresh);
    }
    return { token, user };
}

// async function renewAccessToken() {
//     try {
//         const refresh = Cookies.get("refresh-token");
//         const { token } = await renewAccess(refresh);
//         return Promise.resolve({ token });
//     } catch (err) {
//         return Promise.reject(err.response?.data?.msg);
//     }
// }

async function register(data) {
    try {
        const response = await signup(data);
        // thunkAPI.dispatch(setMessage(response.data.message));
        const { success } = response.data;
        return { success };
    } catch (err) {
        // thunkAPI.dispatch(setMessage(err.message));
        // return thunkAPI.rejectWithValue();
        console.log(err);
    }
}

async function logout() {
    try {
        Cookies.remove("refresh-token");
        Cookies.remove("access-token");
        localStorage.removeItem(TOKEN_KEY);
        return {
            success: true,
        };
    } catch (err) {
        console.log(err);
    }
}
