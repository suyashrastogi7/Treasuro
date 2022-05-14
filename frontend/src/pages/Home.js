import React from "react";
import Footer from "../components/Footer";
import FooterMade from "../components/FooterMade";
import Hero from "../components/Hero";
import Invite from "../components/Invite";
import JoinUs from "../components/JoinUs";
import Prizes from "../components/Prizes";
import Tickets from "../components/Tickets";

const Home = () => {
  return (
    <div>
      <Hero />
      <Invite />
      <Prizes />
      <Tickets />
      <JoinUs />
      <Footer />
      <FooterMade />
    </div>
  );
};

export default Home;
