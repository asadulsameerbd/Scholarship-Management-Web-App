import axios from "axios";
import { useEffect, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { MdLocationPin } from "react-icons/md";
import { Link } from "react-router";

const Scholarships = () => {
  const [scholarshipsData, setScholarshipsData] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [subject, setSubject] = useState("all");
  const [sort, setSort] = useState("recent");

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_localhost_api}/all-scholarships`,
        );
        setScholarshipsData(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchScholarships();
  }, []);

  // 🔎 Filter + Sort Logic
  const filteredData = scholarshipsData
    .filter((item) => {
      const matchSearch =
        item.university_name?.toLowerCase().includes(search.toLowerCase()) ||
        item.scholarship_name?.toLowerCase().includes(search.toLowerCase());

      const matchCategory =
        category === "all" || item.scholarship_category === category;

      const matchSubject =
        subject === "all" || item.subject_category === subject;

      return matchSearch && matchCategory && matchSubject;
    })
    .sort((a, b) => {
      if (sort === "low-fee") {
        return a.application_fees - b.application_fees;
      }
      if (sort === "high-fee") {
        return b.application_fees - a.application_fees;
      }
      return 0;
    });

  return (
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
          {/* 🔍 Search */}
          <div className="relative w-full md:flex-1">
            <IoSearchOutline
              size={20}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Search Scholarships, Universities..."
              className="w-full border border-gray-200 bg-[#E8EAED] p-2 pl-10 rounded-md outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* 📂 Category */}
          <select
            className="bg-gray-200 p-2 rounded-lg w-full md:w-auto"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Category</option>
            <option value="full-fund">Full Fund</option>
            <option value="partial">Partial</option>
            <option value="self-fund">Self Fund</option>
          </select>

          {/* 🎓 Subject */}
          <select
            className="bg-gray-200 p-2 rounded-lg w-full md:w-auto"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          >
            <option value="all">All Subject</option>
            <option value="engineering">Engineering</option>
            <option value="agriculture">Agriculture</option>
            <option value="doctor">Doctor</option>
          </select>
        </div>
      </div>

      {/* 🔵 Result & Sort */}
      <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2 md:flex-row md:justify-between md:items-center border-b border-gray-300">
        <p className="text-sm text-gray-500">
          Showing <b className="text-black">{filteredData.length}</b>{" "}
          Scholarships
        </p>

        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500">Sort By :</p>

          <select
            className="p-2 border border-gray-200 rounded-md"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="recent">Recently Added</option>
            <option value="low-fee">Lowest Fee</option>
            <option value="high-fee">Highest Fee</option>
          </select>
        </div>
      </div>

      {/* 🔵 Scholarship Cards */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {filteredData.map((university) => (
          <div
            key={university._id}
            className="card flex flex-col md:flex-row mb-5 card-side bg-base-100 shadow-sm"
          >
            <figure className="w-full md:w-80 h-48 rounded-lg m-4 overflow-hidden">
              <img
                src={university.university_logo}
                alt={university.university_name}
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h2 className="card-title">{university.university_name}</h2>

              <p className="text-gray-500">{university.scholarship_name}</p>

              <p className="flex items-center gap-2">
                <MdLocationPin className="text-[#F39C12]" />
                {university.university_city}, {university.university_country}
              </p>

              {/* 💰 Fee + Button */}
              <div className="flex justify-between items-center mt-3">
                <p className="text-sm">
                  Application Fee :
                  <span className="font-bold text-lg text-yellow-500 ml-2">
                    ${university.application_fees}
                  </span>
                </p>

                <Link
                  to={`/universities/${university._id}`}
                  className="btn rounded-xl border-2 border-[#00202F] bg-white text-[#00202F] hover:bg-[#00202F] hover:text-white"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Scholarships;
