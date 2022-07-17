import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { alertActions } from "../features/alertSlice";

const ProtectedRoute = ({ children }) => {
    const { loggedIn } = useSelector((state) => state.signin);
    const dispatch = useDispatch();
    if (!loggedIn) {
        dispatch(
            alertActions.createAlert({
                message: "Sign in to Play 🤗",
                status: "success",
            })
        );
        return <Navigate to="/signin" replace />;
    }
    return children;
};

export default ProtectedRoute;
