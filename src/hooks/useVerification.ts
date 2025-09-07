import { userService } from "@/api/user.api";
import { useQuery } from "@tanstack/react-query";

interface IUserVerificationStatus {
  account_id: string;
  email_status: "verified" | "unverified";
  id_status: "verified" | "unverified";
}

export const useUserVerificationStatus = () => {
  return useQuery<IUserVerificationStatus | null | undefined, Error>({
    queryKey: ["email-verification-status"],
    queryFn: () => userService.getUserVerificationStatus(),
    retry: false,
  });
};
