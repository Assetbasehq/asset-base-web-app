import { createBrowserRouter, RouterProvider } from "react-router";
import "./App.css";
import AuthLayout from "./layouts/auth-layout";
import CreateAccount from "./pages/auth/create-account";
import Login from "./pages/auth/login";
import Onboarding404 from "./pages/onboarding/onboarding404";
import Public404 from "./pages/public/public404";
import OnboardingLayout from "./layouts/onboarding-layout";
import ForgotPassword from "./pages/auth/forgot-password";
import CreatePassword from "./pages/auth/create-password";
import DashboardLayout from "./layouts/dashboard-layout";
import DashboardHome from "./pages/dashboard/dashboardHome/dashboard-home";
import Wallet from "./pages/dashboard/wallet/wallet";
import Markets from "./pages/dashboard/markets/markets";
import Liquidity from "./pages/dashboard/liquidity/liquidity";
import Portfolio from "./pages/dashboard/portfolio/portfolio";
import AvailableLiquidity from "./pages/dashboard/liquidity/_components/available-liquidity";
import MyInvestments from "./pages/dashboard/liquidity/_components/my-investments";
import MyAssets from "./pages/dashboard/portfolio/_components/my-assets";
import Watchlist from "./pages/dashboard/portfolio/_components/watchlist";
import Matured from "./pages/dashboard/portfolio/_components/matured";
import Profile from "./pages/dashboard/profile/profile";
import ProfileLeaderboard from "./pages/dashboard/profile/_components/profile-leaderboard";
import ProfileKYC from "./pages/dashboard/profile/_components/profile-kyc";
import ProfileSecurity from "./pages/dashboard/profile/_components/profile-security";
import ProfileReferrals from "./pages/dashboard/profile/_components/profile-referrals";
import ProfileAccountStatement from "./pages/dashboard/profile/_components/profile-account-statement";
import ProfileDeleteAccount from "./pages/dashboard/profile/_components/profile-delete-account";
import ProfileInvestmentCertificate from "./pages/dashboard/profile/_components/profile-investment-certificate";
import ProfileContactUs from "./pages/dashboard/profile/_components/profile-contact-us";
import ProfilePage from "./pages/dashboard/profile/_components/profile-page";
import { AuthGuard } from "./guards/auth.guard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AccountType from "./pages/onboarding/account-type";
import PersonalDetails from "./pages/onboarding/personal-details";
import PINSetup from "./pages/onboarding/pin-setup";

const queryClient = new QueryClient();

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
    {
      path: "/onboarding",
      element: <AuthLayout />,
      children: [
        {
          path: "account-type",
          element: <AccountType />,
        },
        {
          path: "personal-details",
          element: <PersonalDetails />,
        },
        {
          path: "setup-pin",
          element: <PINSetup />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <AuthGuard />,
      children: [
        {
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
              children: [
                {
                  path: "",
                  element: <AvailableLiquidity />,
                },
                {
                  path: "my-investments",
                  element: <MyInvestments />,
                },
              ],
            },
            {
              path: "portfolio",
              element: <Portfolio />,
              children: [
                {
                  path: "",
                  element: <MyAssets />,
                },
                {
                  path: "watchlist",
                  element: <Watchlist />,
                },
                {
                  path: "matured",
                  element: <Matured />,
                },
              ],
            },
            {
              path: "profile",
              element: <Profile />,
              children: [
                {
                  path: "",
                  element: <ProfilePage />,
                },
                {
                  path: "leaderboard",
                  element: <ProfileLeaderboard />,
                },
                {
                  path: "kyc",
                  element: <ProfileKYC />,
                },
                {
                  path: "security",
                  element: <ProfileSecurity />,
                },
                {
                  path: "referrals",
                  element: <ProfileReferrals />,
                },
                {
                  path: "account-statement",
                  element: <ProfileAccountStatement />,
                },
                {
                  path: "investment-certificate",
                  element: <ProfileInvestmentCertificate />,
                },
                {
                  path: "contact-us",
                  element: <ProfileContactUs />,
                },
                {
                  path: "delete-account",
                  element: <ProfileDeleteAccount />,
                },
              ],
            },
            {
              path: "*",
              element: <Onboarding404 />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <Public404 />,
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} />
      )}
    </QueryClientProvider>
  );
}

export default App;
