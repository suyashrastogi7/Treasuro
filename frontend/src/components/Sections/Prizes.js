import { FirstPrize, SecondPrize, ThirdPrize } from "../AssetsExport";
import TitleDash from "../TitleDash";

const Prizes = () => {
  return (
    <div className="relative -z-10 px-4 md:px-16 py-32 bg-purple-secondary">
      <div className="absolute top-0 left-0 w-full h-full z-0 bg-bgLines"></div>
      <div className="relative z-10">
        <TitleDash title="prizes" />
        <p className="text-3xl md:text-[64px] text-yellow font-bold mt-12 mb-12">
          Participate and Win!
        </p>
        <div className="w-11/12 md:w-10/12 mx-auto">
          <div className="bg-base-primary px-4 pt-4 pb-8 rounded-lg">
            <div className="relative flex justify-center bg-base-secondary p-8 rounded-lg mb-16 max-h-64">
              <span className="absolute top-5 left-6 text-yellow font-semibold text-3xl">
                #1
              </span>
              <img
                src={FirstPrize}
                className="w-72 md:min-w-[400px] h-86 object-contain translate-y-16 -mt-12"
                alt=""
              />
            </div>
            <TitleDash title="Bose Speaker" />
          </div>
          {/* 2nd row */}
          <div className="mt-8 flex flex-col md:flex-row items-start md:items-stretch md:justify-between flex-wrap">
            <div className="bg-base-primary px-4 pt-2 pb-8 rounded-lg w-full md:w-[48.5%]">
              <div className="relative flex justify-center bg-base-secondary p-8 rounded-lg mb-16">
                <span className="absolute top-5 left-6 text-yellow font-semibold text-3xl">
                  #2
                </span>
                <img
                  src={SecondPrize}
                  className="w-[300px] md:min-w-[250px] lg:min-w-[350px] h-52 object-contain -mb-16"
                  alt=""
                />
              </div>
              <TitleDash title="Razor Keyboard" />
            </div>
            <div className="bg-base-primary px-4 pt-4 pb-8 rounded-lg mt-8 md:mt-0 w-full md:w-[48.5%]">
              <div className="relative flex justify-center bg-base-secondary p-8 rounded-lg mb-16">
                <span className="absolute top-5 left-6 text-yellow font-semibold text-3xl">
                  #3
                </span>
                <img
                  src={ThirdPrize}
                  className="w-[300px] md:min-w-[200px] lg:min-w-[350px] h-52 object-contain -mb-16"
                  alt=""
                />
              </div>
              <TitleDash title="Steel series mouse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Prizes;
