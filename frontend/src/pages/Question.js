import React, { useState, useEffect } from "react";
import { QrReader } from "react-qr-reader";

import Template from "../components/Template";
import TitleDash from "../components/TitleDash";
import Loader from "../components/Loader";

import { useSelector, useDispatch } from "react-redux";
import { answer, question } from "../features/questionSlice";

import { Qr } from "../components/AssetsExport";
import { alertActions } from "../features/alertSlice";

const Question = () => {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.signin.token);
    const { success, message, loading } = useSelector(
        (state) => state.question
    );

    useEffect(() => {
        dispatch(question(token));
    }, [token, dispatch]);

    const getQuestion = useSelector((state) => state.question);

    const [data, setData] = useState("No result");
    const [openHandler, setOpenHandler] = useState(false);

    function openQR() {
        setOpenHandler(true);
    }
    return (
        <Template>
            <Loader loading={loading} />
            <TitleDash title={`Question ${getQuestion.level}`} />
            <div className="mt-20 flex flex-col justify-center items-center">
                <h1 className="text-white lg:text-5xl text-3xl font-bold lg:w-3/5 w-full text-center tracking-wider selection:text-{#FFC800} selection:bg-{#FFC800}">
                    {getQuestion.question} ?
                </h1>
                <p className="text-white text-xl my-8">Scan QR to answer : </p>
            </div>
            <div>
                {openHandler && (
                    <QrReader
                        constraints={{
                            facingMode: "environment",
                        }}
                        onResult={(result, error) => {
                            if (!!result) {
                                setData(result?.text);
                                dispatch(answer(token, data));
                                dispatch(
                                    alertActions.createAlert({
                                        status: success,
                                        message: message.message,
                                    })
                                );
                            }

                            if (!!error) {
                                console.info(error);
                            }
                        }}
                        style={{ width: "100%" }}
                    />
                )}
                <button
                    onClick={() => openQR}
                    className="flex justify-between items-center relative mx-auto px-9 py-3 bg-white rounded-xl hover:scale-105 hover:-translate-y-1 transition ease-in-out hover:shadow-md"
                >
                    <p className="text-xl align-middle">Scan and Answer</p>
                    <img src={Qr} alt="Scan QR" className="h-12 w-12 ml-4" />
                </button>
            </div>
        </Template>
    );
};

export default Question;
