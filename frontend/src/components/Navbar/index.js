import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Arrow, Cross, Hamburger, LogoWhite } from "../AssetsExport";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../features/alertSlice";
import NavLinks from "./NavLinks";
import { logout } from "../../features/loginSlice";
import Cookies from "js-cookie";

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [show, setShow] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loggedInUser, loggedIn } = useSelector((state) => state.signin);
    useEffect(() => {
        document.body.style.overflowY = showMenu ? "hidden" : "auto";
    }, [showMenu]);
    return (
        <nav className="z-10 flex justify-between items-center mx-auto pt-12 mb-6 w-[90vw] text-white font-semibold">
            <Link to="/" className="z-10">
                <img
                    className="cursor-pointer w-24 z-10"
                    src={LogoWhite}
                    alt=""
                />
            </Link>
            <div className="hidden lg:block">
                <NavLinks />
            </div>
            <div className="hidden lg:block">
                {loggedIn ? (
                    <div
                        onMouseOver={() => setShow(true)}
                        onMouseLeave={() => setShow(false)}
                        className="relative"
                    >
                        <button className="flex justify-between items-center cursor-pointer rounded-full px-3 py-2 md:px-6 md:py-2 bg-hot-pink  font-semibold">
                            <img
                                src={loggedInUser?.image}
                                className="rounded-full h-8 w-8"
                                alt="arrow"
                            />
                            <span className="ml-3">{loggedInUser?.name}</span>
                        </button>
                        <div
                            className={`${
                                show ? "" : "hidden"
                            } bg-hot-pink absolute rounded-b-lg left-6 pt-1`}
                        >
                            <button
                                onClick={() => navigate("/profile")}
                                className="flex w-full justify-between rounded items-center px-12 text-white  bg-hot-pink  py-2 hover:bg-[#D90166]"
                            >
                                Profile
                            </button>

                            <button
                                onClick={() => {
                                    localStorage.removeItem("access-token");
                                    Cookies.remove("access-token");
                                    Cookies.remove("refresh-token");
                                    dispatch(logout());
                                    dispatch(
                                        alertActions.createAlert({
                                            message:
                                                "Logged Out Successfully 🤗",
                                            status: "success",
                                        })
                                    );
                                    navigate("/", { replace: true });
                                }}
                                className="flex justify-between items-center px-12 text-white bg-hot-pink rounded hover:bg-[#D90166] py-2"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <Link to="/signin">
                        <button className="flex justify-between items-center cursor-pointer rounded-2xl px-3 py-2 md:px-6 md:py-2 bg-hot-pink font-semibold">
                            <span className="mr-3">Sign In</span>
                            <img src={Arrow} alt="arrow" />
                        </button>
                    </Link>
                )}
            </div>
            <div className="lg:hidden z-10">
                <img
                    src={Hamburger}
                    onClick={() => setShowMenu(true)}
                    className="w-9 cursor-pointer"
                    alt=""
                />
            </div>
            {/* SideMenu */}
            {showMenu && (
                <div
                    className="absolute z-20 bg-black opacity-40 top-0 left-0 right-0 bottom-0 w-screen h-screen"
                    onClick={() => setShowMenu(false)}
                ></div>
            )}
            <div
                className={`absolute z-30 bg-purple-tertiary h-screen w-80 top-0 left-0 ease-linear duration-200 
        ${!showMenu && "-translate-x-full"}`}
            >
                <div className="flex items-center justify-between mx-5 mt-12 mb-16 py-2">
                    <Link to="/" className="z-10">
                        <img
                            className="cursor-pointer w-16 z-10"
                            src={LogoWhite}
                            alt=""
                        />
                    </Link>
                    <img
                        src={Cross}
                        onClick={() => setShowMenu(false)}
                        className="w-8 cursor-pointer"
                        alt="cross"
                    />
                </div>
                <div className="block lg:hidden">
                    <NavLinks />
                </div>
                {loggedIn ? (
                    <div className="block lg:hidden">
                        <button className="ml-4 mt-4 flex justify-between items-center cursor-pointer rounded-2xl px-3 py-2 md:px-6 md:py-2 bg-hot-pink font-semibold">
                            <img
                                src={loggedInUser?.image}
                                alt="arrow"
                                className="rounded-full h-8 w-8"
                            />
                            <span className="ml-3">{loggedInUser?.name}</span>
                        </button>
                    </div>
                ) : (
                    <Link
                        to="/signin"
                        className="block lg:hidden mx-4 lg:mt-20 mt-8"
                    >
                        <button className="flex justify-between items-center cursor-pointer rounded-2xl px-3 py-2 md:px-6 md:py-2 bg-hot-pink font-semibold">
                            <span className="mr-3">Sign In</span>
                            <img src={Arrow} alt="arrow" />
                        </button>
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
