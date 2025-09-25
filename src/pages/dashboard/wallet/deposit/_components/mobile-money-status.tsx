import { Dialog, DialogContent } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useSearchParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";

export default function MobileMoneyStatus() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const resp = searchParams.get("resp") || null;
  if (!resp) return null;

  let isSuccessful = false;

  try {
    const response = JSON.parse(resp);
    console.log({ response });
    isSuccessful = response?.status === "success";
  } catch (e) {
    console.error("Invalid response format:", e);
    isSuccessful = false;
  }

  const handleClose = () => {
    // Remove the "resp" query param while keeping the rest of the URL
    searchParams.delete("resp");
    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  return (
    <Dialog open onOpenChange={handleClose}>
      <DialogContent>
        <DialogTitle>
          {isSuccessful
            ? "Wallet funded successfully!"
            : "Wallet funding failed"}
        </DialogTitle>

        <p className={isSuccessful ? "text-green-600" : "text-red-600"}>
          {isSuccessful ? "Success" : "Failed"}
        </p>

        <div className="mt-4 flex justify-end">
          <Button
            className="w-full btn-primary rounded-full"
            onClick={handleClose}
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
