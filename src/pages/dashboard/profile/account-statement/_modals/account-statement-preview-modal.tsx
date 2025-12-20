import { AssetBaseLogo } from "@/components/shared/asset-base-beta";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import type { WalletStatement } from "@/interfaces/wallet.interfae";
import { getTransactionDescription } from "@/lib/utils";
import { formatService } from "@/services/format-service";
import { useAuthStore } from "@/store/auth-store";
import { format } from "date-fns";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  startDate: string;
  endDate: string;
  walletStatements: WalletStatement[] | null;
}

export default function AccountStatementPreviewModal({
  walletStatements,
  isOpen,
  onClose,
  startDate,
  endDate,
}: ModalProps) {
  const { user } = useAuthStore();

  const usdWalletStatements =
    walletStatements?.filter((statement) => statement.currency === "usd") || [];

  console.log({ usdWalletStatements, walletStatements });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        // showCloseButton={false}
        className="sm:max-w-2xl rounded-2xl p-6 md:p-8 text-start font-geist overflow-y-auto max-h-[80vh]"
      >
        <DialogHeader className="flex flex-col items-start justify-start gap-0">
          <DialogTitle className="flex items-start gap-2 text-xl text-start w-full">
            <div className="flex items-start justify-between w-full gap-2 font-geist font-medium pt-6">
              <div className="flex items-center gap-1">
                <AssetBaseLogo className="w-5 h-5" />
                <p className="text-custom-orange">Assetbase</p>
              </div>
              <div className="text-[#191919] dark:text-[#969696] text-right space-y-1 md:space-y-3 text-xs font-normal">
                <p>www.assetbase.capital</p>
                <p>+1 205 529 8525</p>
                <p>@AssetbaseHQ</p>
              </div>
            </div>
          </DialogTitle>

          <div className="flex items-start justify-between w-full py-4">
            <div>
              <h2 className="text-black-2 text-left text-sm font-medium capitalize">
                {user?.first_name} {user?.last_name}
              </h2>
              <p className="text-muted-foreground text-xs font-semibold">
                {user?.email_address}
              </p>
            </div>
            <p className="font-medium tracking-wide text-right space-y-3 text-xs">
              {format(new Date(), "MMMM dd, yyyy")}
            </p>
          </div>

          <Separator className=" bg-white/10" />

          <div className="py-4">
            <h2 className="font-medium text-center">
              Account statement{" "}
              {startDate && (
                <span>from {format(new Date(startDate), "MMMM dd, yyyy")}</span>
              )}{" "}
              {endDate && (
                <span>to {format(new Date(endDate), "MMMM dd, yyyy")}</span>
              )}
            </h2>
          </div>

          <Separator className="bg-white/10" />

          <div className="flex items-center text-xs justify-between font-medium w-full py-4">
            <div>
              <p>
                WALLET TYPE:{" "}
                <span className=" capitalize font-bold">
                  {usdWalletStatements[0]?.currency.toUpperCase() || "USD"}
                </span>
              </p>
            </div>
            <div>
              <p>
                OPENING BALANCE:{" "}
                <span className=" capitalize font-bold">
                  {formatService.formatCurrency(
                    usdWalletStatements[0]?.opening_balance,
                    usdWalletStatements[0]?.currency
                  )}
                </span>
              </p>
            </div>
            <div>
              <p>
                CLOSING BALANCE:{" "}
                <span className=" capitalize font-bold">
                  {formatService.formatCurrency(
                    usdWalletStatements[0]?.closing_balance,
                    usdWalletStatements[0]?.currency
                  )}
                </span>
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-full mt-2">
            {usdWalletStatements[0]?.transactions.length ? (
              <table className="w-full z-50 relative">
                <thead>
                  <tr className="bg-gray-5 dark:bg-gray-100/[.2]">
                    {["Date", "Type", "Description", "Amount"].map(
                      (item, index) => (
                        <th
                          className="uppercase text-left pl-2.5 py-2.5 font-medium text-xs"
                          key={index}
                        >
                          {item}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-10">
                  {usdWalletStatements[0]?.transactions.map((transaction) => (
                    <tr
                      className="text-gray-300 dark:text-white text-left font-lex font-light text-xs"
                      key={transaction.id}
                    >
                      <td className="py-3.5 pl-2.5">
                        {format(
                          new Date(transaction.created_at),
                          "MMM dd, yyyy"
                        )}
                      </td>
                      <td className="capitalize pl-2.5">
                        {transaction.transaction_intent?.replace("_", " ") ??
                          transaction.transaction_type}
                      </td>
                      <td className="capitalize pl-2.5">
                        {!transaction.reason || !transaction.metadata
                          ? transaction.description
                          : getTransactionDescription(
                              transaction,
                              transaction.currency
                            )}
                      </td>
                      <td className="text-right pr-6">
                        {formatService.formatCurrency(
                          transaction.amount,
                          transaction.currency
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <h2 className="text-sm font-medium mt-10 text-center">
                No transactions has been made on your account
              </h2>
            )}
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
