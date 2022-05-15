import { Link } from "react-router-dom";

const NavLinks = () => {
  return (
    <div className="relative z-10 flex flex-col lg:flex-row gap-10 lg:gap-20 mx-6 lg:mx-8">
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
    </div>
  );
};

export default NavLinks;
