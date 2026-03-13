import React from "react";
import UseAuth from "../../../Hook/useAuth";
import Loading from "../../../Components/Common/Loading";
import { RiEditBoxFill } from "react-icons/ri";
import { Link } from "react-router";
import axios from "axios";

const Profile = () => {
  const { user, isLoading, role } = UseAuth();

  axios.get(`${import.meta.env.VITE_locahost_api}/users`);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-center text-sm md:text-2xl font-bold bg-[#001E2D] text-white pt-5 pb-2">
        Profile Page
      </h1>
      <p className="text-center bg-[#001E2D] text-white text-xs md:text-sm pt-3 pb-5">
        You Can Customize your profile from here
      </p>

      {/* user profile info */}
      <div className="flex flex-col justify-center my-10 md:my-20 px-4  lg:px-40">
        <div className="flex bg-base-100 shadow-sm w-full md:w-3/4  flex-col md:flex-row items-center md:items-start p-6 md:p-10 gap-6 md:mx-20">
          <figure className="w-32 h-32 lg:w-48 lg:h-48 shrink-0">
            <img
              className="w-full h-full object-cover rounded-full"
              src={
                user?.photoURL ||
                "https://img.daisyui.com/images/profile/demo/gordon@192.webp"
              }
              alt="Profile"
            />
          </figure>
          <div className="card-body flex-1">
            <h1 className="text-base md:text-lg">
              Name: <span className="font-bold">{user?.displayName}</span>
            </h1>
            <h1 className="text-base md:text-lg mt-2">
              Email: <span className="font-bold">{user?.email}</span>
            </h1>
            <h1 className="mt-2">
              Role:
              <span className="ml-2 px-3 py-1 bg-green-100 text-green-600 rounded-full">
                {role}
              </span>
            </h1>
            <div className="card-actions justify-start md:justify-end mt-4">
              {user?.email && (
                <Link
                  to={`/dashboard/update_profile/${user.email}`}
                  className="btn bg-yellow-400 flex items-center gap-2"
                >
                  Edit <RiEditBoxFill />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
