import React, { useState } from "react";

const Review = ({ _id, user }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // Temporary average (replace with real data fetching later)
  const averageRating = 4.2;
  const totalReviews = 10;

  //   add a review

  const handleReview = () => {
    console.log("Click lagche bhai");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
        <p className="text-gray-600 mt-2 md:mt-0">
          Average Rating:{" "}
          <span className="font-semibold text-yellow-500">
            {averageRating.toFixed(1)} ⭐
          </span>{" "}
          ({totalReviews} reviews)
        </p>
      </div>

      {/* Add Review Form */}
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

      {/* Sample Review List (replace with real reviews later) */}
      <div className="mt-6">
        <h3 className="font-semibold text-gray-700 mb-3">Recent Reviews</h3>

        <div className="space-y-4">
          <div className="border rounded p-3">
            <p className="font-medium text-gray-800">user1@example.com</p>
            <p className="text-yellow-500 font-semibold">5 ⭐</p>
            <p className="text-gray-600">
              Excellent scholarship, highly recommended!
            </p>
          </div>

          <div className="border rounded p-3">
            <p className="font-medium text-gray-800">user2@example.com</p>
            <p className="text-yellow-500 font-semibold">4 ⭐</p>
            <p className="text-gray-600">
              Good opportunity, applied successfully.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
