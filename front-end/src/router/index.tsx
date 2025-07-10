import { createBrowserRouter } from "react-router-dom";
import { paths } from "@/constants/paths";

import RootLayout from "@/layouts/RootLayout";
import AuthLayout from "@/layouts/AuthLayout";
import ProfileLayout from "@/layouts/ProfileLayout";

import HomePage from "@/pages/(business)/home";

import ErrorPage from "@/components/shared/ErrorPage";

import YoutubeServices from "@/pages/(business)/youtube";

export const router = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: "*",
        element: <ErrorPage />,
      },
      {
        path: paths.HOME,
        element: <HomePage />,
      },
      {
        path: paths.YOUTUBE,
        element: <YoutubeServices />,
      },

      {
        path: "",
        element: <AuthLayout />,
        children: [
          {
            path: "",
            element: <ProfileLayout />,
          },
        ],
      },
    ],
  },
]);
