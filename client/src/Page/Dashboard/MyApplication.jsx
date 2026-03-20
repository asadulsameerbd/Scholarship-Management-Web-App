import React from "react";
import { FaFileAlt } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UseAuth from "../../Hook/useAuth";
import Loading from "../../Components/Common/Loading";

const MyApplication = () => {
  const { user } = UseAuth();

  const {
    data: my_applied_applications = [],

    isLoading,
  } = useQuery({
    queryKey: ["my_application", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_localhost_api}/applied_scholarship/${user?.email}`,
      );
      return res.data;
    },
    enabled: !!user?.email,
  });

  if (isLoading) {
    return <Loading />;
  }

  const myApplications = my_applied_applications;

  if (myApplications.length === 0) {
    return (
      <div className="p-5">
        <p>No applied applications submitted yet.</p>
      </div>
    );
  }

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-5">My Applications</h1>

      <div className="grid gap-4">
        {myApplications.map((app) => (
          <div
            key={app._id}
            className="border border-yellow-950 rounded p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition"
          >
            <FaFileAlt className="text-blue-500 text-2xl" />
            <div>
              <h2 className="font-semibold">{app.scholarshipName}</h2>
              <p className="text-sm text-gray-500">
                Applied on:{" "}
                {new Date(
                  app.appliedDate || app.createdAt,
                ).toLocaleDateString()}
              </p>
              <p className="text-sm">
                Status:{" "}
                <span
                  className={
                    app.status === "approved"
                      ? "text-green-500 font-semibold"
                      : app.status === "rejected"
                        ? "text-red-500 font-semibold"
                        : "text-yellow-500 font-semibold"
                  }
                >
                  {app.status || "pending"}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplication;
