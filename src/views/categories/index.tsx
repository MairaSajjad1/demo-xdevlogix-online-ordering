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
import CategoryForm from "./CategoryForm";
import { useGetCategoriesQuery } from "@/store/services/categoryService";
import { useDeleteCategoryMutation } from "@/store/services/categoryService";

export interface Category {
  id: number;
  name: string;
  business_id: number;
  customer_id: any;
  created_by: number;
  created_at: string;
  updated_at: string;
}

const Categories: FC = () => {
  const { data: session } = useSession();

  const {
    data: categoriesList,
    isLoading: categoriesLoading,
    isFetching: categoriesFetching,
  } = useGetCategoriesQuery({
    buisnessId: session?.user?.business_id,
    perPage: -1,
  });

   // DELETE
   const [deleteCategory, response] = useDeleteCategoryMutation();
   const {
     isLoading: deleteLoading,
     isError: deleteError,
     isSuccess: deleteSuccess,
   } = response;

  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const columns: ColumnDef<Category | null>[] = useMemo(
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

  const handleEdit = (data: Category | null) => {
    setSelectedCategory(data);
    toggleModal();
  };

  const handleDelete = (data: Category | null) => {
    setSelectedCategory(data);
    toggleDeleteModal();
  };

  const confirmDelete = () => {
    deleteCategory({ id: selectedCategory?.id });
  };

  useEffect(() => {
    if (deleteError) {
      toast.error("Something Wrong.");
    }
    if (deleteSuccess) {
      toast.success("Category Deleted Successfully.");
      toggleDeleteModal();
    }
  }, [deleteError, deleteSuccess]);

  useEffect(() => {
    if (!open && !openDelete) {
      setSelectedCategory(null);
    }
  }, [open, openDelete]);

  return (
    <>
      <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-xl text-[#4741E1]">Categories</h1>
            <p className="font-medium text-sm">A List of all Categories</p>
          </div>
          <Button onClick={toggleModal} size={"sm"}>
            <PlusCircle className="mr-2 w-4 h-4" />
            Add Category
          </Button>
        </div>
        <Separator />
        <Table
          // @ts-expect-error
          columns={columns}
          data={
            categoriesLoading || categoriesFetching
              ? loadingData
              : categoriesList || []
          }
          filterKey="name"
        />
      </div>
      <Modal
        title={selectedCategory ? "Update Category" : "Add New Category"}
        open={open}
        setOpen={toggleModal}
        body={<CategoryForm setOpen={toggleModal} data={selectedCategory} />}
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

export default Categories;
