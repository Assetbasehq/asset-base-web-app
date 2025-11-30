import { Button } from "@/components/ui/button";
import { ChevronRight, Loader, Mail } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import TransactionTypeModal from "./_modals/transaction-type-modal";
import { useMutation } from "@tanstack/react-query";
import { documentRequestService } from "@/api/document-requests.api";
import { CustomAlert } from "@/components/custom/custom-alert";
import AccountStatementPreviewModal from "./_modals/account-statement-preview-modal";
import type {
  WalletStatement,
  WalletTransaction,
} from "@/interfaces/wallet.interfae";

export interface ITransactionType {
  name: string;
  value: string;
  mappedValues?: string[];
  subTypes?: ITransactionType[];
}

export const transactionTypes: ITransactionType[] = [
  {
    name: "Wallet transactions",
    value: "wallet",
    subTypes: [
      { name: "Deposits", value: "deposit", mappedValues: ["moneyio.funding"] },
      {
        name: "Withdrawals",
        value: "withdrawal",
        mappedValues: ["moneyio.withdrawal"],
      },
    ],
  },
  {
    name: "Portfolio transactions",
    value: "portfolio",
    mappedValues: [
      "assets.sale",
      "assets.purchase",
      "assets.exchange.fee",
      "asset.distribution.returns",
    ],
  },
];

export default function AccountStatement() {
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<string | null>("");
  const [selectedTransactionTypes, setSelectedTransactionTypes] = useState<
    ITransactionType[] | null
  >(null);

  const [selectedDateRange, setSelectedDateRange] = useState<string | null>(
    null
  );
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [isPreview, setIsPreview] = useState(false);

  const [walletStatements, setWalletStatements] = useState<
    WalletStatement[] | null
  >(null);

  const [modals, setModals] = useState({
    transactionType: false,
    preview: false,
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: documentRequestService.requestAccountStatement,
    onSuccess: (data) => {
      console.log({ data });
      setWalletStatements(data.wallet_statements);
      if (!isPreview) {
        setSuccess(
          "Your account statement has been generated and sent to your mail successfully"
        );
      }
    },
    onError: (error) => {
      setError(error.message || "Something went wrong");
    },
  });

  const toggleModal = (key: keyof typeof modals, value: boolean) =>
    setModals((prev) => ({ ...prev, [key]: value }));

  const handleDateRangeChange = (value: string) => {
    setError(null);
    setSuccess(null);
    setSelectedDateRange(value);

    const today = new Date();
    if (value === "30days") {
      setStartDate(new Date(new Date().setMonth(today.getMonth() - 1)));
      setEndDate(today);
    } else if (value === "90days") {
      setStartDate(new Date(new Date().setMonth(today.getMonth() - 3)));
      setEndDate(today);
    } else if (value === "all") {
      setStartDate(undefined);
      setEndDate(undefined);
    }
  };

  const handleApply = (checked: Record<string, boolean>) => {
    console.log({ checked });

    setError(null);
    setSuccess(null);
    toggleModal("transactionType", false);

    const allFieldsAreFalse = Object.values(checked).every(
      (value) => value === false
    );
    if (allFieldsAreFalse) {
      setSelectedTransactionTypes(null);
      return;
    }

    if (checked.all) {
      let allTransactionTypes = transactionTypes
        .flatMap((item) =>
          item.subTypes ? item.subTypes.map((subItem) => subItem) : item
        )
        .map((item: ITransactionType) => item);

      console.log({ allTransactionTypes });
      setSelectedTransactionTypes(allTransactionTypes);
      return;
    }

    // let newTransactionTypes = [];
    const selectedTransactionNames = Object.keys(checked).filter(
      (key) => checked[key]
    );

    console.log({ selectedTransactionNames });

    if (selectedTransactionNames.includes("wallet")) {
      const newTransactionTypes = transactionTypes
        .find((item) => item.value === "wallet")
        ?.subTypes?.flatMap((item) => item);

      console.log({ hg: newTransactionTypes });

      if (!newTransactionTypes) return;

      setSelectedTransactionTypes(newTransactionTypes);
      return;
    } else if (selectedTransactionNames.includes("portfolio")) {
      const newTransactionTypes = transactionTypes.find(
        (item) => item.value === "portfolio"
      );

      console.log({ newTransactionTypes });

      if (!newTransactionTypes) return;

      setSelectedTransactionTypes((prev) => [
        ...(prev || []),
        newTransactionTypes,
      ]);
      return;
    } else if (selectedTransactionNames.includes("deposits")) {
      const newTransactionTypes = transactionTypes
        .find((item) => item.value === "wallet")
        ?.subTypes?.find((item) => item.value === "deposit");

      console.log({ newTransactionTypes });

      if (!newTransactionTypes) return;

      setSelectedTransactionTypes([newTransactionTypes]);
      return;
    } else if (selectedTransactionNames.includes("withdrawals")) {
      const newTransactionTypes = transactionTypes
        .find((item) => item.value === "wallet")
        ?.subTypes?.find((item) => item.value === "withdrawal");

      console.log({ newTransactionTypes });

      if (!newTransactionTypes) return;

      setSelectedTransactionTypes([newTransactionTypes]);
      return;
    }
  };

  const handleGenerateStatement = async ({ preview }: { preview: boolean }) => {
    // toggleModal("preview", true);

    // return;

    setError(null);
    setSuccess(null);

    if (!selectedTransactionTypes || selectedTransactionTypes.length === 0) {
      setError("Please select at least one transaction type");
    }

    if (!startDate || !endDate) return setError("Please select a date range");

    const payload = {
      start_date: startDate.toISOString() as string,
      end_date: endDate.toISOString() as string,
      preview,
      transaction_reasons:
        selectedTransactionTypes
          ?.map((item) => item.mappedValues as string[])
          .flat() || [],
    };

    console.log({ payload });
    setIsPreview(preview);

    mutateAsync(payload, {
      onSuccess: () => {
        if (preview) {
          toggleModal("preview", true);
        }
      },
    });
  };

  const handlePreviewStatement = () => {};

  return (
    <div className="flex flex-col text-start p-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg md:text-2xl font-semibold">Account Statement</h2>
        <p className="text-muted-foreground">Generate your account statement</p>
      </div>

      <div className="flex flex-col gap-4 mt-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Transaction Type</label>
          <Button
            onClick={() => {
              toggleModal("transactionType", true);
            }}
            variant="default"
            className="bg-transparent hover:bg-transparent cursor-pointer text-custom-white border py-6 text-start px-0 flex justify-between"
          >
            <span>
              {selectedTransactionTypes && selectedTransactionTypes.length > 0
                ? selectedTransactionTypes
                    .map((transactionType) => transactionType.name)
                    .join(", ")
                : "Select Transaction Type"}
            </span>
            <ChevronRight size={20} className="text-white" />
          </Button>
        </div>

        {/* Date Range Select */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Select Date</label>
          <Select
            value={selectedDateRange || ""}
            onValueChange={handleDateRangeChange}
          >
            <SelectTrigger className="w-full py-6">
              <SelectValue placeholder="-Select Date-" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="30days">Last 30 Days</SelectItem>
              <SelectItem value="90days">Last 90 Days</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Custom Date Pickers */}
        {selectedDateRange === "custom" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div>
              <label className="text-sm font-medium mb-1 block">From</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal py-6"
                  >
                    {startDate ? format(startDate, "PPP") : "Pick start date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={startDate}
                    onSelect={setStartDate}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">To</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal py-6"
                  >
                    {endDate ? format(endDate, "PPP") : "Pick end date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={endDate}
                    onSelect={setEndDate}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )}

        {error && <CustomAlert variant="error" message={error} />}
        {success && <CustomAlert variant="success" message={success} />}

        {/* Buttons */}
        <div className="flex gap-4 mt-4">
          <Button
            disabled={
              isPending ||
              !selectedTransactionTypes?.length ||
              !selectedDateRange ||
              !startDate ||
              !endDate
            }
            className="flex-1 btn-primary rounded-full py-6"
            onClick={() => handleGenerateStatement({ preview: false })}
          >
            {isPending && !isPreview ? (
              <span className="flex items-center gap-2">
                <Loader className="animate-spin" /> Generating Statement...
              </span>
            ) : (
              "Generate Statement"
            )}
          </Button>
          <Button
            disabled={
              isPending ||
              !selectedTransactionTypes?.length ||
              !selectedDateRange ||
              !startDate ||
              !endDate
            }
            className="flex-1 rounded-full cursor-pointer py-6"
            variant="outline"
            onClick={() => handleGenerateStatement({ preview: true })}
          >
            {isPending && isPreview ? (
              <span className="flex items-center gap-2">
                <Loader className="animate-spin" /> Downloading Preview...
              </span>
            ) : (
              "Preview Statement"
            )}
          </Button>
        </div>
      </div>

      <TransactionTypeModal
        isOpen={modals.transactionType}
        onClose={() => toggleModal("transactionType", false)}
        onApply={handleApply}
      />
      <AccountStatementPreviewModal
        walletStatements={walletStatements}
        isOpen={modals.preview}
        onClose={() => toggleModal("preview", false)}
        startDate={startDate ? startDate.toISOString() : ""}
        endDate={endDate ? endDate.toISOString() : ""}
      />
    </div>
  );
}
