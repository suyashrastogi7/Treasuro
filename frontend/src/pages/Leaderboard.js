import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import axios from "../utils/config";
import { Refresh } from "../components/AssetsExport";
import RankRow from "../components/RankRow";
import Template from "../components/Template";
import TitleDash from "../components/TitleDash";

const Leaderboard = () => {
    const [data, setData] = useState();
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
                    "http://localhost:5000/api/leaderboard/",
                    config
                );
                setData(data);
            } catch (err) {
                console.log(err);
            }
        }
        getLeaderboard();
    }, [refresh, access]);

    const List = data?.leaderboard?.map((el, idx) => (
        <RankRow
            pos={idx + 1}
            idx={idx}
            pts={el.pts}
            name={el.name}
            key={v4()}
        />
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
            <div className="flex justify-between align-start">
                <TitleDash title="leaderboard" />
                <button onClick={() => setRefresh((prev) => !prev)}>
                    <img src={Refresh} alt="refresh" className="h-12 w-12" />
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
