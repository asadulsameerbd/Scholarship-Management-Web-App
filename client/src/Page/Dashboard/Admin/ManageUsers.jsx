import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { FaEye, FaUserEdit } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import Loading from "../../../Components/Common/Loading";
import Error from "../../Error/Error";

const ManageUsers = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_localhost_api}/users`,
      );
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  // handle delete user
  const handleDeleteUser = async (email) => {
    const res = await axios.delete(
      `${import.meta.env.VITE_localhost_api}/users/${email}`,
    );
    return res.data;
  };

  console.log(data);
  return (
    <div>
      {" "}
      <h1 className="text-center text-sm md:text-2xl font-bold bg-[#001E2D] text-white pt-5 pb-2">
        Mange Users
      </h1>
      <p className="text-center bg-[#001E2D] text-white text-xs pt-3 md:text-sm pb-5">
        All Register Users are here in this website
      </p>
      {/* all user table */}
      <div className="w-full ">
        <table className="w-full border">
          <thead className="hidden md:table-header-group">
            <tr>
              <th className="border p-2">User Name</th>
              <th className="border p-2">User Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody className="">
            {data?.map((item) => (
              <tr
                key={item._id}
                className="block border-b border-[#001E2D] md:table-row mb-3 md:mb-0"
              >
                <td className="block md:table-cell p-2">
                  <span className="font-bold md:hidden">User Name: </span>
                  {item?.displayName || item?.name || ""}
                </td>

                <td className="block md:table-cell p-2">
                  <span className="font-bold md:hidden">Email : </span>
                  {item?.email}
                </td>

                <td className="block md:table-cell p-2">
                  <span className="font-bold md:hidden">Role : </span>
                  {item?.role}
                </td>

                <td className="block md:table-cell p-2">
                  <button
                    onClick={() => handleDeleteUser(item?.email)}
                    className="btn btn-sm btn-error m-2"
                  >
                    Remove User
                    <MdCancel />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
