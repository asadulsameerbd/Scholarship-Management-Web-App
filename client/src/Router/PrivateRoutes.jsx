import React from "react";
import UseAuth from "../Hook/useAuth";
import Loading from "../Components/Common/Loading";
import { Navigate, useLocation } from "react-router";

const PrivateRoutes = ({ children }) => {
  const { user, isLoading } = UseAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <Navigate state={{ from: location }} to={"/auth/signIn"} replace />;
  }

  return children;
};

export default PrivateRoutes;
