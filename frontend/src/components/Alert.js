import React, { useState, useEffect } from "react";
import { Success, Error, Status } from "./AssetsExport";
import { useSelector, useDispatch } from "react-redux";
import { alertActions } from "../features/alertSlice";

export const Alert = () => {
	const { alerts } = useSelector((state) => state.alerts);
	const dispatch = useDispatch();
	const [alert, setAlert] = useState({ status: "", message: "" });

	useEffect(() => {
		if (alerts.length > 0) {
			setAlert(alerts[alerts.length - 1]);
			setShow(true);
			setTimeout(() => {
				setShow(false);
				dispatch(alertActions.removeAlert());
			}, 5000);
		}
	}, [alerts, alerts?.length, dispatch]);

	const [show, setShow] = useState(false);

	const onClose = () => {
		setShow(false);
	};
	return show ? (
		<div
			className={`fixed flex p-2 px-4 mb-4 bottom-6 right-12 ${
				alert.status === "success"
					? "bg-green-100 dark:bg-green-200"
					: "bg-red-100 dark:bg-red-200"
			} rounded-lg  z-50`}
		>
			<img
				className="flex-shrink-0 w-6 h-6 my-auto text-green-700 dark:text-green-800"
				src={alert.status === "success" ? Success : Error}
				alt="status"
			/>
			<p
				className={`ml-3 my-auto mx-5 text-sm font-medium ${
					alert.status === "success"
						? "text-green-700 dark:text-green-800"
						: "text-red-700 dark:text-red-800"
				}`}
			>
				{alert.message}
			</p>
			<button
				onClick={onClose}
				className={`ml-auto -mx-1.5  ${
					alert.status === "success"
						? "bg-green-100 text-green-500 hover:bg-green-200 focus:ring-green-400 dark:hover:bg-green-300 dark:text-green-600 dark:bg-green-200"
						: "bg-red-100 text-red-500 hover:bg-red-200 focus:ring-red-400 dark:hover:bg-red-300 dark:text-red-600 dark:bg-red-200"
				}
                } rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8`}
			>
				<img
					className={`${
						alert.status === "success" ? "text-green-500" : "text-red-500"
					} scale-110`}
					src={Status}
					alt="terminate"
				/>
			</button>
		</div>
	) : null;
};
