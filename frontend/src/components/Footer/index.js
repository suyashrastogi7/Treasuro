import { Link } from "react-router-dom";
import { LogoGreen } from "../AssetsExport";
import FooterSocials from "./FooterSocials";

const Footer = () => {
	return (
		<footer className="bg-base-secondary px-8 md:px-14 lg:px-24 pb-12 md:pb-20 pt-20 flex justify-between flex-col md:flex-row">
			<div>
				<img src={LogoGreen} alt="treasuro logo green" />
				<div className="hidden md:block">
					<FooterSocials />
				</div>
			</div>
			<div className="flex justify-between flex-wrap w-full md:w-8/12">
				<div className="flex text-white sm:min-w-max my-2 flex-col gap-3 mt-20 md:mt-0">
					{/* <p className="w-[38px] h-[6px] bg-lime rounded-xl"></p>
					<Link to="">Support</Link>
					<Link to="">FAQs</Link>
					<Link to="">Icon Style</Link>
					<Link to="">About</Link> */}
				</div>
				<div className="flex text-white sm:min-w-max my-2 flex-col gap-3 mt-20 md:mt-0">
					{/* <p className="w-[38px] h-[6px] bg-lime rounded-xl"></p> */}
					{/* <Link to="">Support</Link>
          <Link to="">FAQs</Link>
          <Link to="">Icon Style</Link>
          <Link to="">About</Link>
          <Link to="">Icon Style</Link> */}
				</div>
				<div className="flex text-white sm:min-w-max my-2 flex-col gap-3 mt-20 md:mt-0">
					<p className="w-[38px] h-[6px] bg-lime rounded-xl"></p>
					<Link to="">Support</Link>
					<Link to="">FAQs</Link>
					<Link to="">Icon Style</Link>
					<Link to="">About</Link>
					<Link to="">FAQs</Link>
				</div>
			</div>
			<div className="md:hidden block">
				<FooterSocials />
			</div>
		</footer>
	);
};

export default Footer;
