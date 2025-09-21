import AuthLayout from "@/layouts/auth-layout";
import Login from "@/pages/auth/login";
import CreateAccount from "@/pages/auth/create-account";
import ForgotPassword from "@/pages/auth/forgot-password";
import CreatePassword from "@/pages/auth/create-password";
import type { RouteObject } from "react-router";

export const authRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <CreateAccount />,
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "create-password",
        element: <CreatePassword />,
      },
    ],
  },
];
