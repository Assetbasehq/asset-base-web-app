import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { liquidityService } from "@/api/liquidity.api";
import { SearchableSelect } from "@/components/custom/searchable-select";
import { useGetAssets } from "@/hooks/useAssets";
import { useState } from "react";
import type { IAsset } from "@/interfaces/asset.interface";

type FormValues = {
  amount: number;
  companyId: string;
};

export default function CompanySpecific() {
  const [searchValue, setSearchValue] = useState({
    name: "",
    value: "",
  });

  const [selectedAsset, setSelectedAsset] = useState<IAsset | null>(null);

  const { data, isLoading } = useGetAssets({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: liquidityService.addLiquidity,
    onSuccess: () => {
      reset();
      // toast.success("Liquidity added successfully");
    },
    onError: (error) => {
      console.error(error);
      // toast.error("Failed to add liquidity");
    },
  });

  const onSubmit = (data: FormValues) => {
    const payload = {
      poolType: "COMPANY",
      web3ServiceId: selectedAsset?.web3_service_id || "",
      currency: selectedAsset?.currency || "",
      amount: data.amount.toString(),
      idempotencyKey: Math.random().toString(36).substring(2, 15),
    };
    mutateAsync(payload);
  };

  console.log({ data, selectedAsset });

  const assets = data || [];

  return (
    <div className="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4"
      >
        {/* Amount */}
        <div className="space-y-1">
          <Label className="text-muted-foreground text-sm">Amount</Label>
          <Input
            type="number"
            className="py-6"
            placeholder="Amount to add"
            {...register("amount", {
              required: "Amount is required",
              min: { value: 1, message: "Amount must be greater than 0" },
            })}
          />
          {errors.amount && (
            <p className="text-sm text-red-500">{errors.amount.message}</p>
          )}
        </div>

        {/* Company */}
        <div className="space-y-1">
          <Label className="text-muted-foreground text-sm">
            Select Company
          </Label>

          <SearchableSelect
            options={assets.map((asset: IAsset) => ({
              label: asset.asset_name,
              value: asset.asset_name,
              icon: (
                <img
                  src={asset.logo}
                  alt={asset.asset_name}
                  className="w-4 h-4 rounded-full"
                />
              ),
              obj: asset,
            }))}
            placeholder="Select Company"
            value={searchValue.name || ""}
            onChange={({ value, label, obj }) => {
              console.log({ value, label, obj });
              setSelectedAsset(obj);

              setSearchValue({ name: label, value });
            }}
            className="w-full py-6"
            cancelButton={false}
          />
        </div>

        <Button
          type="submit"
          className="btn-primary py-6 rounded-full mt-auto"
          disabled={isPending}
        >
          {isPending ? "PROCESSING..." : "ADD LIQUIDITY"}
        </Button>
      </form>
    </div>
  );
}
