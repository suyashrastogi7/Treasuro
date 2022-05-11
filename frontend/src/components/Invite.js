import TitleDash from "./TitleDash";

const data = [
  {
    title: "Participate",
    content: "Particpate and have fun in the em em ay al",
  },
  {
    title: "Explore",
    content: "Explore and make new friends. It gonna be a hell of a ride.",
  },
  {
    title: "Win",
    content:
      "You can win a ton of a prizes and get a chance to win exclusive swags",
  },
];

const Invite = () => {
  const list = data.map((el) => {
    return (
      <div
        className="relative rounded bg-purple-secondary py-10 px-4 text-left w-3/12 min-w-[300px] min-h-[210px] overflow-hidden mt-10 mx-2
          after:absolute after:left-0 after:-bottom-[20px] after:h-[40px] after:w-full after:bg-lime after:-rotate-3
        "
        key={Math.random()}
      >
        <TitleDash title={el.title} isTop={true} isYellow={true} />
        <p className="w-10/12 mt-5 text-white">{el.content}</p>
      </div>
    );
  });

  return (
    <div className="relative bg-purple-primary pb-20 before:absolute before:w-full before:z-[1] before:h-24 before:bg-base-primary">
      <div className="relative z-[2] md:w-11/12 lg:w-10/12 mx-auto bg-purple-tertiary rounded-lg px-12 py-16 text-center">
        <TitleDash title="why?" />
        <p className="text-4xl sm:text-5xl font text-lime font-bold mt-8 mb-2">
          Participate and Win!
        </p>
        <div className="flex flex-wrap justify-around">{list}</div>
      </div>
    </div>
  );
};

export default Invite;
