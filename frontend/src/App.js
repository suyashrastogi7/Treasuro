import { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./features/loginSlice";

//Navigators
import { PostAuthNavigator } from "./navigators/postAuth";
import { PreAuthNavigator } from "./navigators/preAuth";
import { auth } from "./utils/auth";
import { userActions } from "./features/userSlice";
import { Alert } from "./components/Alert";

const App = () => {
	const loggedIn = !!useSelector((state) => state.signin.token);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(authActions.setToken(auth.getToken()));
		dispatch(userActions.setUser(auth.getUser()));
	}, [dispatch]);

	return (
		<>
			{loggedIn ? (
				<Router>
					<PostAuthNavigator />
				</Router>
			) : (
				<Router>
					<PreAuthNavigator />
				</Router>
			)}
			<Alert />
		</>
	);
};

export default App;
