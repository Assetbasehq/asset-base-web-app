import assetBaseLogo from "@/assets/images/asset-base-logo.svg";
import DataTable from "@/components/custom/data-table";
import { Button } from "@/components/ui/button";

type Asset = {
  id: string;
  symbol: string;
  name: string;
  logo: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
};

const assets: Asset[] = [
  {
    id: "1",
    symbol: "BTC",
    name: "Bitcoin",
    logo: assetBaseLogo,
    price: 58432.12,
    change1h: -0.12,
    change24h: 1.45,
    change7d: -3.24,
    marketCap: 1148239456123,
    volume24h: 28412345678,
  },
  {
    id: "2",
    symbol: "ETH",
    name: "Ethereum",
    logo: assetBaseLogo,
    price: 3124.87,
    change1h: 0.34,
    change24h: 2.11,
    change7d: 5.18,
    marketCap: 374823945612,
    volume24h: 12412345678,
  },
  {
    id: "3",
    symbol: "BNB",
    name: "BNB Coin",
    logo: assetBaseLogo,
    price: 412.55,
    change1h: 0.05,
    change24h: -0.87,
    change7d: 1.25,
    marketCap: 63482394561,
    volume24h: 2412345678,
  },
  {
    id: "4",
    symbol: "ADA",
    name: "Cardano",
    logo: assetBaseLogo,
    price: 1.25,
    change1h: -0.04,
    change24h: 1.15,
    change7d: -0.85,
    marketCap: 39823945612,
    volume24h: 912345678,
  },
  {
    id: "5",
    symbol: "SOL",
    name: "Solana",
    logo: assetBaseLogo,
    price: 23.55,
    change1h: 0.02,
    change24h: -0.45,
    change7d: 0.75,
    marketCap: 823945612,
    volume24h: 12345678,
  },
  {
    id: "6",
    symbol: "DOGE",
    name: "Dogecoin",
    logo: assetBaseLogo,
    price: 0.05,
    change1h: -0.01,
    change24h: 0.25,
    change7d: -0.35,
    marketCap: 823945612,
    volume24h: 12345678,
  },
  {
    id: "7",
    symbol: "AVAX",
    name: "Avalanche",
    logo: assetBaseLogo,
    price: 23.55,
    change1h: 0.02,
    change24h: -0.45,
    change7d: 0.75,
    marketCap: 823945612,
    volume24h: 12345678,
  },
];

const mobileColumns = [
  {
    header: "#",
    render: (row: Asset) => (
      <div className="flex items-center gap-2">{row.id}</div>
    ),
  },
  {
    header: "Name",
    render: (row: Asset) => (
      <div className="flex items-center gap-2">
        <img
          src={row.logo}
          alt={row.name}
          className="w-8 h-8 lg:w-12 lg:h-12"
        />
        <div className="flex flex-col">
          <span className="">{row.symbol}</span>
          <span className="text-xs">{row.name}</span>
        </div>
      </div>
    ),
  },
  {
    header: "",
    render: (row: Asset) => (
      <div>
        <Button className="bg-transparent border border-custom-orange text-custom-orange rounded-full px-4 !py-0 text-xs hover:bg-transparent cursor-pointer">
          Trade
        </Button>
      </div>
    ),
  },

  {
    header: "24h %",
    render: (row: Asset) => (
      <span
        className={`${row.change24h > 0 ? "text-green-400" : "text-red-400"}`}
      >
        {row.change24h.toFixed(2)}%
      </span>
    ),
  },
];

const columns = [
  {
    header: "#",
    render: (row: Asset) => (
      <div className="flex items-center gap-2">{row.id}</div>
    ),
  },
  {
    header: "Name",
    render: (row: Asset) => (
      <div className="flex items-center gap-2">
        <img
          src={row.logo}
          alt={row.name}
          className=" w-8 h-8 lg:w-12 lg:h-12"
        />
        <div className="flex flex-col">
          <span className="font-semibold">{row.symbol}</span>
          <span>{row.name}</span>
        </div>
      </div>
    ),
  },
  {
    header: "Price",
    render: (row: Asset) => (
      <span className="text-primary">${row.price.toFixed(2)}</span>
    ),
  },
  {
    header: "1h %",
    render: (row: Asset) => (
      <span
        className={`${
          row.change1h.toString().includes("-")
            ? "text-green-400"
            : "text-red-400"
        }`}
      >
        {row.change1h.toFixed(2)}%
      </span>
    ),
  },
  {
    header: "24h %",
    render: (row: Asset) => (
      <span
        className={`${row.change24h > 0 ? "text-green-400" : "text-red-400"}`}
      >
        {row.change24h.toFixed(2)}%
      </span>
    ),
  },
  {
    header: "7d %",
    render: (row: Asset) => (
      <span
        className={`${row.change7d > 0 ? "text-green-400" : "text-red-400"}`}
      >
        {row.change7d.toFixed(2)}%
      </span>
    ),
  },
  {
    header: "Market Cap",
    render: (row: Asset) => (
      <span>${row.marketCap.toLocaleString("en-US")}</span>
    ),
  },
  {
    header: "24h Volume",
    render: (row: Asset) => (
      <span>${row.volume24h.toLocaleString("en-US")}</span>
    ),
  },
];

export default function MyAssets() {
  return (
    <div>
      <div className="md:hidden">
        <DataTable
          // isLoading={true}
          data={assets}
          columns={mobileColumns}
          noDataMessage="No data available."
        />
      </div>
      <div className="hidden md:block">
        <DataTable
          // isLoading={true}
          data={assets}
          columns={columns}
          noDataMessage="No data available."
        />
      </div>
    </div>
  );
}
