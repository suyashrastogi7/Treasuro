import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

//Components
import Template from "../components/Template";
import TitleDash from "../components/TitleDash";
import Loader from "../components/Loader";
import QRCodeScanner from "../components/QRCodeScanner/QRCodeScanner";

//API
import { getQuestion } from "../api/questionAPI";

const Question = () => {
	const { attempts } = useSelector((state) => state.user.user);

	const [question, setQuestion] = useState({
		question: "",
		level: 1
	});
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		async function getQuestionByLevel(){
			setLoading(true);
			const response = await getQuestion();
			setQuestion(response?.question)
			setLoading(false)
		}
		getQuestionByLevel();
	}, []);

	return (
		<Template>
			<Loader loading={loading} />
			<TitleDash title={`Question ${question.level}`} />
			<div className="mt-20 flex flex-col justify-center items-center">
				{typeof question.question === "string" && (
					<h1 className="text-white lg:text-5xl text-3xl font-bold lg:w-3/5 w-full text-center tracking-wider selection:text-{#FFC800} selection:bg-{#FFC800}">
						{attempts > 0
							? question.question
							: `${question.question.substring(0, 15).concat("****")}`}{" "}
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
