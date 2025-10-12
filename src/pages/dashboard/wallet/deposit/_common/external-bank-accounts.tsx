import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { CardItem } from "@/interfaces/external-wallets";
import { RiArrowRightSLine, RiBankCardLine } from "react-icons/ri";

interface ExternalBankAccountsProps {
  wallets: CardItem[];
  isLoading: boolean;
  isMinimumAmount: boolean;
  handleSelectBankAccount: (card: CardItem) => void;
}

export default function ExternalBankAccounts({
  wallets,
  isLoading,
  isMinimumAmount,
  handleSelectBankAccount,
}: ExternalBankAccountsProps) {
  if (isLoading) {
    return (
      <div className="w-full overflow-x-auto no-scrollbar">
        <div className="flex gap-3 min-w-max">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-custom-input-fill border-2 border-custom-input-stroke rounded-xl p-4 min-w-[200px] flex flex-col gap-3"
            >
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex justify-between w-full items-center">
                <div className="flex flex-col gap-1 w-3/4">
                  <Skeleton className="w-20 h-3 rounded-md" />
                  <Skeleton className="w-16 h-3 rounded-md" />
                </div>
                <Skeleton className="w-5 h-5 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (wallets.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="w-full overflow-x-auto no-scrollbar">
        <div className="flex gap-3 min-w-max">
          {wallets
            .sort(
              (a: any, b: any) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map((card: any) => (
              <Button
                key={card.id}
                disabled={isMinimumAmount}
                onClick={() => {
                  handleSelectBankAccount(card);
                }}
                className="bg-custom-input-fill border-2 border-custom-input-stroke text-custom-grey hover:bg-custom-input-fill/80 cursor-pointer rounded-xl text-sm py-12 px-4 flex justify-between items-center gap-4 min-w-[200px]"
              >
                <div className="flex flex-col items-start gap-2 w-full">
                  <RiBankCardLine className="!w-10 !h-10 bg-custom-card p-2 rounded-full" />
                  <div className="flex justify-between w-full">
                    <div>
                      <p className="capitalize text-xs">{card.details.brand}</p>
                      <p className="text-xs">••••{card.details.last_digits}</p>
                    </div>
                    <RiArrowRightSLine size={20} />
                  </div>
                </div>
              </Button>
            ))}
        </div>
      </div>
    </div>
  );
}
