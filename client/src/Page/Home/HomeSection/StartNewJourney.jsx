import React from "react";

const StartNewJourney = () => {
  return (
    <div className="bg-[#012131] px-4 sm:px-6 lg:px-0">
      {/* container */}
      <div className="py-14 sm:py-16 md:py-20 max-w-7xl mx-auto">
        {/* heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl text-base-100 font-bold text-center">
          Ready to Start Your Journey?
        </h1>

        {/* description */}
        <p className="text-sm sm:text-base  text-base-100 text-center font-kalam py-4 sm:py-5 max-w-2xl mx-auto">
          Join thousands of students who have found their perfect scholarship
          through ScholarHub.
        </p>

        {/* buttons */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5 pt-4">
          <button className="btn btn-soft px-6 py-3 md:px-8 md:py-4 rounded-xl hover:scale-102 transition bg-yellow-400 text-sm md:text-base">
            Create Free Account
          </button>
          <button className="btn btn-soft px-6 py-3 md:px-8 md:py-4 rounded-xl hover:scale-102 transition bg-gray-400 text-sm md:text-base">
            Learn more
          </button>
        </div>

        {/* features */}
        <div className="md:flex sm:flex-row justify-center items-center gap-4 space-y-2 sm:gap-8 md:gap-10 py-6">
          {/* item 1 */}
          <div className="flex items-center gap-2">
            <svg
              className="w-5 sm:w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="#FFD43B"
                d="M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zm0-464a208 208 0 1 0 0 416 208 208 0 1 0 0-416zm70.7 121.9c7.8-10.7 22.8-13.1 33.5-5.3 10.7 7.8 13.1 22.8 5.3 33.5L243.4 366.1c-4.1 5.7-10.5 9.3-17.5 9.8-7 .5-13.9-2-18.8-6.9l-55.9-55.9c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l36 36 105.6-145.2z"
              />
            </svg>
            <p className="text-base-100 text-xs sm:text-sm">
              No credit card required
            </p>
          </div>

          {/* item2 */}
          <div className="flex items-center gap-2">
            <svg
              className="w-5 sm:w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="#FFD43B"
                d="M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zm0-464a208 208 0 1 0 0 416 208 208 0 1 0 0-416zm70.7 121.9c7.8-10.7 22.8-13.1 33.5-5.3 10.7 7.8 13.1 22.8 5.3 33.5L243.4 366.1c-4.1 5.7-10.5 9.3-17.5 9.8-7 .5-13.9-2-18.8-6.9l-55.9-55.9c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l36 36 105.6-145.2z"
              />
            </svg>
            <p className="text-base-100 text-xs sm:text-sm">
              Free forever for students
            </p>
          </div>

          {/* item3 */}
          <div className="flex items-center gap-2">
            <svg
              className="w-5 sm:w-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="#FFD43B"
                d="M256 512a256 256 0 1 1 0-512 256 256 0 1 1 0 512zm0-464a208 208 0 1 0 0 416 208 208 0 1 0 0-416zm70.7 121.9c7.8-10.7 22.8-13.1 33.5-5.3 10.7 7.8 13.1 22.8 5.3 33.5L243.4 366.1c-4.1 5.7-10.5 9.3-17.5 9.8-7 .5-13.9-2-18.8-6.9l-55.9-55.9c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l36 36 105.6-145.2z"
              />
            </svg>
            <p className="text-base-100 text-xs sm:text-sm">Instant access</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartNewJourney;
