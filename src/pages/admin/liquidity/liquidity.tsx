import { useState } from "react";
import DataTable from "@/components/custom/data-table";
import SearchInput from "@/pages/dashboard/assets/_components/search-input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Ellipsis, EllipsisVertical, MoreHorizontal } from "lucide-react";

// import FilterDropdown from "./_components/filter-dropdown";

type Asset = {
  id: string;
  asset: string;
  totalLiquidity: string;
  marketCap: string;
  marketPrice: string;
  creationDate: string;
  status: "Active" | "Inactive" | "Suspended";
};

const assets: Asset[] = [
  {
    id: "1",
    asset: "Ethereum (ETH)",
    totalLiquidity: "$12,500,000",
    marketCap: "$380,000,000",
    marketPrice: "$3,200",
    creationDate: "2024-02-10",
    status: "Active",
  },
  {
    id: "2",
    asset: "Bitcoin (BTC)",
    totalLiquidity: "$30,000,000",
    marketCap: "$900,000,000",
    marketPrice: "$64,000",
    creationDate: "2023-09-05",
    status: "Active",
  },
  {
    id: "3",
    asset: "Cardano (ADA)",
    totalLiquidity: "$5,200,000",
    marketCap: "$80,000,000",
    marketPrice: "$0.45",
    creationDate: "2024-03-22",
    status: "Inactive",
  },
  {
    id: "4",
    asset: "Solana (SOL)",
    totalLiquidity: "$7,800,000",
    marketCap: "$120,000,000",
    marketPrice: "$95",
    creationDate: "2024-06-18",
    status: "Active",
  },
  {
    id: "5",
    asset: "Avalanche (AVAX)",
    totalLiquidity: "$3,900,000",
    marketCap: "$70,000,000",
    marketPrice: "$40",
    creationDate: "2024-01-30",
    status: "Suspended",
  },
];

export default function Liquidity() {
  const [search, setSearch] = useState("");

  const columns = [
    {
      header: "#",
      render: (row: Asset) => <span>{row.id}</span>,
    },
    {
      header: "Asset",
      render: (row: Asset) => <span className="font-medium">{row.asset}</span>,
    },
    {
      header: "Total Liquidity",
      render: (row: Asset) => <span>{row.totalLiquidity}</span>,
    },
    {
      header: "Market Cap",
      render: (row: Asset) => <span>{row.marketCap}</span>,
    },
    {
      header: "Market Price",
      render: (row: Asset) => <span>{row.marketPrice}</span>,
    },
    {
      header: "Creation Date",
      render: (row: Asset) => (
        <span className="text-muted-foreground">
          {new Date(row.creationDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      header: "Status",
      render: (row: Asset) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            row.status === "Active"
              ? "bg-green-100 text-green-600"
              : row.status === "Inactive"
              ? "bg-gray-200 text-gray-600"
              : "bg-orange-100 text-orange-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    {
      header: "",
      render: (row: Asset) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 ml-2">
              <EllipsisVertical className="h-40 w-40" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => console.log("View", row.id)}>
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Edit", row.id)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => console.log("Deactivate", row.id)}>
              {row.status === "Active" ? "Deactivate" : "Activate"}
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Delete", row.id)}
              className="text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const mobileColumns = [
    {
      header: "Asset",
      render: (row: Asset) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.asset}</span>
          <span className="text-xs text-muted-foreground">
            {row.marketPrice} • {row.marketCap}
          </span>
        </div>
      ),
    },
    {
      header: "Status",
      render: (row: Asset) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            row.status === "Active"
              ? "bg-green-100 text-green-600"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {row.status}
        </span>
      ),
    },
  ];

  const filteredAssets = assets.filter((asset) =>
    asset.asset.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-xl overflow-hidden space-y-6 bg-custom-card p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-end gap-2">
          <h2 className="text-lg md:text-xl font-semibold">All Assets</h2>
          <span className="text-custom-white border text-xs px-2 py-0.5 rounded-full">
            {filteredAssets.length}
          </span>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <SearchInput placeholder="Search for asset" />
        {/* <FilterDropdown /> */}
      </div>

      {/* Table */}
      <div className="hidden md:block">
        <DataTable
          data={filteredAssets}
          columns={columns}
          noDataMessage="No assets found."
        />
      </div>
      <div className="md:hidden">
        <DataTable
          data={filteredAssets}
          columns={mobileColumns}
          noDataMessage="No assets found."
        />
      </div>
    </div>
  );
}
