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
import ScholarshipDetails from "../Page/Scholarships/ScholarshipDetails";
import AppliedScholarships from "../Page/Scholarships/AppliedScholarships";
import Review from "../Page/Review/Review";
import ManageReview from "../Page/Review/ManageReview";
import MyApplication from "../Page/Dashboard/MyApplication";
import AccessPage from "../Page/AccessPage";
import PrivateRoutes from "./PrivateRoutes";

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
      {
        path: "scholarships/:id",
        element: (
          <PrivateRoutes>
            <ScholarshipDetails />
          </PrivateRoutes>
        ),
      },

      { path: "website-access", Component: AccessPage },
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
        element: (
          <PrivateRoutes>
            <Dashboard />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/my_application",
        element: (
          <PrivateRoutes>
            <MyApplication />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/add_scholarships",
        element: (
          <PrivateRoutes>
            <AddScholarships />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/manage_scholarships",
        element: (
          <PrivateRoutes>
            <ManageScholarships />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/profile",
        element: (
          <PrivateRoutes>
            <Profile />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/update_profile/:email",
        element: (
          <PrivateRoutes>
            <UpdateProfile />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/manage_users",
        element: (
          <PrivateRoutes>
            <ManageUsers />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/applied_scholarship",
        element: (
          <PrivateRoutes>
            <AppliedScholarships />
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/manage_review",
        element: (
          <PrivateRoutes>
            <ManageReview />
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
