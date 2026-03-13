import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";

const UseAuth = () => {
  const { loading, logOut, user, setUser, createUser, signIn, setIsLoading } =
    useContext(AuthContext);

  const { data: role, isLoading } = useQuery({
    queryKey: ["userRole", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `${import.meta.env.VITE_localhost_api}/users/${user.email}`,
      );
      return res.data.role;
    },
  });

  return {
    user,
    setUser,
    createUser,
    signIn,
    setIsLoading,
    role,
    logOut,
    isLoading: loading || isLoading,
  };
};

export default UseAuth;
