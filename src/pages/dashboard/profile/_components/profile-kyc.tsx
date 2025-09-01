import { Badge } from "@/components/ui/badge";
import { ChevronRight, Mail, User } from "lucide-react";
import ConfirmEmailModal from "../_modals/confirm-email-modal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { userService } from "@/api/user.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserVerificationStatus } from "@/hooks/useVerification";
import { cn } from "@/lib/utils";
import IDVerification from "../_modals/id-verification";
import ManualVerification from "../_modals/manual-verification";
import SuccessModal from "@/components/modals/success-modal";
import { Skeleton } from "@/components/ui/skeleton";
import DojahKycModal from "../_modals/dojah-kyc-modal";

export default function ProfileKYC() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useUserVerificationStatus();

  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<Record<string, any> | null>(null);
  const [modals, setModals] = useState({
    confirmEmail: false,
    emailSuccess: false,
    idVerification: false,
    manualVerification: false,
    emailVerified: false,
    manualSuccess: false,
    dojah: false,
    dojahSuccess: false,
  });

  const toggleModal = (key: keyof typeof modals, value: boolean) =>
    setModals((prev) => ({ ...prev, [key]: value }));

  const { mutateAsync, isPending } = useMutation({
    mutationFn: userService.makeEmailVerificationRequest,
    onSuccess: (res) => {      
      setToken(res?.metadata?.token ?? "");
      toggleModal("confirmEmail", true);
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  const handleEmailSuccess = () => {
    toggleModal("confirmEmail", false);
    toggleModal("emailSuccess", true);
    queryClient.invalidateQueries({ queryKey: ["email-verification-status"] });
  };

  const handleManualSuccess = () => {
    toggleModal("manualVerification", false);
    toggleModal("manualSuccess", true);
  };

  return (
    <div className="flex flex-col text-start p-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg md:text-2xl font-semibold">KYC</h2>
        <p className="text-muted-foreground">
          The SEC requires that we verify a valid means of ID
        </p>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <Button
          // disabled={isPending || data?.email_status === "verified" || isError}
          disabled={isPending || data?.email_status === "verified"}
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
                  "text-custom-orange bg-custom-orange/10":
                    !data || data?.email_status === "unverified" || isError,
                })}
              >
                {data?.email_status === "verified" ? "Completed" : "Pending"}
              </Badge>
            </div>
          </div>
          <ChevronRight size={20} className="text-custom-white-text" />
        </Button>

        <Button
          // disabled={isPending || data?.id_status === "verified" || isError}
          disabled={isPending || data?.id_status === "verified"}
          onClick={() => toggleModal("idVerification", true)}
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
                    !data || data?.id_status === "unverified",
                })}
              >
                {data?.id_status === "verified" ? "Completed" : "Pending"}
              </Badge>
            </div>
          </div>
          <ChevronRight size={20} className="text-custom-white-text" />
        </Button>
      </div>

      <DojahKycModal
        isOpen={modals.dojah}
        onClose={() => toggleModal("dojah", false)}
        userData={userData}
      />

      <ConfirmEmailModal
        isOpen={modals.confirmEmail}
        onClose={() => toggleModal("confirmEmail", false)}
        onSuccess={handleEmailSuccess}
        isSendingOTP={isPending}
        resendOTP={() => mutateAsync()}
        token={token}
      />

      <IDVerification
        isOpen={modals.idVerification}
        onClose={() => toggleModal("idVerification", false)}
        setUserData={setUserData}
        switchToManual={() => {
          toggleModal("idVerification", false);
          toggleModal("manualVerification", true);
        }}
        switchToDojah={() => {
          // toggleModal("idVerification", false);
          toggleModal("dojah", true);
        }}
      />

      <ManualVerification
        isOpen={modals.manualVerification}
        onClose={() => toggleModal("manualVerification", false)}
        onSuccess={handleManualSuccess}
      />

      <SuccessModal
        isOpen={modals.emailVerified}
        onClose={() => toggleModal("emailVerified", false)}
        title="Email Verified"
        description="Your email has been verified successfully"
        buttonText="Okay"
      />

      <SuccessModal
        isOpen={modals.manualSuccess}
        onClose={() => toggleModal("manualSuccess", false)}
        title="Document Upload Successful"
        description="Your documents will be verified and your status updated soon"
        buttonText="Close"
      />
    </div>
  );
}

function ProfileKYCSkeleton() {
  return (
    <div className="flex flex-col text-start p-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg md:text-2xl font-semibold">KYC</h2>
        <p>The SEC requires that we verify a valid means of ID</p>
      </div>
      <div className="space-y-4 mt-8">
        <div className="border rounded-3xl flex items-center justify-between h-full w-full p-2">
          <div className="flex items-center gap-4 w-full p-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-32 rounded-md" />{" "}
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-5 w-5 rounded-full mr-4" />
        </div>

        <div className="border rounded-3xl flex items-center justify-between h-full w-full p-2">
          <div className="flex items-center gap-4 w-full p-4">
            <Skeleton className="h-6 w-6 rounded-full" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-8 w-32 rounded-md" />{" "}
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </div>
          <Skeleton className="h-5 w-5 rounded-full mr-4" />
        </div>
      </div>
    </div>
  );
}
