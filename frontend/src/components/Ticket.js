import React from "react";

import { LogoMain, MmilLogo } from "./AssetsExport";

const Ticket = ({ id, use }) => {
    return (
        <div className="cursor-pointer hover:-translate-y-1 transition ease-in-out">
            <div className="bg-[#121638] rounded-2xl p-8 relative z-20">
                <p className="font-semibold text-md text-white">One use only</p>
                <h1 className="text-center font-bold text-5xl text-white my-8">
                    {id}
                </h1>
                <div className="flex justify-between">
                    <img src={LogoMain} className="h-12" alt="treasuro-logo" />
                    <img src={MmilLogo} className="h-12" alt="mmil-logo" />
                </div>
            </div>
            <div className="bg-[#171C46] rounded-2xl px-8 py-5 -translate-y-5 z-10 hover:shadow-2xl transition ease-in-out">
                <p className="text-md text-white mt-4 font-semibold">
                    USES LEFT : {use}
                </p>
            </div>
        </div>
    );
};

export default Ticket;
