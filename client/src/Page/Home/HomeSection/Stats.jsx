import React from "react";
import scholarships from "../../../assets/icon/award.png";
import help from "../../../assets/icon/help.png";
import university from "../../../assets/icon/university.png";
import people from "../../../assets/icon/people.png";

const Stats = () => {
  return (
    <div className="lg:w-7xl lg:mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 mx-5 justify-center gap-4 md:gap-8  py-20">
      {/* scholarships total */}
      <div className="py-5 shadow hover:shadow-lg rounded-xl flex flex-col items-center">
        <img className="w-20" src={people} alt="" />
        <h1 className="font-bold text-2xl md:text-4xl py-2">10,000+</h1>
        <p className="text-gray-500 text-xs">Scholarships </p>
      </div>

      {/* total university */}
      <div className="py-5 shadow hover:shadow-lg rounded-xl flex flex-col items-center">
        <img className="w-20" src={university} alt="" />
        <h1 className="font-bold text-2xl md:text-4xl py-2">500+</h1>
        <p className="text-gray-500 text-xs">Universities </p>
      </div>

      {/* student help */}
      <div className="py-5 shadow hover:shadow-lg rounded-xl flex flex-col items-center">
        <img className="w-20" src={help} alt="" />
        <h1 className="font-bold text-2xl md:text-4xl py-2">50,000+</h1>
        <p className="text-gray-500 text-xs">Students Helped</p>
      </div>

      {/* funding award */}
      <div className="py-5 shadow hover:shadow-lg rounded-xl flex flex-col items-center">
        <img className="w-20" src={scholarships} alt="" />
        <h1 className="font-bold text-2xl md:text-4xl py-2">$2B+</h1>
        <p className="text-gray-500 text-xs">Funding Awarded </p>
      </div>
    </div>
  );
};

export default Stats;
