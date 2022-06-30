import { combineReducers } from "@reduxjs/toolkit";

import { signinReducer } from "./features/loginSlice";

const rootReducer = combineReducers({
    signin: signinReducer,
});

export default rootReducer;
