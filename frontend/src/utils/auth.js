import { signin, signout, signup } from "../api/authAPI";
import { setMessage } from "../features/messageSlice";

const TOKEN_KEY = "_t4gd-*-";

export const auth = {
    isAuthenticated,
    getToken,
    login,
    logout,
    register,
};

function isAuthenticated() {
    return !!getToken();
}

function getToken() {
    return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
}

async function login({ username, password, rememberMe }, thunkAPI) {
    const { token, user } = await signin({ username, password });
    console.log(token, user);
    // thunkAPI.dispatch(setMessage());
    if (rememberMe) {
        localStorage.setItem(TOKEN_KEY, token);
    } else {
        sessionStorage.setItem(TOKEN_KEY, token);
    }

    return { token, user };
}

async function register(data, thunkAPI) {
    try {
        const response = await signup(data);
        thunkAPI.dispatch(setMessage(response.data.message));
        const { token, user } = response.data;
        return { token, user };
    } catch (err) {
        thunkAPI.dispatch(setMessage(err.message));
        return thunkAPI.rejectWithValue();
    }
}

async function logout() {
    await signout();
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
}
