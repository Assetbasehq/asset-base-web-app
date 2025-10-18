import { useState } from "react";
import DataTable from "@/components/custom/data-table";
import SearchInput from "@/pages/dashboard/assets/_components/search-input";
import FilterDropdown from "./_components/filter-dropdown";

type User = {
  id: string;
  name: string;
  joined: string;
  company: string;
  category: string;
  kycStatus: "Verified" | "Pending" | "Rejected";
  accountStatus: "Active" | "Suspended" | "Closed";
};

const users: User[] = [
  {
    id: "1",
    name: "David Okafor",
    joined: "2024-03-12",
    company: "Unseen Technologies",
    category: "Investor",
    kycStatus: "Verified",
    accountStatus: "Active",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    joined: "2024-06-04",
    company: "FutureLabs",
    category: "Creator",
    kycStatus: "Pending",
    accountStatus: "Active",
  },
  {
    id: "3",
    name: "Michael Lee",
    joined: "2024-08-21",
    company: "BlockVenture",
    category: "Partner",
    kycStatus: "Verified",
    accountStatus: "Suspended",
  },
  {
    id: "4",
    name: "Aisha Bello",
    joined: "2024-10-01",
    company: "Finserve",
    category: "Investor",
    kycStatus: "Rejected",
    accountStatus: "Closed",
  },
  {
    id: "5",
    name: "John Smith",
    joined: "2024-09-18",
    company: "DataFund",
    category: "Creator",
    kycStatus: "Verified",
    accountStatus: "Active",
  },
];

export default function Users() {
  const [search, setSearch] = useState("");

  const columns = [
    {
      header: "#",
      render: (row: User) => <span>{row.id}</span>,
    },
    {
      header: "Name",
      render: (row: User) => <span className="font-medium">{row.name}</span>,
    },
    {
      header: "Joined",
      render: (row: User) => (
        <span className="text-muted-foreground">
          {new Date(row.joined).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </span>
      ),
    },
    {
      header: "Company",
      render: (row: User) => <span>{row.company}</span>,
    },
    {
      header: "Category",
      render: (row: User) => <span className="capitalize">{row.category}</span>,
    },
    {
      header: "KYC Status",
      render: (row: User) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            row.kycStatus === "Verified"
              ? "bg-green-100 text-green-600"
              : row.kycStatus === "Pending"
              ? "bg-yellow-100 text-yellow-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {row.kycStatus}
        </span>
      ),
    },
    {
      header: "Account Status",
      render: (row: User) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            row.accountStatus === "Active"
              ? "bg-green-100 text-green-600"
              : row.accountStatus === "Suspended"
              ? "bg-orange-100 text-orange-600"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {row.accountStatus}
        </span>
      ),
    },
  ];

  const mobileColumns = [
    {
      header: "#",
      render: (row: User) => <span>{row.id}</span>,
    },
    {
      header: "Name",
      render: (row: User) => (
        <div className="flex flex-col">
          <span className="font-medium">{row.name}</span>
          <span className="text-xs text-muted-foreground">
            {row.category} • {row.company}
          </span>
        </div>
      ),
    },
    {
      header: "Status",
      render: (row: User) => (
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            row.accountStatus === "Active"
              ? "bg-green-100 text-green-600"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {row.accountStatus}
        </span>
      ),
    },
  ];

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-xl overflow-hidden space-y-6 bg-custom-card p-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-end gap-2">
          <h2 className="text-lg md:text-xl font-semibold">All Users </h2>
          <span className="text-custom-white border text-xs px-2 py-0.5 rounded-full">
            {filteredUsers.length}
          </span>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <SearchInput placeholder="Search for user" />
        <FilterDropdown />
      </div>

      {/* Table */}
      <div className="hidden md:block">
        <DataTable
          data={filteredUsers}
          columns={columns}
          noDataMessage="No users found."
        />
      </div>
      <div className="md:hidden">
        <DataTable
          data={filteredUsers}
          columns={mobileColumns}
          noDataMessage="No users found."
        />
      </div>
    </div>
  );
}
