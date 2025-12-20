import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, useWatch } from "react-hook-form";
import { orderRequestService } from "@/api/order-requests.api";
import type { IAsset } from "@/interfaces/asset.interface";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatService } from "@/services/format-service";
import { currencyToSymbol } from "@/services/currency-service";
import { PinConfirmationModal } from "@/components/modals/pin-confirmation";
import { useState } from "react";
import { normalizeInput } from "@/helpers/deposit-methods";
import SuccessModal from "@/components/modals/success-modal";
import { CustomAlert } from "@/components/custom/custom-alert";
import { Label } from "@/components/ui/label";
import {
  useAssetMarketPrice,
  useEstimateAmountToReceive,
  useUserAssetBalance,
} from "@/hooks/use-trade";
import { tradeService } from "@/api/trade-service.api";

type BuyFormValues = {
  orderType: "ask" | "bid" | "buy_limit_order" | "sell_limit_order" | string;
  price_per_share?: string;
  number_of_shares?: string;
  quantity: string;
};

type ModalState = {
  isOpen: boolean;
  title: string;
  description: string;
  buttonText: string;
};

export default function AssetSell({ asset }: { asset: IAsset }) {
  const [isPinModalOpen, setPinModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [successModal, setSuccessModal] = useState<ModalState>({
    isOpen: false,
    title: "",
    description: "",
    buttonText: "",
  });

  const queryClient = useQueryClient();

  const {
    data: assetMarketPriceData,
    isLoading: isLoadingMarketPrice,
    isError,
  } = useAssetMarketPrice({
    assetWeb3ServiceId: asset?.web3_service_id || "",
  });

  const assetMarketPrice =
    !isLoadingMarketPrice && assetMarketPriceData
      ? assetMarketPriceData?.data?.buyingPrice
      : 0;

  const {
    data: userAssetBalanceData,
    isLoading: isUserAssetBalanceLoading,
    isError: isUserAssetBalanceError,
  } = useUserAssetBalance({
    assetWeb3ServiceId: asset.web3_service_id,
  });

  console.log({ userAssetBalanceData });

  const form = useForm<BuyFormValues>({
    defaultValues: {
      orderType: "market",
      quantity: "",
      price_per_share: assetMarketPrice.toString(),
      number_of_shares: "1",
    },
  });

  // Watch values for automatic calculation
  const orderType = useWatch({ control: form.control, name: "orderType" });
  const price = useWatch({ control: form.control, name: "price_per_share" });
  const shares = useWatch({ control: form.control, name: "number_of_shares" });
  const quantity = useWatch({ control: form.control, name: "quantity" });

  const { data: estimatedAmountData, isLoading: estimatedAmountLoading } =
    useEstimateAmountToReceive({
      assetWeb3ServiceId: asset.web3_service_id,
      amountToBuy: quantity ? quantity.replaceAll(",", "") : "0",
    });

  const totalAmount =
    orderType === "limit" && price && shares
      ? Number(price) * Number(shares)
      : 0;

  // -------------------------
  // Mutations
  // -------------------------
  const { mutateAsync: initiateLimitOrder, isPending: isLimitOrderPending } =
    useMutation({
      mutationFn: orderRequestService.makeOrderRequest,

      onSuccess: (data) => {
        console.log({ data });
        setPinModalOpen(false);
        setError(null);

        setSuccessModal({
          isOpen: true,
          title: "Sell Order placed successfully",
          description: `You've successfully placed a sell order for ${quantity} shares of ${asset.asset_symbol}.`,
          buttonText: "Close",
        });

        // invalidate asset market price, history and asset balance
        queryClient.invalidateQueries({
          queryKey: ["orders", "asset-market-price", "user-asset-balance"],
        });
        form.reset();
      },
      onError: (error) => {
        console.log({ error });
        setError(error.message);
      },
    });

  const {
    mutateAsync: initiateMarketOrder,
    isPending: initiateMarketOrderPending,
  } = useMutation({
    mutationFn: tradeService.initiateMarketOrder,

    onSuccess: (data) => {
      console.log({ data });
      setPinModalOpen(false);
      // setSuccessModalOpen(true);

      setSuccessModal({
        isOpen: true,
        title: `Sell order placed successfully`,
        description: `You've successfully placed a sell order for ${quantity} shares of ${asset.asset_symbol}.`,
        buttonText: "Close",
      });

      // invalidate asset market price, history and asset balance
      queryClient.invalidateQueries({
        queryKey: ["orders", "asset-market-price", "user-asset-balance"],
      });

      form.reset();
    },
    onError: (error) => {
      console.log({ error });
      setError(error.message);
    },
  });

  async function onSubmit() {
    setPinModalOpen(true);
  }

  const handlePinConfirm = async (pin: string) => {
    const values = form.getValues();

    if (orderType === "market") {
      initiateMarketOrder({
        type: "sell",
        amount: Number(quantity.replaceAll(",", "")),
        webServiceId: asset.web3_service_id,
      });
      return;
    }

    const payload = {
      ...values,
      asset_id: asset.id,
      order_type: values.orderType === "limit" ? "ask" : "",
      pin,
    };

    console.log({ payload });

    initiateLimitOrder(payload);
  };

  const isPriceAboveMarketPrice =
    orderType === "limit" && price && asset.price_per_share
      ? Number(price) < Number(asset.price_per_share)
      : false;

  const userAssetBalance = userAssetBalanceData?.data
    ? Number(userAssetBalanceData?.data?.numberOfShares)
    : 0;

  const isQuantityLessThanZero =
    orderType === "market" && Number(quantity) <= 0 ? true : false;

  const marketQuantityToSell =
    !estimatedAmountLoading && estimatedAmountData
      ? formatService.formatCurrency(estimatedAmountData?.data?.paymentAmount)
      : "...";

  const quantityNumber = quantity ? parseFloat(quantity.replace(/,/g, "")) : 0;

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* ----------------------------
            ORDER TYPE (Dropdown)
          ----------------------------- */}
          <FormField
            control={form.control}
            name="orderType"
            rules={{ required: "Order type is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground text-sm">
                  Order Type
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value || "market"}
                >
                  <FormControl>
                    <SelectTrigger className="w-full py-6">
                      <SelectValue
                        defaultValue="market"
                        placeholder="Select Order Type"
                      />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value="market">Market</SelectItem>
                    <SelectItem value="limit">Limit</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ----------------------------
            LIMIT ORDER FIELDS
          ----------------------------- */}
          {orderType === "limit" && (
            <>
              {/* PRICE PER SHARE */}
              <FormField
                control={form.control}
                name="price_per_share"
                rules={{ required: "Price per share is required" }}
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-muted-foreground text-sm">
                      Price per Share
                    </Label>
                    <FormControl>
                      <Input
                        className="w-full py-6"
                        type="text"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;

                          const { formattedAmount } = normalizeInput(value);

                          field.onChange(formattedAmount);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />

              {isPriceAboveMarketPrice && (
                <CustomAlert
                  variant="warning"
                  message="Price per share is below market price"
                />
              )}

              {/* NUMBER OF SHARES */}
              <FormField
                control={form.control}
                name="number_of_shares"
                rules={{ required: "Number of shares is required" }}
                render={({ field }) => (
                  <FormItem>
                    <Label className="text-muted-foreground text-sm">
                      Number of Shares
                    </Label>
                    <FormControl>
                      <Input
                        className="w-full py-6"
                        type="text"
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;

                          const { formattedAmount } = normalizeInput(value);

                          field.onChange(formattedAmount);
                        }}
                      />
                    </FormControl>
                    <FormMessage className="text-right" />
                  </FormItem>
                )}
              />

              {/* TOTAL AMOUNT (Disabled) */}
              <FormItem>
                <Label className="text-muted-foreground text-sm">
                  Total Amount in {currencyToSymbol[asset.currency]}
                </Label>
                <Input
                  className="w-full py-6 bg-muted cursor-not-allowed"
                  value={formatService.formatCurrency(
                    totalAmount,
                    asset.currency
                  )}
                  disabled
                />
              </FormItem>
            </>
          )}

          {!isUserAssetBalanceLoading && (
            <CustomAlert
              variant="warning"
              message={`Available Shares: ${userAssetBalance.toFixed(2)}`}
            />
          )}

          {/* ----------------------------
            MARKET ORDER QUANTITY
          ----------------------------- */}
          {orderType === "market" && (
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <Label className="text-muted-foreground text-sm">
                    Quantity
                  </Label>
                  <FormControl>
                    <Input
                      className="w-full py-6"
                      type="text"
                      placeholder="0"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value;

                        const { formattedAmount } = normalizeInput(value);

                        field.onChange(formattedAmount);
                      }}
                    />
                  </FormControl>
                  <FormMessage className="text-right" />
                </FormItem>
              )}
            />
          )}

          {/* {orderType === "market" && (
            <CustomAlert
              variant="warning"
              message="Market orders are currently not available."
            />
          )} */}

          {orderType === "market" && !isQuantityLessThanZero && (
            <CustomAlert
              variant="warning"
              message={`Estimated amount: ${marketQuantityToSell}`}
            />
          )}

          {isUserAssetBalanceError && (
            <CustomAlert
              variant="error"
              message={`Error retrieving shares amount`}
            />
          )}

          {/* ----------------------------
            SUBMIT
          ----------------------------- */}
          <Button
            disabled={
              isLimitOrderPending ||
              isPriceAboveMarketPrice ||
              isQuantityLessThanZero ||
              quantityNumber > userAssetBalance ||
              isUserAssetBalanceError
            }
            className="w-full py-5 rounded-full text-custom-white bg-custom-ticker-red hover:bg-custom-ticker-red/90 cursor-pointer"
          >
            {isLimitOrderPending
              ? "Processing..."
              : `Sell ${asset.asset_symbol}`}
          </Button>
        </form>
      </Form>

      <PinConfirmationModal
        isOpen={isPinModalOpen}
        onClose={() => setPinModalOpen(false)}
        onConfirm={handlePinConfirm}
        title="Authorize Transaction"
        description="Enter your 6-digit PIN to authorize this transaction"
        error={error}
        setError={setError}
        btnText="Confirm"
        btnLoadingText="Processing..."
        isLoading={isLimitOrderPending || initiateMarketOrderPending}
      />

      <SuccessModal
        isOpen={successModal?.isOpen}
        onClose={() => setSuccessModal({ ...successModal, isOpen: false })}
        title={successModal?.title}
        description={successModal?.description}
        buttonText={successModal?.buttonText}
      />
    </div>
  );
}
