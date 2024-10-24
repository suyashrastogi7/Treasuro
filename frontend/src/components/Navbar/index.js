import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Arrow, Cross, Hamburger, LogoWhite } from "../AssetsExport";
import { useDispatch, useSelector } from "react-redux";
import { alertActions } from "../../features/alertSlice";
import NavLinks from "./NavLinks";
import { authActions } from "../../features/loginSlice";
import { userActions } from "../../features/userSlice";

const Navbar = () => {
	const [showMenu, setShowMenu] = useState(false);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loggedIn = !!useSelector((state) => state.signin.token);
	const loggedInUser = useSelector((state) => state.user.user);

	const [isOpen, setIsOpen] = useState(false);

	// Handle mouse hover
	const handleMouseEnter = () => {
		setIsOpen(true);
	};

	const handleMouseLeave = () => {
		setIsOpen(false);
	};

	// Handle click (for the button or elsewhere to close)
	const toggleDropdown = () => {
		setIsOpen(!isOpen);
	};

	useEffect(() => {
		document.body.style.overflowY = showMenu ? "hidden" : "auto";
	}, [showMenu]);

	const logout = () => {
		localStorage.clear();
		dispatch(authActions.removeToken());
		dispatch(userActions.removeUser());
		dispatch(
			alertActions.createAlert({
				message: "Logged Out Successfully 🤗",
				status: "success",
			})
		);
		navigate("/", { replace: true });
	};

	return (
		<nav className="flex justify-between items-center mx-auto pt-12 mb-6 w-[90vw] text-white font-semibold z-50">
			<Link to="/" className="z-10">
				<img className="cursor-pointer w-24 z-10" src={LogoWhite} alt="" />
			</Link>
			<div className="hidden lg:block">
				<NavLinks />
			</div>
			<div className="hidden lg:block z-50 transition-all duration-1000 delay-1000">
				{loggedIn ? (
					<div
						onMouseEnter={handleMouseEnter}
						onMouseLeave={handleMouseLeave}
						onClick={toggleDropdown}
						className="justify-center items-center"
					>
						<button className="flex justify-between w-44  items-center cursor-pointer rounded-full md:rounded-none md:rounded-t-2xl px-3 py-2 md:pl-3 md:pr-12 md:py-2 bg-hot-pink font-semibold focus:outline-none">
							<img
								src={loggedInUser?.image}
								className="rounded-full h-8 w-8"
								alt="arrow"
							/>
							<span className="ml-3">{loggedInUser?.name?.split(" ")[0]}</span>
						</button>
						<div
							className={`${
								isOpen ? "max-h-40" : "max-h-0 invisible"
							} bg-hot-pink self-center absolute w-44 z-50 mt-1 rounded-md md:rounded-none md:rounded-b-2xl shadow-lg bg-white ring-1 ring-black ring-opacity-5 transition-all duration-300 ease-in-out overflow-hidden`}
						>
							<button
								onClick={() => navigate("/profile")}
								className="flex w-full justify-center rounded items-center text-white bg-hot-pink py-2 hover:bg-[#D90166] transition-all duration-100 ease-in-out hover:bg-hotpink-300"
							>
								Profile
							</button>

							<button
								onClick={logout}
								className="flex w-full justify-center items-center text-white bg-hot-pink rounded hover:bg-[#D90166] py-2 transition-all duration-100 ease-in-out hover:bg-hotpink-300"
							>
								Logout
							</button>
						</div>
					</div>
				) : (
					<div className="z-50">
						<Link to="/signin">
							<div className="flex z-50 justify-between items-center cursor-pointer rounded-2xl px-3 py-2 md:px-6 md:py-2 bg-hot-pink font-semibold">
								<span className="mr-3">Sign In</span>
								<img src={Arrow} alt="arrow" />
							</div>
						</Link>
					</div>
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
				className={`absolute z-50 bg-purple-tertiary h-screen w-80 top-0 left-0 ease-linear duration-200 
        ${!showMenu && "-translate-x-full"}`}
			>
				<div className="flex items-center justify-between mx-5 mt-12 mb-16 py-2">
					<Link to="/" className="z-10">
						<img className="cursor-pointer w-16 z-10" src={LogoWhite} alt="" />
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
					<div className="block lg:hidden z-50">
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
					<div className="z-[10]">
						<Link to="/signin" className="block lg:hidden mx-4 lg:mt-20 mt-8">
							<button className="flex justify-between items-center cursor-pointer rounded-2xl px-3 py-2 md:px-6 md:py-2 bg-hot-pink font-semibold">
								<span className="mr-3">Sign In</span>
								<img src={Arrow} alt="arrow" />
							</button>
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
