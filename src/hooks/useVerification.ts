import { userService } from "@/api/user.api";
import { useQuery } from "@tanstack/react-query";

export const getUserVerificationStatus = () => {
  return useQuery<
    {
      account_id: string;
      email_status: "verified" | "unverified";
      id_status: "verified" | "unverified";
    },
    Error
  >({
    queryKey: ["email-verification-status"],
    queryFn: () => userService.getUserVerificationStatus(),
  });
};
