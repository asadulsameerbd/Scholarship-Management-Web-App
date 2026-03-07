import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-base-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      {/* <div className="">
        <Outlet />
      </div> */}
    </div>
  );
};

export default DashboardLayout;
