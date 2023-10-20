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
import TaxrateForm from "./TaxrateForm";
import { useGetTaxratesQuery } from "@/store/services/taxrateService";
import { useDeleteTaxrateMutation } from "@/store/services/taxrateService";

export interface Taxrate {
  id: number;
  business_id: number;
  name: string;
  amount: string;
  created_by: number;
  created_at: string;
  updated_at: string;
}

const Taxrates: FC = () => {
  const { data: session } = useSession();
  // GET
  const {
    data: taxratesList,
    isLoading: taxratesLoading,
    isFetching: taxratesFetching,
  } = useGetTaxratesQuery({
    buisnessId: session?.user?.business_id,
    perPage: -1,
  });

   // DELETE
   const [deleteTaxrate, response] = useDeleteTaxrateMutation();
   const {
     isLoading: deleteLoading,
     isError: deleteError,
     isSuccess: deleteSuccess,
   } = response;

  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [selectedTaxrate, setSelectedTaxrate] = useState<Taxrate | null>(null);

  const columns: ColumnDef<Taxrate | null>[] = useMemo(
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
        accessorKey: "amount",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Tax Rate %" />
        ),
        cell: ({ row }) => (
          <>
            {row?.original ? (
              <div>{row.getValue("amount")}</div>
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

  const handleEdit = (data: Taxrate | null) => {
    setSelectedTaxrate(data);
    toggleModal();
  };

  const handleDelete = (data: Taxrate | null) => {
    setSelectedTaxrate(data);
    toggleDeleteModal();
  };

  const confirmDelete = () => {
    deleteTaxrate({ id: selectedTaxrate?.id });
  };

  useEffect(() => {
    if (deleteError) {
      toast.error("Something Wrong.");
    }
    if (deleteSuccess) {
      toast.success("Taxrate Deleted Successfully.");
      toggleDeleteModal();
    }
  }, [deleteError, deleteSuccess]);

  useEffect(() => {
    if (!open && !openDelete) {
      setSelectedTaxrate(null);
    }
  }, [open, openDelete]);

  return (
    <>
      <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-xl text-[#4741E1]">Tax Rates</h1>
            <p className="font-medium text-sm">A List of all tax rates</p>
          </div>
          <Button onClick={toggleModal} size={"sm"}>
            <PlusCircle className="mr-2 w-4 h-4" />
            Add Tax Rate
          </Button>
        </div>
        <Separator />
        <Table
          // @ts-expect-error
          columns={columns}
          data={
            taxratesLoading || taxratesFetching
              ? loadingData
              : taxratesList || []
          }
          filterKey="name"
        />
      </div>
      <Modal
        title={selectedTaxrate ? "Update Tax Rate" : "Add New Tax Rate"}
        open={open}
        setOpen={toggleModal}
        body={<TaxrateForm setOpen={toggleModal} data={selectedTaxrate} />}
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

export default Taxrates;
