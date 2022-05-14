import { Discord, Github, Linkedin, Mail } from "./AssetsExport";
const FooterSocials = () => {
  return (
    <div className="flex justify-between mt-16 md:mt-24 w-full md:w-56 ">
      <a href="https://github.com/MMIL">
        <img
          className="w-8 ease-linear duration-200 hover:scale-110"
          src={Github}
          alt=""
        />
      </a>
      <a href="https://www.linkedin.com/company/mmil">
        <img
          className="w-8 ease-linear duration-200 hover:scale-110"
          src={Linkedin}
          alt=""
        />
      </a>
      <a href="mailto:mmiljss@gmail.com">
        <img
          className="w-8 ease-linear duration-200 hover:scale-110"
          src={Mail}
          alt=""
        />
      </a>
      <a href="https://discord.gg/6xDkYAEDx3">
        <img
          className="w-8 ease-linear duration-200 hover:scale-110"
          src={Discord}
          alt=""
        />
      </a>
    </div>
  );
};

export default FooterSocials;
