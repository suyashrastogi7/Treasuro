import {
  Blob1,
  Blob2,
  Blob3,
  LeavesPink,
  LogoMain,
  ScrollIcon,
  Starfish,
  Weed1,
  Weed2,
} from "./AssestsExport";
import Navbar from "./Navbar";

const Hero = () => {
  return (
    <div className="relative min-h-[95vh] md:h-screen overflow-hidden bg-purple-primary">
      <Navbar />
      {/* center part */}
      <div className="relative z-10 grid place-items-center mt-[10vh] md:mt-[16vh]">
        <img
          src={LogoMain}
          className=" w-[200px] md:w-[360px] h-auto"
          alt="Treasuro 2022"
        />
        <p className="max-w-[160px] text-[20px] mt-[30px] tracking-wider text-center text-white font-bold">
          Are you ready for a Hunt?
        </p>
        <p className="text-xl md:text-2xl md:text-[35px] mt-[15px] font-black tracking-wider text-yellow ">
          And win prizes
        </p>
      </div>
      <div className="text-center cursor-pointer">
        <img
          src={ScrollIcon}
          className="mx-auto mt-20 w-8  relative z-10"
          alt="scroll icon"
        />
      </div>
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
        src={Starfish}
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
    </div>
  );
};

export default Hero;
