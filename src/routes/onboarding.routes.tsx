import AuthLayout from "@/layouts/auth-layout";
import AccountType from "@/pages/onboarding/account-type";
import PersonalDetails from "@/pages/onboarding/personal-details";
import PINSetup from "@/pages/onboarding/pin-setup";
import { AuthGuard } from "@/guards/auth.guard";
import type { RouteObject } from "react-router";

export const onboardingRoutes: RouteObject[] = [
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
        element: <AuthGuard />,
        children: [
          {
            path: "pin-setup",
            element: <PINSetup />,
          },
        ],
      },
    ],
  },
];
