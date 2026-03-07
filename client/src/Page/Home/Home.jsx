import React from "react";

import Stats from "./HomeSection/Stats";
import Hero from "./HomeSection/Hero";
import HowWeWork from "./HomeSection/HowWeWork";
import StartNewJourney from "./HomeSection/StartNewJourney";
import ScholarshipSection from "./HomeSection/ScholarshipCard";
import ScholarshipCard from "./HomeSection/ScholarshipCard";

const Home = () => {
  return (
    <div>
      <Hero />

      {/* Stat section */}
      <Stats />

      {/* scholarship */}
      <ScholarshipCard />

      {/*How scholarhub work */}
      <HowWeWork />

      {/* Ready to start new journey Section */}
      <StartNewJourney />
    </div>
  );
};

export default Home;
