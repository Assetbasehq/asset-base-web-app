import { Button } from "@/components/ui/button";
import { ChevronRight, Mail } from "lucide-react";
import { useState } from "react";
import AccountStatementModal from "../_modals/account-statement-modal";
import AccountStatementPreviewModal from "../_modals/account-statement-preview-modal";
export default function ProfileAccountStatement() {
  const [modals, setModals] = useState({
    statement: false,
    preview: false,
  });

  const toggleModal = (key: keyof typeof modals, value: boolean) =>
    setModals((prev) => ({ ...prev, [key]: value }));

  return (
    <div className="flex flex-col text-start p-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg md:text-2xl font-semibold">Account Statement</h2>
        <p className="text-muted-foreground">Generate your account statement</p>
      </div>

      <div className="flex flex-col gap-4 mt-8">
        <Button
          onClick={() => toggleModal("statement", true)}
          variant="outline"
          className="border rounded-2xl flex items-center justify-between cursor-pointer h-full w-full"
        >
          <div className="flex items-center gap-4 w-full p-1 md:p-2">
            <Mail className=" " />
            <div className="flex items-center gap-4">
              <p className="font-medium text-xs sm:text-sm md:text-lg">
                Generate Account Statement
              </p>
            </div>
          </div>
          <ChevronRight size={20} className="text-white" />
        </Button>
      </div>

      <AccountStatementModal
        isOpen={modals.statement}
        onClose={() => toggleModal("statement", false)}
        onSuccess={() => toggleModal("preview", true)}
      />

      <AccountStatementPreviewModal
        isOpen={modals.preview}
        onClose={() => toggleModal("preview", false)}
        onSuccess={() => toggleModal("preview", false)}
      />

      {/* <SuccessModal
        isOpen={modals.manualSuccess}
        onClose={() => toggleModal("manualSuccess", false)}
        title="Document Upload Successful"
        description="Your documents will be verified and your status updated soon"
        buttonText="Close"
      /> */}
    </div>
  );
}
