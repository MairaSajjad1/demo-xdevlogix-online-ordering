"use client"
import { FC, useCallback, useEffect, useMemo, useState } from "react";
import Table from "@/components/table";
import { DataTableColumnHeader } from "@/components/table/data-table-column-header";
import { DataTableRowActions } from "@/components/table/data-table-row-actions";
import DeleteModal from "@/components/modal/delete-modal";
import { ColumnDef } from "@tanstack/react-table";
import { useSession } from "next-auth/react";
import Modal from "@/components/modal";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { useGetPermissionsQuery } from "@/store/services/permissionServices";
import toast from "react-hot-toast";
import PermissionForm from "./PermissionForm";

interface RolePermission {
  business_id: number
  can_view: string
  can_update: string
  can_create: string
  can_delete: string
  role_id: number
  permission_id: number
}


export interface Permission {
   id: number
  name: string
  created_at: any
  updated_at: any
  role_permission: RolePermission[]
}



interface PermissionsProps {
  roleId: number;
}
const Permissions: FC<PermissionsProps> = ({ roleId }) => {
  const { data: session } = useSession();
  const {
    data: permissionList,
    isLoading: permissionLoading,
    isFetching: permissionFetching,
  } = useGetPermissionsQuery({
    buisnessId: session?.user?.business_id,
    roleId,
    perPage: -1,
  });
// console.log({permissionList})
const [open, setOpen] = useState<boolean>(false);
const [openDelete, setOpenDelete] = useState<boolean>(false);
const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
const [selectedPermission, setSelectedPermission] = useState<Permission | null>(null);

  const columns: ColumnDef<Permission | null>[] = useMemo(
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
        enableSorting: false,
        enableHiding: true,
      },
      {
        accessorKey: "role_permission",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Permissions" />
        ),
        cell: ({ row }) => {
          if (!row || !row.original) {
            return null; // Return null if row or row.original is null
          }
          const permissionItems: RolePermission[] | undefined = row?.getValue("role_permission");
          const permissionNames = {
            can_view: "View",
            can_create: "Create",
            can_delete: "Delete",
            can_update: "Update",
          };
      
          return (
            <div className="flex items-center gap-4">
              {row.original && permissionItems ? (
                permissionItems.map((permissionItem: RolePermission) => (
                  <div className="grid grid-cols-4 gap-2" key={permissionItem.business_id}>
                    {Object.entries(permissionItem).map(([key, value]) => {
                      // @ts-ignore
                      if (value === "1" && permissionNames[key]) {
                        return (
                          <div className="bg-[#F5F5F5] px-2 py-1 rounded-lg" key={key}>
                        {/* @ts-ignore */}
                            {permissionNames[key]}
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                ))
              ) : null}
            </div>
          );
        },
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

  const handleEdit = (data: Permission | null) => {
    setSelectedRoleId(roleId);
    setSelectedPermission(data);
    toggleModal();
  };

// console.log({selectedPermission})

  const loadingData = Array.from({ length: 10 }, () => null);

  const toggleModal = useCallback(() => {
    setOpen((open) => !open);
  }, [open]);

  const toggleDeleteModal = useCallback(() => {
    setOpenDelete((open) => !open);
  }, [open]);
  
  const confirmDelete = () => {
    toast.error("Delete APi is not implemented Yet");
    toggleDeleteModal();
  };

  const handleDelete = (data: Permission | null) => {
    setSelectedPermission(data);
    toggleDeleteModal();
  };

  return <>
  <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-semibold text-xl text-[#4741E1]">Permissions</h1>
        <p className="font-medium text-sm">A list of all the Permissions.</p>
      </div>
    </div>
    <Separator />
    <Table 
// @ts-expect-error
       columns={columns}
      data=
      {permissionLoading || permissionFetching ? loadingData : permissionList?.data || []
      }
      filterKey="name"
    />
  </div>
      {selectedPermission && (
        <Modal
          title="Update Permissions"
          open={open}
          setOpen={toggleModal}
          body={
          <PermissionForm 
            setOpen={toggleModal} 
            data={selectedPermission}
            roleId={selectedRoleId!}
             />
            }
        />
      )}

    <DeleteModal
      open={openDelete}
      setOpen={toggleDeleteModal}
      loading={false}
      confirmDelete={confirmDelete}
    />
 </>
};

export default Permissions;
