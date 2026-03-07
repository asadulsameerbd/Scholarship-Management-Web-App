import React from "react";
import { PropagateLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <PropagateLoader />;
    </div>
  );
};

export default Loading;
