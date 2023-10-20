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
import BrandForm from "./BrandForm";
import DeleteModal from "@/components/modal/delete-modal";
import { useSession } from "next-auth/react";
import { useGetBrandsQuery } from "@/store/services/brandService";
import { useDeleteBrandsMutation } from "@/store/services/brandService";

export interface Brand {
  id: number;
  name: string;
  business_id: number;
  created_by: number;
  created_at: string;
  updated_at: string;
}

const Brands: FC = () => {
  const { data: session } = useSession();
  // GET
  const {
    data: brandsList,
    isLoading: brandsLoading,
    isFetching: barndsFetching,
  } = useGetBrandsQuery({
    buisnessId: session?.user?.business_id,
    perPage: -1,
  });

  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [selectedBrand, setSelectedBrand] = useState<Brand | null>(null);

  const columns: ColumnDef<Brand | null>[] = useMemo(
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

  const [deleteBrand, response] = useDeleteBrandsMutation();
  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess: deleteSuccess,
  } = response;

  const loadingData = Array.from({ length: 10 }, () => null);

  const toggleModal = useCallback(() => {
    setOpen((open) => !open);
  }, [open]);

  const toggleDeleteModal = useCallback(() => {
    setOpenDelete((open) => !open);
  }, [open]);

  const handleEdit = (data: Brand | null) => {
    setSelectedBrand(data);
    toggleModal();
  };

  const handleDelete = (data: Brand | null) => {
    setSelectedBrand(data);
    toggleDeleteModal();
  };

  const confirmDelete = () => {
    deleteBrand({ id: selectedBrand?.id });
  };

  
  useEffect(() => {
    if (deleteError) {
      toast.error("Something Wrong.");
    }
    if (deleteSuccess) {
      toast.success("Brand Deleted Successfully.");
      toggleDeleteModal();
    }
  }, [deleteError, deleteSuccess]);

  useEffect(() => {
    if (!open && !openDelete) {
      setSelectedBrand(null);
    }
  }, [open, openDelete]);

  return (
    <>
      <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-xl text-[#4741E1]">Brands</h1>
            <p className="font-medium text-sm">A List of all the brands.</p>
          </div>
          <Button onClick={toggleModal} size={"sm"}>
            <PlusCircle className="mr-2 w-4 h-4" />
            Add Brand
          </Button>
        </div>
        <Separator />
        <Table
          // @ts-expect-error
          columns={columns}
          data={
            brandsLoading || barndsFetching ? loadingData : brandsList || []
          }
          filterKey="name"
        />
      </div>
      <Modal
        title={selectedBrand ? "Update Bar Code" : "Add New Bar Code"}
        open={open}
        setOpen={toggleModal}
        body={<BrandForm setOpen={toggleModal} data={selectedBrand} />}
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

export default Brands;
