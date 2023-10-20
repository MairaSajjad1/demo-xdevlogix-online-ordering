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
import ServiceForm from "./ServiceForm";
import DeleteModal from "@/components/modal/delete-modal";
import {
  useDeleteTypeOfServiceMutation,
  useGetTypeOfServiceQuery,
} from "@/store/services/typeOfServiceService";
import { useSession } from "next-auth/react";

export interface TypeOfService {
  id: number;
  name: string;
  description: string;
  charge_type: string;
  charge: string;
  business_id: number;
  created_at: string;
  updated_at: string;
}

const TypeOfService: FC = () => {
  const { data: session } = useSession();
  const {
    data: typeOfServicesList,
    isLoading: typeOfServiceLoading,
    isFetching: typeOfServiceFetching,
  } = useGetTypeOfServiceQuery({
    buisnessId: session?.user?.business_id,
    perPage: -1,
  });

  // DELETE
  const [deleteTypeOfService, response] = useDeleteTypeOfServiceMutation();
  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess: deleteSuccess,
  } = response;

  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [selectedTypeOfService, setSelectedTypeOfService] =
    useState<TypeOfService | null>(null);

  const columns: ColumnDef<TypeOfService | null>[] = useMemo(
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
        accessorKey: "description",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Description" />
        ),
        cell: ({ row }) => (
          <>
            {row?.original ? (
              <div>{row.getValue("description")}</div>
            ) : (
              <Skeleton className="w-40 lg:w-56 h-4 bg-[#F5f5f5]" />
            )}
          </>
        ),
        enableSorting: false,
        enableHiding: true,
      },
      {
        accessorKey: "charge",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Charges" />
        ),
        cell: ({ row }) => (
          <>
            {row?.original ? (
              <div>{row.getValue("charge")}</div>
            ) : (
              <Skeleton className={`w-10 lg:w-16 h-4 bg-[#F5f5f5]`} />
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

  const handleEdit = (data: TypeOfService | null) => {
    setSelectedTypeOfService(data);
    toggleModal();
  };

  const handleDelete = (data: TypeOfService | null) => {
    setSelectedTypeOfService(data);
    toggleDeleteModal();
  };

  const confirmDelete = () => {
    deleteTypeOfService({ id: selectedTypeOfService?.id });
  };

  useEffect(() => {
    if (deleteError) {
      toast.error("Something Wrong.");
    }
    if (deleteSuccess) {
      toast.success("Service Deleted Successfully.");
      toggleDeleteModal();
    }
  }, [deleteError, deleteSuccess]);

  useEffect(() => {
    if (!open && !openDelete) {
      setSelectedTypeOfService(null);
    }
  }, [open, openDelete]);

  return (
    <>
      <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-xl text-[#4741E1]">
              Type of Services
            </h1>
            <p className="font-medium text-sm">
              A List of all type of services
            </p>
          </div>
          <Button onClick={toggleModal} size={"sm"}>
            <PlusCircle className="mr-2 w-4 h-4" />
            Add Service
          </Button>
        </div>
        <Separator />
        <Table
          // @ts-expect-error
          columns={columns}
          data={
            typeOfServiceLoading || typeOfServiceFetching
              ? loadingData
              : typeOfServicesList || []
          }
          filterKey="name"
        />
      </div>
      <Modal
        title={
          selectedTypeOfService ? "Update Service" : "Add New Service Type"
        }
        open={open}
        setOpen={toggleModal}
        body={
          <ServiceForm setOpen={toggleModal} data={selectedTypeOfService} />
        }
      />
      <DeleteModal
        open={openDelete}
        setOpen={toggleDeleteModal}
        loading={deleteLoading}
        confirmDelete={confirmDelete}
      />
    </>
  );
};

export default TypeOfService;
