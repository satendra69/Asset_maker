import React from "react";
import Hero from "../component/Hero";
import EnquiryForm from "../component/EnquiryForm";
import Clients from "./Clients";
import Patners from "../component/OurPatners";
import HomePage from "../component/newHero/hero";
import TopCities from "../component/TopCities";
import Apart from "../component/Apart";
import NewHero from "../component/Hero/NewHero";
import ExploreDream from "../component/ExploreDream";
import Social from "../component/Social";

function Home() {
  return (
    <div className="">
      <HomePage />
      {/* <NewHero /> */}
      <Hero />
      <Apart />
      {/* <EnquiryForm /> */}

      <Patners />
      <TopCities />
      {/* Explore Section */}
      <ExploreDream />
      <Clients />
      <Social />
    </div>
  );
}

export default Home;
