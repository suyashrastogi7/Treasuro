import { combineReducers } from "@reduxjs/toolkit";

import { signinReducer } from "./features/loginSlice";
import { questionReducer } from "./features/questionSlice";

const rootReducer = combineReducers({
    signin: signinReducer,
    question: questionReducer,
});

export default rootReducer;
