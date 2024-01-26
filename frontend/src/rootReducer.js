import { combineReducers } from "@reduxjs/toolkit";

import { signinReducer } from "./features/loginSlice";
import { AlertSlice } from "./features/alertSlice";
import UserSlice from "./features/userSlice";

const rootReducer = combineReducers({
    signin: signinReducer,
    alerts: AlertSlice.reducer,
    user: UserSlice.reducer
});

export default rootReducer;
