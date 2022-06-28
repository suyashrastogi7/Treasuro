import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import ProtectedRoute from "./components/Protected";
import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Auth from "./pages/Auth";
import Tickets from "./pages/Ticket";
import Payment from "./pages/Payments";
import Rules from "./pages/Rules";

const App = () => {
    const { loggedIn } = useSelector((state) => state.signin);
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/leaderboard"
                    element={
                        <ProtectedRoute isLoggedIn={loggedIn}>
                            <Leaderboard />
                        </ProtectedRoute>
                    }
                />
                <Route path="/signin" element={<Auth />} />
                <Route
                    path="/tickets"
                    element={
                        <ProtectedRoute isLoggedIn={loggedIn}>
                            <Tickets />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/payment"
                    element={
                        <ProtectedRoute isLoggedIn={loggedIn}>
                            <Payment />
                        </ProtectedRoute>
                    }
                />
                <Route path="/rules" element={<Rules />} />
            </Routes>
        </Router>
    );
};

export default App;
