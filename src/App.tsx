import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import AuthLayout from "./layouts/auth-layout";
import CreateAccount from "./pages/auth/create-account";
import Login from "./pages/auth/login";
import Onboarding404 from "./pages/onbaording/onboarding404";
import Public404 from "./pages/public/public404";
import AccountType from "./pages/onbaording/account-type";
import OnboardingLayout from "./layouts/onboarding-layout";

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
      element: <AuthLayout />,
      children: [
        {
          path: "/register",
          element: <CreateAccount />,
        },
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
    {
      path: "/onboarding",
      element: <OnboardingLayout />,
      children: [
        {
          path: "account-type",
          element: <AccountType />,
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
