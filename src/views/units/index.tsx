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
import UnitForm from "./UnitForm";
import DeleteModal from "@/components/modal/delete-modal";
import { useSession } from "next-auth/react";
import { useGetUnitsQuery } from "@/store/services/unitService";
import { useDeleteUnitsMutation } from "@/store/services/unitService";

export interface Unit {
  id: number;
  actual_name: string;
  short_name: string;
  business_id: number;
  allow_decimal: number;
  created_by: number;
  created_at: string;
  updated_at: string;
}

const Units: FC = () => {
  const { data: session } = useSession();
  // GET
  const {
    data: unitsList,
    isLoading: unitsLoading,
    isFetching: unitsFetching,
  } = useGetUnitsQuery({
    buisnessId: session?.user?.business_id,
    perPage: -1,
  });

  const [deleteUnit, response] = useDeleteUnitsMutation();
  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess: deleteSuccess,
  } = response;


  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);

  const columns: ColumnDef<Unit | null>[] = useMemo(
    () => [
      {
        accessorKey: "actual_name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => (
          <>
            {row?.original ? (
              <div>{row.getValue("actual_name")}</div>
            ) : (
              <Skeleton className="w-40 h-4 bg-[#F5f5f5]" />
            )}
          </>
        ),
        enableSorting: true,
        enableHiding: false,
      },
      {
        accessorKey: "short_name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Short Name" />
        ),
        cell: ({ row }) => (
          <>
            {row?.original ? (
              <div>{row.getValue("short_name")}</div>
            ) : (
              <Skeleton className="w-40 lg:w-56 h-4 bg-[#F5f5f5]" />
            )}
          </>
        ),
        enableSorting: false,
        enableHiding: true,
      },
      {
        accessorKey: "allow_decimal",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Decimal Allowed " />
        ),
        cell: ({ row }) => (
          <>
            {row?.original ? (
              <div>{row.getValue("allow_decimal")}</div>
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

  const handleEdit = (data: Unit | null) => {
    setSelectedUnit(data);
    toggleModal();
  };

  const handleDelete = (data: Unit | null) => {
    setSelectedUnit(data);
    toggleDeleteModal();
  };

  const confirmDelete = () => {
    deleteUnit({ id: selectedUnit?.id });
  };

  useEffect(() => {
    if (deleteError) {
      toast.error("Something Wrong.");
    }
    if (deleteSuccess) {
      toast.success("Unit Deleted Successfully.");
      toggleDeleteModal();
    }
  }, [deleteError, deleteSuccess]);

  useEffect(() => {
    if (!open && !openDelete) {
      setSelectedUnit(null);
    }
  }, [open, openDelete]);

  return (
    <>
      <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-xl text-[#4741E1]">Units</h1>
            <p className="font-medium text-sm">A List of all the units</p>
          </div>
          <Button onClick={toggleModal} size={"sm"}>
            <PlusCircle className="mr-2 w-4 h-4" />
            Add Unit
          </Button>
        </div>
        <Separator />
        <Table
          // @ts-expect-error
          columns={columns}
          data={unitsLoading || unitsFetching ? loadingData : unitsList || []}
          filterKey="name"
        />
      </div>
      <Modal
        title={selectedUnit ? "Update Unit" : "Add New Unit"}
        open={open}
        setOpen={toggleModal}
        body={<UnitForm setOpen={toggleModal} data={selectedUnit} />}
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

export default Units;
