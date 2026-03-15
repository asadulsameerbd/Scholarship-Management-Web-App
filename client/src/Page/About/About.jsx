import React, { useEffect } from "react";
import admin from "../../assets/Image/admin.jpeg";
import moderator from "../../assets/Image/moderator.jpg";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-[#f9fafb]">
      {/* Header */}
      <section
        className="text-center py-16 px-4 bg-[#012131] text-white"
        data-aos="fade-down"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About ScholarHub
        </h1>
        <p className="max-w-2xl mx-auto text-gray-200 text-lg md:text-xl">
          ScholarHub is a modern Scholarship Management System designed to help
          students discover, apply, and track scholarships from universities
          around the world. Our mission is to make education opportunities
          accessible to all.
        </p>
      </section>

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
        <div
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105"
          data-aos="fade-up"
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2 text-[#012131]">
              Discover
            </h2>
            <p className="text-gray-600">
              Explore hundreds of scholarships worldwide. Filter by degree,
              subject, and funding type to find your perfect match.
            </p>
          </div>
        </div>

        <div
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2 text-[#012131]">
              Apply
            </h2>
            <p className="text-gray-600">
              Submit applications online and track their progress in real-time.
              No more lost paperwork or manual forms.
            </p>
          </div>
        </div>

        <div
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:scale-105"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2 text-[#012131]">
              Manage
            </h2>
            <p className="text-gray-600">
              Administrators can easily manage scholarships, review
              applications, and monitor student activity efficiently.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-[#e5f2f8] py-16 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-center">
          <div data-aos="fade-right">
            <h2 className="text-3xl font-bold text-[#012131] mb-4">
              Our Vision
            </h2>
            <p className="text-gray-700 text-lg">
              To make scholarships and educational opportunities accessible for
              every student, globally.
            </p>
          </div>
          <div data-aos="fade-left">
            <h2 className="text-3xl font-bold text-[#012131] mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 text-lg">
              To provide a seamless platform for discovering, applying, and
              managing scholarships, helping students achieve their dreams.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      {/* Why Choose Us */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <h2
          className="text-3xl font-bold text-center text-[#012131] mb-12"
          data-aos="fade-up"
        >
          Why Choose ScholarHub?
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Reliable Data",
              desc: "Up-to-date and verified scholarships from trusted universities worldwide.",
            },
            {
              title: "User Friendly",
              desc: "Simple and intuitive interface for students and administrators.",
            },
            {
              title: "24/7 Support",
              desc: "Dedicated support to help you with your scholarship applications anytime.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-105 p-6 text-center"
              data-aos="zoom-in"
              data-aos-delay={i * 100}
            >
              <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
              <p className="text-gray-600 transition-all duration-500 ease-in-out">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      {/* Team Section */}
      <section className="bg-[#f1f5f9] py-16 px-4">
        <h2
          className="text-3xl font-bold text-center text-[#012131] mb-12"
          data-aos="fade-up"
        >
          Our Team
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[admin, moderator].map((img, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500 ease-in-out hover:shadow-2xl hover:scale-105"
              data-aos="flip-left"
              data-aos-delay={i * 100}
            >
              <div className="overflow-hidden">
                <img
                  src={img}
                  alt="Team Member"
                  className="w-full h-56 object-cover transform transition-all duration-500 ease-in-out hover:scale-110"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-semibold text-lg">
                  {i === 0 ? "Asadul Sameer" : "Hamza Chowdhury"}
                </h3>
                <p className="text-gray-600 text-sm">
                  {i === 0 ? "Founder & Developer" : "Moderator"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
