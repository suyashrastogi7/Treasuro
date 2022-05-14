import React from "react";
import { LogoMain, MmilLogo } from "./AssetsExport";
import TitleDash from "./TitleDash";

const Tickets = () => {
  return (
    <div className="bg-purple-primary px-4 md:px-16 py-32">
      <TitleDash title="why to buy tickets?" />
      <p className="text-3xl md:text-[64px] font text-lime font-bold mt-12 mb-12">
        Tickets?
      </p>
      {/* ticket */}
      <div className="flex flex-col lg:flex-row items-center lg:items-stretch lg:justify-center mt-12 md:mt-24 w-full mx-auto">
        <div className="bg-base-primary rounded px-8 py-12 w-full sm:w-10/12 md:w-[500px] ">
          <div className="text-md  font-semibold text-white uppercase tracking-wide">
            <p>three-uses-only</p>
          </div>
          <div className="text-center text-4xl md:text-6xl font-bold text-white uppercase py-8">
            <p>afky-4649</p>
          </div>
          <div className="flex justify-between">
            <img src={LogoMain} className="w-24" alt="" />
            <img src={MmilLogo} className="w-24" alt="" />
          </div>
          {/* lines and text */}
        </div>
        <div className=" hidden lg:flex flex-col justify-between ml-10 w-6/12">
          <div className="flex">
            <div className="w-32 h-3 bg-white -rotate-12"></div>
            <p className=" text-white text-3xl font-bold ml-20 -mt-12">
              provide 2 days full of adventure
            </p>
          </div>
          <div className="flex items-center">
            <div className="w-[180px] h-3 bg-white"></div>
            <p className=" text-white text-3xl font-bold ml-20">
              chance to unlock your core memory
            </p>
          </div>
          <div className="flex items-center">
            <div className="w-32 h-3 bg-white rotate-12"></div>
            <p className=" text-white text-3xl font-bold ml-20 -mb-12">
              best ₹40 you will ever spend
            </p>
          </div>
        </div>
        <div className="flex flex-col lg:hidden text-white text-xl font-bold space-y-2 mt-8 min-w-[300px] w-11/12 sm:w-[400px]">
          <p className="bg-purple-tertiary px-4 py-2 rounded">
            Provide 2 days full of adventure
          </p>
          <p className="bg-purple-tertiary px-4 py-2 rounded">
            Chance to unlock your core memory
          </p>
          <p className="bg-purple-tertiary px-4 py-2 rounded">
            Best ₹40 you will ever spend
          </p>
        </div>
      </div>
    </div>
  );
};

export default Tickets;
