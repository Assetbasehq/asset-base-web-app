import { useQuery } from "@tanstack/react-query";
import { Navigate, Outlet, useLocation } from "react-router";
import { authService } from "@/api/auth.api";
import AuthLoader from "@/components/custom/custom-loader";

export const AuthGuard = () => {
  const location = useLocation();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["auth-user"],
    queryFn: () => authService.getUser(),
    retry: false,
  });

  if (isLoading) {
    return <AuthLoader />;
  }

  console.log({ user });
  

  if (isError || !user) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
