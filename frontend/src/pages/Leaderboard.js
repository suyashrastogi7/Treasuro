import React, { useState, useEffect } from "react";
import { v4 } from "uuid";
import axios from "axios";
import RankRow from "../components/RankRow";
import Template from "../components/Template";
import TitleDash from "../components/TitleDash";

const Leaderboard = () => {
    const [data, setData] = useState();

    async function getLeaderboard() {
        try {
            let config = {
                headers: {
                    Authorization:
                        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjJiMDg3NDU5MjUxZjkyNDRjN2U5ZmY5In0sImlhdCI6MTY1NjAxNTA3NiwiZXhwIjoxNjU2MTAxNDc2fQ.NxKb5Zqz9HLiwEkzRchVVB7tPz6wXm4MwbitFx_3iqw",
                },
            };
            const { data } = await axios.get(
                "http://localhost:5000/api/leaderboard/",
                config
            );
            console.log(data);
            setData(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getLeaderboard();
    }, []);

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
            <div>
                <TitleDash title="leaderboard" />
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
