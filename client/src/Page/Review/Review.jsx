import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import "react-toastify/dist/ReactToastify.css";

const Review = ({ _id, user }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient(); // React Query refetch

  // Fetch reviews
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews", _id],
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_localhost_api}/reviews/${_id}`,
      );
      return res.data;
    },
  });

  // Average rating
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  const totalReviews = reviews.length;

  // Add review
  const handleReview = async () => {
    if (!comment) {
      toast.error("Please Add a Comment");
      return;
    }

    const reviewData = {
      scholarshipId: _id,
      rating,
      comment,
      reviewer: user?.email || "Anonymous",
    };

    try {
      await axios.post(
        `${import.meta.env.VITE_localhost_api}/reviews`,
        reviewData,
      );

      // refetch reviews instantly
      queryClient.invalidateQueries(["reviews", _id]);

      Swal.fire({
        title: "Success!",
        text: "Review Added Successfully",
        icon: "success",
      });

      setComment("");
      setRating(5);
    } catch (err) {
      console.log(err);
      toast.error("Failed to add review");
    }
  };

  if (isLoading) return <p>Loading reviews...</p>;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
        <p className="text-gray-600 mt-2 md:mt-0">
          Average Rating:
          <span className="font-semibold text-yellow-500 ml-1">
            {averageRating.toFixed(1)} ⭐
          </span>
          ({totalReviews} reviews)
        </p>
      </div>

      {/* Add Review */}
      <div className="border-t border-gray-200 pt-4 mt-4">
        <h3 className="font-semibold mb-2 text-gray-700">Add Your Review</h3>

        <div className="flex items-center gap-4 mb-3">
          <label className="text-gray-600 font-medium">Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border rounded px-3 py-1 outline-none"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} ⭐
              </option>
            ))}
          </select>
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write your comment..."
          className="w-full border border-gray-300 rounded p-3 mb-3 outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
        />

        <button
          onClick={handleReview}
          className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-white font-semibold px-6 py-2 rounded shadow"
        >
          Add Comment
        </button>
      </div>

      {/* Reviews List */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-700 mb-3">Recent Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="border rounded p-3">
                <p className="font-medium text-gray-800">{review.reviewer}</p>
                <p className="text-yellow-500 font-semibold">
                  {review.rating} ⭐
                </p>
                <p className="text-gray-600">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default Review;
