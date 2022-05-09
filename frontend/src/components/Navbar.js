import { useState } from "react";
import { Link } from "react-router-dom";
import { Cross, Hamburger, LogoWhite } from "./AssestsExport";

import NavLinks from "./NavLinks";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <nav className="z-10 flex justify-between items-center mx-auto my-6 w-[90vw] text-white font-semibold">
      <Link to="/" className="z-10">
        <img className="cursor-pointer w-24 z-10" src={LogoWhite} alt="" />
      </Link>
      <div className="hidden z-10 md:flex justify-between items-center w-full ml-[100px]">
        <NavLinks />
      </div>
      <div className="md:hidden z-10">
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
        <div className="flex justify-end mx-5 my-6">
          <img
            src={Cross}
            onClick={() => setShowMenu(false)}
            className="w-10 cursor-pointer"
            alt="cross"
          />
        </div>
        <div className="flex flex-col m-7 space-y-10">
          <NavLinks />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
