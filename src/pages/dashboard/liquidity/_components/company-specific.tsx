import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { liquidityService } from "@/api/liquidity.api";
import { SearchableSelect } from "@/components/custom/searchable-select";
import { useState } from "react";
import type { IAsset } from "@/interfaces/asset.interface";
import { useAssets } from "@/hooks/useAssets";
import { CustomAlert } from "@/components/custom/custom-alert";
import { Loader } from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";
import { currencyToSymbol } from "@/services/currency-service";

type FormValues = {
  amount: number;
  companyId: string;
};

export default function CompanySpecific({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [searchValue, setSearchValue] = useState({
    name: "",
    value: "",
  });
  const [error, setError] = useState<string | null>(null);

  const [selectedAsset, setSelectedAsset] = useState<IAsset | null>(null);

  const queryClient = useQueryClient();

  const { data, isLoading } = useAssets({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: liquidityService.addLiquidity,
    onSuccess: () => {
      onSuccess?.();
      reset();
      queryClient.invalidateQueries({ queryKey: ["user-provided-liquidity"] });
    },
    onError: (error) => {
      console.error(error);
      setError(error.message);
      // toast.error("Failed to add liquidity");
    },
  });

  const onSubmit = (data: FormValues) => {
    setError(null);
    const payload = {
      poolType: "COMPANY",
      web3ServiceId: selectedAsset?.web3_service_id || "",
      currency: selectedAsset?.currency || "",
      amount: data.amount.toString(),
      idempotencyKey: Math.random().toString(36).substring(2, 15),
    };
    mutateAsync(payload);
  };

  const assets = data || [];

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)} className=" flex flex-col gap-4">
        {/* Amount */}
        <div className="space-y-1">
          <Label className="text-muted-foreground text-sm">Amount</Label>
          <ButtonGroup className="w-full">
            <Button
              variant="outline"
              disabled
              className="w-[40px] font-medium py-6 rounded-l-sm"
            >
              {selectedAsset ? currencyToSymbol[selectedAsset.currency] : "-"}
            </Button>
            <Input
              type="number"
              className="py-6"
              placeholder="Amount to add"
              {...register("amount", {
                required: "Amount is required",
                min: { value: 1, message: "Amount must be greater than 0" },
              })}
            />
          </ButtonGroup>
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
              image: asset.logo,
              obj: asset,
            }))}
            placeholder="Select Company"
            value={searchValue.name || ""}
            onChange={({ value, label, obj }) => {
              setError(null);
              console.log({ obj });

              setSelectedAsset(obj);
              setSearchValue({ name: label, value });
            }}
            className="w-full py-6"
            cancelButton={false}
          />
        </div>
        {error && <CustomAlert variant="error" message={error} />}

        <Button
          type="submit"
          className="btn-primary py-6 rounded-full mt-auto"
          disabled={isPending}
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <Loader className="animate-spin" /> PROCESSING...
            </span>
          ) : (
            "ADD LIQUIDITY"
          )}{" "}
        </Button>
      </form>
    </div>
  );
}
