import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../../Components/Common/Loading";
import { useNavigate } from "react-router";

const ScholarshipCard = () => {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScholarships = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_localhost_api}/all-scholarships`,
        );
        setScholarships(res.data);
      } catch (err) {
        setError("Failed to load scholarships");
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  if (loading) return <Loading />;

  if (error) return <p className="text-center text-red-500 py-20">{error}</p>;

  return (
    <section className="px-4">
      {/* Title */}
      <h1 className="text-2xl md:text-4xl font-bold text-center pt-10 pb-4">
        Top <span className="text-yellow-400">Scholarships</span>
      </h1>

      <p className="text-sm md:text-lg text-center text-gray-500 pb-6">
        Discover top scholarship opportunities handpicked for ambitious students
      </p>

      {/* divider */}
      <div className="flex justify-center mb-10">
        <svg width="120" height="20" viewBox="0 0 120 20">
          <path
            d="M0 10 C15 0, 30 0, 45 10
               C60 20, 75 20, 90 10
               C105 0, 120 0, 120 10"
            fill="none"
            stroke="#facc15"
            strokeWidth="2"
          />
        </svg>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto pb-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {scholarships.map((scholarship) => (
          <div
            key={scholarship._id}
            className="bg-[#001E2D] rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-5"
          >
            {/* category badge */}
            <div className="badge bg-[#00202F] text-yellow-400 border-none mb-4">
              {scholarship.scholarshipCategory}
            </div>

            {/* university info */}
            <div className="flex items-center gap-4 mb-4">
              <img
                className="w-12 h-12 object-cover rounded"
                src={scholarship.universityLogo}
                alt=""
              />

              <h2 className="text-lg font-semibold text-white line-clamp-1">
                {scholarship.universityName}
              </h2>
            </div>

            {/* subject */}
            <p className="text-white text-sm mb-3">
              <b>Subject :</b> {scholarship.subjectCategory}
            </p>

            {/* location
            <div className="flex flex-wrap gap-3 text-sm mb-4">
              <p className="text-white">
                <b>City :</b>{" "}
                <span className="text-yellow-400">{scholarship.city}</span>
              </p>

              <p className="text-white">
                <b>Country :</b>{" "}
                <span className="text-yellow-400">{scholarship.country}</span>
              </p>
            </div> */}

            <div className="divider"></div>

            {/* fee + deadline */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Fee :{" "}
                  <span className="text-yellow-400">
                    {scholarship.applicationFees}
                  </span>
                </h3>

                <p className="text-gray-400 text-xs">Application Fee</p>
              </div>

              <div className="text-right">
                <h3 className="text-yellow-400 text-sm font-medium">
                  {scholarship.applicationDeadline}
                </h3>
                <p className="text-gray-400 text-xs">Deadline</p>
              </div>
            </div>

            {/* button */}
            <button
              onClick={() => navigate(`/universities/${scholarship._id}`)}
              className="btn w-full rounded-xl bg-white text-[#00202F] border-none hover:bg-yellow-400 hover:text-black transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScholarshipCard;
