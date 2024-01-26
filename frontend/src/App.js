import { BrowserRouter as Router} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./features/loginSlice";
import { useEffect } from "react";

//Navigators
import { PostAuthNavigator } from "./navigators/postAuth";
import { PreAuthNavigator } from "./navigators/preAuth";
import { auth } from "./utils/auth";
import { userActions } from "./features/userSlice";

const App = () => {
	const dispatch = useDispatch();
	const loggedIn = !!useSelector(state => state.signin.token)

	console.log("Logged In", loggedIn)

	useEffect(() => {
		auth.isAuthenticated() && dispatch(authActions.setToken(auth.getToken()));
		auth.isUserAvailable() && dispatch(userActions.setUser(auth.getUser()));
	}, [dispatch]);

	return (
		<Router>
			{loggedIn ? <PostAuthNavigator /> : <PreAuthNavigator />}
		</Router>
	);
};

export default App;
