import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Components/Common/Loading";
import Error from "./Error/Error";
import { FaEye, FaStreetView, FaUserEdit } from "react-icons/fa";
import { MdCancel, MdDeleteForever, MdGridView } from "react-icons/md";

const ManageScholarships = () => {
  const { data, isLoading, error, isFetching } = useQuery({
    queryKey: ["allScholarships"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_localhost_api}/all-scholarships`,
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

  return (
    <div>
      <h1 className="text-center text-sm md:text-2xl font-bold bg-[#001E2D] text-white pt-5 pb-2">
        Manage Scholarship
      </h1>
      <p className="text-center bg-[#001E2D] text-white text-xs md:text-sm pt-3 pb-5">
        All Scholarships are here
      </p>

      {/* scholarship tabular format  */}
      <div className="w-full ">
        <table className="w-full border">
          <thead className="hidden md:table-header-group">
            <tr>
              <th className="border p-2">Scholarship Name</th>
              <th className="border p-2">University Name</th>
              <th className="border p-2">Subject Category</th>
              <th className="border p-2">Application Fees</th>
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
                  <span className="font-bold md:hidden">
                    Scholarship Name:{" "}
                  </span>
                  {item.scholarship_name}
                </td>

                <td className="block md:table-cell p-2">
                  <span className="font-bold md:hidden">University: </span>
                  {item.university_name}
                </td>

                <td className="block md:table-cell p-2">
                  <span className="font-bold md:hidden">Category: </span>
                  {item.subject_category}
                </td>

                <td className="block md:table-cell p-2">
                  <span className="font-bold md:hidden">Fees: </span>
                  {item.application_fees}
                </td>

                <td className="block md:table-cell p-2">
                  <button className="btn btn-sm btn-success ml-2">
                    <FaEye />
                  </button>
                  <button className="btn btn-sm bg-blue-300 ml-2">
                    <FaUserEdit />
                  </button>
                  <button className="btn btn-sm btn-error m-2">
                    <MdCancel />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isFetching && (
        <div className="font-bold text-center">Content Updating..</div>
      )}
    </div>
  );
};

export default ManageScholarships;
