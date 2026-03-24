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
import UseAuth from "../Hook/useAuth";
import Swal from "sweetalert2";

const Sidebar = () => {
  const { user, logOut, role } = UseAuth();

  // Logout
  const handleSignOut = async () => {
    try {
      await logOut();
      Swal.fire({
        title: "Success!",
        text: `${user?.email} Logout Successfully`,
        icon: "success",
      });
    } catch (e) {
      Swal.fire({
        title: "Error!",
        text: `${e.message}`,
        icon: "error",
      });
    }
  };

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

        <div className="w-full">
          <Outlet />
        </div>
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="w-72 min-h-full bg-base-200 p-5">
          <Link to="/" className="flex gap-2 text-2xl font-bold mb-6">
            <img className="w-10" src={logo} alt="" />
            ScholarHub
          </Link>

          <ul className="menu gap-2">
            {/* Dashboard */}
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "bg-[#001E2D] text-white" : ""
                }
              >
                <FaTachometerAlt />
                Dashboard
              </NavLink>
            </li>

            {/* Admin Menu */}
            {role === "admin" && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-500 text-white" : ""
                    }
                    to="/dashboard/profile"
                  >
                    <FaUser /> Admin Profile
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-500 text-white" : ""
                    }
                    to="/dashboard/add_scholarships"
                  >
                    <MdAddBox /> Add Scholarships
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-500 text-white" : ""
                    }
                    to="/dashboard/manage_scholarships"
                  >
                    <MdManageAccounts /> Manage Scholarship
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-500 text-white" : ""
                    }
                    to="/dashboard/applied_scholarship"
                  >
                    <FaUserGraduate /> Applied Applications
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-500 text-white" : ""
                    }
                    to="/dashboard/manage_users"
                  >
                    <FaUsers /> Manage Users
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-500 text-white" : ""
                    }
                    to="/dashboard/manage_review"
                  >
                    <FaStar /> Manage Review
                  </NavLink>
                </li>
              </>
            )}

            {/* Moderator Menu */}
            {role === "moderator" && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-500 text-white" : ""
                    }
                    to="/dashboard/profile"
                  >
                    <FaUser /> Profile
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-500 text-white" : ""
                    }
                    to="/dashboard/add_scholarships"
                  >
                    <MdAddBox /> Add Scholarships
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-500 text-white" : ""
                    }
                    to="/dashboard/manage_scholarships"
                  >
                    <MdManageAccounts /> Manage Scholarship
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-500 text-white" : ""
                    }
                    to="/dashboard/applied_scholarship"
                  >
                    <FaUserGraduate /> Applied Applications
                  </NavLink>
                </li>
              </>
            )}

            {/* Student Menu */}
            {role === "student" && (
              <>
                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-500 text-white" : ""
                    }
                    to="/dashboard/profile"
                  >
                    <FaUser /> Profile
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? "bg-gray-500 text-white" : ""
                    }
                    to="/dashboard/my_application"
                  >
                    <FaUserGraduate /> My Application
                  </NavLink>
                </li>
              </>
            )}

            <div className="divider"></div>

            {/* Logout */}
            <li>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 text-red-500"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </li>

            {/* Home */}
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
