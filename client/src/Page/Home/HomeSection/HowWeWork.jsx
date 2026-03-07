import React from "react";

const HowWeWork = () => {
  return (
    <div className="pb-10">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center font-bold">
        How <span className="text-yellow-400">ScholarHub</span> Works
      </h1>

      <p className="text-base md:text-lg text-gray-500 text-center py-4 font-kalam">
        Your journey to securing a scholarship is just a few steps away.
      </p>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto gap-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 md:px-6">
        {/* card1 */}
        <div className="px-5 py-8 shadow hover:shadow-lg rounded-xl flex flex-col items-center">
          <h1 className="text-xl md:text-2xl text-base-100 px-4 py-3 font-bold rounded-4xl bg-linear-to-r from-[#012132] to-[#3A5860]">
            01
          </h1>
          <h1 className="font-bold text-xl md:text-2xl py-2 text-center">
            Create Your Profile
          </h1>
          <p className="text-gray-500 text-sm text-center py-2">
            Sign up and build your academic profile with your achievements and
            interests.
          </p>
        </div>

        {/* card2 */}
        <div className="px-5 py-8 shadow hover:shadow-lg rounded-xl flex flex-col items-center">
          <h1 className="text-xl md:text-2xl text-base-100 px-4 py-3 font-bold rounded-4xl bg-linear-to-r from-[#012132] to-[#3A5860]">
            02
          </h1>
          <h1 className="font-bold text-xl md:text-2xl py-2 text-center">
            Discover Opportunities
          </h1>
          <p className="text-gray-500 text-sm text-center py-2">
            Browse thousands of scholarships matched to your profile and goals.
          </p>
        </div>

        {/* card3 */}
        <div className="px-5 py-8 shadow hover:shadow-lg rounded-xl flex flex-col items-center md:col-span-2 lg:col-span-1">
          <h1 className="text-xl md:text-2xl text-base-100 px-4 py-3 font-bold rounded-4xl bg-linear-to-r from-[#012132] to-[#3A5860]">
            03
          </h1>
          <h1 className="font-bold text-xl md:text-2xl py-2 text-center">
            Apply & Track
          </h1>
          <p className="text-gray-500 text-sm text-center py-2">
            Submit applications and track your progress all in one place.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowWeWork;
