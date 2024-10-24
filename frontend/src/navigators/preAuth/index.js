import React from "react";

import { Route, Routes } from "react-router-dom";

//Pages
import Home from "../../pages/Home";
import Leaderboard from "../../pages/Leaderboard";
import Auth from "../../pages/Auth";
import Rules from "../../pages/Rules";
import Success from "../../pages/Success";

export const PreAuthNavigator = () => {
	console.log("Pre Auth");
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/leaderboard" element={<Leaderboard />} />
			<Route path="/signin" element={<Auth />} />
			<Route path="/rules" element={<Rules />} />
			<Route path="/success" element={<Success />} />
		</Routes>
	);
};
