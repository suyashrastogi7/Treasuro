import { v4 } from "uuid";
import RankRow from "../components/RankRow";
import Template from "../components/Template";
import TitleDash from "../components/TitleDash";

const data = {
  top50: [
    { pos: 1, name: "MMIL", pts: 154 },
    { pos: 2, name: "Hello2", pts: 123 },
    { pos: 3, name: "Hello3", pts: 102 },
    { pos: 4, name: "Hello4", pts: 98 },
    { pos: 5, name: "Hello5", pts: 97 },
  ],
  mine: { pos: 1, name: "MMIL", pts: 154 },
};

const Leaderboard = () => {
  const List = data.top50?.map((el, idx) => (
    <RankRow {...el} idx={idx} key={v4()} />
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
      <div className="mt-12 mb-6 flex text-white font-black text-lg md:text-xl">
        <p className="w-3/12 md:w-1/12 text-center">Pos</p>
        <p className="w-6/12 md:w-10/12 pl-4">Name</p>
        <p className="w-3/12 md:w-1/12 text-center">Points</p>
      </div>
      <div>{You}</div>
      <div>{List}</div>
    </Template>
  );
};

export default Leaderboard;
