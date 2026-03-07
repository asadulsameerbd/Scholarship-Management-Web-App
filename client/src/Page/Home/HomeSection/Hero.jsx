import React from "react";
import { FaArrowRight, FaRegStar } from "react-icons/fa";
import "./Hero.css";
import HeroSearch from "../../../Components/Common/HeroSearch";

const Hero = () => {
  return (
    <div>
      <div className="hero-img flex items-center justify-center min-h-[80vh] md:min-h-[90vh] px-4 sm:px-6 lg:px-12 py-10 lg:py-0">
        <div className="relative z-10 w-full max-w-6xl">
          {/* badge */}
          <div className="flex justify-center my-6">
            <div
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full
          bg-white/10 backdrop-blur-md border border-white/30 text-white shadow-lg text-xs sm:text-sm"
            >
              <FaRegStar className="text-yellow-400" size={18} />
              <p className="font-medium">
                Trusted by 50,000+ students worldwide
              </p>
            </div>
          </div>

          {/* hero content heading and paragraph */}
          <div className="text-center px-2 sm:px-0">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-base-100 leading-snug sm:leading-tight">
              Find Your Perfect <br />{" "}
              <span className="text-[#F39C12]">Scholarship</span> & University
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-base-100 font-kalam py-4 max-w-3xl mx-auto">
              Discover thousands of scholarships from top universities
              worldwide. Let us help you fund your dream education.
            </p>
          </div>

          {/* search box hero */}
          <div className="my-2">
            <HeroSearch />
          </div>

          <div className="hidden md:flex flex-col md:flex-row justify-center gap-5 py-5">
            <button className="btn p-5 bg-white/50 hover:bg-white">
              Browse Scholarships
              <FaArrowRight />
            </button>
            <button className="btn p-5 bg-white/50 hover:bg-white">
              Explore universities
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
