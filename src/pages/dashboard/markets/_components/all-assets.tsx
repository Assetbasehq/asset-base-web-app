import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Asset = {
  id: string;
  name: string;
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
    price: 1.25,
    change1h: -0.04,
    change24h: 1.15,
    change7d: -0.85,
    marketCap: 39823945612,
    volume24h: 912345678,
  },
];

export default function AllAssets() {
  return (
    <div className="p-6">
      <Table>
        <TableCaption>Market overview for selected assets</TableCaption>
        <TableHeader>
          <TableRow className="bg-black text-white">
            <TableHead className="text-white">#</TableHead>
            <TableHead className="text-right text-white">Name</TableHead>
            <TableHead className="text-right text-white">Price</TableHead>
            <TableHead className="text-right text-white">1h %</TableHead>
            <TableHead className="text-right text-white">24h %</TableHead>
            <TableHead className="text-right text-white">7d %</TableHead>
            <TableHead className="text-right text-white">Market Cap</TableHead>
            <TableHead className="text-right text-white">24h Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assets.map((asset, index) => (
            <TableRow key={asset.id} className="text-left">
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell className="font-medium">{asset.name}</TableCell>
              <TableCell className="text-right">
                ${asset.price.toLocaleString()}
              </TableCell>
              <TableCell
                className={`text-right ${
                  asset.change1h >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {asset.change1h}%
              </TableCell>
              <TableCell
                className={`text-right ${
                  asset.change24h >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {asset.change24h}%
              </TableCell>
              <TableCell
                className={`text-right ${
                  asset.change7d >= 0 ? "text-green-500" : "text-red-500"
                }`}
              >
                {asset.change7d}%
              </TableCell>
              <TableCell className="text-right">
                ${asset.marketCap.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                ${asset.volume24h.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
