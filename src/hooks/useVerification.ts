import { userService } from "@/api/user.api";
import { useQuery } from "@tanstack/react-query";

interface IUserVerificationStatus {
  account_id: string;
  email_status: "verified" | "unverified";
  id_status: "verified" | "unverified" | "pending";
}

export const useUserVerificationStatus = () => {
  return useQuery<IUserVerificationStatus | null | undefined, Error>({
    queryKey: ["verification-status"],
    queryFn: () => userService.getUserVerificationStatus(),
    retry: false,
  });
};
