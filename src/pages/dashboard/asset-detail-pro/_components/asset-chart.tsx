import type { IAsset } from "@/interfaces/asset.interface";
import { useEffect, useRef, memo } from "react";

interface AssetChartProps {
  asset: IAsset;
}

const AssetChart = memo(function AssetChart({ asset }: AssetChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clean up previous widget if it exists
    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;

    const symbol = asset?.asset_symbol || "NASDAQ:AAPL";

    script.innerHTML = JSON.stringify({
      allow_symbol_change: true,
      autosize: true,
      calendar: false,
      details: false,
      hide_side_toolbar: true,
      hide_top_toolbar: false,
      hide_legend: false,
      hide_volume: false,
      hotlist: false,
      interval: "D",
      locale: "en",
      save_image: true,
      style: "1",
      symbol,
      theme: "dark",
      timezone: "Etc/UTC",
      backgroundColor: "#0F0F0F",
      gridColor: "rgba(242, 242, 242, 0.06)",
      withdateranges: false,
    });

    containerRef.current.appendChild(script);

    // Cleanup on unmount
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [asset?.asset_symbol]);

  return (
    <div
      className="tradingview-widget-container"
      ref={containerRef}
      style={{ height: "500px", width: "100%" }}
    >
      <div
        className="tradingview-widget-container__widget"
        style={{ height: "calc(100% - 32px)", width: "100%" }}
      />
      <div className="tradingview-widget-copyright text-xs text-muted-foreground mt-1">
        <a
          href={`https://www.tradingview.com/symbols/${(
            asset?.asset_symbol || "NASDAQ-AAPL"
          ).replace(":", "-")}/`}
          rel="noopener noreferrer"
          target="_blank"
          className="text-custom-orange hover:underline"
        >
          {asset?.asset_name || "AAPL"} chart
        </a>{" "}
        by TradingView
      </div>
    </div>
  );
});

export default AssetChart;
