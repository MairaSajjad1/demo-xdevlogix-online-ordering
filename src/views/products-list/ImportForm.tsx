import React, { FC, useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiLoaderAlt as Loader } from "react-icons/bi";
import { Button } from "@/components/ui/button";
import { useImportDataMutation } from "@/store/services/productService";

// Define the form schema
const formSchema = z.object({
  file: z.any(),
});

interface ImportProductFormProps {
  setOpen: () => void;
}

const ImportProductForm: FC<ImportProductFormProps> = ({ setOpen }) => {
  const { handleSubmit, register, formState } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const [create, importResponse] = useImportDataMutation();
  const { isLoading, isError, isSuccess } = importResponse;
console.log({formState})
  // Handle form submission
  const handleFormSubmit = async (formData: z.infer<typeof formSchema>) => {
    try {
      const { file } = formData;
      const formDataToSend = new FormData();
      formDataToSend.append("file", file[0]);

      // Create the mutation
      create({ data: formDataToSend });
    } catch (error) {
      console.error("Error importing products:", error);
      toast.error("Import failed. Please try again.");
    }
  };

  useEffect(() => {
    if (isError) {
      toast.error("Something went wrong.");
    }
    if (isSuccess) {
      toast.success("Product Import Successfully.");
      setOpen();
    }
  }, [isError, isSuccess]);

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <input
          type="file"
          id="file"
          accept=".xls, .xlsx"
          {...register("file", { required: "File is required" })}
        />
        <Button disabled={isLoading} className="w-24" type="submit">
          {isLoading ? <Loader className="mr-2 h-4 w-4 animate-spin" /> : "Import"}
        </Button>
      </div>
    </form>
  );
};

export default ImportProductForm;
