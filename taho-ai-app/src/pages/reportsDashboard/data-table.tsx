"use client";
import { useState, useEffect } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useNavigate } from "react-router-dom";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]; // Colonne du tableau
  data: TData[]; // Données à afficher
  pageSize?: number; // Taille de la page
  onEdit: (id: number) => void; // Fonction pour modifier un rapport
  onDelete: (id: number) => void; // Fonction pour supprimer un rapport
}

export function DataTable<TData, TValue>({
  columns,
  data,
  pageSize = 10,
  onEdit,
  onDelete,
}: DataTableProps<TData, TValue>) {
  const [currentPage, setCurrentPage] = useState(() => {
    const storedPage = localStorage.getItem("currentPage");
    return storedPage ? JSON.parse(storedPage) : 0;
  });
  const navigate = useNavigate();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      pagination: {
        pageIndex: currentPage,
        pageSize,
      },
    },
    onPaginationChange: (updater) => {
      const newState =
        typeof updater === "function"
          ? updater({ pageIndex: currentPage, pageSize })
          : updater;

      setCurrentPage(newState.pageIndex);
    },
  });

  useEffect(() => {
    localStorage.setItem("currentPage", JSON.stringify(currentPage));
  }, [currentPage]);

  const totalPages = table.getPageCount();
  const visiblePages = 5;

  const generatePageNumbers = () => {
    const pages = [];
    const startPage = Math.max(
      0,
      Math.min(
        currentPage - Math.floor(visiblePages / 2),
        totalPages - visiblePages
      )
    );
    const endPage = Math.min(totalPages - 1, startPage + visiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => {
                    const id = (row.original as any).id;
                    if (id) {
                      navigate(`/Reports/${id}`);
                    }
                  }}
                  className="hover:bg-gray-100 cursor-pointer transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className="cursor-pointer"
                onClick={() => {
                  table.previousPage();
                  setCurrentPage((prev) => Math.max(prev - 1, 0));
                }}
                aria-disabled={!table.getCanPreviousPage()}
              />
            </PaginationItem>

            {currentPage > 1 && (
              <>
                <PaginationItem>
                  <PaginationLink onClick={() => setCurrentPage(0)}>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              </>
            )}

            {generatePageNumbers().map((pageNum) => (
              <PaginationItem key={pageNum}>
                <PaginationLink
                  onClick={() => setCurrentPage(pageNum)}
                  isActive={currentPage === pageNum}
                >
                  {pageNum + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {currentPage < totalPages - 2 && (
              <>
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    onClick={() => setCurrentPage(totalPages - 1)}
                  >
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              </>
            )}

            <PaginationItem>
              <PaginationNext
                className="cursor-pointer"
                onClick={() => {
                  table.nextPage();
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
                }}
                aria-disabled={!table.getCanNextPage()}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
