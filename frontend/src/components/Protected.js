import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({ children }) => {
    const { loggedIn } = useSelector((state) => state.signin);
    if (!loggedIn) {
        return <Navigate to="/signin" replace />;
    }

    return children;
};

export default ProtectedRoute;
