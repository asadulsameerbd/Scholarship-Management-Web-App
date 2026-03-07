import React from "react";
import error from "../../../../../../component/LottieFiles/Error Page/Error in sync.json";
import Lottie from "lottie-react";
import Navbar from "../../Components/Shared/Navbar";
import { useNavigate } from "react-router";
const Error = () => {
  const navigate = useNavigate();

  const handleBtn = () => {
    navigate(-1);
  };
  return (
    <div>
      <Navbar />
      <div className="flex flex-col mt-35 items-center">
        <div>
          <Lottie className="w-20" animationData={error}></Lottie>
        </div>
        <div className="py-5">
          <h1 className="text-3xl font-kalam">
            No Data Found, You're in Wrong Route
          </h1>
        </div>
        <button onClick={handleBtn} className="btn btn-soft bg-[#F39C12]">
          Go Back
        </button>
      </div>
    </div>
  );
};

export default Error;
