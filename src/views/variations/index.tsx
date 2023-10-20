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
import VariationForm from "./VariationForm";
import { useGetVariationsQuery } from "@/store/services/variationService";
import { useDeleteVariationMutation } from "@/store/services/variationService";

export interface VariationTemplate {
  id: number;
  tem_name: string;
  business_id: number;
  variation_id: number;
  created_at: string;
  updated_at: string;
}

export interface Variation {
  id: number;
  name: string;
  business_id: number;
  created_by: number;
  created_at: string;
  updated_at: string;
  variation_template: VariationTemplate[];
}

const Variations: FC = () => {
  const { data: session } = useSession();
  // GET
  const {
    data: variationsList,
    isLoading: variationsLoading,
    isFetching: variationsFetching,
  } = useGetVariationsQuery({
    buisnessId: session?.user?.business_id,
    perPage: -1,
  });

  const [deleteVariation, response] = useDeleteVariationMutation();
  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess: deleteSuccess,
  } = response;


  const [open, setOpen] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);

  const [selectedVariation, setSelectedVariation] =
    useState<Variation | null>(null);

  const columns: ColumnDef<Variation | null>[] = useMemo(
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
        accessorKey: "variation_template",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Variations" />
        ),
        cell: ({ row }) => (
          <>
            {row.original ? (
              <div className="flex items-center gap-4">
                {(
                  row.getValue("variation_template") as VariationTemplate[]
                )?.map((templateItem: VariationTemplate) => (
                  <div
                    className="bg-[#F5F5F5] px-2 py-1 rounded-lg"
                    key={templateItem.id}
                  >
                    {templateItem?.tem_name}
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                {Array.from({ length: 3 }, () => null).map((item, index) => (
                  <Skeleton key={index} className="w-20 h-4 bg-[#F5f5f5]" />
                ))}
              </div>
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

  const handleEdit = (data: Variation | null) => {
    setSelectedVariation(data);
    toggleModal();
  };

  const handleDelete = (data: Variation | null) => {
    setSelectedVariation(data);
    toggleDeleteModal();
  };

  const confirmDelete = () => {
    deleteVariation({ id: selectedVariation?.id });
  };

    useEffect(() => {
    if (deleteError) {
      toast.error("Something Wrong.");
    }
    if (deleteSuccess) {
      toast.success("Variation Deleted Successfully.");
      toggleDeleteModal();
    }
  }, [deleteError, deleteSuccess]);

  useEffect(() => {
    if (!open && !openDelete) {
      setSelectedVariation(null);
    }
  }, [open, openDelete]);

  return (
    <>
      <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-semibold text-xl text-[#4741E1]">Variations</h1>
            <p className="font-medium text-sm">A List of all Variations</p>
          </div>
          <Button onClick={toggleModal} size={"sm"}>
            <PlusCircle className="mr-2 w-4 h-4" />
            Add Variation
          </Button>
        </div>
        <Separator />
        <Table
          // @ts-expect-error
          columns={columns}
          data={
            variationsLoading || variationsFetching
              ? loadingData
              : variationsList || []
          }
          filterKey="name"
        />
      </div>
      <Modal
        title={selectedVariation ? "Update Variation" : "Add New Variation"}
        open={open}
        setOpen={toggleModal}
        body={<VariationForm setOpen={toggleModal} data={selectedVariation} />}
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

export default Variations;
