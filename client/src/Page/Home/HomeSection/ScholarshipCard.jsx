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
        setLoading(true);
        const res = await axios.get("/Scholarship.json");
        setScholarships(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load scholarships");
      } finally {
        setLoading(false);
      }
    };

    fetchScholarships();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p className="text-center text-red-500 py-20">{error}</p>;
  }

  return (
    <section>
      {/* upper content */}
      <h1 className="text-2xl md:text-4xl font-bold text-center pt-5 pb-5">
        Top <span className="text-yellow-400">Scholarships</span>
      </h1>
      <p className="text-lg text-center text-gray-500 font-kalam pb-5">
        Discover top scholarship opportunities handpicked for ambitious
        students.
      </p>

      {/* divider */}
      <div className="flex justify-center mb-12">
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

      <div className="lg:max-w-7xl  mx-auto pb-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {scholarships.map((scholarship) => (
          <div
            key={scholarship._id}
            className="card mx-5 lg:mx-0 bg-[#001E2D] p-3 shadow-sm rounded-2xl pb-5"
          >
            <div className="badge rounded-2xl ml-5 mt-4 bg-[#00202F] text-yellow-400">
              {scholarship.scholarshipCategory}
            </div>

            <div className="flex items-center gap-4 p-5">
              <img
                className="w-14 rounded"
                src={scholarship.universityLogo}
                alt={`${scholarship.universityName} logo`}
              />
              <h2 className="text-xl font-medium text-white">
                {scholarship.universityName}
              </h2>
            </div>

            <p className="text-white pl-5 pb-3 text-sm">
              <b>Subject :</b> {scholarship.subjectCategory}
            </p>

            {/* university location */}
            <div className="flex items-center ">
              <p className="text-white  pl-5 text-sm">
                <b>City : </b>
                <span className="text-yellow-400">
                  {scholarship.location.city}
                </span>
              </p>
              <p className="text-white pl-5 text-sm">
                <b>Country : </b>
                <span className="text-yellow-400">
                  {scholarship.location.country}
                </span>
              </p>
            </div>

            <div className="divider mx-5"></div>

            <div className="mx-5 flex justify-between py-5">
              <div>
                <h3 className="text-2xl">
                  <b className="text-white"> Fee : </b>

                  <span className="text-yellow-400">
                    {scholarship.applicationFees}
                  </span>
                </h3>
                <p className="text-gray-400 text-sm">Application Fee</p>
              </div>

              <div>
                <h3 className="font-medium text-yellow-400">
                  {scholarship.applicationDeadline}
                </h3>
                <p className="text-gray-400 text-sm">Deadline</p>
              </div>
            </div>

            <div className="flex justify-center mx-5">
              <button
                onClick={() => navigate(`universities/${scholarship._id}`)}
                className="btn w-full rounded-2xl hover:scale-102 border-2 border-[#00202F] bg-white text-[#00202F] hover:bg-yellow-400 hover:text-black"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ScholarshipCard;
