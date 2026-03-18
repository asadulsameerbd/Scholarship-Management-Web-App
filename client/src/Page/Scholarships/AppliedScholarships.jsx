import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import UseAuth from "../../Hook/useAuth";
import Loading from "../../Components/Common/Loading";
import Error from "../Error/Error";

const AppliedScholarships = () => {
  const { user } = UseAuth();
  const queryClient = useQueryClient();

  const {
    data: appliedScholarships = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["appliedScholarships", user?.email],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_localhost_api}/applied_scholarship`,
      );
      return res.data;
    },
  });

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_localhost_api}/applied_scholarship/${id}`,
        { status },
      );

      queryClient.invalidateQueries(["appliedScholarships", user?.email]);
    } catch (error) {
      console.log(error);
    }
  };

  // sorted
  const sortApplication = [...appliedScholarships].sort(
    (a, b) => new Date(b.appliedDate) - new Date(a.appliedDate),
  );

  if (isLoading) return <Loading />;
  if (error) return <Error />;

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
            {sortApplication.map((item, index) => (
              <tr key={item._id} className="hover">
                <th>{index + 1}</th>

                <td className="font-semibold">{item.scholarshipName}</td>

                <td>{item.universityName}</td>

                <td className="capitalize">{item.subjectCategory}</td>

                <td>{new Date(item.appliedDate).toLocaleDateString()}</td>

                <td>
                  <select
                    className="select select-sm bg-[#012131] text-white"
                    value={item.status || "pending"}
                    onChange={(e) =>
                      handleStatusChange(item._id, e.target.value)
                    }
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {appliedScholarships.length === 0 && (
          <p className="text-center py-6 text-gray-500">
            You haven't applied for any scholarships yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default AppliedScholarships;
