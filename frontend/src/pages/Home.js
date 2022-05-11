import React from "react";
import Hero from "../components/Hero";
import Invite from "../components/Invite";
import Prizes from "../components/Prizes";
import Tickets from "../components/Tickets";

const Home = () => {
  return (
    <div>
      <Hero />
      <Invite />
      <Prizes />
      <Tickets />
    </div>
  );
};

export default Home;
