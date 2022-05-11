import React from "react";
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
    </div>
  );
};

export default Home;
