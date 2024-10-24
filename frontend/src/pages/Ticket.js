import React from "react";
import { useSelector } from "react-redux";

//Components
import Template from "../components/Template";
import TitleDash from "../components/TitleDash";
import Ticket from "../components/Ticket";
import { Link } from "react-router-dom";
import { Coin } from "../components/AssetsExport";

const Tickets = () => {
	const tickets = useSelector((state) => state.user.user.tickets);
	return (
		<Template>
			<div>
				<div className="flex justify-between align-center lg:flex-row flex-col">
					<TitleDash title="Tickets" />
					<Link to="/payment">
						<button className="flex justify-between items-center hover:shadow-lg cursor-pointer rounded-2xl px-3 py-2 md:px-6 md:py-2 bg-hot-pink font-semibold">
							<img src={Coin} alt="coin" className="h-8 w-8 mr-3" />
							<span className="text-white font-semibold text-lg texy-center align-middle">
								Buy Attempts
							</span>
						</button>
					</Link>
				</div>
				{tickets?.length === 0 ? (
					<div>
						<h1 className="text-xl text-white mt-9">
							No Tickets Purchased yet.
						</h1>
					</div>
				) : (
					<div className="grid 2xl:grid-cols-3 xl:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4 mt-9">
						{tickets?.map((item, i) => {
							return <Ticket key={i} id={item.id} use={item.use} />;
						})}
					</div>
				)}
			</div>
		</Template>
	);
};

export default Tickets;
