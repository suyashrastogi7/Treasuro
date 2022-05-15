import { v4 } from "uuid";
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
  const clsArr = ["bg-hot-pink", "bg-light-pink", "bg-yellow"];

  const List = data.top50?.map(({ pos, name, pts }, idx) => (
    <div
      className={`mt-2 flex text-white font-bold text-base md:text-lg rounded-[20px]
      ${clsArr[idx] ?? "bg-purple-primary"}`}
      key={v4()}
    >
      <p className="w-3/12 md:w-1/12 py-2 text-center">{pos}</p>
      <p className="w-6/12 md:w-10/12 py-2 pl-4">{name}</p>
      <p className="w-3/12 md:w-1/12 py-2 text-center">{pts}</p>
    </div>
  ));

  const You = data?.mine && (
    <div
      className={`mt-8 mb-6 flex text-white font-bold text-base md:text-lg rounded-[20px] border-2 border-white`}
      key={v4()}
    >
      <p className="w-3/12 md:w-1/12 py-2 text-center">{data.mine.pos}</p>
      <p className="w-6/12 md:w-10/12 py-2 pl-4">{data.mine.name}</p>
      <p className="w-3/12 md:w-1/12 py-2 text-center">{data.mine.pts}</p>
    </div>
  );

  return (
    <Template>
      <div className="">
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
