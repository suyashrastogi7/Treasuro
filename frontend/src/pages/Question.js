import React, { useEffect } from "react";

import Template from "../components/Template";
import TitleDash from "../components/TitleDash";
import Loader from "../components/Loader";

import { useSelector, useDispatch } from "react-redux";
import { answer, question } from "../features/questionSlice";

import QRCodeScanner from "../components/QRCodeScanner/QRCodeScanner";
const Question = () => {
	const dispatch = useDispatch();
	const token = useSelector((state) => state.signin.token);
	const { loading } = useSelector((state) => state.question);
	const { alerts } = useSelector((state) => state.alerts);
	const { attempts } = useSelector((state) => state.signin.loggedInUser);

	useEffect(() => {
		dispatch(question(token.access));
	}, [alerts, token, dispatch]);

	const getQuestion = useSelector((state) => state.question);

	return (
		<Template>
			<Loader loading={loading} />
			<TitleDash title={`Question ${getQuestion.level}`} />
			<div className="mt-20 flex flex-col justify-center items-center">
				{typeof getQuestion.question === "string" && (
					<h1 className="text-white lg:text-5xl text-3xl font-bold lg:w-3/5 w-full text-center tracking-wider selection:text-{#FFC800} selection:bg-{#FFC800}">
						{attempts > 0
							? getQuestion.question
							: `${getQuestion.question.substring(0, 15).concat("****")}`}{" "}
						?
					</h1>
				)}

				{attempts > 0 ? (
					<p className="text-white text-xl my-8">Scan QR to answer : </p>
				) : (
					<span></span>
				)}
			</div>
			<div className="mx-auto">
				{attempts > 0 ? (
					<QRCodeScanner />
				) : (
					<div className="flex items-center justify-center mt-9">
						<span className="text-white text-xl my-8">
							You have ran out of attempts! Thankyou for playing
						</span>
					</div>
				)}
			</div>
		</Template>
	);
};

export default Question;
