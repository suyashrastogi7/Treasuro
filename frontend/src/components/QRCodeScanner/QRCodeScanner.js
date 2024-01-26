import React from "react";
import "./QRCodeScanner.css";
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import { useDispatch } from "react-redux";

//ACtions
import { alertActions } from "../../features/alertSlice";

//API
import { postAnswer } from "../../api/questionAPI";

const QRCodeScanner = (props) => {
	const dispatch = useDispatch();

	const onNewScanResult = async (decodedText) => {
		try {
			const response = await postAnswer(decodedText)
			const { success, msg } = response.data;
			if (success) {
				dispatch(
					alertActions.createAlert({
						message: msg,
						status: "success",
					})
				);
			} else {
				dispatch(
					alertActions.createAlert({
						message: msg,
						status: "error",
					})
				);
			}
		} catch (err) {
			dispatch(
				alertActions.createAlert({
					message: "Failed to post answer",
					status: "error",
				})
			);
			console.error(err);
		}
	};

	return (
		<div className="App">
			<section className="App-section">
				<br />
				<br />
				<br />
				<Html5QrcodePlugin
					fps={10}
					qrbox={250}
					disableFlip={false}
					qrCodeSuccessCallback={onNewScanResult}
				/>
				{/* <ResultContainerPlugin results={decodedResults} /> */}
			</section>
		</div>
	);
};

export default QRCodeScanner;
