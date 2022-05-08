import { Link } from "react-router-dom";
import { Arrow } from "./AssestsExport";

const NavLinks = () => {
  return (
    <>
      <Link to="/">
        <span className="cursor-pointer py-5">Leaderboard</span>
      </Link>
      <Link to="/">
        <span className="cursor-pointer py-5">Rules</span>
      </Link>
      <Link to="/">
        <span className="cursor-pointer py-5">Payments</span>
      </Link>
      <Link to="/">
        <span className="cursor-pointer py-5">Tickets</span>
      </Link>
      <Link to="/">
        <button className="flex justify-between items-center cursor-pointer rounded-2xl px-3 py-2 md:px-6 md:py-2 bg-hot-pink">
          <span className="mr-1">SignIn</span>
          <img src={Arrow} alt="arrow" />
        </button>
      </Link>
    </>
  );
};

export default NavLinks;
