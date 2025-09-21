import Public404 from "@/pages/public/public404";
import type { RouteObject } from "react-router";

export const publicRoutes: RouteObject[] = [
  {
    path: "*",
    element: <Public404 />,
  },
];
