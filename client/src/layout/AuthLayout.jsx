import React from "react";
import { Outlet } from "react-router";
import Navbar from "../Components/Shared/Navbar";

const AuthLayout = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
