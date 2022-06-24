import { useNavigate } from "react-router-dom";
const Protected = ({ isLoggedIn, children }) => {
    const navigate = useNavigate();
    if (!isLoggedIn) {
        navigate("/signin");
    }
    return children;
};
export default Protected;
