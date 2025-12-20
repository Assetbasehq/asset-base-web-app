import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate, useParams } from "react-router";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import AssetInfo from "./_components/asset-info/asset-info";
import AssetTabs from "./_components/asset-tabs/asset-tabs";
import AssetTradePanel from "./_components/asset-trade/asset-trade-panel";
import AssetOrders from "./_components/asset-orders/asset-orders";
import { useState } from "react";
import AnimatedWrapper from "@/components/animations/animated-wrapper";
import AssetDetailPro from "../asset-detail-pro/asset-detail-pro";
import { useAsset } from "@/hooks/useAssets";
import { useAssetMarketPrice } from "@/hooks/use-trade";
import { Card, CardContent } from "@/components/ui/card";

// import AssetDetailPro from "./asset-detail-pro/asset-detail-pro";

export default function AssetDetail() {
  const [isPro, setIsPro] = useState(false);
  const { asset_symbol } = useParams<{ asset_symbol: string }>();

  console.log({ asset_symbol });

  const navigate = useNavigate();
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  const formattedSegments = segments.map((seg) =>
    seg.toLowerCase() === "dashboard" ? "home" : seg
  );

  const {
    data: asset,
    isLoading,
    isError,
  } = useAsset({ asset_symbol: asset_symbol as string });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  if (!asset) return <p>Asset not found</p>;

  if (asset && asset.trading_type === "primary") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="bg-custom-card border-none shadow-none max-w-md w-full">
          <CardContent className="p-6 flex flex-col gap-4 text-center">
            <div className="flex flex-col items-center gap-2 justify-center">
              {/* <RiFlashlightFill className="text-custom-orange w-10 h-10" /> */}
              <img
                src={asset.logo}
                alt={asset.asset_description}
                className="h-12 rounded"
              />
              <h2 className=" font-semibold text-xl">{asset.asset_symbol}</h2>
            </div>

            <h2 className="text-lg font-semibold text-custom-white">
              Available in Primary Market
            </h2>

            <p className="text-sm text-custom-grey">
              This asset is currently available in the primary market. You can
              invest directly at the offering price.
            </p>

            <Button
              onClick={() => navigate(`/dashboard/launchpad/${asset.slug}`)}
              className="btn-primary py-5 rounded-full mt-2"
            >
              Invest in Primary Market
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isPro) {
    return (
      <AnimatedWrapper animationKey={String(isPro)}>
        <AssetDetailPro
          asset={asset}
          isChecked={isPro}
          onSwitch={(value) => {
            setTimeout(() => {
              setIsPro(value);
            }, 1000);
          }}
        />
      </AnimatedWrapper>
    );
  }

  return (
    <AnimatedWrapper animationKey={String(isPro)}>
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
            <AssetInfo
              asset={asset}
              isChecked={isPro}
              onSwitch={(value) => {
                setTimeout(() => {
                  setIsPro(value);
                }, 1000);
              }}
            />
            <div className="hidden lg:block">
              <AssetTabs />
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:w-2/5 bg-custom-card rounded-xl p-6">
            <AssetTradePanel asset={asset} />
            <AssetOrders />
          </div>
          <div className="block lg:hidden">
            <AssetTabs />
          </div>
        </div>
      </div>
    </AnimatedWrapper>
  );
}
