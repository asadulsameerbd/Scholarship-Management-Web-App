import React from "react";
import Navbar from "../Components/Shared/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Shared/Footer";

const MainLayout = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Main component */}
      <div className="min-h-200">
        <Outlet />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MainLayout;
