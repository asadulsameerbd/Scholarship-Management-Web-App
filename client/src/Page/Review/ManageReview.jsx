import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Swal from "sweetalert2";
import Loading from "../../Components/Common/Loading";

const ManageReview = () => {
  const queryClient = useQueryClient();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["allReviews"],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_localhost_api}/reviews`,
      );
      return res.data;
    },
  });

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This review will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
    });

    if (confirm.isConfirmed) {
      await axios.delete(`${import.meta.env.VITE_localhost_api}/reviews/${id}`);

      queryClient.invalidateQueries(["allReviews"]);

      Swal.fire("Deleted!", "Review deleted successfully", "success");
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Manage Reviews</h1>

      {reviews.length === 0 ? (
        <p>No reviews found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th>#</th>
                <th>Reviewer</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Scholarship ID</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((review, index) => (
                <tr key={review._id}>
                  <td>{index + 1}</td>
                  <td>{review.reviewer}</td>
                  <td className="text-yellow-500 font-semibold">
                    {review.rating} ⭐
                  </td>
                  <td>{review.comment}</td>
                  <td>{review.scholarshipId}</td>

                  <td>
                    <button
                      onClick={() => handleDelete(review._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageReview;
