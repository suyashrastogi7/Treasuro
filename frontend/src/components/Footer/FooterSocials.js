import { Discord, Github, Linkedin, Mail } from "../AssetsExport";
const FooterSocials = () => {
  return (
    <div className="flex justify-between mx-auto mt-16 md:mt-24 w-[320px] md:w-56 ">
      <a href="https://github.com/MMIL" target="_blank" rel="noreferrer">
        <img
          className="w-8 ease-linear duration-200 hover:scale-110"
          src={Github}
          alt=""
        />
      </a>
      <a
        href="https://www.linkedin.com/company/mmil"
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="w-8 ease-linear duration-200 hover:scale-110"
          src={Linkedin}
          alt=""
        />
      </a>
      <a href="mailto:mmiljss@gmail.com" target="_blank" rel="noreferrer">
        <img
          className="w-8 ease-linear duration-200 hover:scale-110"
          src={Mail}
          alt=""
        />
      </a>
      <a href="https://discord.gg/6xDkYAEDx3" target="_blank" rel="noreferrer">
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
