import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSupportedCurrencies } from "@/hooks/useIoMethod";
import { useMemo, useState } from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import { useNavigate } from "react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { flags } from "@/constants/images";
import { RiArrowLeftRightLine } from "react-icons/ri";
import {  useCryptoWallets, useWallet } from "@/hooks/useWallet";
import { Skeleton } from "@/components/ui/skeleton";
import { CustomAlert } from "@/components/custom/custom-alert";
import type { ICurrency } from "@/interfaces/wallet.interfae";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { walletService } from "@/api/wallet.api";
import PinConfirmationModal from "./_components/pin-confirmation";
import ConversionSuccessful from "./_components/conversion-successful";
import AnimatedWrapper from "@/components/animations/animated-wrapper";
import { formatService } from "@/services/format-service";

export default function ConvertFunds() {
  const [amountToSwap, setAmountToSwap] = useState<number | null>(null);
  const [currency, setCurrency] = useState<"usd" | "ngn">("usd");
  const [sourceCurrencyCode, setSourceCurrencyCode] = useState("usd");
  const [destinationCurrencyCode, setDestinationCurrencyCode] = useState("ngn");
  const [error, setError] = useState<string | null>(null);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const queryClient = useQueryClient();

  const naviagate = useNavigate();

  const { data: supportedCurrencies } = useSupportedCurrencies({});

  const {
    data: walletData,
    isLoading: isWalletLoading,
    isError: isWalletError,
  } = useWallet({ currency });

  const {
    data: cryptoWalletBalance,
    isLoading: isCryptoLoading,
    isError: isCryptoError,
  } = useCryptoWallets();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: walletService.walletExchange,
    onSuccess: (data) => {
      console.log({ data });
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  const isLoading = isWalletLoading || isCryptoLoading;

  const { sourceCurrency, destinationCurrency } = useMemo(() => {
    const sourceCurrency = supportedCurrencies?.find(
      (c: ICurrency) => c.code === sourceCurrencyCode
    );

    const destinationCurrency = supportedCurrencies?.find(
      (c: ICurrency) => c.code === destinationCurrencyCode
    );

    return { sourceCurrency, destinationCurrency };
  }, [supportedCurrencies, sourceCurrencyCode, destinationCurrencyCode]);

  const formattedTotalBalance = useMemo(() => {
    if (!walletData && !cryptoWalletBalance) return 0;

    let total = 0;

    // Add crypto wallet balances
    // if (cryptoWalletBalance?.assets?.length) {
    //   total += cryptoWalletBalance.assets.reduce(
    //     (sum: number, asset: { balance: string | number }) =>
    //       sum + Number(asset.balance || 0),
    //     0
    //   );
    // }

    // Add fiat wallet balance
    if (walletData?.balance) {
      total += walletData.balance;
    }

    // Format based on selected currency
    return currency === "usd"
      ? formatService.formatToUSD(total)
      : formatService.formatToNaira(total);
  }, [cryptoWalletBalance, walletData, currency]);

  const handleAmountChange = (amount: string) => {
    console.log({ amount });

    setError(null);
    const totalBalance = Number(formattedTotalBalance.toString().slice(1));
    const amountNumber = Number(amount);

    if (amount === "") {
      setAmountToSwap(null);
      return;
    }

    if (amountNumber > totalBalance) {
      setError("Insufficient balance");
    }

    if (isNaN(amountNumber)) setAmountToSwap(0);

    if (!isNaN(amountNumber)) setAmountToSwap(amountNumber);
  };

  const handleCurrencyChange = (value: string) => {
    const oppositeCurrency = value === "usd" ? "ngn" : "usd";
    setSourceCurrencyCode(value);
    setDestinationCurrencyCode(oppositeCurrency);
    setCurrency(value as "usd" | "ngn");
  };

  const amountToReceive = useMemo(() => {
    if (!amountToSwap || !sourceCurrency || !destinationCurrency) return 0;

    const fromRate = sourceCurrency.buy_rate; // source currency rate
    const toRate = destinationCurrency.sell_rate; // destination currency rate

    let finalAmount = 0;

    if (sourceCurrency.code === "usd") {
      finalAmount = amountToSwap * toRate;
    } else if (destinationCurrency.code === "usd") {
      finalAmount = amountToSwap / fromRate;
    } else {
      const usdEquivalent = amountToSwap / fromRate;
      finalAmount = usdEquivalent * toRate;
    }
    return parseFloat(finalAmount.toFixed(2));
  }, [amountToSwap, sourceCurrency, destinationCurrency]);

  const calculateFromRate = () => {
    if (!sourceCurrency || !destinationCurrency) {
      return 0;
    }
    return `${sourceCurrency.symbol} ${sourceCurrency.buy_rate}`;
  };

  const calculateToRate = () => {
    if (!sourceCurrency || !destinationCurrency) {
      return 0;
    }
    return `${destinationCurrency.symbol} ${destinationCurrency.sell_rate}`;
  };

  const getAmountInUSD = () => {
    if (!sourceCurrency || !amountToSwap) return 0;

    // If sourceCurrency is already USD
    if (sourceCurrency.code === "usd") return amountToSwap;

    // Convert to USD
    return amountToSwap / sourceCurrency.buy_rate;
  };

  const handleSubmit = async () => {
    if (!amountToSwap || !sourceCurrency || !destinationCurrency) return;

    setIsPinModalOpen(true);
  };

  const isAtLeastTenUSD = getAmountInUSD() >= 10;

  const totalBalanceNumber = Number(formattedTotalBalance.toString().slice(1));
  const finalAmountToSwap = amountToSwap ? amountToSwap : 0;

  return (
    <AnimatedWrapper animationKey="convert">
      <div className="flex justify-start items-start">
        <Button
          onClick={() => naviagate(-1)}
          className="flex items-center gap-2 text-xs cursor-pointer p-2 bg-custom-light-bg text-custom-white-text rounded-lg hover:bg-custom-light-bg/80 transition-all duration-300 ease-in-out"
        >
          <RiArrowLeftLine />
          <p>Back</p>
        </Button>
      </div>
      <div className="flex flex-col gap-4 text-start w-full max-w-md mx-auto">
        <div className="mb-8">
          <h2 className="text-xl font-semibold">Convert Funds</h2>
          <p className="text-muted-foreground text-sm">Swap assets</p>
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-muted-foreground">You will convert</Label>
          <div className="relative">
            <Input
              value={amountToSwap ?? ""}
              disabled={isLoading}
              type="number"
              inputMode="decimal"
              onChange={(e) => handleAmountChange(e.target.value)}
              className="w-full py-6"
              placeholder="10"
            />
            {/* <Button className="absolute text-xs p-2 top-1/2 right-4 -translate-y-1/2 bg-custom-light-bg hover:bg-custom-light-bg text-muted-foreground cursor-pointer">
              max
            </Button> */}
            <Select
              defaultValue={sourceCurrencyCode}
              onValueChange={handleCurrencyChange}
            >
              <SelectTrigger className="w-fit min-w-fit shadow-none border-none bg-gray-100 px-3 absolute top-1/2 right-2 -translate-y-1/2">
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent className="min-w-fit">
                <SelectItem value="usd">
                  <img
                    className="w-5 h-5"
                    src={flags.usa.flag}
                    alt={flags.usa.alt}
                  />
                  <span className="hidden md:inline">USD</span>
                </SelectItem>
                <SelectItem value="ngn">
                  <img
                    className="w-5 h-5"
                    src={flags.nigeria.flag}
                    alt={flags.nigeria.alt}
                  />
                  <span className="hidden md:inline">NGN</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            {isLoading ? (
              <Skeleton className="h-6 w-24 rounded-md" />
            ) : (
              <p className="text-xs md:text-sm">{formattedTotalBalance}</p>
            )}
          </div>
        </div>

        <div className="flex justify-center">
          <RiArrowLeftRightLine className=" w-12 h-12 p-3 rounded-full bg-custom-input-mute text-custom-white-text rotate-90" />{" "}
        </div>

        <div className="flex flex-col gap-1">
          <Label className="text-muted-foreground">You will receive</Label>
          <div className="relative">
            <Input
              value={
                destinationCurrency
                  ? `${destinationCurrency.symbol} ${amountToReceive}`
                  : ""
              }
              disabled
              className="w-full py-6"
              placeholder="0"
            />
            {/* <Button className="absolute text-xs p-2 top-1/2 right-4 -translate-y-1/2 bg-custom-light-bg hover:bg-custom-light-bg text-muted-foreground cursor-pointer">
              max
            </Button> */}
            <Select value={destinationCurrencyCode}>
              <SelectTrigger
                disabled
                className="w-fit min-w-fit shadow-none border-none bg-gray-100 px-3 absolute top-1/2 right-2 -translate-y-1/2"
              >
                <SelectValue placeholder="Currency" />
              </SelectTrigger>
              <SelectContent className="min-w-fit">
                <SelectItem value="usd">
                  <img
                    className="w-5 h-5"
                    src={flags.usa.flag}
                    alt={flags.usa.alt}
                  />
                  <span className="hidden md:inline">USD</span>
                </SelectItem>
                <SelectItem value="ngn">
                  <img
                    className="w-5 h-5"
                    src={flags.nigeria.flag}
                    alt={flags.nigeria.alt}
                  />
                  <span className="hidden md:inline">NGN</span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {error && <CustomAlert variant="warning" message={error} />}

        <div className="flex justify-between text-xs border px-4 py-2 rounded-full">
          <p className="text-custom-grey">
            {sourceCurrency && `${calculateFromRate()}`}
          </p>
          <p className="font-semibold">
            {destinationCurrency && calculateToRate()}
          </p>
        </div>

        <div className="text-xs text-custom-grey mt-4 flex flex-col gap-2">
          <div className="flex justify-between">
            <p>Amount to deduct</p>
            <p className="font-semibold">
              {sourceCurrency &&
                `${sourceCurrency.symbol}${formatService.formatWithCommas(
                  amountToSwap
                )}`}
            </p>
          </div>
          <div className="flex justify-between">
            <p>Amount to receive</p>
            <p className="font-semibold">
              {destinationCurrency &&
                `${destinationCurrency.symbol} ${amountToReceive}`}
            </p>
          </div>
        </div>

        <Button
          disabled={
            totalBalanceNumber <= 0 ||
            isLoading ||
            !amountToSwap ||
            finalAmountToSwap > totalBalanceNumber
          }
          onClick={handleSubmit}
          className="btn-primary py-6 rounded-full"
        >
          Swap
        </Button>
      </div>

      <PinConfirmationModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onSuccess={() => {
          setIsPinModalOpen(false);
          setIsSuccessModalOpen(true);
        }}
        amount={amountToSwap}
        src_currency={sourceCurrencyCode}
        dest_currency={destinationCurrencyCode}
      />

      <ConversionSuccessful
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setIsSuccessModalOpen(false);
          setAmountToSwap(null);
          queryClient.invalidateQueries({ queryKey: ["wallet-balance"] });
        }}
        src_amount={amountToSwap}
        src_currency={sourceCurrency as ICurrency}
        dest_amount={amountToReceive}
        dest_currency={destinationCurrency as ICurrency}
      />
    </AnimatedWrapper>
  );
}
