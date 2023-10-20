"use client";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { GoPlusCircle as PlusCircle } from "react-icons/go";
import Table from "@/components/table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useGetOrderReportQuery } from "@/store/services/orderReportService";


export interface Order {
  id: any;
  order_no: string;
  final_total: any;
  order_status: string;
  payment_status: string;
}

const Orders: FC = () => {
  const { data: session } = useSession();
  // GET
  const {
    data: orders,
    isLoading: ordersLoading,
    isFetching: ordersFetching,
  } = useGetOrderReportQuery({
    buisnessId: session?.user?.business_id,
    customerId: session?.user?.customer_id,
    perPage: -1,
  });
  const columns: ColumnDef<Order | null>[] = useMemo(
    () => [
      {
        accessorKey: "order_no",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Order #" />
        ),
        cell: ({ row }) => (
          <>
            {row?.original ? (
              <div>{row.getValue("order_no")}</div>
            ) : (
              <Skeleton className="w-40 h-4 bg-[#F5f5f5]" />
            )}
          </>
        ),
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: "final_total",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Final Amount" />
        ),
        cell: ({ row }) => (
          <>
            {row?.original ? (
              <div>{row.getValue("final_total")}</div>
            ) : (
              <Skeleton className="w-20 h-4 bg-[#F5f5f5]" />
            )}
          </>
        ),
        enableSorting: true,
        enableHiding: true,
      },
      // {
      //   accessorKey: "payment_status",
      //   header: ({ column }) => (
      //     <DataTableColumnHeader column={column} title="Payment Status" />
      //   ),
      //   cell: ({ row }) => (
      //     <>
      //       {row?.original ? (
      //         <div
      //           className={`btn-status flex items-center justify-center ${
      //             row.getValue("payment_status") === "pending"
      //               ? "pending"
      //               : row.getValue("payment_status") === "approved"
      //               ? "approved"
      //               : "rejected"
      //           }`}
      //         >
      //           {row.getValue("payment_status")}
      //         </div>
      //       ) : (
      //         <Skeleton className="w-16 h-4 bg-[#F5f5f5]" />
      //       )}
      //     </>
      //   ),
      //   enableSorting: true,
      //   enableHiding: true,
      // },
      {
        accessorKey: "payment_status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Payment Status" />
        ),
        cell: ({ row }) => (
          <div className="status-cell">
            {row?.original ? (
              <div
                className={`btn-status ${
                  row.getValue("payment_status") === "pending"
                    ? "pending"
                    : row.getValue("payment_status") === "approved"
                    ? "approved"
                    : "rejected"
                }`}
              >
                {row.getValue("payment_status")}
              </div>
            ) : (
              <Skeleton className="w-16 h-4 bg-[#F5f5f5]" />
            )}
          </div>
        ),
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: "order_status",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Order Status" />
        ),
        cell: ({ row }) => (
          <div className="status-cell">
            {row?.original ? (
              <div
                className={`btn-status ${
                  row.getValue("order_status") === "pending"
                    ? "pending"
                    : row.getValue("order_status") === "approved"
                    ? "approved"
                    : "rejected"
                }`}
              >
                {row.getValue("order_status")}
              </div>
            ) : (
              <Skeleton className="w-16 h-4 bg-[#F5f5f5]" />
            )}
          </div>
        ),
        enableSorting: true,
        enableHiding: true,
      },
      // {
      //   accessorKey: "order_status",
      //   header: ({ column }) => (
      //     <DataTableColumnHeader column={column} title="Order Status" />
      //   ),
      //   cell: ({ row }) => (
      //     <>
      //       {row?.original ? (
      //         <div
      //           className={`btn-status flex items-center justify-center ${
      //             row.getValue("order_status") === "pending"
      //               ? "pending"
      //               : row.getValue("order_status") === "approved"
      //               ? "approved"
      //               : "rejected"
      //           }`}
      //         >
      //           {row.getValue("order_status")}
      //         </div>
      //       ) : (
      //         <Skeleton className="w-16 h-4 bg-[#F5f5f5]" />
      //       )}
      //     </>
      //   ),
      //   enableSorting: true,
      //   enableHiding: true,
      // },
    ],
    []
  );

  const loadingData = Array.from({ length: 10 }, () => null);



return (
  <>
    <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-xl text-[#4741E1]">Orders</h1>
          <p className="font-medium text-sm">The List of all Orders</p>
        </div>
      
      </div>
      <Separator />
      <Table
      // @ts-ignore
        columns={columns}
        data={
          ordersLoading || ordersFetching ? loadingData : orders || []
        }
        filterKey="name"
      />
    </div>
  </>
);
};

export default Orders;