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
import BrandForm from "./BarcodeForm";
import DeleteModal from "@/components/modal/delete-modal";
import { useSession } from "next-auth/react";
import { useGetBarcodesQuery } from "@/store/services/barCodeService";
import { useDeleteBarcodesMutation } from "@/store/services/barCodeService";

export interface Barcode {
  id: number;
  name: string;
  business_id: number;
  created_by: number;
  created_at: string;
  updated_at: string;
}

const Barcodes: FC = () => {
  const { data: session } = useSession();
  // GET
  const {
    data: barcodesList,
    isLoading: barcodesLoading,
    isFetching: barcodesFetching,
  } = useGetBarcodesQuery({
    buisnessId: session?.user?.business_id,
    perPage: -1,
  });
  const [deleteBarcode, response] = useDeleteBarcodesMutation();
  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess: deleteSuccess,
  } = response;

  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [selectedBarcode, setSelectedBarcode] = useState<Barcode | null>(null);

  const columns: ColumnDef<Barcode | null>[] = useMemo(
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

  const handleEdit = (data: Barcode | null) => {
    setSelectedBarcode(data);
    toggleModal();
  };

  const handleDelete = (data: Barcode | null) => {
    setSelectedBarcode(data);
    toggleDeleteModal();
  };

  const confirmDelete = () => {
    deleteBarcode({ id: selectedBarcode?.id });
  };


  
  useEffect(() => {
    if (deleteError) {
      toast.error("Something Wrong.");
    }
    if (deleteSuccess) {
      toast.success("Barcode Deleted Successfully.");
      toggleDeleteModal();
    }
  }, [deleteError, deleteSuccess]);
  useEffect(() => {
    if (!open && !openDelete) {
      setSelectedBarcode(null);
    }
  }, [open, openDelete]);

  return (
    <>
      <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-xl text-[#4741E1]">Bar Codes</h1>
            <p className="font-medium text-sm">A List of all the bar codes.</p>
          </div>
          <Button onClick={toggleModal} size={"sm"}>
            <PlusCircle className="mr-2 w-4 h-4" />
            Add Bar Code
          </Button>
        </div>
        <Separator />
        <Table
          // @ts-expect-error
          columns={columns}
          data={
            barcodesLoading || barcodesFetching
              ? loadingData
              : barcodesList || []
          }
          filterKey="name"
        />
      </div>
      <Modal
        title={selectedBarcode ? "Update Bar Code" : "Add New Bar Code"}
        open={open}
        setOpen={toggleModal}
        body={<BrandForm setOpen={toggleModal} data={selectedBarcode} />}
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

export default Barcodes;
