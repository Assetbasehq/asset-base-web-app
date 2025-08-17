import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React from "react";
import { Skeleton } from "../ui/skeleton";

interface Column {
  header: string;
  render: (row: any) => React.ReactNode;
}

interface TableProps<T> {
  columns: Column[];
  data: T[];
  isLoading?: boolean;
  noDataMessage?: string;
}

export default function DataTable<T>({
  columns,
  data,
  isLoading = false,
  noDataMessage = "No data available.",
}: TableProps<T>) {
  if (isLoading) {
    return <DataTableSkeleton columns={columns.length} rows={data.length} />;
  }

  if (!data || !data.length) {
    return <div className="p-4 text-center">{noDataMessage}</div>;
  }

  return (
    <div className="mt-8 rounded-xl overflow-x-auto">
      <div className="rounded-xl overflow-x-auto">
        <Table>
          <TableHeader className="bg-black text-white">
            <TableRow className="border-b-0">
              {columns.map((column, index) => (
                <TableHead className="text-white p-4" key={index}>
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={rowIndex} className="font-mediump-6">
                {columns.map((column, colIndex) => {
                  return (
                    <TableCell
                      key={colIndex}
                      className="text-start capitalize p-4"
                    >
                      {column.render(row)}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

interface DataTableSkeletonProps {
  columns?: number;
  rows?: number;
}

function DataTableSkeleton({ columns = 4, rows = 5 }: DataTableSkeletonProps) {
  return (
    <div className="mt-8 rounded-xl overflow-x-auto">
      <div className="rounded-xl overflow-x-auto">
        <Table>
          {/* Table Header */}
          <TableHeader className="bg-black text-white">
            <TableRow className="border-b-0">
              {Array.from({ length: columns }).map((_, index) => (
                <TableHead className="p-4" key={index}>
                  <Skeleton className="h-4 w-24 bg-gray-300/50" />
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          {/* Table Body */}
          <TableBody>
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {Array.from({ length: columns }).map((_, colIndex) => (
                  <TableCell className="p-4" key={colIndex}>
                    <Skeleton className="h-4 w-full max-w-[150px] bg-gray-300/50" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
