import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getQuestion, postAnswer } from "../api/questionAPI";

const initialState = {
    level: 0,
    question: "",
    success: null,
    message: "",
    error:null
};

export const question = createAsyncThunk("question/get", getQuestion);
export const answer = createAsyncThunk("answer/post", postAnswer);

const questionSlice = createSlice({
    name: "question",
    initialState,
    reducers: {},
    extraReducers: {
        [question.pending]: startLoading,
        [question.fulfilled]: (state, { payload }) => {
            Object.assign(state, {
                ...initialState,
                loading: false,
                question: payload.question,
                level: payload.level,
                success: false,
            });
        },
        [question.rejected]: receiveError,

        [answer.pending]: startLoading,
        [answer.fulfilled]: (state, { payload }) => {
            Object.assign(state, {
                ...initialState,
                loading: false,
                success: payload.success,
                message: payload.message,
            });
        },
        [answer.rejected]: receiveError,
    },
});

function startLoading(state) {
    Object.assign(state, {
        loading: true,
        message: null,
    });
}

function receiveError(state, action) {
    Object.assign(state, {
        loading: false,
        message: action.error,
    });
}

export const selectQuestion = (state) => state.question;

export const questionReducer = questionSlice.reducer;
