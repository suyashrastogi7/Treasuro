import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { alertActions } from "../features/alertSlice";
import { auth } from "../utils/auth";

const ProtectedRoute = ({ children }) => {
	const { loggedIn } = useSelector((state) => state.signin);
	const dispatch = useDispatch();
	useEffect(() => {
		if (!auth.isAuthenticated()) {
			dispatch(
				alertActions.createAlert({
					message: "Sign in to Play 🤗",
					status: "success",
				})
			);
			return <Navigate to="/signin" replace />;
		}
	}, [loggedIn, dispatch]);

	return children;
};

export default ProtectedRoute;
