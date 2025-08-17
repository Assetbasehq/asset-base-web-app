import assetBaseLogo from "@/assets/images/asset-base-logo.svg";
import DataTable from "@/components/custom/data-table";

type Asset = {
  id: string;
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
    id: "btc",
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
    id: "eth",
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
    id: "bnb",
    name: "BNB",
    logo: assetBaseLogo,
    price: 412.55,
    change1h: 0.05,
    change24h: -0.87,
    change7d: 1.25,
    marketCap: 63482394561,
    volume24h: 2412345678,
  },
  {
    id: "ada",
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
    id: "sol",
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
    id: "doge",
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
    id: "avax",
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

export default function AllAssets() {
  const columns = [
    {
      header: "#",
      render: (row: Asset) => (
        <div className="flex items-center gap-2">
          <img src={row.logo} alt={row.name} className="w-8 h-8" />
          <span>{row.id}</span>
        </div>
      ),
    },
    {
      header: "Name",
      render: (row: Asset) => (
        <div className="flex items-center gap-2">
          <img src={row.logo} alt={row.name} className="w-8 h-8" />
          <span>{row.name}</span>
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

  return (
    <div className="mt-8 rounded-xl overflow-hidden">
      <h2 className="text-2xl font-semibold text-left mb-6">All Assets</h2>
      <DataTable
        data={assets}
        columns={columns}
        noDataMessage="No data available."
      />
      {/* <div className="rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-black text-white">
              <TableHead className="text-white pl-6">#</TableHead>
              <TableHead className="text-white">Name</TableHead>
              <TableHead className="text-white">Price</TableHead>
              <TableHead className="text-white">1h %</TableHead>
              <TableHead className="text-white">24h %</TableHead>
              <TableHead className="text-white">7d %</TableHead>
              <TableHead className="text-white">Market Cap</TableHead>
              <TableHead className="text-white p-4">24h Volume</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assets.map((asset, index) => (
              <TableRow key={asset.id} className="text-left">
                <TableCell className="font-medium pl-6">{index + 1}</TableCell>
                <TableCell className="font-medium flex items-center gap-2 py-8">
                  <img src={asset.logo} alt={asset.name} className="w-6" />
                  {asset.name}
                </TableCell>
                <TableCell className="text-left">
                  ${asset.price.toLocaleString()}
                </TableCell>
                <TableCell
                  className={cn({
                    "text-green-500": asset.change1h >= 0,
                    "text-red-500": asset.change1h < 0,
                  })}
                >
                  {asset.change1h}%
                </TableCell>
                <TableCell
                  className={cn({
                    "text-green-500": asset.change24h >= 0,
                    "text-red-500": asset.change24h < 0,
                  })}
                >
                  {asset.change24h}%
                </TableCell>
                <TableCell
                  className={cn({
                    "text-green-500": asset.change7d >= 0,
                    "text-red-500": asset.change7d < 0,
                  })}
                >
                  {asset.change7d}%
                </TableCell>
                <TableCell className="">
                  ${asset.marketCap.toLocaleString()}
                </TableCell>
                <TableCell className="">
                  ${asset.volume24h.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div> */}
    </div>
  );
}
