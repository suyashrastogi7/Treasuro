import React from "react";
import { Link } from "react-router-dom";
import Template from "../components/Template";
import TitleDash from "../components/TitleDash";

const Success = () => {
	return (
		<Template>
			<TitleDash title="REGISTERED SUCCESSFULLY" />
			<div className="flex flex-col justify-center align-center mt-9">
				<p className="text-white font-semibold text-2xl">
					You have registered successfully for treasuro 2022,
				</p>
				<p className="text-white font-semibold text-2xl mt-12">
					Kindly Login to contnue.
				</p>
				<p className="text-white text-xl mt-2">
					<Link to="/signin" replace className="text-hot-pink font-semibold">
						Signin
					</Link>{" "}
					from Here.
				</p>
			</div>
		</Template>
	);
};

export default Success;
