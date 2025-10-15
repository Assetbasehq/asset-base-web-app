import type { RouteObject } from "react-router";
import AdminLayout from "@/layouts/admin/admin.layout";
import { AdminGuard } from "@/guards/admin.guard";
import Overview from "@/pages/admin/overview/overview";
import AdminLogin from "@/pages/admin/auth/admin-login/admin-login";

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    children: [
      {
        path: "/admin/login",
        element: <AdminLogin />,
      },
      {
        path: "/admin/dashboard",
        element: <AdminGuard />,
        children: [
          {
            element: <AdminLayout />,
            children: [
              {
                index: true,
                element: <Overview />,
              },
              {
                index: true,
                element: <div>Add Liquidiy</div>,
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
