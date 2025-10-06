import type { RouteObject } from "react-router";
import AdminLayout from "@/layouts/admin/admin.layout";
import { AdminGuard } from "@/guards/admin.guard";
import Overview from "@/pages/admin/overview/overview";

export const adminRoutes: RouteObject[] = [
  {
    path: "/admin",
    element: <AdminGuard />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          {
            element: <Overview />,
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
