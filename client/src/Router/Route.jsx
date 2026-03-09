import { createBrowserRouter } from "react-router";
import MainLayout from "../layout/MainLayout";
import Home from "../Page/Home/Home";
import Scholarships from "../Page/Scholarships/Scholarships";
import About from "../Page/About/About";
import Error from "../Page/Error/Error";

import Universities from "../Page/Universities/Universities";
import SignIn from "../Page/Auth/SignIn";
import Registration from "../Page/Auth/Registration";
import AuthLayout from "../layout/AuthLayout";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../Page/Dashboard/Dashboard";
import AddScholarships from "../Page/AddScholarships";
import ManageScholarships from "../Page/ManageScholarships";
import Profile from "../Page/Dashboard/Admin/Profile";
import UpdateProfile from "../Page/Dashboard/Admin/UpdateProfile";
import ManageUsers from "../Page/Dashboard/Admin/ManageUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <Error />,
    children: [
      { index: true, Component: Home },

      // all scholarships page
      {
        path: "scholarships",

        Component: Scholarships,
      },

      { path: "universities", Component: Universities },
      // scholarships details page

      { path: "about", Component: About },
    ],
  },

  // authentication route
  {
    path: "/auth",
    Component: AuthLayout,
    children: [
      {
        path: "/auth/signIn",
        Component: SignIn,
      },
      {
        path: "/auth/registration",
        Component: Registration,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      {
        index: true,
        Component: Dashboard,
      },
      {
        path: "/dashboard/add_scholarships",
        Component: AddScholarships,
      },
      {
        path: "/dashboard/manage_scholarships",
        Component: ManageScholarships,
      },
      {
        path: "/dashboard/profile",
        Component: Profile,
      },
      {
        path: "/dashboard/update_profile/:email",
        Component: UpdateProfile,
      },
      {
        path: "/dashboard/manage_users",
        Component: ManageUsers,
      },
    ],
  },
]);
