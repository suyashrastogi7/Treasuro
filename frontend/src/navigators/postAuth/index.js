import React from 'react';

import { Route, Routes } from "react-router-dom";

//Pages
import Home from '../../pages/Home';
import Leaderboard from '../../pages/Leaderboard';
import Rules from '../../pages/Rules';
import Success from '../../pages/Success';
import Question from '../../pages/Question';
import Payments from '../../pages/Payments';
import Profile from '../../pages/Profile';
import Ticket from '../../pages/Ticket';

export const PostAuthNavigator = () => {
    console.log("Post Auth")
    return(
        <Routes>
            <Route 
                path="/" 
                element={<Home />} 
            />
            <Route
				path="/leaderboard"
				element={<Leaderboard />}
			/>
            <Route
				path="/questions"
				element={<Question />}
			/>
            <Route
				path="/payment"
				element={<Payments />}
			/>
			<Route
				path="/profile"
				element={<Profile />}
			/>
            <Route 
                path="/rules" 
                element={<Rules />} 
            />
			<Route 
                path="/success" 
                element={<Success />} 
            />
            <Route 
                path="/tickets" 
                element={<Ticket />} 
            />
        </Routes>
    )
};