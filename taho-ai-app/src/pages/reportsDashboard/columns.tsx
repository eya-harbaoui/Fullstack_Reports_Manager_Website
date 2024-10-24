"use client";
import { ColumnDef } from "@tanstack/react-table";

export type Report = {
  id: string;
  title: string;
  summary: string;
  evaluation_status: "Passed" | "Failed" | "Needs Review";
};

// Function to determine the color based on the evaluation status
const getStatusColor = (status: string) => {
  switch (status) {
    case "Failed":
      return "text-red-500"; // Red for failed
    case "Passed":
      return "text-green-500"; // Green for passed
    case "Needs Review":
      return "text-orange-500"; // Orange for needs review
    default:
      return "text-gray-500"; // Default color
  }
};

export const columns: ColumnDef<Report>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "summary",
    header: "Summary",
  },
  {
    accessorKey: "evaluation_status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={`font-bold ${getStatusColor(
          row.getValue("evaluation_status")
        )}`}
      >
        {row.getValue("evaluation_status")}
      </div>
    ),
  },
];
