"use client";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { ColumnDef } from "@tanstack/react-table";
import { GoPlusCircle as PlusCircle } from "react-icons/go";
import Table from "@/components/table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Modal from "@/components/modal";
import DeleteModal from "@/components/modal/delete-modal";
import { useSession } from "next-auth/react";
import SupplierForm from "./SupplierForm";
import { useGetSuppliersQuery } from "@/store/services/supplierService";
import {useDeleteSupplierMutation } from "@/store/services/supplierService";


export interface Supplier {
  id: number;
  name: string;
  business_id: number;
  mobile_no: string;
  user_type: string;
}

const Suppliers: FC = () => {
  const { data: session } = useSession();
  // GET
  const {
    data: suppliersList,
    isLoading: suppliersLoading,
    isFetching: suppliersFetching,
  } = useGetSuppliersQuery({
    buisnessId: session?.user?.business_id,
    perPage: -1,
  });
  
   // DELETE
   const [deleteSupplier, response] = useDeleteSupplierMutation();
   const {
     isLoading: deleteLoading,
     isError: deleteError,
     isSuccess: deleteSuccess,
   } = response;
  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );

  const columns: ColumnDef<Supplier | null>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => (
          <>
            {row?.original ? (
              <div>{row.getValue("name")}</div>
            ) : (
              <Skeleton className="w-40 h-4 bg-[#F5f5f5]" />
            )}
          </>
        ),
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: "mobile_no",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Mobile" />
        ),
        cell: ({ row }) => (
          <>
            {row?.original ? (
              <div>{row.getValue("mobile_no")}</div>
            ) : (
              <Skeleton className="w-40 lg:w-56 h-4 bg-[#F5f5f5]" />
            )}
          </>
        ),
        enableSorting: true,
        enableHiding: true,
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

  const loadingData = Array.from({ length: 10 }, () => null);

  const toggleModal = useCallback(() => {
    setOpen((open) => !open);
  }, [open]);

  const toggleDeleteModal = useCallback(() => {
    setOpenDelete((open) => !open);
  }, [open]);

  const handleEdit = (data: Supplier | null) => {
    setSelectedSupplier(data);
    toggleModal();
  };

  const handleDelete = (data: Supplier | null) => {
    setSelectedSupplier(data);
    toggleDeleteModal();
  };

  const confirmDelete = () => {
    deleteSupplier({id : selectedSupplier?.id})
  };

  useEffect(() => {
    if (deleteError) {
      toast.error("Something Wrong.");
    }
    if (deleteSuccess) {
      toast.success("Supplier Deleted Successfully.");
      toggleDeleteModal();
    }
  }, [deleteError, deleteSuccess]);

  useEffect(() => {
    if (!open && !openDelete) {
      setSelectedSupplier(null);
    }
  }, [open, openDelete]);

  return (
    <>
      <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-xl text-[#4741E1]">Suppliers</h1>
            <p className="font-medium text-sm">A List of all Suppliers</p>
          </div>
          <Button onClick={toggleModal} size={"sm"}>
            <PlusCircle className="mr-2 w-4 h-4" />
            Add Supplier
          </Button>
        </div>
        <Separator />
        <Table
          // @ts-expect-error
          columns={columns}
          data={
            suppliersLoading || suppliersFetching
              ? loadingData
              : suppliersList || []
          }
          filterKey="name"
        />
      </div>
      <Modal
        title={selectedSupplier ? "Update Supplier" : "Add New Supplier"}
        open={open}
        setOpen={toggleModal}
        body={<SupplierForm setOpen={toggleModal} data={selectedSupplier} />}
      />
      <DeleteModal
        open={openDelete}
        setOpen={toggleDeleteModal}
        loading={false}
        confirmDelete={confirmDelete}
      />
    </>
  );
};

export default Suppliers;
