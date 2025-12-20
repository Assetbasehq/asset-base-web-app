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
import { currencyToSymbol } from "@/services/currency-service";
import { PinConfirmationModal } from "@/components/modals/pin-confirmation";
import { useState } from "react";
import { normalizeInput } from "@/helpers/deposit-methods";
import SuccessModal from "@/components/modals/success-modal";
import { CustomAlert } from "@/components/custom/custom-alert";
import {
  useAssetMarketPrice,
  useEstimatePaymentAmount,
} from "@/hooks/use-trade";
import { tradeService } from "@/api/trade-service.api";
import { formatService } from "@/services/format-service";

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

export default function AssetBuy({ asset }: { asset: IAsset }) {
  const [isPinModalOpen, setPinModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
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

  console.log({ assetMarketPrice });

  const form = useForm<BuyFormValues>({
    defaultValues: {
      orderType: "market",
      quantity: "",
      price_per_share: assetMarketPrice.toString(),
      number_of_shares: "",
    },
  });

  // Watch values for automatic calculation
  const orderType = useWatch({ control: form.control, name: "orderType" });
  const price = useWatch({ control: form.control, name: "price_per_share" });
  const shares = useWatch({ control: form.control, name: "number_of_shares" });
  const quantity = useWatch({ control: form.control, name: "quantity" });

  const { data: estimatedAmountData, isLoading: estimatedAmountLoading } =
    useEstimatePaymentAmount({
      assetWeb3ServiceId: asset.web3_service_id,
      amountToBuy: quantity ? quantity.replaceAll(",", "") : "0",
    });

  // console.log({ estimatedAmountData });

  const totalAmount =
    orderType === "limit" && price && shares
      ? Number(price) * Number(shares)
      : 0;

  // -------------------------
  // Mutation
  // -------------------------
  const { mutateAsync, isPending } = useMutation({
    mutationFn: orderRequestService.makeOrderRequest,

    onSuccess: (data) => {
      console.log({ data });
      setPinModalOpen(false);
      // setSuccessModalOpen(true);
      setSuccessModal({
        isOpen: true,

        title: "Buy Order placed successfully",
        description: `You've successfully placed a buy order for ${quantity} shares of ${asset.asset_symbol}.`,
        buttonText: "Close",
      });

      // invalidate asset market price and history to update market price and order history
      queryClient.invalidateQueries({
        queryKey: ["orders", "asset-market-price"],
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
        title: `Buy order placed successfully`,
        description: `You've successfully placed a buy order for ${quantity} shares of ${asset.asset_symbol}.`,
        buttonText: "Close",
      });

      // invalidate asset to update available shares and order history
      queryClient.invalidateQueries({ queryKey: ["orders"] });

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
        type: "buy",
        amount: Number(quantity.replaceAll(",", "")),
        webServiceId: asset.web3_service_id,
      });
      return;
    }

    const payload = {
      ...values,
      asset_id: asset.id,
      order_type: values.orderType === "limit" ? "bid" : "",
      pin,
    };

    mutateAsync(payload);
  };

  const isPriceBelowMarketPrice =
    orderType === "limit" && price && assetMarketPrice
      ? Number(price) > Number(assetMarketPrice)
      : false;

  const isQuantityLessThanZero =
    orderType === "market" && Number(quantity) <= 0 ? true : false;

  const marketQuantityToBuy =
    !estimatedAmountLoading && estimatedAmountData
      ? formatService.formatCurrency(estimatedAmountData?.data?.paymentAmount)
      : "...";

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
                <FormMessage className="text-right" />
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
                    <FormLabel className="text-muted-foreground text-sm">
                      Price per Share
                    </FormLabel>
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

              {isPriceBelowMarketPrice && (
                <CustomAlert
                  variant="warning"
                  message="Price per share is above market price"
                />
              )}

              {/* NUMBER OF SHARES */}
              <FormField
                control={form.control}
                name="number_of_shares"
                rules={{ required: "Number of shares is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-muted-foreground text-sm">
                      Number of Shares
                    </FormLabel>
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

              {/* TOTAL AMOUNT (Disabled) */}
              <FormItem>
                <FormLabel className="text-muted-foreground text-sm">
                  Total Amount in {currencyToSymbol[asset.currency]}
                </FormLabel>
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

          {/* ----------------------------
            MARKET ORDER QUANTITY
          ----------------------------- */}
          {orderType === "market" && (
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-muted-foreground text-sm">
                    Quantity
                  </FormLabel>
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
              message={`Estimated amount: ${marketQuantityToBuy}`}
            />
          )}

          {/* ----------------------------
            SUBMIT
          ----------------------------- */}
          <Button
            disabled={
              isPending || isPriceBelowMarketPrice || isQuantityLessThanZero
            }
            className="w-full py-5 rounded-full text-custom-white bg-custom-ticker-green hover:bg-custom-ticker-green/90 cursor-pointer"
          >
            {isPending ? "Processing..." : `Buy ${asset.asset_symbol}`}
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
        isLoading={isPending || initiateMarketOrderPending}
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
