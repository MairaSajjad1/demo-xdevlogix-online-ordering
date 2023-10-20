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
import { useGetRolesQuery } from "@/store/services/roleService";
import RoleForm from "./RoleForm";

export interface Role {
  id: number;
  name: string;
  bussines_id: number;
  created_at: string;
  updated_at: string;
}

  const Roles = () => {

  const { data: session } = useSession();
  const {
    data: rolesList,
    isLoading: rolesLoading,
    isFetching: rolesFetching,
  } = useGetRolesQuery({
    buisnessId: session?.user?.business_id,
    perPage: -1,
  });


  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const columns: ColumnDef<Role | null>[] = useMemo(
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
        accessorKey: "id",
        header: "Permission",
        cell: ({ row }) => (
          <div>
            {row?.original ?
            (
              <a
              // row.original.id
                href={`/dashboard/permission/${row.getValue("id")}`}
                className="text-black-500 hover:underline"
              >
                View Permission
              </a>
            )
            : (
              <Skeleton className="w-20 h-4 bg-[#F5f5f5]" />
            )}
          </div>
        ),
        enableSorting: false,
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

  const handleEdit = (data: Role | null) => {
    setSelectedRole(data);
    toggleModal();
  };

  const handleDelete = (data: Role | null) => {
    setSelectedRole(data);
    toggleDeleteModal();
  };

  const confirmDelete = () => {
    toast.error("Delete APi is not implemented Yet");
    toggleDeleteModal();
  };

  useEffect(() => {
    if (!open && !openDelete) {
      setSelectedRole(null);
    }
  }, [open, openDelete]);

  return (
    <>
      <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-xl text-[#4741E1]">Roles</h1>
            <p className="font-medium text-sm">A List of all Roles</p>
          </div>
          <Button onClick={toggleModal} size={"sm"}>
            <PlusCircle className="mr-2 w-4 h-4" />
            Add Role
          </Button>
        </div>
        <Separator />
        <Table
          // @ts-expect-error
          columns={columns}
          data={rolesLoading || rolesFetching ? loadingData : rolesList || []}
          filterKey="name"
        />
      </div>
      <Modal
        title={selectedRole ? "Update Role" : "Add New Role"}
        open={open}
        setOpen={toggleModal}
        body={<RoleForm setOpen={toggleModal} data={selectedRole} />}
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

export default Roles;
