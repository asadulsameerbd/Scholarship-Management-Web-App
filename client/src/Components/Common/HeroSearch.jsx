import React from "react";
import { FiSearch } from "react-icons/fi";

const HeroSearch = () => {
  return (
    <div className="w-full md:px-4">
      {/* container */}
      <div
        className="flex flex-col md:flex-row items-stretch 
        bg-white rounded-xl 
        max-w-4xl mx-auto 
        shadow-lg"
      >
        {/* input + icon */}
        <div className="flex items-center flex-1 px-4 py-3">
          <FiSearch className="text-gray-400 mr-3" size={20} />
          <input
            type="text"
            placeholder="Search Scholarships, Universities..."
            className="w-full text-gray-700 outline-none"
          />
        </div>

        {/* button */}
        <button
          className="bg-yellow-400 text-black font-semibold 
          px-6 py-3 
          md:my-2 md:mr-2 cursor-pointer
          rounded-b-2xl md:rounded-xl 
          hover:scale-105 transition"
        >
          Search Now
        </button>
      </div>
    </div>
  );
};

export default HeroSearch;
