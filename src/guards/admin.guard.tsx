import { Navigate, Outlet, useLocation } from "react-router";
import AuthLoader from "@/components/custom/custom-loader";
import { useAuthUser } from "@/hooks/use-auth-user";
// import { useUserVerificationStatus } from "@/hooks/useVerification";

export const AdminGuard = () => {
  const location = useLocation();

  const { data: user, isLoading, isError } = useAuthUser();
//   const { data: verificationStatus } = useUserVerificationStatus();

  if (isLoading) {
    return <AuthLoader />;
  }

  if (isError || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
