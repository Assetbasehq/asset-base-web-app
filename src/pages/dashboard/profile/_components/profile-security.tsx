import { userService } from "@/api/user.api";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { ChevronRight, Lock, LockKeyhole } from "lucide-react";
import PasswordResetModal from "../_modals/password-reset-modal";
import { useState } from "react";
import PasswordChangeModal from "../_modals/password-change-modal";
import SuccessModal from "@/components/modals/success-modal";

export default function ProfileSecurity() {
  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] =
    useState(false);
  const [isPasswordChangeModalOpen, setIsPasswordChangeModalOpen] =
    useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  const openPasswordResetModal = () => {
    setIsPasswordResetModalOpen(true);
  };

  const closePasswordResetModal = () => {
    setIsPasswordResetModalOpen(false);
  };

  const openPasswordChangeModal = () => {
    closePasswordResetModal();
    setIsPasswordChangeModalOpen(true);
  };

  const closePasswordChangeModal = () => {
    setIsPasswordChangeModalOpen(false);
  };

  const openSuccessModal = () => {
    closePasswordChangeModal();
    setShowSuccessModal(true);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const { mutateAsync: sendOTP, isPending } = useMutation({
    mutationFn: userService.RequestPasswordReset,
    onSuccess: (data) => {
      console.log({ data });
      openPasswordResetModal();
      setToken(data?.token);
      // setToken(data?.metadata?.token);
      // openConfirmModal();
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  return (
    <div className="flex flex-col text-start p-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg md:text-2xl font-semibold">Security</h2>
        <p>Manage your account security</p>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <Button
          disabled={isPending}
          onClick={() => sendOTP()}
          variant="outline"
          className="border rounded-3xl flex items-center justify-between cursor-pointer h-full w-full"
        >
          <div className="flex items-center gap-4 w-full p-4">
            <LockKeyhole className=" " />
            <div className="flex items-center gap-4">
              <p className="font-medium text-lg">Password Reset</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-white" />
        </Button>

        <Button
          disabled={isPending}
          variant="outline"
          className="border rounded-3xl flex items-center justify-between cursor-pointer h-full w-full"
        >
          <div className="flex items-center gap-4 w-full p-4">
            <Lock />
            <div className="flex items-center gap-4">
              <p className="font-medium text-lg">Change PIN</p>
            </div>
          </div>
          <ChevronRight size={20} className="text-white" />
        </Button>
      </div>

      <PasswordResetModal
        isOpen={isPasswordResetModalOpen}
        onClose={closePasswordResetModal}
        resendOTP={() => sendOTP()}
        isSendingOTP={isPending}
        setToken={setToken}
        onSuccess={openPasswordChangeModal}
        token={token}
      />

      <PasswordChangeModal
        isOpen={isPasswordChangeModalOpen}
        onClose={() => setIsPasswordChangeModalOpen(false)}
        token={token}
        OnSuccess={openSuccessModal}
      />

      <SuccessModal
        isOpen={showSuccessModal}
        onClose={closeSuccessModal}
        title="Your password has been changed successfully"
        description="You have successfully changed your password. Remember to store your new password safely to avoid any unauthorized access to your account."
        buttonText="BACK TO MY ACCOUNT"
      />
    </div>
  );
}
