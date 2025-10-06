import { createBrowserRouter, type RouteObject } from "react-router";
import { authRoutes } from "./auth.routes";
import { onboardingRoutes } from "./onboarding.routes";
import { publicRoutes } from "./public.routes";
import { dashboardRoutes } from "./dashboard.routes";
import { adminRoutes } from "./admin.routes";

const routes: RouteObject[] = [
  ...authRoutes,
  ...onboardingRoutes,
  ...dashboardRoutes,
  ...publicRoutes,
  ...adminRoutes,
];

export const router = createBrowserRouter(routes);
