"use client";
import { FC, useCallback, useMemo, useState } from "react";
import { BsFillBoxFill as Box } from "react-icons/bs";
import { PiUsersThreeFill as Users } from "react-icons/pi";
import {
  BiSolidCategory as CategoryIcon,
  BiLogoProductHunt as ProductIcon,
} from "react-icons/bi";

import Link from "next/link";
import { useSession } from "next-auth/react";
import Table from "@/components/table";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { ColumnDef } from "@tanstack/react-table";
import Chart from "@/components/charts/chart";
import DeleteModal from "@/components/modal/delete-modal";
import { useGetUsersQuery } from "@/store/services/userService";
import { useGetProductsQuery } from "@/store/services/productService";
import { useGetCategoriesQuery } from "@/store/services/categoryService";
import { useGetOrdersQuery } from "@/store/services/orderListService";

export interface Order {
  id: number;
  business_id: number;
  location_id: number;
  order_no: string;
  customer_id: number;
  order_status: string;
  payment_status: string;
  order_type: string;
  total_before_tax: number;
  final_total: number;
  tax_rate_id: any;
  tax_amount: number;
  rider_id: any;
  invoice_id: any;
  source: string;
  address: string;
  discount_type: string;
  discount: number;
  created_at: string;
  updated_at: string;
  type_of_service_id: number;
  order_created_time: string;
  order_delivered_time: any;
  delivery_charges_type: any;
  delivery_charge_id: any;
  dalivery_amount: string;
  customer: Customer;
  order_lines: OrderLine[];
  payment_lines: PaymentLine[];
}

export interface Customer {
  id: number;
  name: string;
  business_id: number;
  mobile_no: string;
  email: string;
  email_verified_at: any;
  user_type: string;
  role_id: number;
  created_at: string;
  updated_at: string;
}

export interface OrderLine {
  id: number;
  order_id: number;
  business_id: number;
  product_id: number;
  product_variation_id: number;
  qty: number;
  unit_price_before_discount: string;
  unit_price_exc_tax: string;
  line_discount_type: string;
  line_discount_amount: number;
  discount_id: any;
  unit_price_inc_tax: string;
  item_tax: string;
  tax_id: any;
  created_at: string;
  updated_at: string;
  product: Product;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  business_id: number;
  unit_id: number;
  Order_id: number;
  sub_Order_id: any;
  sku: string;
  type: string;
  vendor_id: any;
  brand_id: any;
  manage_stock_status: number;
  alerty_quantity: number;
  not_for_selling: number;
  tax_type: string;
  weight: any;
  barcode_id: any;
  tax_id: any;
  created_at: string;
  updated_at: string;
  product_time_id: number;
}

export interface PaymentLine {
  id: number;
  order_id: number;
  purchase_id: any;
  business_id: number;
  method: string;
  amount: string;
  type: string;
  reference_number: any;
  payment_date: string;
  created_at: string;
  updated_at: string;
}

const salesLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];

const salesData = {
  labels: salesLabels,
  datasets: [
    {
      label: "Data",
      data: salesLabels.map(() => Math.floor(Math.random() * 30)),
      lineTension: 0.4,
      borderColor: "#4546E5",
    },
  ],
};

const usersLabels = ["25 Aug", "26 Aug", "27 Aug", "28 Aug", "29 Aug"];

const usersData = {
  labels: usersLabels,
  datasets: [
    {
      label: "Data",
      data: usersLabels.map(() => Math.floor(Math.random() * 30)),
      lineTension: 0.4,
      borderColor: "#4546E5",
    },
    {
      label: "Data",
      data: usersLabels.map(() => Math.floor(Math.random() * 30)),
      lineTension: 0.4,
      borderColor: "#FCAC00",
    },
  ],
};

const Dashboard: FC = () => {
  const { data: session } = useSession();

  const {
    data: ordersList,
    isLoading: ordersLoading,
    isFetching: ordersFetching,
  } = useGetOrdersQuery({
    buisnessId: session?.user?.business_id,
    customerId: session?.user?.customer_id,
    // customerId: 31,
    perPage: -1,
  });

  const {
    data: userList,
    isLoading: userLoading,
    isFetching: userFetching,
  } = useGetUsersQuery({
    buisnessId: session?.user?.business_id,
    customerId: session?.user?.customer_id,
    // customerId: 31,
    perPage: -1,
  });
  const {
    data: productList,
    isLoading: productLoading,
    isFetching: productFetching,
  } = useGetProductsQuery({
    buisnessId: session?.user?.business_id,
    customerId: session?.user?.customer_id,
    perPage: -1,
  });

  const {
    data: categoryList,
    isLoading: categoryLoading,
    isFetching: categoryFetching,
  } = useGetCategoriesQuery({
    buisnessId: session?.user?.business_id,
    customerId: session?.user?.customer_id,
    perPage: -1,
  });


  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);




  const columns: ColumnDef<Order | null>[] = useMemo(
    () => [
      {
        accessorKey: "customer",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Customer Name" />
        ),
        cell: ({ row }) => {
          if (row?.original) {
            const { name } = row.getValue("customer") as Customer;
            if (name) {
              return <div>{name}</div>;
            }
          } else {
            return <Skeleton className="w-40 h-4 bg-[#F5f5f5]" />;
          }
        },
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: "customer",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Customer Email" />
        ),
        cell: ({ row }) => {
          if (row?.original) {
            const { email } = row.getValue("customer") as Customer;
            if (email) {
              return <div>{email}</div>;
            }
          } else {
            return <Skeleton className="w-40 h-4 bg-[#F5f5f5]" />;
          }
        },
        enableSorting: false,
        enableHiding: true,
      },
      {
        accessorKey: "address",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Address" />
        ),
        cell: ({ row }) => (
          <>
            {row?.original ? (
              <div>{row.getValue("address")}</div>
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
          <DataTableColumnHeader column={column} title="Amount" />
        ),
        cell: ({ row }) => (
          <>
            {row?.original ? (
              <div>{row.getValue("final_total")}</div>
            ) : (
              <Skeleton className="w-40 h-4 bg-[#F5f5f5]" />
            )}
          </>
        ),
        enableSorting: true,
        enableHiding: false,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <DataTableRowActions
            deleteAction={handleDelete}
            editAction={handleEdit}
            row={row}
          />
        ),
      },
    ],
    []
  );
  const numberOfOrders = ordersList ? ordersList.length : 0;
  const numberOfUsers = userList ? userList.length : 0;
  const numberOfProducts = productList ? productList.length : 0;
  const numberOfCategories = categoryList ? categoryList.length : 0;

  const loadingData = Array.from({ length: 10 }, () => null);

  const toggleModal = useCallback(() => {
    setOpen((open) => !open);
  }, [open]);

  const toggleDeleteModal = useCallback(() => {
    setOpenDelete((open) => !open);
  }, [open]);

  const handleEdit = (data: Order | null) => {
    setSelectedOrder(data);
    toggleModal();
  };

  const handleDelete = (data: Order | null) => {
    setSelectedOrder(data);
    toggleDeleteModal();
  };

  const confirmDelete = () => {
    toggleDeleteModal();
  };

  return (
    <>
   
    
   <div className="space-y-6 overflow-hidden">
        <div className="bg-[#FFFFFF] p-6 lg:p-8 rounded-2xl w-full shadow-sm grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="border-r border-[#ECECEE] flex items-stretch gap-3 ">
            <div className="bg-[#FFF2E9] p-4 rounded-2xl">
              <Box color={"#FF6A00"} size={20} />
            </div>
            <div className="flex flex-col justify-between">
            
              <Link href="/reports/orders" className="text-[#92959E] font-semibold text-sm">Orders</Link>
              <h1 className="text-[#15192C]">{numberOfOrders}</h1>
            </div>
          </div>
          <div className="lg:border-r border-[#ECECEE] flex items-stretch gap-3 ">
            <div className="bg-[#EAF9FF] p-4 rounded-2xl">
              <Users color={"#00B7FE"} size={20} />
            </div>
            <div className="flex flex-col justify-between">
              <h3 className="text-[#92959E] font-semibold text-sm">Users</h3>
              <h1 className="text-[#15192C]">{numberOfUsers}</h1>
            </div>
          </div>

          <div className="border-r border-[#ECECEE] flex items-stretch gap-3 ">
            <div className="bg-[#EDE8FF] p-4 rounded-2xl">
              <CategoryIcon color={"#551FFF"} size={20} />
            </div>
            <div className="flex flex-col justify-between">
              <h3 className="text-[#92959E] font-semibold text-sm">
                Categories
              </h3>
              <h1 className="text-[#15192C]">{numberOfCategories}</h1>
            </div>
          </div>

          <div className="flex items-stretch gap-3 ">
            <div className="bg-[#FFEBEF] p-4 rounded-2xl">
              <ProductIcon color={"#FD2254"} size={20} />
            </div>
            <div className="flex flex-col justify-between">
              <h3 className="text-[#92959E] font-semibold text-sm">Products</h3>
              <h1 className="text-[#15192C]">{numberOfProducts}</h1>
            </div>
          </div>
        </div>
        <Chart heading="Sales Report" data={salesData} />
        <Chart heading="Active Users" data={usersData} />
        <div className="bg-[#FFFFFF] p-4 rounded-2xl">
          <Table
            // @ts-expect-error
            columns={columns}
            data={
              ordersLoading || ordersFetching ? loadingData : ordersList || []
            }
            filterKey="address"
          />
        </div>
      </div>

      <DeleteModal
        open={openDelete}
        setOpen={toggleDeleteModal}
        loading={false}
        confirmDelete={confirmDelete}
      />
    </>
  );
};

export default Dashboard;
