import { userService } from "@/api/user.api";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { ChevronRight, Lock, LockKeyhole } from "lucide-react";
import PasswordResetModal from "../_modals/password-reset-modal";
import { useState } from "react";
import PasswordChangeModal from "../_modals/password-change-modal";
import SuccessModal from "@/components/modals/success-modal";
import ChangePinRequestModal from "../_modals/change-pin-request-modal";
import ChangePinModal from "../_modals/change-pin-modal";
import { CustomAlert } from "@/components/custom/custom-alert";

interface ModalState {
  passwordReset: boolean;
  passwordChange: boolean;
  passwordSuccess: boolean;
  pinRequest: boolean;
  pinChange: boolean;
  pinSuccess: boolean;
}

export default function ProfileSecurity() {
  const [modals, setModals] = useState<ModalState>({
    passwordReset: false,
    passwordChange: false,
    passwordSuccess: false,
    pinRequest: false,
    pinChange: false,
    pinSuccess: false,
  });
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const openModal = (key: keyof ModalState) =>
    setModals((prev) => ({ ...prev, [key]: true }));

  const closeModal = (key: keyof ModalState) =>
    setModals((prev) => ({ ...prev, [key]: false }));

  const closeAllModals = () =>
    setModals({
      passwordReset: false,
      passwordChange: false,
      passwordSuccess: false,
      pinRequest: false,
      pinChange: false,
      pinSuccess: false,
    });

  const passwordResetMutation = useMutation({
    mutationFn: userService.RequestPasswordReset,
    onSuccess: (data) => {
      setToken(data?.token);
      openModal("passwordReset");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  const pinChangeMutation = useMutation({
    mutationFn: userService.RequestPinChange,
    onSuccess: (data) => {
      setToken(data?.token);
      openModal("passwordReset");
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  return (
    <div className="flex flex-col text-start p-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg md:text-2xl font-semibold">Security</h2>
        <p className="text-muted-foreground">Manage your account security</p>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        <Button
          disabled={passwordResetMutation.isPending}
          onClick={() => passwordResetMutation.mutateAsync()}
          variant="outline"
          className="border rounded-2xl flex items-center justify-between cursor-pointer h-full w-full"
        >
          <div className="flex items-center gap-4 w-full p-1 sm:p-2">
            <LockKeyhole />
            <p className="font-medium text-xs sm:text-sm md:text-lg">
              Password Reset
            </p>
          </div>
          <ChevronRight size={20} className="text-custom-white-text" />
        </Button>

        <Button
          disabled={pinChangeMutation.isPending}
          onClick={() => pinChangeMutation.mutateAsync()}
          variant="outline"
          className="border rounded-2xl flex items-center justify-between cursor-pointer h-full w-full"
        >
          <div className="flex items-center gap-2 w-full p-1 sm:p-2">
            <Lock />
            <p className="font-medium text-xs sm:text-sm md:text-lg">
              Change PIN
            </p>
          </div>
          <ChevronRight size={20} className="text-custom-white-text" />
        </Button>
      </div>

      {error && <CustomAlert variant="destructive" message={error} />}

      {/* Password Reset Modal */}
      <PasswordResetModal
        isOpen={modals.passwordReset}
        onClose={() => closeModal("passwordReset")}
        resendOTP={() => passwordResetMutation.mutateAsync()}
        isSendingOTP={passwordResetMutation.isPending}
        setToken={setToken}
        onSuccess={() => {
          closeModal("passwordReset");
          openModal("passwordChange");
        }}
        token={token}
      />

      {/* Password Change Modal */}
      <PasswordChangeModal
        isOpen={modals.passwordChange}
        onClose={() => closeModal("passwordChange")}
        token={token}
        onSuccess={() => {
          closeModal("passwordChange");
          openModal("passwordSuccess");
        }}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={modals.passwordSuccess}
        onClose={() => closeModal("passwordSuccess")}
        title="Your password has been changed successfully"
        description="You have successfully changed your password. Remember to store your new password safely to avoid any unauthorized access to your account."
        buttonText="BACK TO MY ACCOUNT"
      />

      {/* Change Pin Request Modal */}
      <ChangePinRequestModal
        isOpen={modals.pinRequest}
        onClose={() => closeModal("pinRequest")}
        resendOTP={() => pinChangeMutation.mutateAsync()}
        isSendingOTP={pinChangeMutation.isPending}
        setToken={setToken}
        onSuccess={() => {
          closeModal("pinRequest");
          openModal("pinChange");
        }}
        token={token}
      />

      {/* Change Pin Modal */}
      <ChangePinModal
        isOpen={modals.pinChange}
        onClose={() => closeModal("pinChange")}
        token={token}
        onSuccess={() => {
          closeModal("pinChange");
          openModal("pinSuccess");
        }}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={modals.pinSuccess}
        onClose={() => closeModal("pinSuccess")}
        title="Your PIN has been changed successfully"
        description="You have successfully changed your PIN. Remember to store your new PIN safely to avoid any unauthorized actions on your account."
        buttonText="BACK TO MY ACCOUNT"
      />
    </div>
  );
}
