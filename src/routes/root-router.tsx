import { createBrowserRouter, type RouteObject } from "react-router";
import { authRoutes } from "./auth.routes";
import { onboardingRoutes } from "./onboarding.routes";
import { publicRoutes } from "./public.routes";
import { dashboardRoutes } from "./dashboard.routes";

const routes: RouteObject[] = [
  ...authRoutes,
  ...onboardingRoutes,
  ...dashboardRoutes,
  ...publicRoutes,
];

export const router = createBrowserRouter(routes);
