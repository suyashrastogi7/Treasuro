import React from "react";
import Template from "../components/Template";
import TitleDash from "../components/TitleDash";
import Ticket from "../components/Ticket";
import { Link } from "react-router-dom";
import { Coin } from "../components/AssetsExport";

const data = [
    { id: "KFER-3321", use: 3 },
    { id: "AEFT-3571", use: 2 },
    { id: "HTRG-2341", use: 1 },
    { id: "WDWE-8724", use: 0 },
];

const Tickets = () => {
    return (
        <Template>
            <div>
                <div className="flex justify-between align-center lg:flex-row flex-col">
                    <TitleDash title="Tickets" />
                    <Link to="/payment">
                        <button className="px-5 py-1 lg:mt-0 mt-12 lg:mx-0 mx-auto rounded-xl bg-[#1FB141] hover:bg-green-600 transition ease-in-out flex justify-between items-center hover:shadow-lg">
                            <img
                                src={Coin}
                                alt="coin"
                                className="h-8 w-8 mr-3"
                            />
                            <span className="text-white font-semibold text-lg texy-center align-middle">
                                Buy Attempts
                            </span>
                        </button>
                    </Link>
                </div>
                <div className="grid 2xl:grid-cols-3 xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mt-9">
                    {data.map((item, i) => {
                        return <Ticket key={i} id={item.id} use={item.use} />;
                    })}
                </div>
            </div>
        </Template>
    );
};

export default Tickets;
