import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NavLinks = () => {
	const { loggedIn } = useSelector((state) => state.signin);
	return (
		<div className="relative z-10 flex flex-col gap-2 mx-2 lg:flex-row lg:gap-20 lg:mx-8">
			<Link
				to="/leaderboard"
				className="flex flex-col mx-4 lg:justify-center lg:items-center justify-start items-start"
			>
				<span className="lg:py-5 py-1 cursor-pointer text-lg">Leaderboard</span>
			</Link>
			<Link
				to="/rules"
				className="flex flex-col mx-4 lg:justify-center lg:items-center justify-start items-start"
			>
				<span className="lg:py-5 py-1 cursor-pointer text-lg">Rules</span>
			</Link>
			{loggedIn && (
				<Link
					to="/questions"
					className="flex flex-col mx-4 lg:justify-center lg:items-center justify-start items-start"
				>
					<span className="lg:py-5 py-1 cursor-pointer text-lg">Questions</span>
				</Link>
			)}
			{/* <Link to="/tickets">
                <button className="lg:py-5 py-1 mx-4 cursor-pointer font-semibold text-lg lg:text-center text-left">
                    Tickets
                </button>
            </Link> */}
		</div>
	);
};

export default NavLinks;
