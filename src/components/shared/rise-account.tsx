import riselogo from "@/assets/images/rise-r-logo.png";
import { Button } from "@/components/ui/button";
import riseLink from "@/assets/images/rise-link.svg";
import { useState } from "react";
import { LinkRiseModal } from "./_modals/link-rise-modal";
import { useAuthStore } from "@/store/auth-store";
import { useGetExternalWallets } from "@/hooks/use-external-wallets";
import { FormatService } from "@/services/format-service";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { externalWalletService } from "@/api/external-wallets.api";

export function RiseAccount({ currency }: { currency: "ngn" | "usd" }) {
  const [open, setOpen] = useState(false);

  const { user } = useAuthStore();

  const navigate = useNavigate();

  const {
    data: riseWallet,
    isLoading,
    isError,
    refetch,
  } = useGetExternalWallets({
    fetch_balance: "true",
    currency: "usd",
    wallet_type: "api_vendor",
    provider: "risevest",
  });

  const createRiseWalletMutation = useMutation({
    mutationFn: () =>
      externalWalletService.createExternalWallet({
        currency,
        provider: "risevest",
        wallet_type: "api_vendor",
        details: {
          token: Math.floor(Math.random() * 10 ** 10 + 1).toString(36),
        },
      }),
    onSuccess: (data) => {
      console.log(`Rise Walet Created`);
      console.log({ data });
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center">
        <p>Something went wrong</p>
      </div>
    );
  }

  if (riseWallet && riseWallet?.items?.length < 1) {
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
          onSuccess={() => {
            createRiseWalletMutation.mutateAsync();
            refetch();
          }}
        />
      </div>
    );
  }

  if (!riseWallet || riseWallet?.items?.length < 1) {
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
          onSuccess={() => {
            createRiseWalletMutation.mutateAsync();
            refetch();
          }}
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center text-center my-12">
      <Button className="flex items-center justify-between gap-4 w-full bg-custom-rise-green py-10 hover:bg-custom-rise-green/90">
        <div>
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
          <p className="">
            {FormatService.formatCurrency(riseWallet?.items[0]?.balance, "usd")}
          </p>
        </div>
        {/* <Button
          variant="ghost"
          className="flex items-center gap-2 cursor-pointer"
        >
          <p className="text-custom-grey">Logout</p>
          <RiArrowDownSLine className="text-custom-grey" />
        </Button> */}
      </Button>
    </div>
  );
}
