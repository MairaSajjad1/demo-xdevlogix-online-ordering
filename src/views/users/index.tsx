"use client";
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { GoPlusCircle as PlusCircle } from "react-icons/go";
import { ColumnDef } from "@tanstack/react-table";
import Table from "@/components/table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import Modal from "@/components/modal";
import DeleteModal from "@/components/modal/delete-modal";
import { useSession } from "next-auth/react";
import Link from "next/link";
import UserForm from "./userForm";
import { useGetUsersQuery } from "@/store/services/userService";

export interface User {
  id: number;
  name: string;
  business_id: number;
  mobile_no: string;
  email: string;
  password: string;
  email_verified_at: any;
  user_type: string;
  created_at: string;
  updated_at: string;
}

const Users: FC = () => {
  const { data: session } = useSession();
  // GET
  const {
    data: usersList,
    isLoading: userLoading,
    isFetching: userFetching,
  } = useGetUsersQuery({
    buisnessId: session?.user?.business_id,
    perPage: -1,
  });

  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const columns: ColumnDef<User | null>[] = useMemo(
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
              <Skeleton className="w-32 h-4 bg-[#F5f5f5]" />
            )}
          </>
        ),
        enableSorting: true,
        enableHiding: false,
      },
      // {
      //   accessorKey: "email",
      //   header: ({ column }) => (
      //     <DataTableColumnHeader column={column} title="Email" />
      //   ),
      //   cell: ({ row }) => (
      //     <>
      //       {row?.original ? (
      //         <div>{row.getValue("email")}</div>
      //       ) : (
      //         <Skeleton className="w-40 lg:w-56 h-4 bg-[#F5f5f5]" />
      //       )}
      //     </>
      //   ),
      //   enableSorting: false,
      //   enableHiding: true,
      // },
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
              <Skeleton className={`w-10 lg:w-16 h-4 bg-[#F5f5f5]`} />
            )}
          </>
        ),
        enableSorting: true,
        enableHiding: true,
      },
      {
        accessorKey: "user_type",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Type" />
        ),
        cell: ({ row }) => (
          <>
            {row?.original ? (
              <div>{row.getValue("user_type")}</div>
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

  const handleEdit = (data: User | null) => {
    setSelectedUser(data);
    toggleModal();
  };

  const handleDelete = (data: User | null) => {
    setSelectedUser(data);
    toggleDeleteModal();
  };

  const confirmDelete = () => {
    toast.error("Delete Api Is Not Implemented");
  };

  useEffect(() => {
    if (!open && !openDelete) {
      setSelectedUser(null);
    }
  }, [open, openDelete]);
  return (
    <>
      <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-xl text-[#4741E1]">Users</h1>
            <p className="font-medium text-sm">A List of all Users</p>
          </div>
          {/* <Button asChild size={"sm"}>
            <Link href={"/user-management/users"}>
              <PlusCircle className="mr-2 w-4 h-4" />
              Add User
            </Link>
            </Button> */}
          <Button onClick={toggleModal} size={"sm"}>
            <PlusCircle className="mr-2 w-4 h-4" />
            Add User
          </Button>
        </div>
        <Separator />
        <Table
          // @ts-expect-error
          columns={columns}
          data={userLoading || userFetching ? loadingData : usersList || []}
          filterKey="name"
        />
      </div>
      <Modal
        title={selectedUser ? "Update User" : "Add New User"}
        open={open}
        setOpen={toggleModal}
        body={<UserForm setOpen={toggleModal} data={selectedUser} />}
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

export default Users;
