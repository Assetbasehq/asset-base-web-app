import { transactionService } from "@/api/transaction.api";
import { currencyToCountry } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import type { IMomoNetwork } from "@/interfaces/yellow-card.interface";

interface MomoNetworksProps {
  currency: string;
  selectedMomoNetwork: IMomoNetwork | null;
  handleSelectMomoNetwork: (method: IMomoNetwork) => void;
}

export default function MomoNetworks({
  currency,
  selectedMomoNetwork,
  handleSelectMomoNetwork,
}: MomoNetworksProps) {
  const {
    data: momoNetworksData,
    // isPending,
    // isError,
    // refetch,
  } = useQuery<{ data: IMomoNetwork[] }, Error>({
    queryKey: ["momo-networks", currency],
    queryFn: async () =>
      transactionService.getYellowCardNetworks({
        country: currencyToCountry[currency] || "",
        gateway: "momo",
      }),
    enabled: !!currency,
  });

  const momoNetworks = momoNetworksData?.data || [];

  const handleChange = (value: string) => {
    const selected = momoNetworks.find((n) => n.id === value);
    if (selected) handleSelectMomoNetwork(selected);
  };

  return (
    <div className="flex flex-col gap-1">
      <Label className="text-custom-grey text-xs md:text-sm">
        Select Network
      </Label>
      <Select
        value={selectedMomoNetwork?.id ?? ""}
        onValueChange={handleChange}
      >
        <SelectTrigger className="w-full py-6 rounded">
          <SelectValue placeholder="Select an option">
            {selectedMomoNetwork ? (
              <span className="capitalize">
                {selectedMomoNetwork.code.split("_")[0]}
              </span>
            ) : (
              "Select an option"
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {momoNetworks.map((momoNetwork) => (
            <SelectItem key={momoNetwork.id} value={momoNetwork.id}>
              <p className="text-sm font-medium capitalize">
                {momoNetwork.code.split("_")[0]}
              </p>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
