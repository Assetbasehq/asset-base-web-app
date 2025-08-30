import ButtonLoader from "@/components/custom/button-loader";
import { CustomAlert } from "@/components/custom/custom-alert";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Link } from "react-router";

export default function ProfileInvestmentCertificate() {
  const [error, setError] = useState<string | null>("");

  return (
    <div className="flex flex-col text-start p-8">
      <div className="flex flex-col gap-1">
        <div className="mb-4">
          <h2 className="text-lg md:text-2xl font-semibold">
            Investment Certificate
          </h2>
          <p className="text-muted-foreground">
            Please select the asset you wish to generate your investment
            certificate for
          </p>
        </div>

        <div className="py-4 flex flex-col gap-1">
          <p className="text-muted-foreground">Select Asset</p>

          <div>
            <Select>
              <SelectTrigger className="min-w-76 py-6">
                <SelectValue placeholder="Select Asset" />
              </SelectTrigger>
              <SelectContent className="overflow-hidden">
                <SelectItem value="asset1">Asset 1</SelectItem>
                <SelectItem value="asset2">Asset 2</SelectItem>
                <SelectItem value="asset3">Asset 3</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {error && (
            <CustomAlert
              variant="destructive"
              message={error}
              className="w-fit"
            />
          )}
        </div>

        <div className="flex items-center gap-2">
          <Checkbox className="checkbox-orange cursor-pointer" />
          <small>
            I agree to the{" "}
            <Link className="text-custom-orange" to="#">
              terms and conditions
            </Link>
          </small>
        </div>

        <ButtonLoader
          isLoading={false}
          // onClick={() => setError("Hellow")}
          className="w-76 rounded-full my-2 py-5 btn-primary"
        >
          GENERATE CERTIFICATE
        </ButtonLoader>
      </div>
    </div>
  );
}
