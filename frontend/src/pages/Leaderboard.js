import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import axios from "axios";
import { Refresh } from "../components/AssetsExport";
import RankRow from "../components/RankRow";
import Template from "../components/Template";
import TitleDash from "../components/TitleDash";
import Loader from "../components/Loader";

const Leaderboard = () => {
	const [data, setData] = useState();
	const [loading, setLoading] = useState(false);
	const [refresh, setRefresh] = useState(false);
	const { access } = useSelector((state) => state.signin.token);

	useEffect(() => {
		async function getLeaderboard() {
			try {
				let config = {
					headers: {
						Authorization: `Bearer ${access}`,
					},
				};
				const { data } = await axios.get(
					`http://localhost:5000/api/leaderboard`,
					config
				);
				console.log("Leaderboard ==> ", data);
				setData(data);
				setLoading(false);
			} catch (err) {
				console.log(err);
			}
		}
		getLeaderboard();
	}, [refresh, access]);

	const List = data?.leaderboard?.map((el, idx) => (
		<RankRow pos={idx + 1} idx={idx} pts={el.pts} name={el.name} key={v4()} />
	));

	const You = data?.mine && (
		<RankRow
			pos={data.mine.pos}
			name={data.mine.name}
			pts={data.mine.pts}
			idx={-1}
			spec="border-2 border-white mb-6 mt-8"
		/>
	);

	return (
		<Template>
			<Loader loading={loading} />
			<div className="flex justify-between align-start">
				<TitleDash title="leaderboard" />
				<button
					onClick={() => {
						setRefresh((prev) => !prev);
						setLoading(true);
					}}
				>
					<img
						src={Refresh}
						alt="refresh"
						className="lg:h-12 lg:w-12 w-8 h-8"
					/>
				</button>
			</div>
			<div className="flex mt-12 mb-6 text-lg font-black text-white md:text-xl">
				<p className="w-3/12 text-center md:w-1/12">Pos</p>
				<p className="w-6/12 pl-4 md:w-10/12">Name</p>
				<p className="w-3/12 text-center md:w-1/12">Points</p>
			</div>
			<div>{You}</div>
			<div>{List}</div>
		</Template>
	);
};

export default Leaderboard;
