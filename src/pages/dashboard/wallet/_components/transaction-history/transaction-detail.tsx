import type { CardItem } from "@/interfaces/external-wallets";
import type { UserBankAccount } from "@/interfaces/user.interface";
import type { WalletTransaction } from "@/interfaces/wallet.interfae";
import { FormatService } from "@/services/format-service";
import { format } from "date-fns";
import { RiArrowDownLine, RiArrowUpLine } from "react-icons/ri";

const isAdmin = import.meta.env.VITE_IS_ADMIN === "true";

export default function TransactionDetail({
  transaction,
  currency,
}: {
  transaction: WalletTransaction;
  currency?: string;
}) {
  return (
    <div className="border p-2 rounded-lg">
      <div className="flex items-center gap-2">
        {getTransactionIcon(transaction.status, transaction.transaction_type)}
        <p className="text-start text-sm">
          {!transaction.reason || !transaction.metadata
            ? transaction.description
            : getTransactionDescription(transaction, currency ?? undefined)}
        </p>
      </div>
      {/* <p className="text-gray-500">
        {format(new Date(transaction.created_at), "dd/MM/yyyy")}
      </p> */}
    </div>
  );
}

export function getTransactionIcon(status: string, transactionType: string) {
  let icon;
  switch (status) {
    case "successful":
      icon =
        transactionType === "credit" ? (
          <RiArrowUpLine
            className="border border-white p-1 rounded-full"
            size={34}
          />
        ) : (
          <RiArrowDownLine
            className="border border-white p-1 rounded-full"
            size={34}
          />
        );
      break;
    case "failed":
      icon = (
        <RiArrowDownLine
          className="border border-white p-1 rounded-full"
          size={34}
        />
      );
      break;
    default:
      icon = null;
  }
  return icon;
}

export function getTransactionDescription(
  transaction: WalletTransaction,
  currency?: string
) {
  switch (transaction.reason) {
    case "assets.purchase.system":
    case "assets.sale":
    case "assets.purchase":
      return `You ${
        transaction.transaction_type == "credit" ? "sold" : "bought"
      } ${transaction.metadata.number_of_shares.toLocaleString()} share${
        transaction.metadata.number_of_shares > 1 ? "s" : ""
      } of ${transaction.metadata.asset_name} ${
        transaction.transaction_type == "credit" ? "for" : "at"
      } ${FormatService.formatCurrency(
        transaction.metadata.price_per_share,
        currency ?? transaction.metadata.currency
      )} per share`;

    case "assets.exchange.fee":
      return `${FormatService.formatCurrency(
        transaction.amount,
        currency ?? transaction.metadata.currency
      )} processing fee on ${transaction.metadata.asset_name} asset exchange`;

    case "wallets.exchange":
      return transaction.transaction_type == "credit"
        ? `You have successfully received ${FormatService.formatCurrency(
            transaction.amount,
            transaction.metadata.dest_currency
          )} from your ${transaction.metadata.src_currency} wallet`
        : `You have successfully transferred ${FormatService.formatCurrency(
            transaction.amount,
            transaction.metadata.src_currency
          )} to your ${transaction.metadata.dest_currency} wallet`;

    case "moneyio.funding":
      return `Your wallet was funded with ${FormatService.formatCurrency(
        transaction.amount,
        currency ??
          transaction.metadata.details.currency ??
          transaction.metadata.currencies[0]
      )} ${getTransactionMethod(transaction.metadata)}`;

    case "moneyio.withdrawal":
      return transaction.metadata.provider === "assetbase"
        ? `You have successfully transferred ${FormatService.formatCurrency(
            transaction.amount,
            transaction.metadata.details.currency
          )} to a user `
        : `${
            transaction.status === "pending"
              ? "You have a pending withdrawal of"
              : "Your wallet was debited with"
          } ${FormatService.formatCurrency(
            transaction.amount,
            currency ??
              transaction.metadata.details.currency ??
              transaction.metadata.currencies[0]
          )} to your ${
            transaction.metadata.provider === "risevest" ? "Rise" : "bank"
          } account`;

    case "asset.distribution.returns":
      return getReturnsDescription(transaction);

    default:
      return transaction.description;
  }
}

function getTransactionMethod(metadata: CardItem | UserBankAccount) {
  if (metadata.wallet_type == "card") {
    return `via ${(
      metadata.details.currency || metadata.currencies[0]
    ).toUpperCase()} card`;
  }
  if (metadata.wallet_type == "virtual_account") {
    return "via bank transfer";
  }
  if (metadata.wallet_type === "system") {
    return "by Assetbase";
  }
  if (metadata.wallet_type === "mobile_money") {
    return `via mobile money (${metadata.details.network?.toUpperCase()})`;
  }
  if (metadata.wallet_type === "bank_account") {
    return "from your bank account";
  }

  if (metadata.provider === "risevest") {
    return "from your Rise account";
  }

  return "";
}

function getReturnsDescription(transaction: WalletTransaction) {
  if (transaction.reason === "asset.distribution.returns") {
    if (isAdmin) {
      return transaction.transaction_type == "credit"
        ? `You received a left over of profit distribution of ${FormatService.formatCurrency(
            transaction.amount,
            transaction.metadata.currency
          )} on ${transaction.metadata?.asset_name} asset`
        : transaction.transaction_type == "debit"
        ? `You paid returns of ${FormatService.formatCurrency(
            transaction.amount,
            transaction.metadata.currency
          )} on ${transaction.metadata?.asset_name} asset`
        : transaction.description;
    } else {
      return transaction.transaction_type == "credit"
        ? `You received a return of ${FormatService.formatCurrency(
            transaction.amount,
            transaction.metadata.currency
          )} on your investment in ${transaction.metadata?.asset_name}`
        : transaction.description;
    }
  }
}
