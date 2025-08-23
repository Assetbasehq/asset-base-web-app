import { Badge } from "@/components/ui/badge";
import { ChevronRight, Mail, User } from "lucide-react";
import ConfirmEmailModal from "../_modals/confirm-email-modal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { userService } from "@/api/user.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { EmailSuccessDialog } from "../_modals/email-success";
import { getUserVerificationStatus } from "@/hooks/useVerification";
import { cn } from "@/lib/utils";

export default function ProfileKYC() {
  const [showConfirmEmailModal, setShowConfirmEmailModal] = useState(false);
  const [showEmailSuccessModal, setShowEmailSuccessModal] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { data, isLoading, isError } = getUserVerificationStatus();

  const openConfirmModal = () => setShowConfirmEmailModal(true);
  const closeConfirmModal = () => setShowConfirmEmailModal(false);

  const openEmailSuccessModal = () => setShowEmailSuccessModal(true);
  const closeEmailSuccessModal = () => {
    queryClient.invalidateQueries({
      queryKey: ["email-verification-status"],
    });
    setShowEmailSuccessModal(false);
    closeConfirmModal();
  };

  const swapModal = () => {
    setShowConfirmEmailModal(false);
    setShowEmailSuccessModal(true);
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: userService.makeEmailVerificationRequest,
    onSuccess: (data) => {
      console.log({ data });
      setToken(data?.metadata?.token);
      openConfirmModal();
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  const emailVerificationStatus = "completed";
  const IDVerificationStatus = "pending";

  return (
    <div className="flex flex-col text-start p-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg md:text-2xl font-semibold">KYC</h2>
        <p>The SEC requires that we verify a valid means of ID</p>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <Button
          disabled={isPending || data?.email_status === "verified" || isError}
          onClick={() => mutateAsync()}
          variant="outline"
          className="border rounded-3xl flex items-center justify-between cursor-pointer h-full w-full"
        >
          <div className="flex items-center gap-4 w-full p-4">
            <Mail className=" " />
            <div className="flex items-center gap-4">
              <p className="font-medium text-lg">Email Verification</p>
              <Badge
                className={cn(" rounded-full capitalize px-3", {
                  "text-green-500 bg-green-500/30":
                    data?.email_status === "verified",
                  "text-custom-orange bg-custom-orange/90":
                    data?.email_status === "unverified",
                })}
              >
                {data?.email_status === "verified" ? "Completed" : "Pending"}
              </Badge>
            </div>
          </div>
          <ChevronRight size={20} className="text-white" />
        </Button>

        <Button
          disabled={isPending || data?.id_status === "verified" || isError}
          variant="outline"
          className="border rounded-3xl flex items-center justify-between cursor-pointer h-full w-full"
        >
          <div className="flex items-center gap-4 w-full p-4">
            <User />
            <div className="flex items-center gap-4">
              <p className="font-medium text-lg">ID Verification</p>
              <Badge
                className={cn(" rounded-full capitalize px-3", {
                  "text-green-500 bg-green-500/30":
                    data?.id_status === "verified",
                  "text-custom-orange bg-custom-orange/10":
                    data?.id_status === "unverified",
                })}
              >
                {data?.id_status === "verified" ? "Completed" : "Pending"}
              </Badge>
            </div>
          </div>
          <ChevronRight size={20} className="text-white" />
        </Button>
      </div>

      <ConfirmEmailModal
        isOpen={showConfirmEmailModal}
        onClose={closeConfirmModal}
        onSuccess={swapModal}
        isSendingOTP={isPending}
        resendOTP={() => mutateAsync()}
        token={token ? token : ""}
      />

      <EmailSuccessDialog
        open={showEmailSuccessModal}
        onClose={() => closeEmailSuccessModal()}
      />
    </div>
  );
}
