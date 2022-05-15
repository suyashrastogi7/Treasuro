import { LeavesPink, Weed1 } from "./AssetsExport";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Template = ({ children, className = "", ...props }) => {
  return (
    <div {...props} className={`${className} bg-purple-secondary min-h-screen`}>
      <Navbar />
      <div className="relative mt-24 mx-6 md:mx-16 px-4 py-2 bg-purple-tertiary rounded-md">
        <img
          src={Weed1}
          className="absolute -rotate-90 -top-[64px] md:-top-[106px] w-12 md:w-20"
          alt=""
        />
        <img
          src={LeavesPink}
          className="absolute md:scale-x-[-1] w-8 md:w-12 top-[40px] right-1 md:top-[40px] md:left-[100%]"
          alt=""
        />
        <div className="py-2 sm:py-6 md:py-10 px-1 sm:px-4 md:px-8">
          {children}
        </div>
      </div>
      <div className="mt-16">
        <Footer />
      </div>
    </div>
  );
};

export default Template;
