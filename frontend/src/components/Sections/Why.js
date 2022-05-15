import TitleDash from "../TitleDash";
import { v4 } from "uuid";

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

const Why = () => {
  const list = data.map((el) => {
    return (
      <div
        className="relative rounded bg-purple-secondary py-10 md:py-20 px-8 md:px-12 text-left w-3/12 min-w-[320px] md:min-w-[370px] min-h-[280px] sm:min-h-[340px] overflow-hidden mt-10
          after:absolute after:left-0 after:-bottom-[20px] after:h-[40px] after:w-full after:bg-lime after:-rotate-3 mx-2 lg:mx-0
        "
        key={v4()}
      >
        <TitleDash
          title={el.title}
          isTop={true}
          isYellow={true}
          className="capitalize text-4xl tracking-normal"
        />
        <p className="md:w-10/12 mt-5 text-white text-2xl font-semibold tracking-wide">
          {el.content}
        </p>
      </div>
    );
  });

  return (
    <div className="relative bg-purple-primary pb-20 before:absolute before:w-full before:z-[1] before:h-24 before:bg-base-primary">
      <div className="relative z-[2] md:w-[90vw] mx-auto bg-purple-tertiary rounded-lg px-12 pt-16 -pb-32">
        <TitleDash title="why?" />
        <p className="text-3xl md:leading-[62px] md:text-[64px] font text-lime font-bold mt-8">
          Join us on an exciting adventure
        </p>
        <div className="flex flex-wrap justify-center lg:justify-between translate-y-10">
          {list}
        </div>
      </div>
    </div>
  );
};

export default Why;
