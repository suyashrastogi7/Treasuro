import React from "react";
import "./QRCodeScanner.css";
import Html5QrcodePlugin from "./Html5QrcodePlugin";
import { useDispatch } from "react-redux";
import { alertActions } from "../../features/alertSlice";
import Cookies from "js-cookie";
import axios from "axios";

const QRCodeScanner = (props) => {
	const dispatch = useDispatch();
	const token = Cookies.get("access-token");

	const onNewScanResult = async (decodedText, decodedResult) => {
		try {
			const response = await axios.post(
				`https://treasuro.in/api/question/ans`,
				{
					data: decodedText,
					token: token,
				}
			);
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
