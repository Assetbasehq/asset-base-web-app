import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import assetBaseLogo from "@/assets/images/asset-base-logo.svg";
import { ArrowLeft } from "lucide-react";
import AssetInfo from "./asset-info";
import AssetTabs from "./asset-tabs";
import AssetTradePanel from "./asset-trade-panel";
import AssetOrders from "./asset-orders";
import { cn } from "@/lib/utils";

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

  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  const formattedSegments = segments.map((seg) =>
    seg.toLowerCase() === "dashboard" ? "home" : seg
  );

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

        {/* <div className=" bg-custom-light-bg text-custom-white px-4 py-2 rounded-sm font-semibold">
          Home / Markets /{" "}
          <span className="text-custom-orange">
            {assetId?.toUpperCase() || "LARL"}
          </span>
        </div> */}

        <div className="flex items-center px-2 py-1 bg-custom-light-bg text-custom-white rounded-sm">
          {formattedSegments.map((seg, idx) => {
            const isLast = idx === formattedSegments.length - 1;
            const to = "/" + segments.slice(0, idx + 1).join("/");

            return (
              <div key={idx} className="flex items-center gap-2 ">
                <Link
                  to={to}
                  className={cn(
                    "capitalize px-1 py-1 rounded text-sm",
                    isLast
                      ? "text-custom-orange font-medium uppercase"
                      : "hover:text-custom-white-text"
                  )}
                >
                  {seg}
                </Link>
                {!isLast && <span className="text-muted-foreground">/</span>}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-4 lg:flex-row">
        <div className="flex flex-col gap-4 lg:w-3/5">
          <AssetInfo asset={demoAsset} />
          <div className="hidden lg:block">
            <AssetTabs />
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:w-2/5 bg-custom-card rounded-xl p-6">
          <AssetTradePanel />
          <AssetOrders />
        </div>
        <div className="block lg:hidden">
          <AssetTabs />
        </div>
      </div>
    </div>
  );
}
