import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../features/loginSlice";
import { Arrow } from "../components/AssetsExport";
import TitleDash from "../components/TitleDash";
import Template from "../components/Template";
import Input from "../components/Input";

const Auth = () => {
    const [formState, setFormState] = useState({
        username: "",
        password: "",
        rememberMe: false,
    });
    const dispatch = useDispatch();

    return (
        <Template>
            <div>
                <TitleDash title="LOGIN/SIGNUP" />
                <p className="text-3xl md:text-[64px] text-yellow font-bold mt-12 mb-12">
                    Get Started with an Adventure
                </p>
                <p className="tracking-widest text-md md:text-lg lg:text-2xl text-white md:font-black">
                    You can win a ton of a prizes and get a chance to win
                    exclusive swags
                </p>
            </div>
            <div className="flex flex-col justify-center items-center my-9">
                <div className="w-1/4">
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
                    <Link to="/signin" className="mx-4 mt-3">
                        <button
                            onClick={handleOnClick}
                            className="flex justify-between items-center cursor-pointer rounded-2xl px-3 py-2 md:px-6 md:py-2 my-4 bg-hot-pink font-semibold"
                        >
                            <span className="mr-1 text-white">Login</span>
                            <img src={Arrow} alt="arrow" />
                        </button>
                    </Link>
                </div>
            </div>
        </Template>
    );
    async function handleOnClick(event) {
        event.preventDefault();
        console.log(formState);
        await dispatch(login(formState));
        // navigate("/", { replace: true });
    }
};

export default Auth;
