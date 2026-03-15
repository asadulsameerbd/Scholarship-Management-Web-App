import { useState } from "react";
import { Link, NavLink } from "react-router";
import logo from "../../assets/icon/logo.png";
import Swal from "sweetalert2";
import UseAuth from "../../Hook/useAuth";
import Loading from "../Common/Loading";

const menuItems = [
  { name: "Home", path: "/" },
  { name: "All Scholarships", path: "/scholarships" },
  { name: "Universities", path: "/universities" },
  { name: "About", path: "/about" },
];

const Navbar = () => {
  const [hamburger, setHamburger] = useState(false);
  const { user, logOut, isLoading } = UseAuth();

  // logOut
  const handleSignOut = async () => {
    try {
      await logOut();
      Swal.fire({
        title: "Success!",
        text: `${user.email} logged out successfully`,
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

  // Loading state
  if (isLoading) return <Loading />;

  // User section
  const userSection = () =>
    user ? (
      <div className="flex items-center gap-2">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} className="avatar cursor-pointer">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  user?.photoURL ||
                  "https://img.daisyui.com/images/profile/demo/spiderperson@192.webp"
                }
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-40"
          >
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>
            <li>
              <button onClick={handleSignOut}>Sign Out</button>
            </li>
          </ul>
        </div>
      </div>
    ) : (
      <div className="flex gap-3">
        <Link className="btn" to="/auth/signIn">
          Sign In
        </Link>
        <Link className="btn bg-amber-400" to="/auth/registration">
          Get Started
        </Link>
      </div>
    );

  return (
    <div className="navbar sticky top-0 z-50 bg-[#D8DEE8b3] backdrop-blur-xl shadow-sm px-4 py-4">
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex gap-3 items-center">
          <img className="w-10" src={logo} alt="Scholarhub Logo" />
          <p className="text-xl mt-2 font-bold">Scholarhub</p>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex">
          <ul className="menu menu-horizontal px-1">
            {menuItems.map((item, i) => (
              <li key={i}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded ${
                      isActive ? "bg-base-content text-white" : ""
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop User */}
        <div className="hidden md:flex">{userSection()}</div>

        {/* Hamburger */}
        <div className="md:hidden">
          <button
            onClick={() => setHamburger(!hamburger)}
            className="flex flex-col justify-between w-8 h-6 focus:outline-none"
          >
            <span
              className={`block h-1 w-full bg-base-content rounded transition-transform duration-300 ${
                hamburger ? "rotate-45 translate-y-3" : ""
              }`}
            />
            <span
              className={`block h-1 w-full bg-base-content rounded transition-opacity duration-300 ${
                hamburger ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-1 w-full bg-base-content rounded transition-transform duration-300 ${
                hamburger ? "-rotate-45 -translate-y-3" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {hamburger && (
        <div className="md:hidden absolute top-full left-0 w-full bg-[#D8DEE8] backdrop-blur-xl shadow-md pb-10">
          <ul className="menu w-full flex flex-col p-4 space-y-2">
            {menuItems.map((item, i) => (
              <li key={i}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded ${
                      isActive ? "bg-base-content text-white" : ""
                    }`
                  }
                  onClick={() => setHamburger(false)}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="ml-8">{userSection()}</div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
