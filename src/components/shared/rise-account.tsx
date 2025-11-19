import riselogo from "@/assets/images/rise-r-logo.png";
import { Button } from "@/components/ui/button";
import riseLink from "@/assets/images/rise-link.svg";
import { RiArrowDownSLine } from "react-icons/ri";
import { CustomAlert } from "../custom/custom-alert";
import { useState } from "react";
import { LinkRiseModal } from "./_modals/link-rise-modal";
import { useAuthStore } from "@/store/auth-store";

interface RiseAccountProps {
  isLinked: boolean;
  onSuccess: () => void;
}

export function RiseAccount({ isLinked, onSuccess }: RiseAccountProps) {
  const [open, setOpen] = useState(false);

  const { user } = useAuthStore();

  if (!isLinked) {
    return (
      <div className="flex flex-col items-center gap-4 text-center my-12">
        <img src={riseLink} alt="rise" className="w-28 h-28" />
        <h2 className="text-sm font-medium max-w-sm text-custom-grey">
          Your Rise account is not yet linked. Link your account to have access
          to your wallet
        </h2>
        <Button
          onClick={() => setOpen(true)}
          className="btn-primary rounded-full py-6 w-full"
        >
          Link Rise Account
        </Button>
        <LinkRiseModal
          open={open}
          onOpenChange={setOpen}
          onSuccess={onSuccess}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center my-12">
      <Button className="flex items-center justify-between gap-4 w-full bg-custom-rise-green py-10 hover:bg-custom-rise-green/90">
        <div className="flex items-center gap-2 text-custom-grey">
          <img
            src={riselogo}
            alt="rise"
            className="w-12 h-12 bg-custom-card p-2 rounded-full"
          />
          <p className="font-medium">
            {user?.metadata?.rise_username || user?.email_address}
          </p>
        </div>
        <Button
          variant="ghost"
          className="flex items-center gap-2 cursor-pointer"
        >
          <p className="text-custom-grey">Logout</p>
          <RiArrowDownSLine className="text-custom-grey" />
        </Button>
      </Button>
    </div>
  );
}
