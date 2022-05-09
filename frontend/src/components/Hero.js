import { LogoMain, ScrollIcon } from "./AssestsExport";
import HeroOverlay from "./HeroOverlay";

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
      <HeroOverlay />
    </div>
  );
};

export default Hero;
