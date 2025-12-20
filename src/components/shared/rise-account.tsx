import riselogo from "@/assets/images/rise-r-logo.png";
import { Button } from "@/components/ui/button";
import riseLink from "@/assets/images/rise-link.svg";
import { useState } from "react";
import { LinkRiseModal } from "./_modals/link-rise-modal";
import { useAuthStore } from "@/store/auth-store";
import { useGetExternalWallets } from "@/hooks/use-external-wallets";
import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { externalWalletService } from "@/api/external-wallets.api";
import { RiArrowRightSLine } from "react-icons/ri";
import { formatService } from "@/services/format-service";

export function RiseAccount({
  currency,
  disabled,
  onSelect,
}: {
  currency: "ngn" | "usd";
  disabled: boolean;
  onSelect: (external_wallet_id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const { user } = useAuthStore();

  const {
    data: riseWallet,
    isLoading,
    isError,
    refetch,
  } = useGetExternalWallets({
    fetch_balance: "true",
    currency,
    wallet_type: "api_vendor",
    provider: "risevest",
  });

  console.log({ riseWallet });

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
      <Button
        onClick={() => onSelect(riseWallet?.items[0]?.id)}
        disabled={disabled}
        className="flex items-center cursor-pointer justify-between gap-4 w-full bg-custom-rise-green py-10 hover:bg-custom-rise-green/90"
      >
        <div>
          <div className="flex items-center gap-2 text-custom-grey">
            <img
              src={riselogo}
              alt="rise"
              className="w-12 h-12 bg-custom-card p-2 rounded-full"
            />
            <div className="text-start">
              <p className="font-medium">
                {user?.metadata?.rise_username || user?.email_address}
              </p>
              <p className="text-white">
                {formatService.formatCurrency(
                  riseWallet?.items[0]?.balance,
                  currency
                )}
              </p>
            </div>
          </div>
        </div>
        <RiArrowRightSLine className="text-white w-12 h-8" />
      </Button>
    </div>
  );
}
