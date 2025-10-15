import { adminAuthService } from "@/api/admin/admin-auth.api";
import { useQuery } from "@tanstack/react-query";

export const useAuthAdmin = () => {
  return useQuery({
    queryKey: ["auth-admin"],
    queryFn: () => adminAuthService.getAuthAdmin(),
    retry: false,
  });
};
