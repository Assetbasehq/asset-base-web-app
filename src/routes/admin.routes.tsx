import type { RouteObject } from "react-router";
import AdminLayout from "@/layouts/admin/admin.layout";
import { AdminGuard } from "@/guards/admin.guard";
import Overview from "@/pages/admin/overview/overview";
import AdminLogin from "@/pages/admin/auth/admin-login/admin-login";
import Users from "@/pages/admin/users/users";
import Assets from "@/pages/admin/assets/assets";
import Referrals from "@/pages/admin/referrals/referrals";

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
                path: "overview",
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
                path: "referrals",
                element: <Referrals />,
              },
              {
                index: true,
                element: <div>Reports</div>,
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
