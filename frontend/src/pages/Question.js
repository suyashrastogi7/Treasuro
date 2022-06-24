import React from "react";
import axios from "axios";

import Template from "../components/Template";
import TitleDash from "../components/TitleDash";

const Question = async () => {
    // const res = await axios.get('/api/questions/resume');
    // const question = res.data;
    const question = {
        serial: 1,
        text: "What is the amount of time required to answer this question",
    };
    return (
        <Template>
            <TitleDash title={`Question ${question.serial}`} />
            <div className="my-5">
                <h1 className="text-white text-2xl">{question.text} ?</h1>
                <p className="text-white text-lg">Scan QR to answer : </p>
            </div>
        </Template>
    );
};

export default Question;
