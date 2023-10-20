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
import RiderForm from "./RiderForm";
import { useGetRidersQuery } from "@/store/services/riderService";
import { useDeleteRiderMutation } from "@/store/services/riderService";

export interface Rider {
  id: number;
  name: string;
  business_id: number;
  mobile_no: string;
  user_type: string;
}

const Riders: FC = () => {
  const { data: session } = useSession();
  // GET
  const {
    data: ridersList,
    isLoading: ridersLoading,
    isFetching: ridersFetching,
  } = useGetRidersQuery({
    buisnessId: session?.user?.business_id,
    perPage: -1,
  });

  const [deleteRider, response] = useDeleteRiderMutation();
  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess: deleteSuccess,
  } = response;

  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);

  const columns: ColumnDef<Rider | null>[] = useMemo(
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

  const handleEdit = (data: Rider | null) => {
    setSelectedRider(data);
    toggleModal();
  };

  const handleDelete = (data: Rider | null) => {
    setSelectedRider(data);
    toggleDeleteModal();
  };

  const confirmDelete = () => {
    deleteRider({ id: selectedRider?.id });
  };

  useEffect(() => {
    if (deleteError) {
      toast.error("Something Wrong.");
    }
    if (deleteSuccess) {
      toast.success("Rider Deleted Successfully.");
      toggleDeleteModal();
    }
  }, [deleteError, deleteSuccess]);

  useEffect(() => {
    if (!open && !openDelete) {
      setSelectedRider(null);
    }
  }, [open, openDelete]);

  return (
    <>
      <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-xl text-[#4741E1]">Riders</h1>
            <p className="font-medium text-sm">A List of all Riders</p>
          </div>
          <Button onClick={toggleModal} size={"sm"}>
            <PlusCircle className="mr-2 w-4 h-4" />
            Add Rider
          </Button>
        </div>
        <Separator />
        <Table
          // @ts-expect-error
          columns={columns}
          data={
            ridersLoading || ridersFetching ? loadingData : ridersList || []
          }
          filterKey="name"
        />
      </div>
      <Modal
        title={selectedRider ? "Update Rider" : "Add New Rider"}
        open={open}
        setOpen={toggleModal}
        body={<RiderForm setOpen={toggleModal} data={selectedRider} />}
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

export default Riders;
