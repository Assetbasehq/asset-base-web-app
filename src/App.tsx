import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import AuthLayout from "./layouts/auth-layout";
import CreateAccount from "./pages/auth/create-account";
import Login from "./pages/auth/login";
import Onboarding404 from "./pages/onboarding/onboarding404";
import Public404 from "./pages/public/public404";
import AccountType from "./pages/onboarding/account-type";
import OnboardingLayout from "./layouts/onboarding-layout";
import ForgotPassword from "./pages/auth/forgot-password";
import CreatePassword from "./pages/auth/create-password";
import DashboardLayout from "./layouts/dashboard-layout";
import DashboardHome from "./pages/dashboard/dashboardHome/dashboard-home";
import Wallet from "./pages/dashboard/waalet/wallet";
import Markets from "./pages/dashboard/markets/markets";
import Liquidity from "./pages/dashboard/liquidity/liquidity";
import Portfolio from "./pages/dashboard/portfolio/portfolio";

function App() {
  const router = createBrowserRouter([
    {
      element: <AuthLayout />,
      children: [
        {
          path: "/",
          element: <CreateAccount />,
        },
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      children: [
        {
          path: "register",
          element: <CreateAccount />,
        },
        {
          path: "login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/auth",
      element: <OnboardingLayout />,
      children: [
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "create-password",
          element: <CreatePassword />,
        },
        {
          path: "*",
          element: <Public404 />,
        },
      ],
    },
    // {
    //   path: "/onboarding",
    //   element: <OnboardingLayout />,
    //   children: [
    //     {
    //       path: "account-type",
    //       element: <AccountType />,
    //     },
    //     {
    //       path: "*",
    //       element: <Onboarding404 />,
    //     },
    //   ],
    // },

    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          path: "",
          element: <DashboardHome />,
        },
        {
          path: "wallet",
          element: <Wallet />,
        },
        {
          path: "markets",
          element: <Markets />,
        },
        {
          path: "liquidity",
          element: <Liquidity />,
        },
        {
          path: "portfolio",
          element: <Portfolio />,
        },
        {
          path: "*",
          element: <Onboarding404 />,
        },
      ],
    },
    {
      path: "*",
      element: <Public404 />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
