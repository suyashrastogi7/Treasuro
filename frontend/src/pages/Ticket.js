import React from "react";
import Template from "../components/Template";
import TitleDash from "../components/TitleDash";
import Ticket from "../components/Ticket";

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
                <TitleDash title="Tickets" />
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
