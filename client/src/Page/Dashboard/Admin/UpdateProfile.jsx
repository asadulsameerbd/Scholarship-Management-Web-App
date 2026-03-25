import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Loading from "../../../Components/Common/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router";
import UseAuth from "../../../Hook/useAuth";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../Firebase/init_firebase";

const UpdateProfile = () => {
  const { email } = useParams();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser } = UseAuth();

  // Fetch user data
  const { data, isLoading, error } = useQuery({
    queryKey: ["updateProfile", email],
    enabled: !!email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_localhost_api}/users/${email}`,
        { withCredentials: true },
      );
      return res.data;
    },
  });

  if (isLoading) return <Loading />;
  if (error) {
    toast.error(error.message);
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const form = e.target;
      const name = form.name.value;

      const imgFile = form.photo.files[0];

      let photoURL = data?.photo || ""; // default old photo

      // যদি user নতুন photo upload করে
      if (imgFile) {
        const formData = new FormData();
        formData.append("image", imgFile);

        const imgbbRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_API}`,
          formData,
        );

        photoURL = imgbbRes.data.data.display_url;
      }

      // Updated user object
      const updatedUser = {
        displayName: name,
        photo: photoURL,
      };

      // Send update request to backend
      await axios.patch(
        `${import.meta.env.VITE_localhost_api}/users/${email}`,
        updatedUser,
        { withCredentials: true },
      );

      // Refetch updated data
      queryClient.invalidateQueries(["updateProfile", email]);

      // update firebase profile
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photoURL,
      });

      // update context

      setUser((prev) => ({
        ...prev,
        displayName: name,
        photoURL: photoURL,
      }));

      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Profile update failed!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className="text-center text-sm md:text-2xl font-bold bg-[#001E2D] text-white pt-5 pb-2">
        Update Your Profile
      </h1>
      <p className="text-center bg-[#001E2D] text-white text-xs pt-3 md:text-sm pb-5">
        Fill in the information below to update your profile
      </p>

      <div className="flex justify-center py-5 md:py-10 lg:pt-20">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <h1 className="font-bold text-center text-2xl py-3">
                Update Profile Info
              </h1>

              <label className="label">Update Profile Photo</label>
              <input type="file" className="input" name="photo" />

              <label className="label">Update Your Name</label>
              <input
                type="text"
                className="input"
                name="name"
                defaultValue={data?.displayName || data?.name || ""}
                required
              />

              <div className="flex items-center justify-between gap-2">
                <button
                  type="submit"
                  className="btn btn-neutral mt-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Update Profile"}
                </button>
                <div className="mt-4">
                  <Link to="/dashboard/profile" className="btn btn-soft">
                    Back
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UpdateProfile;
