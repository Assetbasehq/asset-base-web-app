import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import DeleteAccountPassword from "./_components/delete-account-password";
import DeleteAccountMain from "./_components/delete-account-main";
import DeleteAccountQuestions from "./_components/delete-account-questions";

export default function DeleteAccount() {
  const { user } = useAuthStore();
  const [step, setStep] = useState<"main" | "questions" | "password">("main");
  const [formData, setFormData] = useState(null);

  return (
    <div className="flex flex-col text-start p-4">
      {step === "main" && (
        <DeleteAccountMain
          onContinue={() => setStep("questions")}
          user={user}
        />
      )}

      {step === "questions" && (
        <DeleteAccountQuestions
          onBack={() => setStep("main")}
          onNext={(data: any) => {
            setFormData(data);
            setStep("password");
          }}
        />
      )}

      {step === "password" && (
        <DeleteAccountPassword
          onBack={() => setStep("questions")}
          formData={formData}
        />
      )}
    </div>
  );
}
