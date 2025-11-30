import { documentRequestService } from "@/api/document-requests.api";
import { CustomAlert } from "@/components/custom/custom-alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetUserPortfolio } from "@/hooks/use-accounts";
import type { IUserPortfolio } from "@/interfaces/accounts.interface";
import { useMutation } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

export default function InvestmentCertificate() {
  const [error, setError] = useState<string | null>("");
  const [success, setSuccess] = useState<string | null>("");
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);
  const [hasUserAgreed, setHasUserAgreed] = useState(false);

  const { data, isError, isLoading } = useGetUserPortfolio();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: documentRequestService.requestInvestmentCertificate,
    onSuccess: () => {
      setSuccess(
        "Your investment certificate has been sent to your mail successfully"
      );
      setSelectedAsset(null);
      setHasUserAgreed(false);
    },
    onError: (error) => {
      setError(error.message || "Something went wrong");
    },
  });

  const handleSubmit = async () => {
    setError(null);
    setSuccess(null);
    if (!selectedAsset) return setError("Please select an asset");
    if (selectedAsset) {
      mutateAsync({ asset_id: selectedAsset });
    }
  };

  console.log({ data });

  return (
    <div className="flex flex-col text-start p-4">
      <div className="flex flex-col gap-1 max-w-xl">
        <div className="mb-4">
          <h2 className="text-lg md:text-2xl font-semibold">
            Investment Certificate
          </h2>
          <p className="text-muted-foreground">
            Please select the asset you wish to generate your investment
            certificate for
          </p>
        </div>

        <div className="py-4 flex flex-col gap-1 w-full">
          <p className="text-muted-foreground">Select Asset</p>

          <div>
            <Select
              onValueChange={(value) => {
                setError(null);
                setSuccess(null);
                setSelectedAsset(value);
              }}
              value={selectedAsset || ""}
            >
              <SelectTrigger className="min-w-76 py-6 w-full">
                <SelectValue placeholder="Select Asset" />
              </SelectTrigger>
              <SelectContent className="overflow-hidden">
                {data && data.length > 0
                  ? data?.map((item: IUserPortfolio) => {
                      return (
                        <SelectItem key={item.id} value={item.asset_id}>
                          {item.asset.asset_name}
                        </SelectItem>
                      );
                    })
                  : null}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            checked={hasUserAgreed}
            onCheckedChange={() => setHasUserAgreed(!hasUserAgreed)}
            className="checkbox-orange cursor-pointer"
          />
          <small>
            I agree to the{" "}
            <Link className="text-custom-orange" to="#">
              terms and conditions
            </Link>
          </small>
        </div>

        {error && (
          <CustomAlert
            variant="destructive"
            message={error}
            className="w-fit my-4"
          />
        )}

        {success && (
          <CustomAlert
            variant="success"
            message={success}
            className="w-fit my-2"
          />
        )}

        <Button
          disabled={!hasUserAgreed || isPending}
          onClick={() => handleSubmit()}
          className="rounded-full my-2 py-5 btn-primary w-full"
        >
          {isPending ? (
            <span className="flex gap-2">
              <Loader className="animate-spin" /> Generating...
            </span>
          ) : (
            " GENERATE CERTIFICATE"
          )}
        </Button>
      </div>
    </div>
  );
}
