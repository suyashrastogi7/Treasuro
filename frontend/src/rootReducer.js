import { combineReducers } from "@reduxjs/toolkit";

import { signinReducer } from "./features/loginSlice";
import { questionReducer } from "./features/questionSlice";
import { AlertSlice } from "./features/alertSlice";

const rootReducer = combineReducers({
    signin: signinReducer,
    question: questionReducer,
    alerts: AlertSlice.reducer,
});

export default rootReducer;
