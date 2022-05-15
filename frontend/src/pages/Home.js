import Footer from "../components/Footer";
import FooterMade from "../components/Footer/FooterMade";
import Hero from "../components/Hero";
import Why from "../components/Sections/Why";
import JoinUs from "../components/Sections/JoinUs";
import Prizes from "../components/Sections/Prizes";
import Tickets from "../components/Sections/Tickets";

const Home = () => {
  return (
    <div>
      <Hero />
      <Why />
      <Prizes />
      <Tickets />
      <JoinUs />
      <Footer />
      <FooterMade />
    </div>
  );
};

export default Home;
