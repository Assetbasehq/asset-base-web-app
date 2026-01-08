import DataTable from "@/components/custom/data-table";
import { Button } from "@/components/ui/button";
import { useAssets } from "@/hooks/useAssets";
import type { IAsset } from "@/interfaces/asset.interface";
import { formatService } from "@/services/format-service";
import { Link } from "react-router";

export default function AllAssets() {
  const { data, isLoading, isError } = useAssets({});

  console.log({ data });

  const columns = [
    {
      header: "#",
      render: (row: IAsset, index: number) => (
        <div className="flex items-center gap-2">
          <span>{index + 1}</span>
        </div>
      ),
    },
    {
      header: "Name",
      render: (row: IAsset) => (
        <div className="flex items-center gap-2">
          <img src={row.logo} alt={row.asset_name} className="w-8 h-8" />
          <span>{row.asset_symbol}</span>
        </div>
      ),
    },
    {
      header: "Price",
      render: (row: IAsset) => (
        <span className="text-primary">${row.price_per_share}</span>
      ),
    },
    {
      header: "1h %",
      render: (row: IAsset) => (
        <span
        // className={`${
        //   row.change1h.toString().includes("-")
        //     ? "text-green-400"
        //     : "text-red-400"
        // }`}
        >
          -
        </span>
      ),
    },
    {
      header: "24h %",
      render: (row: IAsset) => (
        <span
        // className={`${row.change24h > 0 ? "text-green-400" : "text-red-400"}`}
        >
          -
        </span>
      ),
    },
    {
      header: "7d %",
      render: (row: IAsset) => (
        <span
        // className={`${row.change7d > 0 ? "text-green-400" : "text-red-400"}`}
        >
          -
        </span>
      ),
    },
    {
      header: "Market Cap",
      render: (row: IAsset) => <span>-</span>,
    },
    {
      header: "24h Volume",
      render: (row: IAsset) => <span>-</span>,
    },
    {
      header: "",
      render: (row: IAsset) => (
        <span
        // className={`${row.change24h > 0 ? "text-green-400" : "text-red-400"}`}
        >
          <Button variant="link" className="p-0 cursor-pointer">
            <Link to={`/dashboard/assets/${row.slug}`}>View</Link>
          </Button>
        </span>
      ),
    },
  ];

  const mobileColumns = [
    {
      header: "#",
      render: (row: IAsset, index: number) => (
        <div className="flex items-center gap-2">
          <span>{index + 1}</span>
        </div>
      ),
    },
    {
      header: "Name",
      render: (row: IAsset) => (
        <div className="flex items-center gap-2">
          <img
            src={row.logo}
            alt={row.asset_name}
            className="w-8 h-8 rounded-full"
          />
          <div className="flex flex-col">
            <span className="font-bold">{row.asset_symbol}</span>
            <span className="text-xs font-medium">
              {formatService.formatCurrency(row.price_per_share, row.currency)}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "24h %",
      render: (row: IAsset) => (
        <span
        // className={`${row.change24h > 0 ? "text-green-400" : "text-red-400"}`}
        >
          -
        </span>
      ),
    },
    {
      header: "",
      render: (row: IAsset) => (
        <span
        // className={`${row.change24h > 0 ? "text-green-400" : "text-red-400"}`}
        >
          <Button variant="link" className="p-0 cursor-pointer">
            <Link to={`/dashboard/assets/${row.slug}`}>View</Link>
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div className="mt-2 rounded-xl overflow-hidden">
      <h2 className="text-lg md:text-xl text-left py-2">All Assets</h2>
      <div className="hidden md:block">
        <DataTable
          data={
            data?.filter((asset) => asset.trading_type === "secondary") || []
          }
          columns={columns}
          noDataMessage="No data available."
        />
      </div>
      <div className="md:hidden">
        <DataTable
          data={
            data?.filter((asset) => asset.trading_type === "secondary") || []
          }
          columns={mobileColumns}
          noDataMessage="No data available."
        />
      </div>
    </div>
  );
}
