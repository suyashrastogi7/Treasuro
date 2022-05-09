import {
  Blob1,
  Blob2,
  Blob3,
  LeavesPink,
  Starfish,
  StarfishYellow,
  Weed1,
  Weed2,
} from "./AssestsExport";

const HeroOverlay = () => {
  return (
    <>
      {/* blobs */}
      <img
        className="absolute top-0 left-0 w-80 h-auto"
        src={Blob3}
        alt="top left blob"
      />
      <img
        className="absolute -right-20 top-32 md:top-16 h-[280px]"
        src={Blob2}
        alt="top right blob"
      />
      <img
        className="absolute -bottom-0 md:-bottom-[100px] w-full"
        src={Blob1}
        alt="bottom blob"
      />
      {/* overlay elements */}
      <img
        className="absolute z-[9] top-32  min-w-[60px] max-w-[10vw]"
        src={Weed1}
        alt=""
      />
      <img
        className="absolute z-[9] hidden md:block w-20 left-[30vw] bottom-[30vh]"
        src={StarfishYellow}
        alt=""
      />
      <img
        className="absolute z-[9] hidden md:block top-[40vh] right-[10vw]"
        src={Starfish}
        alt=""
      />
      <img
        className="absolute z-[9] bottom-0 left-[20vw] min-w-[60px] max-w-[10vw] "
        src={Weed2}
        alt=""
      />
      <img
        className="absolute z-[9] -bottom-[30px] md:-bottom-[6%] left-[65vw] min-w-[60px] max-w-[10vw] -rotate-90"
        src={Weed1}
        alt=""
      />
      <img
        className="absolute z-[9] w-16 bottom-[15vh] right-0"
        src={LeavesPink}
        alt=""
      />
    </>
  );
};

export default HeroOverlay;
