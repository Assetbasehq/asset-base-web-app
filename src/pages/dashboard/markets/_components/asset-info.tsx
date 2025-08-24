import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { AlertCircle, ArrowDown, Clock, Share, Share2 } from "lucide-react";

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

interface AssetInfoProps {
  asset: Asset;
}

export default function AssetInfo({ asset }: AssetInfoProps) {
  return (
    <Card className="bg-custom-card border-none text-start shadow-none ">
      <CardContent className="text-white">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <img src={asset.logo} alt={asset.name} className="w-12" />
              <div>
                <p className="font-semibold">{asset.acronym}</p>
                <p className="text-muted-foreground">{asset.name}</p>
              </div>
            </div>
            <Share className="h-10 w-10" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-3xl text-custom-white-text">
                  {asset.price}
                </p>
                <small
                  className={cn("text-muted-foreground", {
                    "text-green-400": asset.price_change_24hrs.includes("+"),
                    "text-red-400": asset.price_change_24hrs.includes("-"),
                  })}
                >
                  {asset.price_change_24hrs}
                </small>
              </div>
              <p className="text-muted-foreground text-sm">
                At close:
                <span className="font-semibold text-custom-white-text">
                  {asset.round_closes}
                </span>
              </p>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col bg-custom-light-bg rounded-lg p-4 w-fir">
                <small className="text-muted-foreground">24hr Volume</small>
                <p className="font-semibold text-custom-white-text">
                  {asset.amount_raised}
                </p>
              </div>
              <div className="flex flex-col bg-custom-light-bg rounded-lg p-4 w-fit">
                <small className="text-muted-foreground">24hr Volume</small>
                <p className="font-semibold text-custom-white-text">
                  {asset.amount_raised}
                </p>
              </div>
              <div className="flex flex-col bg-custom-light-bg rounded-lg p-4 w-fit">
                <small className="text-muted-foreground">24hr Volume</small>
                <p className="font-semibold text-custom-white-text">
                  {asset.amount_raised}
                </p>
              </div>
            </div>
          </div>

          <div className="border p-6 rounded-lg flex gap-8 text-custom-white-text">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Clock />
                <p>24h Open</p>
              </div>
              <div className="flex gap-2">
                <p>{asset.price}</p>
                <p
                  className={cn("text-muted-foreground", {
                    "text-green-400": asset.price_change_24hrs.includes("+"),
                    "text-red-400": asset.price_change_24hrs.includes("-"),
                  })}
                >
                  {asset.price_change_24hrs}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <ArrowDown />
                <p>24h Close</p>
              </div>
              <div className="flex gap-2">
                <p>{asset.price}</p>
                <p
                  className={cn("text-muted-foreground", {
                    "text-green-400": asset.price_change_24hrs.includes("+"),
                    "text-red-400": asset.price_change_24hrs.includes("-"),
                  })}
                >
                  {asset.price_change_24hrs}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Clock />
                <p>24h High</p>
              </div>
              <div className="flex gap-2">
                <p>{asset.price}</p>
                <p
                  className={cn("text-muted-foreground", {
                    "text-green-400": asset.price_change_24hrs.includes("+"),
                    "text-red-400": asset.price_change_24hrs.includes("-"),
                  })}
                >
                  {asset.price_change_24hrs}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Clock />
                <p>24h Low</p>
              </div>
              <div className="flex gap-2">
                <p>{asset.price}</p>
                <p
                  className={cn("text-muted-foreground", {
                    "text-green-400": asset.price_change_24hrs.includes("+"),
                    "text-red-400": asset.price_change_24hrs.includes("-"),
                  })}
                >
                  {asset.price_change_24hrs}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-custom-blue-shade text-custom-white-text p-6 rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-4">
              <AlertCircle />
              <div>
                <h2 className="text-lg">Looking for more insights?</h2>
                <p>
                  The pro view allows experienced traders to view charts and
                  more
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <h2 className="text-xl">Switch to Pro</h2>
              <Switch className="border-2" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
