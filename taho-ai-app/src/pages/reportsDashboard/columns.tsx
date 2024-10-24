"use client";
import { ColumnDef } from "@tanstack/react-table";

export type Report = {
  id: string;
  title: string;
  summary: string;
  evaluation_status: "Passed" | "Failed" | "Needs Review";
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
  },
];
