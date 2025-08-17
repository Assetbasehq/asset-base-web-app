import { cn } from "@/lib/utils";

export default function HotAssets() {
  const marketPairs = [
    {
      id: "1",
      pair: "BTC/USDT",
      price: "$3400.00",
      price_change_24hrs: "+2.33%",
    },
    {
      id: "2",
      pair: "ETH/USDT",
      price: "$5.00",
      price_change_24hrs: "+2.33%",
    },
    {
      id: "3",
      pair: "LTC/BTC",
      price: "$5.00",
      price_change_24hrs: "-2.33%",
    },
    {
      id: "4",
      pair: "BCH/USDT",
      price: "$5.00",
      price_change_24hrs: "-2.33%",
    },
    {
      id: "5",
      pair: "XRP/USDT",
      price: "$5.00",
      price_change_24hrs: "+2.33%",
    },
    {
      id: "6",
      pair: "XRP/USDT",
      price: "$5.00",
      price_change_24hrs: "-2.33%",
    },
    {
      id: "7",
      pair: "XRP/USDT",
      price: "$5.00",
      price_change_24hrs: "-2.33%",
    },
    {
      id: "8",
      pair: "XRP/USDT",
      price: "$5.00",
      price_change_24hrs: "+2.33%",
    },
  ];

  return (
    <div className="bg-custom-card-background flex flex-col gap-4 text-start py-2 pl-6 rounded-sm overflow-scroll no-scrollbar">
      <div className="flex gap-6">
        {marketPairs.map((marketPair) => (
          <div
            key={marketPair.id}
            className="flex gap-1 items-center justify-between"
          >
            <h1 className="font-semibold">{marketPair.pair}</h1>
            <p
              className={cn({
                "text-green-500": marketPair.price_change_24hrs.includes("+"),
                "text-red-500": marketPair.price_change_24hrs.includes("-"),
              })}
            >
              {marketPair.price_change_24hrs}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
