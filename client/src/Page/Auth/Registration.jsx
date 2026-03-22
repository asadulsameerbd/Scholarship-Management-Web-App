import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import UseAuth from "../../Hook/useAuth";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";
import axios from "axios";

const Registration = () => {
  const { createUser } = UseAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onsubmit = async (data) => {
    try {
      const { email, password, fullName } = data;
      const imgFile = data.file[0];
      const formData = new FormData();
      formData.append("image", imgFile);

      const imbbImg = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb_API}`,
        formData,
      );

      const img = imbbImg.data.data.display_url;

      const result = await createUser(email, password);

      await updateProfile(result.user, {
        displayName: fullName,
        photoURL: img,
      });

      // send user to backend
      const user = {
        name: fullName,
        photo: img,
        email: email,
        role: "student",
        createdAt: new Date(),
      };

      axios.post(`${import.meta.env.VITE_localhost_api}/users`, user);

      Swal.fire({
        title: "Success!",
        text: `${result.user.email} is created Successfully`,
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "error",
        text: error.message,
        icon: "error",
      });
    }
  };
  return (
    <div className="hero bg-base-200 h-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">
            Registration <span className="text-yellow-500">now!</span>{" "}
          </h1>
          <p className="py-6">
            Please Registration for all the information about scholarships apply
            and universities to know.
          </p>
        </div>

        {/* form */}
        {/* <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit(onsubmit)} className="fieldset">
              <label className="label">Full Name</label>
              <input
                {...register("fullName", { required: true })}
                type="text"
                className="input"
                placeholder="Full Name"
              />
              {errors.fullName && (
                <p className="text-red-500">Enter Your Full Name !</p>
              )}
              <label className="label">Upload photo</label>
              <input
                {...register("file", { required: true })}
                type="file"
                className="input"
                placeholder="choose a file"
              />

              {errors.file && <p className="text-red-500">Upload an image !</p>}
              <label className="label">Email</label>
              <input
                {...register("email", { required: true })}
                type="email"
                className="input"
                placeholder="Email"
              />
              {errors.email && (
                <p className="text-red-500">Email Is Required!</p>
              )}
              <label className="label">Password</label>
              <input
                {...register("password", {
                  required: "password is required !",
                  // minLength: {
                  //   value: 6,
                  //   message: "password must be 6 character",
                  // },
                  // pattern: {
                  //   value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/,
                  //   message:
                  //     "password contain one Uppercase letter, one lowercase letter and one number",
                  // },
                })}
                type="password"
                className="input"
                placeholder="Password"
              />

              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}

              <button className="btn btn-neutral mt-4">Registration</button>
            </form>
            <p>
              Already Have an Account , Please{" "}
              <Link
                className="text-yellow-500 font-bold underline"
                to="/auth/signIn"
              >
                Login
              </Link>
            </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Registration;
