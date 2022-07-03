import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuth } from "./features/loginSlice";
import { useEffect } from "react";
import ProtectedRoute from "./components/Protected";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Auth from "./pages/Auth";

import Tickets from "./pages/Ticket";
import Success from "./pages/Success";
import Payment from "./pages/Payments";
import Question from "./pages/Question";
import Profile from "./pages/Profile";
import Rules from "./pages/Rules";

const App = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/leaderboard"
                    element={
                        <ProtectedRoute>
                            <Leaderboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/signin" element={<Auth />} />
                <Route
                    path="/tickets"
                    element={
                        <ProtectedRoute>
                            <Tickets />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/questions"
                    element={
                        <ProtectedRoute>
                            <Question />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/payment"
                    element={
                        <ProtectedRoute>
                            <Payment />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route path="/rules" element={<Rules />} />
                <Route path="/success" element={<Success />} />
            </Routes>
        </Router>
    );
};

export default App;
