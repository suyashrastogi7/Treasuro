import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, register } from "../features/loginSlice";
import { Arrow } from "../components/AssetsExport";
import TitleDash from "../components/TitleDash";
import Template from "../components/Template";
import Input from "../components/Input";

const Auth = () => {
    const [active, setActive] = useState("Login");

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
        image: "data:image/webp;base64,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",
    });

    const dispatch = useDispatch();

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

    const navigate = useNavigate();
    const switchtoLogin = () => {
        setActive("Login");
    };
    const switchtoSignUp = () => {
        setActive("SignUp");
    };
    return (
        <Template>
            <div>
                <TitleDash title="LOGIN/SIGNUP" />
                <p className="text-3xl md:text-[48px] text-yellow font-bold mt-12 mb-12">
                    Get Started with an Adventure
                </p>
                <p className="tracking-widest text-md md:text-lg lg:text-2xl text-white md:font-black">
                    You can win a ton of a prizes and get a chance to win
                    exclusive swags
                </p>
            </div>

            <div className="flex flex-col justify-center items-center my-9">
                <div title="buttons" className="">
                    <button
                        className="bg-[#98FF9D] flex-row cursor-pointer  justify-center items-center px-3 py-2 md:px-6 md:py-2 my-4"
                        onClick={switchtoLogin}
                    >
                        <div className="text-md md:text-lg lg:text-xl text-black md:font-black">
                            Login
                        </div>
                    </button>

                    <button
                        className="bg-[#FFA800] flex-row cursor-pointer  justify-center items-center px-3 py-2 md:px-6 md:py-2 my-4"
                        onClick={switchtoSignUp}
                    >
                        <div className="text-md md:text-lg lg:text-xl text-black md:font-black">
                            SignUp
                        </div>
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
                            onClick={handleOnClick}
                            className="flex justify-between items-center cursor-pointer rounded-2xl px-3 py-2 md:px-6 md:py-2 my-4 bg-hot-pink font-semibold"
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
                            type="text"
                            formValue={signState.rollno}
                            formState={signState}
                            setValue={setSignState}
                            label="Admission Number"
                            Placeholder="20CS110"
                            name="admissionno"
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
                            onClick={handleOnClickSignup}
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
    async function handleOnClick(event) {
        event.preventDefault();
        console.log(formState);
        await dispatch(login(formState));
        navigate("/", { replace: true });
    }
    async function handleOnClickSignup(event) {
        event.preventDefault();
        console.log(signState);
        await dispatch(register(signState));
        navigate("/signin", { replace: true });
    }
};

export default Auth;
