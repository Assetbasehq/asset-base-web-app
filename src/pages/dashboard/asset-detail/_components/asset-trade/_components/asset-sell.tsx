import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
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
import { FormatService } from "@/services/format-service";
import { currencyToSymbol } from "@/services/currency-service";
import { PinConfirmationModal } from "@/components/modals/pin-confirmation";
import { useState } from "react";
import { normalizeInput } from "@/helpers/deposit-methods";
import SuccessModal from "@/components/modals/success-modal";
import { CustomAlert } from "@/components/custom/custom-alert";

type BuyFormValues = {
  orderType: "ask" | "bid" | "buy_limit_order" | "sell_limit_order" | string;
  price_per_share?: string;
  number_of_shares?: string;
  quantity: string;
};

export default function AssetSell({ asset }: { asset: IAsset }) {
  const [isPinModalOpen, setPinModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //   const { data: orderRequests } = useOrderRequests({});

  //   console.log({ orderRequests });

  const form = useForm<BuyFormValues>({
    defaultValues: {
      orderType: "market",
      quantity: "1",
      price_per_share: asset.price_per_share.toString(),
      number_of_shares: "1",
    },
  });

  // Watch values for automatic calculation
  const orderType = useWatch({ control: form.control, name: "orderType" });
  const price = useWatch({ control: form.control, name: "price_per_share" });
  const shares = useWatch({ control: form.control, name: "number_of_shares" });

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
      setSuccessModalOpen(true);

      // form.reset();
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

    const payload = {
      ...values,
      asset_id: asset.id,
      order_type:
        values.orderType === "limit" ? "ask" : ("buy_limit_order" as string),
      pin,
    };

    console.log({ payload });

    mutateAsync(payload);
  };

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
                    <FormMessage />
                  </FormItem>
                )}
              />

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
                        {...field}
                        onChange={(e) => {
                          const value = e.target.value;

                          const { formattedAmount } = normalizeInput(value);

                          field.onChange(formattedAmount);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
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
                  value={FormatService.formatCurrency(
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
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {orderType === "market" && (
            <CustomAlert
              variant="warning"
              message="Market orders are currently not available."
            />
          )}

          {/* ----------------------------
            SUBMIT
          ----------------------------- */}
          <Button
            disabled={isPending}
            className="w-full py-5 rounded-full text-custom-white bg-custom-ticker-red hover:bg-custom-ticker-green/90 cursor-pointer"
          >
            {isPending ? "Processing..." : `Sell ${asset.asset_symbol}`}
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
        btnText="Confirm"
        btnLoadingText="Processing..."
        isLoading={isPending}
      />

      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => {
          setSuccessModalOpen(false);
        }}
        title="Order Successful"
        description="Your order has been placed successfully."
        buttonText="Close"
      />
    </div>
  );
}
