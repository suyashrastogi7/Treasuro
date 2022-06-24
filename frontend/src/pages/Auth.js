import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../features/loginSlice";
import { Arrow } from "../components/AssetsExport";
import TitleDash from "../components/TitleDash";
import Template from "../components/Template";
import Input from "../components/Input";


const Auth = () => {
    const [active,setActive]=useState("Login");

    const [formState, setFormState] = useState({
        username: "",
        password: "",
        rememberMe: false,
    });
    const [signState, setSignState] = useState({
        
        name:"",
        username: "",
        password: "",
        admissionno:"",
        email:"",
        phoneno:"",
        rememberMe: false,
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const switchtoLogin=()=>{
        setActive("Login");
    }
    const switchtoSignUp=()=>{
        setActive("SignUp");
    }
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
                <div title="buttons" className="">
                <button className="bg-[#98FF9D] flex-row cursor-pointer  justify-center items-center px-3 py-2 md:px-6 md:py-2 my-4" onClick={switchtoLogin}>
                    
                 <div className="text-md md:text-lg lg:text-xl text-black md:font-black">
                    
                 Login
                 </div>
                </button>
                
                <button className="bg-[#FFA800] flex-row cursor-pointer  justify-center items-center px-3 py-2 md:px-6 md:py-2 my-4" onClick={switchtoSignUp}>
                
                <div className="text-md md:text-lg lg:text-xl text-black md:font-black">
                SignUp
                </div>
                </button>
                </div>
               {active === "Login" && 
                (<div className="w-1/4">
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
                        name="remember me"
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
                    )
               }
                    {active === "SignUp" && (
                      <div className="w-1/4">
                      <TitleDash title="SignUp" className="my-9" />
                      <Input
                          type="text"
                          signValue={signState.name}
                          signState={signState}
                          setValue={setSignState}
                          label="Name"
                          Placeholder="Neeraj Maurya"
                          name="name"
                      />
                      
                      <Input
                          type="text"
                          signValue={signState.username}
                          signState={signState}
                          setValue={setSignState}
                          label="Username"
                          Placeholder="seiken420"
                          name="username"
                      />
                     
                      <Input
                          type="password"
                          signValue={signState.password}
                          signState={signState}
                          label="Password"
                          setValue={setSignState}
                          Placeholder="****"
                          name="password"
                      />
                      <Input
                          type="text"
                          signValue={signState.admissionno}
                          signState={signState}
                          setValue={setSignState}
                          label="Admission Number"
                          Placeholder="20CS110"
                          name="admissionno"
                      />
                      <Input
                          type="email"
                          signValue={signState.name}
                          signState={signState}
                          setValue={setSignState}
                          label="Email"
                          Placeholder="pamaria@gmail.com"
                          name="email"
                      />
                      <Input
                      type="number"
                      signValue={signState.phoneno}
                      signState={signState}
                      setValue={setSignState}
                      label="Phone Number"
                      Placeholder="9876543210"
                      name="phoneno"
                  />
                      <Input
                          type="checkbox"
                          signValue={signState.rememberMe}
                          signState={signState}
                          setValue={setSignState}
                          Placeholder="Remember Me"
                          label="Remember Me"
                          name="remember me"
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
  
                    )} 
                   
            </div>
        </Template>
    );
    async function handleOnClick(event) {
        event.preventDefault();
        await dispatch(login(formState));
        navigate("/", { replace: true });
    }
};

export default Auth;
