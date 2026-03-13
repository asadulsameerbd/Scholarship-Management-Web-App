import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import UseAuth from "../../Hook/useAuth";
import Loading from "../../Components/Common/Loading";
import Error from "../Error/Error";
import { Link } from "react-router";

const AppliedScholarships = () => {
  const { user } = UseAuth();

  const {
    data: appliedScholarships = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["appliedScholarships", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_localhost_api}/admin/applied_scholarship`,
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <Error />;

  // filter current user data
  const myApplications = appliedScholarships.filter(
    (item) => item.userEmail === user?.email,
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6 text-[#012131]">
        My Applied Scholarships
      </h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-xl">
        <table className="table w-full">
          {/* head */}
          <thead className="bg-[#012131] text-white">
            <tr>
              <th>#</th>
              <th>Scholarship</th>
              <th>University</th>
              <th>Subject</th>
              <th>Applied Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {myApplications.map((item, index) => (
              <tr key={item._id} className="hover">
                <th>{index + 1}</th>

                <td className="font-semibold">{item.scholarshipName}</td>

                <td>{item.universityName}</td>

                <td className="capitalize">{item.subjectCategory}</td>

                <td>{new Date(item.appliedDate).toLocaleDateString()}</td>

                <td>
                  <Link
                    to={`/universities/${item.scholarshipId}`}
                    className="btn btn-sm bg-[#012131] text-white hover:bg-[#F39C12]"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {myApplications.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            You haven't applied for any scholarships yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default AppliedScholarships;
