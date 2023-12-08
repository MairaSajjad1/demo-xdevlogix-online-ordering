import { FC, useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BiLoaderAlt as Loader } from "react-icons/bi";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { Category } from "./index";
import { useGetSpecificCategoriesQuery } from "@/store/services/categoryService";
import { useUpdateCategoriesMutation } from "@/store/services/categoryService";
import { useCreateCategoryMutation } from "@/store/services/categoryService";

const SubCategorySchema: any = z.object({
  id: z.number(),
  name: z.string(),
  parent_id: z.number().nullable(),
  created_by: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  business_id: z.number(),
  sub_category: z.array(z.lazy(() => SubCategorySchema)).optional(),
});

const categorySchema = z.object({
  id: z.number(),
  name: z.string().min(1, { message: "Name is required." }),
  parent_id: z.number().nullable(),
  created_by: z.number(),
  created_at: z.string(),
  updated_at: z.string(),
  business_id: z.number(),
  sub_category: z.array(SubCategorySchema).optional(),
});

interface CategoryFormProps {
  setOpen: () => void;
  data?: Category | null;
}

const CategoryForm: FC<CategoryFormProps> = ({ setOpen, data }) => {
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      id: data?.id || 0,
      name: data?.name || "",
      parent_id: data?.parent_id || null,
      created_by: data?.created_by || 0,
      created_at: data?.created_at || "",
      updated_at: data?.updated_at || "",
      business_id: data?.business_id || Number(session?.user?.business_id),
      sub_category: data?.sub_category || [{ name: "", sub_category: [] }],
    },
  });

  function onSubmit(values: z.infer<typeof categorySchema>) {
    data
      ? update({ data: { ...values, id: data.id } })
      : create({ data: values });
  }

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sub_category",
  });

  const handleAppend = () => {
    append({
      name: "",
      sub_category: [],
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  const [create, createResponse] = useCreateCategoryMutation();
  const [update, updateResponse] = useUpdateCategoriesMutation();

  const {
    isLoading: createLoading,
    isError: createError,
    isSuccess: createSuccess,
  } = createResponse;

  const {
    isLoading: updateLoading,
    isError: updateError,
    isSuccess: updateSuccess,
  } = updateResponse;

  useEffect(() => {
    if (createError) {
      toast.error("Something Wrong.");
    }
    if (createSuccess) {
      toast.success("Category Added Successfully.");
      setOpen();
    }
  }, [createError, createSuccess]);

  useEffect(() => {
    if (updateError) {
      toast.error("Something Wrong.");
    }
    if (updateSuccess) {
      toast.success("Category Update Successfully.");
      setOpen();
    }
  }, [updateError, updateSuccess]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div>name</div>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-4 w-full">
            <div className="flex-1">
              <FormField
                control={form.control}
                name={`sub_category.${index}.name`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel></FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {index > 0 && (
              <Button
                className="mt-2"
                variant={"destructive"}
                onClick={() => handleRemove(index)}
              >
                Remove
              </Button>
            )}
          </div>
        ))}

        <div className="flex items-center justify-center">
          <Button type="button" onClick={handleAppend}>
            Sub-Category{" "}
          </Button>
        </div>
        <Button
          disabled={createLoading || updateLoading}
          className="w-full"
          type="submit"
        >
          {(createLoading || updateLoading) && (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          )}
          {data ? "Update" : "Add"}
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
