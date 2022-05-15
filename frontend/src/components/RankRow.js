const RankRow = ({ pos, name, pts, idx = 4, spec = "" }) => {
  const clsArr = ["bg-hot-pink", "bg-light-pink", "bg-yellow"];

  return (
    <div
      className={`mt-2 flex text-white font-bold text-base md:text-lg rounded-[20px]
      ${idx >= 0 && (clsArr[idx] ?? "bg-purple-primary")} ${spec}`}
    >
      <p className="w-3/12 md:w-1/12 py-2 text-center">{pos}</p>
      <p className="w-6/12 md:w-10/12 py-2 pl-4">{name}</p>
      <p className="w-3/12 md:w-1/12 py-2 text-center">{pts}</p>
    </div>
  );
};

export default RankRow;
