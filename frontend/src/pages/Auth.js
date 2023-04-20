import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, register, checkAuth } from "../features/loginSlice";
import { alertActions } from "../features/alertSlice";
import { Arrow, Weed1Black, DefaultUSer } from "../components/AssetsExport";
import TitleDash from "../components/TitleDash";
import Template from "../components/Template";
import Loader from "../components/Loader";
import Input from "../components/Input";
import Cookies from "js-cookie";

const Auth = () => {
    const [active, setActive] = useState("Login");
    const [submitted, setSubmitted] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.signin);
    const { loggedIn } = useSelector((state) => state.signin);

    const [formState, setFormState] = useState({
        username: "",
        password: "",
        rememberMe: false,
    });
    const [signState, setSignState] = useState({
        name: "",
        username: "",
        password: "",
        rollno: "",
        email: "",
        phoneno: "",
        image: DefaultUSer,
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            setSignState({ ...signState, image: reader.result });
        };
        reader.onerror = function (error) {
            console.log("Error: ", error);
            alert("Invalid Image, Please Select a Valid One!");
        };
    };

    function reset() {
        setFormState({
            username: "",
            password: "",
            rememberMe: false,
        });
        setSignState({
            name: "",
            username: "",
            password: "",
            rollno: "",
            email: "",
            phoneno: "",
            image: DefaultUSer,
        });
    }

    async function HandleOnClick(event) {
        event.preventDefault();
        setSubmitted(true);
        dispatch(login(formState));
        if (submitted && loggedIn) {
            dispatch(
                alertActions.createAlert({
                    message: "Signed In Successfully 🤗",
                    status: "success",
                })
            );
            navigate("/", { replace: true });
        } else {
            dispatch(
                alertActions.createAlert({
                    message: "Error While Signin, Check your Credentials.",
                    status: "error",
                })
            );
            reset();
        }
    }
    async function HandleOnClickSignup(event) {
        event.preventDefault();
        console.log(signState);
        dispatch(register(signState));
        dispatch(checkAuth());
        const { signup } = useSelector((state) => state.signin);
        if (signup) {
            dispatch(
                alertActions.createAlert({
                    message: "Signed Up Successfully 🤗",
                    status: "success",
                })
            );
            navigate("/success", { replace: true });
        } else {
            dispatch(
                alertActions.createAlert({
                    message: "Error While Signup",
                    status: "error",
                })
            );
            reset();
        }
    }
    const switchtoLogin = () => {
        setActive("Login");
    };
    const switchtoSignUp = () => {
        setActive("SignUp");
    };
    return (
        <Template>
            <Loader loading={loading} />
            <div>
                <TitleDash title="LOGIN/SIGNUP" />
                <p className="text-3xl md:text-[56px] text-yellow font-bold mt-12 mb-12">
                    Get Started with an Adventure
                </p>
                <p className="tracking-widest text-md md:text-lg lg:text-2xl text-white md:font-black">
                    You can win a ton of a prizes and get a chance to win
                    exclusive swags
                </p>
            </div>

            <div className="flex flex-col justify-center items-center my-9">
                <div title="buttons" className="flex flex-row">
                    <button
                        className="bg-[#98FF9D] flex justify-center items-center lg:px-20 px-9 lg:py-7 py-3 rounded-l-xl relative"
                        onClick={() => {
                            switchtoLogin();
                        }}
                    >
                        <img
                            src={Weed1Black}
                            alt="weed"
                            className="lg:h-12 h-6 absolute lg:-left-4 -left-2 rotate-90"
                        />
                        <h1 className="text-md md:text-lg lg:text-3xl text-black md:font-black">
                            Login
                        </h1>
                    </button>

                    <button
                        className="bg-[#FFA800] flex justify-center items-center lg:px-20 px-9 lg:py-7 py-3 rounded-r-xl relative"
                        onClick={switchtoSignUp}
                    >
                        <h1 className="text-md md:text-lg lg:text-3xl text-black md:font-black">
                            SignUp
                        </h1>
                        <img
                            src={Weed1Black}
                            alt="weed"
                            className="lg:h-12 h-6 absolute lg:-right-4 -right-2 -rotate-90"
                        />
                    </button>
                </div>
                {active === "Login" && (
                    <div className="lg:w-1/3 md:w-1/2 w-10/12">
                        <TitleDash title="LOGIN" className="my-9" />
                        <Input
                            type="text"
                            formValue={formState.username}
                            formState={formState}
                            setValue={setFormState}
                            label="Username"
                            Placeholder="Username"
                            name="username"
                        />
                        <Input
                            type="password"
                            formValue={formState.password}
                            formState={formState}
                            label="Password"
                            setValue={setFormState}
                            Placeholder="Password"
                            name="password"
                        />
                        <br />
                        <Input
                            type="checkbox"
                            formValue={formState.rememberMe}
                            formState={formState}
                            setValue={setFormState}
                            Placeholder="Remember Me"
                            label="Remember Me"
                            name="rememberMe"
                        />
                        <button
                            onClick={HandleOnClick}
                            disabled={loading}
                            className="flex justify-between items-center cursor-pointer rounded-2xl px-3 py-2 md:px-6 md:py-2 my-2 bg-hot-pink font-semibold"
                        >
                            <span className="mr-1 text-white">Login</span>
                            <img src={Arrow} alt="arrow" />
                        </button>
                    </div>
                )}
                {active === "SignUp" && (
                    <div className="lg:w-1/3 md:w-1/2 w-10/12">
                        <TitleDash title="SignUp" className="my-9" />
                        <Input
                            type="text"
                            formValue={signState.name}
                            formState={signState}
                            setValue={setSignState}
                            label="Name"
                            Placeholder="Neeraj Maurya"
                            name="name"
                        />

                        <Input
                            type="text"
                            formValue={signState.username}
                            formState={signState}
                            setValue={setSignState}
                            label="Username"
                            Placeholder="seiken420"
                            name="username"
                        />

                        <Input
                            type="password"
                            formValue={signState.password}
                            formState={signState}
                            label="Password"
                            setValue={setSignState}
                            Placeholder="****"
                            name="password"
                        />
                        <Input
                            type="email"
                            formValue={signState.email}
                            formState={signState}
                            setValue={setSignState}
                            label="Email"
                            Placeholder="pamaria@gmail.com"
                            name="email"
                        />
                        <Input
                            type="text"
                            formValue={signState.rollno}
                            formState={signState}
                            setValue={setSignState}
                            label="Admission Number"
                            Placeholder="20CS110"
                            name="rollno"
                        />
                        <Input
                            type="text"
                            formValue={signState.phoneno}
                            formState={signState}
                            setValue={setSignState}
                            label="Phone Number"
                            Placeholder="9876543210"
                            name="phoneno"
                        />
                        <div className="flex justify-center items-center">
                            <div className="shrink-0">
                                <img
                                    className="h-16 w-16 object-cover rounded-full"
                                    src={signState.image}
                                    alt="Current profile"
                                />
                            </div>
                            <label className="block ml-4">
                                <span className="sr-only">
                                    Choose profile photo
                                </span>
                                <input
                                    type="file"
                                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                                    onChange={handleImageChange}
                                />
                            </label>
                        </div>
                        <button
                            onClick={HandleOnClickSignup}
                            disabled={loading}
                            className="flex justify-between items-center cursor-pointer rounded-2xl px-3 py-2 md:px-6 md:py-2 my-4 bg-hot-pink font-semibold"
                        >
                            <span className="mr-1 text-white">Sign Up</span>
                            <img src={Arrow} alt="arrow" />
                        </button>
                    </div>
                )}
            </div>
        </Template>
    );
};

export default Auth;
