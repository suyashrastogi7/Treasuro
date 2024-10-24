import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

//ACtions
import { alertActions } from "../features/alertSlice";

//Components
import Template from "../components/Template";
import TitleDash from "../components/TitleDash";
import { Weed1Yellow, Arrow } from "../components/AssetsExport";

async function loadSDK() {
	return new Promise(function (resolve) {
		const script = document.createElement("script");
		script.src = "https://checkout.razorpay.com/v1/checkout.js";
		document.body.appendChild(script);
		script.onload = () => {
			resolve(true);
		};
		script.onerror = () => {
			resolve(false);
		};
	});
}

const Payments = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const access = useSelector((state) => state.signin.token.access);
	const { name } = useSelector((state) => state.user.user);
	async function displayRazorpay() {
		if (!process.env.REACT_APP_PAYMENT_ENABLED) {
			dispatch(
				alertActions.createAlert({
					message: "Payments are currently Disabled",
					status: "error",
				})
			);
			return;
		}
		const res = await loadSDK();
		if (!res) {
			alert("Razorpay SDK failed to load, Are you Online?");
			return;
		}
		let config = {
			headers: {
				Authorization: `Bearer ${access}`,
				"Content-Type": "application/json",
			},
		};
		const result = await axios.get(
			`${process.env.REACT_APP_URL}api/payment/createorder`,
			config
		);
		if (!result) {
			alert("Server error. Are you online?");
			return;
		}

		const { amount, orderId, username } = result.data.order;

		const options = {
			key: "rzp_test_1mxWSfdffc4Ize",
			amount: amount.toString(),
			currency: "INR",
			name: "Treasuro 2022",
			description: `Ticket Purchase by ${username}`,
			order_id: orderId,
			handler: async function (response) {
				const data = {
					orderCreationId: orderId,
					razorpay_payment_id: response.razorpay_payment_id,
					razorpay_order_id: response.razorpay_order_id,
					razorpay_signature: response.razorpay_signature,
				};
				try {
					const result = await axios.post(
						`${process.env.REACT_APP_URL}api/payment/verifypayment`,
						data,
						config
					);
					if (result.data.success) {
						//payment success, send to tickets page
						dispatch(
							alertActions.createAlert({
								message: "Payment Successfull. 🤗",
								status: "success",
							})
						);
						navigate("/tickets", { replace: true });
					}
				} catch (err) {
					dispatch(
						alertActions.createAlert({
							message: "Payment Failed, please retry with another method. 🤗",
							status: "failed",
						})
					);
					// navigate("/error", { replace: true });
				}
			},
			prefill: {
				name: "MMIL",
				email: "suyash.rastogi01@gmail.com",
				contact: "8299688077",
			},
			notes: {
				address: "MMIL, JSS Academy Of Technical Education, Noida",
			},
		};
		const paymentObject = new window.Razorpay(options);
		paymentObject.open();
	}

	return (
		<Template>
			<TitleDash title="Payments" />
			<p className="text-white my-7 text-xl font-bold">Proceed to Pay :</p>
			<div>
				<h1 className="text-white my-3 text-xl font-semibold">
					Amount :{" "}
					<span className="text-white my-3 text-xl font-normal ml-4">₹50</span>
				</h1>
				<h1 className="text-white my-3 text-xl font-semibold">
					Attempts :{" "}
					<span className="text-white my-3 text-xl font-normal ml-4">3</span>
				</h1>
				<h1 className="text-white my-3 text-xl font-semibold">
					Name :{" "}
					<span className="text-white my-3 text-xl font-normal ml-4">
						{name}
					</span>
				</h1>
			</div>
			<div className="flex justify-end items-end mt-auto h-36">
				<img
					src={Weed1Yellow}
					className="absolute bottom-0 left-0"
					alt="weed"
				/>
				<button
					onClick={() => displayRazorpay()}
					className="flex justify-between items-center hover:shadow-lg cursor-pointer rounded-2xl px-3 py-2 md:px-6 md:py-2 bg-hot-pink font-semibold"
				>
					<span className="mr-3 text-white">Make Payment</span>
					<img src={Arrow} alt="arrow" />
				</button>
			</div>
		</Template>
	);
};

export default Payments;
