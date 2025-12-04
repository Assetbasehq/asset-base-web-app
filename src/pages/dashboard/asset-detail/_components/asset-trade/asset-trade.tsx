import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { IAsset } from "@/interfaces/asset.interface";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { orderRequestService } from "@/api/order-requests.api";

const tabs = [
  {
    key: "buy",
    label: "Buy",
    component: (asset: IAsset) => <BuyWindow asset={asset} />,
  },
  {
    key: "sell",
    label: "Sell",
    component: (asset: IAsset) => <SellWindow asset={asset} />,
  },
];

export default function AssetTrade({ asset }: { asset: IAsset }) {
  const [active, setActive] = useState("buy");

  return (
    <div>
      <div className="w-full border-b text-custom-white-text ">
        <div className="relative flex w-full bg-custom-light-bg rounded-full px-2 py-1 my-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActive(tab.key)}
              className={cn(
                "flex-1 py-1 sm:py-2 text-center text-sm font-medium relative cursor-pointer"
              )}
            >
              <span className="text-sm relative z-50">{tab.label}</span>
              {active === "buy" && tab.key === "buy" && (
                <motion.div
                  layoutId="pill-underline"
                  className="absolute bottom-0 left-0 right-0 h-full bg-custom-ticker-green rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              {active === "sell" && tab.key === "sell" && (
                <motion.div
                  layoutId="pill-underline"
                  className="absolute bottom-0 left-0 right-0 h-full bg-red-500 rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Tab content */}
      <div className="mt-4">
        {tabs.find((tab) => tab.key === active)?.component(asset)}
      </div>
    </div>
  );
}

type BuyFormValues = {
  orderType: string;
  price: number;
  // price_per_share: number;
  number_of_shares: number;
  quantity: number;
};

function BuyWindow({ asset }: { asset: IAsset }) {
  const form = useForm<BuyFormValues>({
    defaultValues: {
      orderType: "ask",
      number_of_shares: 4,
      quantity: 0,
    },
  });

  // -------------------------
  // Mutation
  // -------------------------
  const { mutateAsync, isPending } = useMutation({
    mutationFn: orderRequestService.makeOrderRequest,

    onSuccess: (data) => {
      console.log({ data });

      // form.reset();
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  async function onSubmit(values: BuyFormValues) {
    const payload = {
      asset_id: asset.id,
      price_per_share: asset.price_per_share.toString(),
      number_of_shares: values.number_of_shares.toString(),
      order_type: "ask",
      pin: "111111",
    };

    console.log({ payload });

    mutateAsync(payload);
  }

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {/* ORDER TYPE */}
          <FormField
            control={form.control}
            name="orderType"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground text-sm">
                  Order Type
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full py-6"
                    placeholder="e.g. Limit / Market"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* PRICE PER SHARE */}
          {/* <FormField
            control={form.control}
            name="pricePerShare"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-muted-foreground text-sm">
                  Price per Share
                </FormLabel>
                <FormControl>
                  <Input
                    className="w-full py-6"
                    type="number"
                    step="0.01"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          {/* QUANTITY */}
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

          {/* SUBMIT BUTTON */}
          <Button
            disabled={isPending}
            className="w-full py-6 rounded-full text-custom-white bg-custom-ticker-green hover:bg-custom-ticker-green/90"
          >
            {isPending ? "Processing..." : "Buy Code"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

function SellWindow({ asset }: { asset: IAsset }) {
  return (
    <div>
      <form action="" className="flex flex-col gap-4">
        <div>
          <Label className="text-muted-foreground text-sm">Order Type</Label>
          <Input className="w-full py-6" />
        </div>
        <div>
          <Label className="text-muted-foreground text-sm">
            Price per Share
          </Label>
          <Input className="w-full py-6" />
        </div>
        <div>
          <Label className="text-muted-foreground text-sm">Quantity</Label>
          <Input className="w-full py-6" />
        </div>
        <Button
          disabled
          className="w-full py-6 rounded-full text-custom-white bg-custom-ticker-red hover:bg-custom-ticker-red"
        >
          Sell Code
        </Button>
      </form>
    </div>
  );
}
