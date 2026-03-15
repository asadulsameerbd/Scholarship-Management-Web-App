import React, { useEffect } from "react";
import adminLogo from "../assets/Image/admin.jpeg";
import moderatorLogo from "../assets/Image/moderator.jpg";
import { Link } from "react-router";
import Aos from "aos";
import "aos/dist/aos.css";

const AccessPage = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

  return (
    <div>
      {/* Header */}
      <h1 className="text-center text-lg md:text-2xl font-bold bg-[#001E2D] text-white pt-5 pb-2">
        Welcome to Website Access Info Page
      </h1>

      <p className="text-center bg-[#001E2D] text-white text-xs md:text-sm pb-5 px-4">
        In this page, you can find the admin and moderator login access for demo
        check purposes.
      </p>

      {/* Moderator */}
      <div data-aos="fade-right" className="hero bg-base-200 py-10">
        <div className="hero-content flex-col lg:flex-row-reverse gap-10">
          <img
            src={moderatorLogo}
            className="w-64 md:w-80 rounded-lg shadow-2xl hover:scale-105 transition duration-300"
          />

          <div className="text-center lg:text-left px-4">
            <h1 className="text-2xl md:text-4xl font-bold">
              Moderator Login Information
            </h1>

            <p className="pt-6 pb-2">
              <b>Email :</b> m@sameer.com
            </p>

            <p>
              <b>Password :</b> 123456
            </p>

            <Link
              to="/auth/signIn"
              className="btn bg-yellow-400 hover:bg-gray-600 hover:text-white mt-5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      {/* Admin */}
      <div data-aos="fade-up-left" className="hero bg-base-200 py-10">
        <div className="hero-content flex-col lg:flex-row gap-10">
          <img
            src={adminLogo}
            className="w-64 md:w-80 rounded-lg shadow-2xl hover:scale-105 transition duration-300"
          />

          <div className="text-center lg:text-left px-4">
            <h1 className="text-2xl md:text-4xl font-bold">
              Admin Login Information
            </h1>

            <p className="pt-6 pb-2">
              <b>Email :</b> a@sameer.com
            </p>

            <p>
              <b>Password :</b> 123456
            </p>

            <Link
              to="/auth/signIn"
              className="btn bg-yellow-400 hover:bg-gray-600 hover:text-white mt-5"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccessPage;
