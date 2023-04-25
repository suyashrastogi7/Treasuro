import React, { useState, useEffect } from "react";
import QrScan from "react-qr-reader";

import Template from "../components/Template";
import TitleDash from "../components/TitleDash";
import Loader from "../components/Loader";

import { useSelector, useDispatch } from "react-redux";
import { answer, question } from "../features/questionSlice";

// import { Qr } from "../components/AssetsExport";
import { alertActions } from "../features/alertSlice";
import QRCodeScanner from "../components/QRCodeScanner/QRCodeScanner";
const Question = () => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.signin.token);
	const { success, message, loading } = useSelector((state) => state.question);

	useEffect(() => {
		dispatch(question(token.access));
	}, [token, dispatch]);

	const getQuestion = useSelector((state) => state.question);

	const [data, setData] = useState("No result");

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
			<div className="mx-auto">
				<QRCodeScanner />
			</div>
		</Template>
	);
};

export default Question;
