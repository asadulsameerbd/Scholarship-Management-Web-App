import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

const AddScholarships = () => {
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const formData = new FormData();

      const imgFile = data?.university_logo[0];

      formData.append("image", imgFile);

      // upload to imgbb
      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_API}`,
        formData,
      );
      const img = imgbbRes.data.data.display_url;

      // object for database
      const scholarshipData = {
        ...data,
        university_logo: img,
      };

      // send data to database

      const res = await axios.post(
        `${import.meta.env.VITE_localhost_api}/add-scholarships`,
        scholarshipData,
      );

      (queryClient.invalidateQueries("Scholarship Uploaded"), console.log(res));

      if (res.data.result.insertedId) {
        toast.success("Scholarship Added Successfully");
      }

      // reset form after submit
      reset();
    } catch (error) {
      toast.error("Upload failed");
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-4 bg-[#001E2D]/20 h-full lg:h-screen">
      <h1 className="text-center text-sm md:text-2xl font-bold bg-[#001E2D] text-white pt-5 pb-2">
        Welcome to Add Scholarship Page
      </h1>
      <p className="text-center bg-[#001E2D] text-white text-xs pt-3 md:text-sm pb-5">
        Please fill up the information to Add a Scholarship
      </p>

      <div className="pt-10 mx-2 lg:mx-0">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-center items-start lg:h-125 w-full "
        >
          <div className="card bg-base-100 w-full max-w-4xl  shadow-lg ">
            <div className="card-body">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Left Side */}
                <div className="flex-1 flex flex-col gap-3">
                  <label className="label font-semibold">
                    Scholarship Name
                  </label>
                  <input
                    type="text"
                    {...register("scholarship_name")}
                    className="input input-bordered w-full"
                    placeholder="Scholarship Name"
                  />

                  <label className="label font-semibold">University Name</label>
                  <input
                    type="text"
                    {...register("university_name")}
                    className="input input-bordered w-full"
                    placeholder="University Name"
                  />

                  <label className="label font-semibold">
                    University Image/Logo
                  </label>
                  <input
                    type="file"
                    {...register("university_logo")}
                    className="input input-bordered w-full"
                  />

                  <label className="label font-semibold">
                    University Country
                  </label>
                  <input
                    type="text"
                    {...register("university_country")}
                    className="input input-bordered w-full"
                    placeholder="University Country"
                  />

                  <label className="label font-semibold">University City</label>
                  <input
                    type="text"
                    {...register("university_city")}
                    className="input input-bordered w-full"
                    placeholder="University City"
                  />

                  <label className="label font-semibold">
                    University World Rank
                  </label>
                  <input
                    type="number"
                    {...register("university_rank")}
                    className="input input-bordered w-full"
                    placeholder="University World Rank"
                  />
                </div>

                {/* Right Side */}
                <div className="flex-1 flex flex-col gap-3">
                  <label className="label font-semibold">
                    Subject Category
                  </label>
                  <select
                    {...register("subject_category")}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="agriculture">Agriculture</option>
                    <option value="engineering">Engineering</option>
                    <option value="doctor">Doctor</option>
                  </select>

                  <label className="label font-semibold">
                    Scholarship Category
                  </label>
                  <select
                    {...register("scholarship_category")}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="full-fund">Full Fund</option>
                    <option value="partial">Partial</option>
                    <option value="self-fund">Self Fund</option>
                  </select>

                  <label className="label font-semibold">Degree</label>
                  <select
                    {...register("degree")}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="diploma">Diploma</option>
                    <option value="bachelors">Bachelors</option>
                    <option value="masters">Masters</option>
                  </select>

                  <label className="label font-semibold">Tution Fees</label>
                  <input
                    type="number"
                    {...register("tution_fees")}
                    className="input input-bordered w-full"
                    placeholder="Enter Tution Fees"
                  />

                  <label className="label font-semibold">
                    Application Fees
                  </label>
                  <input
                    type="number"
                    {...register("application_fees")}
                    className="input input-bordered w-full"
                    placeholder="Enter Application Fees"
                  />
                  <label className="label font-semibold">
                    Application Deadline
                  </label>
                  <input
                    type="date"
                    {...register("application_deadline")}
                    className="input input-bordered w-full"
                    placeholder="Enter Application Fees"
                  />

                  <label className="label font-semibold">Service Charge</label>
                  <input
                    type="number"
                    {...register("service_charge")}
                    className="input input-bordered w-full"
                    placeholder="Enter Service Charge"
                  />

                  <button
                    type="submit"
                    className="btn bg-black text-white btn-soft transition-all duration-100 hover:scale-102 hover:bg-yellow-400 hover:text-black mt-4 w-full"
                  >
                    {isSubmitting ? "Adding Scholarship..." : "Add Scholarship"}
                  </button>

                  <ToastContainer />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddScholarships;
