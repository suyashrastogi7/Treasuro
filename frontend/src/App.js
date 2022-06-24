import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Protected from "./components/Protected";

import Home from "./pages/Home";
import Leaderboard from "./pages/Leaderboard";
import Auth from "./pages/Auth";
import Tickets from "./pages/Ticket";
import Payment from "./pages/Payments";
import Rules from "./pages/Rules";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/leaderboard"
                    element={
                        <Protected isLoggedIn={true}>
                            <Leaderboard />
                        </Protected>
                    }
                />
                <Route path="/signin" element={<Auth />} />
                <Route
                    path="/tickets"
                    element={
                        <Protected isLoggedIn={true}>
                            <Tickets />
                        </Protected>
                    }
                />
                <Route
                    path="/payment"
                    element={
                        <Protected isLoggedIn={true}>
                            <Payment />
                        </Protected>
                    }
                />
                <Route path="/rules" element={<Rules />} />
            </Routes>
        </Router>
    );
};

export default App;
