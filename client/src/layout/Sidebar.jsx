import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import logo from "../assets/icon/logo.png";

import {
  FaTachometerAlt,
  FaUserGraduate,
  FaUsers,
  FaStar,
  FaSignOutAlt,
  FaHome,
  FaUser,
} from "react-icons/fa";

import { MdAddBox, MdManageAccounts } from "react-icons/md";
import Navbar from "../Components/Shared/Navbar";

const Sidebar = () => {
  return (
    <div className="drawer w-full lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main Content */}
      <div className="drawer-content flex flex-col w-full">
        {/* Mobile Navbar */}
        <div className="navbar bg-base-100 shadow-md w-full px-4 lg:hidden">
          <div className="flex-none">
            <label
              htmlFor="dashboard-drawer"
              className="btn btn-square btn-ghost"
            >
              ☰
            </label>
          </div>

          <div className="flex-1">
            <h1 className="cursor-pointer text-lg font-semibold">
              Scholarship Dashboard
            </h1>
          </div>
        </div>

        <div className=" w-full">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="w-72 min-h-full bg-base-200 p-5">
          <Link
            to="/"
            className="flex gap-2 text-2xl font-bold mb-6 text-center"
          >
            <img className="w-10" src={logo} alt="" />
            ScholarHub
          </Link>

          <ul className="menu gap-2">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => {
                  isActive
                    ? "bg-gray-500 w-full text-white"
                    : "bg-white text-black";
                }}
              >
                <FaTachometerAlt />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/profile"
                className="flex items-center gap-2"
              >
                <FaUser />
                Admin Profile
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/add_scholarships"
                className="flex items-center gap-2"
              >
                <MdAddBox />
                Add Scholarships
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/manage_scholarships"
                className="flex items-center gap-2"
              >
                <MdManageAccounts />
                Manage Scholarship
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/applied_scholarship"
                className="flex items-center gap-2"
              >
                <FaUserGraduate />
                Applied Applications
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/manage_users"
                className="flex items-center gap-2"
              >
                <FaUsers />
                Manage Users
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/manage_review"
                className="flex items-center gap-2"
              >
                <FaStar />
                Manage Review
              </NavLink>
            </li>

            <div className="divider"></div>

            <li>
              <button className="flex items-center gap-2 text-red-500">
                <FaSignOutAlt />
                Logout
              </button>
            </li>

            <li>
              <NavLink to="/" className="flex items-center gap-2">
                <FaHome />
                Go Home
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default Sidebar;
