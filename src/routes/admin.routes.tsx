import type { RouteObject } from "react-router";
import AdminLayout from "@/layouts/admin/admin.layout";
import { AdminGuard } from "@/guards/admin.guard";
import Overview from "@/pages/admin/overview/overview";
import AdminLogin from "@/pages/admin/auth/admin-login/admin-login";
import Users from "@/pages/admin/users/users";
import Assets from "@/pages/admin/assets/assets";
import Referrals from "@/pages/admin/referrals/referrals";
import Liquidity from "@/pages/admin/liquidity/liquidity";
import Campaigns from "@/pages/admin/campaigns/campaigns";
import Analytics from "@/pages/admin/analytics/analytics";
import FinancialReports from "@/pages/admin/financial-reports/financial-reports";

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    children: [
      {
        path: "login",
        element: <AdminLogin />,
      },
      {
        path: "dashboard",
        element: <AdminGuard />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {
                index: true,
                // path: "overview",
                element: <Overview />,
              },
              {
                path: "users",
                element: <Users />,
              },
              {
                path: "assets",
                element: <Assets />,
              },
              {
                path: "liquidity",
                element: <Liquidity />,
              },
              {
                path: "referrals",
                element: <Referrals />,
              },
              {
                path: "campaigns",
                element: <Campaigns />,
              },
              {
                path: "analytics",
                element: <Analytics />,
              },
              {
                path: "financial-reports",
                element: <FinancialReports />,
              },
              {
                path: "*",
                element: <div>404</div>,
              },
            ],
          },
        ],
      },
      {
        path: "*",
        element: <div>404</div>,
      },
    ],
  },
];
