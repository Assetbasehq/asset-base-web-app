import { Button } from "@/components/ui/button";
import { useGetExternalWallets } from "@/hooks/use-external-wallets";
import { cn } from "@/lib/utils";
import { RiAddLine } from "react-icons/ri";
import ExternalWallets from "../../wallet/deposit/_common/external-wallets";
import type { CardItem } from "@/interfaces/external-wallets";
import { useState } from "react";
import AddCardModal from "./_modals/add-card-modal";
import AddBankAccountModal from "./_modals/add-bank-account-modal";

export default function BanksAndCards() {
  const [isAddCardModalOpen, setIsAddCardModalOpen] = useState(false);
  const [isAddBankAccountModalOpen, setIsAddBankAccountModalOpen] =
    useState(false);

  const { data: externalWallets, isLoading: isExternalWalletsLoading } =
    useGetExternalWallets({
      currency: "ngn",
      wallet_type: "card",
    });

  const handleSelectCard = (card: CardItem) => {
    console.log("card selected:", card);
  };

  return (
    <div>
      <div className="flex flex-col gap-4 text-start p-4">
        <div className="mb-4">
          <h2 className="text-lg md:text-2xl font-semibold">Bank and Cards</h2>
          <p className="text-muted-foreground">
            Manage cards and bank accounts
          </p>
        </div>

        <div className="bg-custom-base p-4 rounded-lg flex flex-col items-start gap-4 max-w-2xl ">
          <div>
            <h2 className="text-lg md:text-xl font-semibold">Bank accounts</h2>
            <p className="text-muted-foreground">
              Add a bank account to send and receive payments directly
            </p>
          </div>
          <Button
            onClick={() => setIsAddBankAccountModalOpen(true)}
            className={cn(
              `flex items-center gap-2 !px-4 rounded-full cursor-pointer transition-all duration-300 ease-in-out bg-custom-orange/10 text-custom-orange`
            )}
          >
            <RiAddLine />
            <span className="text-sm py-1 font-medium">
              Add New Bank Account
            </span>
          </Button>
        </div>

        <div className="bg-custom-base p-4 rounded-lg flex flex-col items-start gap-4 max-w-2xl ">
          <div>
            <h2 className="text-lg md:text-xl font-semibold">Cards</h2>
            <p className="text-muted-foreground">
              Add a card to spend from directly
            </p>
          </div>

          <ExternalWallets
            wallets={externalWallets?.items || []}
            isLoading={isExternalWalletsLoading}
            isMinimumAmount={false}
            amountToFund={null}
            handleSelectCard={handleSelectCard}
          />
          <Button
            onClick={() => setIsAddCardModalOpen(true)}
            className={cn(
              `flex items-center gap-2 !px-4 rounded-full cursor-pointer transition-all duration-300 ease-in-out bg-custom-orange/10 text-custom-orange`
            )}
          >
            <RiAddLine />
            <p className="text-sm py-1 font-medium">Add New Card</p>
          </Button>
        </div>
      </div>

      <AddCardModal
        isOpen={isAddCardModalOpen}
        onClose={() => {
          setIsAddCardModalOpen(false);
        }}
      />

      <AddBankAccountModal
        isOpen={isAddBankAccountModalOpen}
        onClose={() => {
          setIsAddBankAccountModalOpen(false);
        }}
      />
    </div>
  );
}
