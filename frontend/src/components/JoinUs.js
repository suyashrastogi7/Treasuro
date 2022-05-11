import React from "react";
import { Link } from "react-router-dom";
import {
  Arrow,
  Submarine,
  Weed1Black,
  Weed1Lime,
  Weed1Yellow,
} from "./AssetsExport";

const JoinUs = () => {
  return (
    <div className="flex justify-between flex-col lg:flex-row">
      {/* left */}
      <div className="relative w-full h-[360px]  lg:w-6/12 bg-lime px-20 py-16">
        <div className="relative z-20">
          <p className="text-base-primary text-4xl my-8 font-bold w-48">
            Still have a doubt ?
          </p>
          <Link
            to="/hello"
            className="w-max text-white text-md flex justify-between px-4 py-2 bg-base-primary rounded-3xl items-center space-x-4"
          >
            <span>Contact Us</span>
            <img src={Arrow} alt="" />
          </Link>
        </div>
        <img
          src={Weed1Black}
          className="absolute top-12 -left-8 rotate-90 w-32"
          alt=""
        />
        <img
          src={Weed1Black}
          className="absolute bottom-0 right-[30%]  w-32"
          alt=""
        />
        <img
          src={Submarine}
          className="absolute right-[10%] bottom-[20%] w-44"
          alt=""
        />
      </div>

      {/* right */}
      <div className="relative w-full lg:w-6/12 bg-highlight-orange px-20 py-16">
        <p
          className={`relative tracking-widest text-sm text-base-primary font-bold uppercase w-max my-8
          before:absolute before:w-[28px] before:h-[5px] before:-bottom-[8px] before:bg-base-primary before:rounded
         `}
        >
          still looking?
        </p>
        <p className="text-base-primary text-4xl my-8 font-bold">Join Us!</p>
        <Link
          to="/"
          className="w-max text-white text-md flex justify-between px-4 py-2 bg-base-primary rounded-3xl items-center space-x-4"
        >
          <span>SignUp</span>
          <img src={Arrow} alt="" />
        </Link>
        <img
          src={Weed1Lime}
          className="absolute bottom-0 right-[40%] w-32"
          alt=""
        />
        <img
          src={Weed1Yellow}
          className="absolute bottom-0 right-0 w-44"
          alt=""
        />
      </div>
    </div>
  );
};

export default JoinUs;
