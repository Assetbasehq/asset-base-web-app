import { useState } from "react";
import DataTable from "@/components/custom/data-table";
import SearchInput from "@/pages/dashboard/assets/_components/search-input";
// import FilterDropdown from "./_components/filter-dropdown";

type Referral = {
  id: string;
  referrer: string;
  referralCode: string;
  totalReferrals: number;
  lastReferral: string;
  participants: number;
};

const referrals: Referral[] = [
  {
    id: "1",
    referrer: "David Okafor",
    referralCode: "DAV123",
    totalReferrals: 42,
    lastReferral: "2024-10-02",
    participants: 128,
  },
  {
    id: "2",
    referrer: "Sarah Johnson",
    referralCode: "SAR567",
    totalReferrals: 25,
    lastReferral: "2024-09-25",
    participants: 78,
  },
  {
    id: "3",
    referrer: "Michael Lee",
    referralCode: "MIC890",
    totalReferrals: 37,
    lastReferral: "2024-09-30",
    participants: 102,
  },
  {
    id: "4",
    referrer: "Aisha Bello",
    referralCode: "AIS234",
    totalReferrals: 18,
    lastReferral: "2024-10-05",
    participants: 45,
  },
  {
    id: "5",
    referrer: "John Smith",
    referralCode: "JOH999",
    totalReferrals: 30,
    lastReferral: "2024-09-22",
    participants: 67,
  },
];

export default function Referrals() {
  const [search, setSearch] = useState("");

  const columns = [
    {
      header: "#",
      render: (row: Referral) => <span>{row.id}</span>,
    },
    {
      header: "Referrer",
      render: (row: Referral) => (
        <span className="font-medium">{row.referrer}</span>
      ),
    },
    {
      header: "Referral Code",
      render: (row: Referral) => (
        <span className="font-mono text-sm text-muted-foreground">
          {row.referralCode}
        </span>
      ),
    },
    {
      header: "Total Referrals",
      render: (row: Referral) => <span>{row.totalReferrals}</span>,
    },
    {
      header: "Last Referral",
      render: (row: Referral) => (
        <span className="text-muted-foreground">
          {new Date(row.lastReferral).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      header: "Participants",
      render: (row: Referral) => <span>{row.participants}</span>,
    },
  ];

  const mobileColumns = [
    {
      header: "Referrer",
      render: (row: Referral) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.referrer}</span>
          <span className="text-xs text-muted-foreground">
            Code: {row.referralCode} • {row.totalReferrals} referrals
          </span>
        </div>
      ),
    },
    {
      header: "Participants",
      render: (row: Referral) => <span>{row.participants}</span>,
    },
  ];

  const filteredReferrals = referrals.filter((ref) =>
    ref.referrer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-xl overflow-hidden space-y-6 bg-custom-card p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-end gap-2">
          <h2 className="text-lg md:text-xl font-semibold">All Referrals</h2>
          <span className="text-custom-white border text-xs px-2 py-0.5 rounded-full">
            {filteredReferrals.length}
          </span>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <SearchInput placeholder="Search for referrer" />
        {/* <FilterDropdown /> */}
      </div>

      {/* Table */}
      <div className="hidden md:block">
        <DataTable
          data={filteredReferrals}
          columns={columns}
          noDataMessage="No referrals found."
        />
      </div>
      <div className="md:hidden">
        <DataTable
          data={filteredReferrals}
          columns={mobileColumns}
          noDataMessage="No referrals found."
        />
      </div>
    </div>
  );
}
