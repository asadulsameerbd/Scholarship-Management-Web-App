import React, { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdLocationPin } from "react-icons/md";
import { Link } from "react-router";

const Universities = () => {
  const [scholarshipsData, setScholarshipsData] = useState([]);

  useEffect(() => {
    fetch("/Scholarship.json")
      .then((data) => data.json())
      .then((data) => setScholarshipsData(data));
  }, []);

  return (
    <div>
      <div>
        {/* 🔵 Top bar */}
        <div className="bg-[#012131] py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-white text-center lg:text-left text-2xl md:text-4xl lg:text-5xl font-bold">
              Find Your <span className="text-[#F39C12]">Scholarships</span>
            </h1>
            <p className="text-white text-center lg:text-left text-sm md:text-base mt-2">
              Discover thousands of scholarship opportunities from top
              universities worldwide.
            </p>
          </div>
        </div>

        {/* 🔵 Search & Filters */}
        <div className="max-w-7xl mx-auto px-4 -mt-6">
          <div className="bg-white shadow-md rounded-lg p-4 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center">
            {/* 🔍 Search Input */}
            <div className="relative w-full md:flex-1">
              <IoSearchOutline
                size={20}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              />
              <input
                type="text"
                placeholder="Search Scholarships, Universities..."
                className="w-full border border-gray-200 bg-[#E8EAED] p-2 pl-10 rounded-md outline-none"
              />
            </div>

            {/* 📂 Category Filter */}
            <select className="bg-gray-200 p-2 rounded-lg w-full md:w-auto">
              <option value="all">All</option>
              <option value="merit-based">Merit Based</option>
            </select>

            {/* 🎓 Subject Filter */}
            <select className="bg-gray-200 p-2 rounded-lg w-full md:w-auto">
              <option value="business-administration">
                Business Administration
              </option>
              <option value="computer-science">Computer Science</option>
            </select>
          </div>
        </div>

        {/* 🔵 Result & Sort Bar */}
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2 md:flex-row md:justify-between md:items-center border-b border-gray-300">
          <p className="text-sm text-gray-500">
            Showing <b className="text-black">{scholarshipsData.length}</b>{" "}
            Scholarships
          </p>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">Sort By :</p>
            <select className="p-2 border border-gray-200 rounded-md">
              <option value="recently-added">Recently Added</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>

        {/* 🔵 Content */}
        <div className="max-w-7xl mx-auto  px-4 py-6">
          {/* Scholarship cards will go here */}
          {scholarshipsData.map((university, i) => (
            <div
              key={i}
              className="card flex flex-col md:flex-row mb-5 card-side bg-base-100 shadow-sm"
            >
              <figure className="w-full md:w-80 h-48 rounded-lg m-4 overflow-hidden">
                <img
                  src={university.universityLogo}
                  alt={university.name}
                  className="w-full h-full object-cover transform transition duration-300 hover:scale-105"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{university.universityName}</h2>
                <p className="text-gray-500">
                  {university.scholarshipDescription}
                </p>
                <p className="flex items-center gap-2">
                  <MdLocationPin className="text-[#F39C12]" />
                  {university.location.city}, {university.location.country}
                </p>
                <div className="card-actions justify-end">
                  <Link
                    to={`/universities/${university.id}`}
                    className="btn w-fit rounded-2xl hover:scale-102 border-2 border-[#00202F] bg-white text-[#00202F] hover:bg-[#00202F] hover:text-white"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Universities;
