import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

import Swal from "sweetalert2";
import UseAuth from "../../Hook/useAuth";

const SignIn = () => {
  const { signIn } = UseAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const result = await signIn(data.email, data.password);
      console.log("result", result);
      Swal.fire({
        title: "Success !",
        text: `${result.user.email} Login Successfully`,
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: " Error !",
        text: `${error.message}`,
        icon: "error",
      });
    }
  };
  return (
    <div className="hero bg-base-200 h-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">
            Sign in <span className="text-yellow-500">now!</span>{" "}
          </h1>
          <p className="py-6">
            Please Sign to be our Student and get all information
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)} className="fieldset">
              <label className="label">Email</label>
              <input
                {...register("email", {
                  required: "Email Required ",
                })}
                type="email"
                className="input"
                placeholder="Email"
              />

              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
              <label className="label">Password</label>
              <input
                {...register("password", {
                  required: "Enter a valid Password",
                })}
                type="password"
                className="input"
                placeholder="Password"
              />

              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}

              <button className="btn btn-neutral mt-4">Sign In</button>
            </form>
            <p>
              Don't have an Account, Please{" "}
              <Link
                className="text-yellow-500 font-bold underline"
                to="/auth/registration"
              >
                Registration
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
