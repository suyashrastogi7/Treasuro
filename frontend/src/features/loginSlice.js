import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	token: null,
};

export const signinSlice = createSlice({
	name: "signin",
	initialState,
	reducers: {
		setToken : (state, action) => {
			state.token = action.payload;
		}
	},
	extraReducers: {},
});

export const authActions = signinSlice.actions;
export const selectSignin = (state) => state.signin;
export const signinReducer = signinSlice.reducer;
