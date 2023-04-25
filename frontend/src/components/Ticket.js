import React from "react";

import {
	LogoMain,
	MmilLogo,
	StarfishYellow,
	LeavesGreen,
} from "./AssetsExport";

const Ticket = ({ id, use }) => {
	return (
		<div className="cursor-pointer hover:-translate-y-1 transition ease-in-out">
			<div
				className={`bg-[#121638] ${
					use === 0 && "bg-[#676A84] cursor-default"
				} rounded-2xl p-8 relative z-20 shadow-sm`}
			>
				<p className="font-semibold text-md text-white">One use only</p>
				{use === 0 && (
					<img
						src={StarfishYellow}
						alt="starfish"
						className="absolute top-24 left-4"
					/>
				)}
				{use === 0 && (
					<img
						src={LeavesGreen}
						alt="leaves"
						className="absolute right-1 scale-110"
					/>
				)}
				<h1 className="text-center font-bold lg:text-5xl text-4xl text-white my-8">
					{id}
				</h1>
				<div className="flex justify-between">
					<img src={LogoMain} className="lg:h-12 h-8" alt="treasuro-logo" />
					<img src={MmilLogo} className="lg:h-12 h-8" alt="mmil-logo" />
				</div>
			</div>
			<div className="bg-[#171C46] rounded-2xl px-8 py-5 -translate-y-5 z-10 hover:shadow-2xl transition ease-in-out">
				<p className="text-md text-white mt-4 font-semibold uppercase">
					{`${use === 0 ? "expired" : `uses left : ${use}`}`}
				</p>
			</div>
		</div>
	);
};

export default Ticket;
