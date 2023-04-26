import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../utils/auth";
import { getProfile } from "../api/authAPI";

export const checkAuth = createAsyncThunk("signin/checkAuth", async () => {
	return new Promise(async (resolve, reject) => {
		const token = JSON.parse(localStorage.getItem("token"));

		if (token) {
			const { user } = await getProfile(token);
			if (user !== "") return resolve({ user, token });
		}

		return reject({ error: "User is not logged in!" });
	});
});

export const renewToken = createAsyncThunk(
	"renew/renewToken",
	auth.renewAccessToken
);

export const login = createAsyncThunk("signin/login", auth.login);

export const register = createAsyncThunk("signup/register", auth.register);

export const logout = createAsyncThunk("signout/logout", auth.logout);

const initialState = {
	loading: false,
	error: null,
	loggedIn: false,
	loggedInUser: null,
	token: null,
	signup: false,
};

export const signinSlice = createSlice({
	name: "signin",
	initialState,
	reducers: {},
	extraReducers: {
		[checkAuth.pending]: startLoading,
		[checkAuth.fulfilled]: (state, { payload }) => {
			const { user, token } = payload;
			Object.assign(state, {
				loading: false,
				error: null,
				loggedIn: true,
				loggedInUser: user,
				token: token,
			});
		},
		[checkAuth.rejected]: (state, action) => {
			Object.assign(state, {
				loading: false,
				error: action.error,
			});
		},

		[register.pending]: startLoading,
		[register.fulfilled]: (state, { payload }) => {
			Object.assign(state, {
				loading: false,
				signup: payload,
			});
		},
		[register.rejected]: receiveError,

		[login.pending]: startLoading,
		[login.fulfilled]: (state, { payload }) => {
			const { user, token } = payload;
			if (user != null && token != null) {
				return Object.assign(state, {
					...initialState,
					loading: false,
					loggedIn: true,
					loggedInUser: user,
					token,
				});
			}
			return initialState;
		},
		[login.rejected]: receiveError,

		[logout.pending]: startLoading,
		[logout.fulfilled]: (state) =>
			Object.assign(state, {
				...initialState,
				loading: false,
				loggedIn: false,
				loggedInUser: null,
				token: null,
			}),
		[logout.rejected]: receiveError,

		[renewToken.pending]: startLoading,
		[renewToken.fulfilled]: (state, { payload }) => {
			Object.assign(state, {
				...initialState,
				loading: false,
				token: payload.access,
			});
		},
		[renewToken.rejected]: receiveError,
	},
});

function startLoading(state) {
	Object.assign(state, {
		loading: true,
		error: null,
	});
}

function receiveError(state, action) {
	Object.assign(state, {
		loading: false,
		error: action.payload,
	});
}

export const selectSignin = (state) => state.signin;

export const signinReducer = signinSlice.reducer;
