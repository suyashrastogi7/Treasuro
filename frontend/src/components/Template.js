import { LeavesPink, Weed1 } from "./AssetsExport";
import Navbar from "./Navbar";

const Template = ({ children, className, ...props }) => {
  return (
    <div
      {...props}
      className={`${className} bg-purple-secondary pb-8 h-screen`}
    >
      <Navbar />
      <div className="relative mt-24 mx-6 md:mx-16 px-4 py-2 bg-purple-tertiary rounded-md">
        <img
          src={Weed1}
          className="absolute -rotate-90 -top-[400%] md:-top-[650%] w-12 md:w-20"
          alt=""
        />
        <img
          src={LeavesPink}
          className="absolute scale-x-[-1] w-8 md:w-12 -top-[370%] right-12 md:top-[40px] md:left-[100%]"
          alt=""
        />
        {children}
      </div>
    </div>
  );
};

export default Template;
