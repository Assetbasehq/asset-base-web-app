import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router";
import assetBaseLogo from "@/assets/images/asset-base-logo.svg";
import { ArrowLeft } from "lucide-react";
import AssetInfo from "./asset-info";
import AssetTabs from "./asset-tabs";
import AssetTradePanel from "./asset-trade-panel";

interface Asset {
  id: string;
  name: string;
  acronym: string;
  logo: string;
  amount_raised: string;
  goal: string;
  round_closes: string;
  price: string;
  price_change_24hrs: string;
}
const demoAsset: Asset = {
  id: "1",
  name: "Landmark Realty Limited",
  acronym: "LARL",
  logo: assetBaseLogo,
  amount_raised: "$23,500",
  goal: "$1,200,000",
  round_closes: "15 days",
  price: "$3400.00",
  price_change_24hrs: "+2.33%",
};

export default function AssetDetails() {
  const { assetId } = useParams<{ assetId: string }>();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <Button
          onClick={() => navigate(-1)}
          className=" bg-custom-light-bg text-custom-white-text flex gap-2"
        >
          <ArrowLeft />
          Back
        </Button>

        <div className=" bg-custom-light-bg text-shadow-custom-white-text px-4 py-2 rounded-sm font-semibold">
          Home / Markets /{" "}
          <span className="text-custom-orange">
            {assetId?.toUpperCase() || "LARL"}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-col gap-4 lg:w-3/5">
          <AssetInfo asset={demoAsset} />
          <AssetTabs />
        </div>
        <div className="flex flex-col gap-4 lg:w-2/5">
          <AssetTradePanel />
        </div>
      </div>
    </div>
  );
}
