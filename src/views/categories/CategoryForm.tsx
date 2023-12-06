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
import { useUpdateCategoriesMutation } from "@/store/services/categoryService";
import { useCreateCategoryMutation } from "@/store/services/categoryService";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  sub_category: z.array(
    z.object({
      name: z.string(),
      sub_category: z.array(
        z.object({
          name: z.string(), 
        })
      ), 
    })
  ),
  parent_id: z.coerce.number(),
  customer_id: z.coerce.number(),
  business_id: z.coerce.number(),
});

interface CategoryFormProps {
  setOpen: () => void;
  data?: Category | null;
}

const CategoryForm: FC<CategoryFormProps> = ({ setOpen, data }) => {
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || "",
      sub_category: data?.sub_category || [{ name: "", sub_category: [] }],
      customer_id: data?.customer_id || Number(session?.user?.customer_id),
      business_id: data?.business_id || Number(session?.user?.business_id),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
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
        {/* <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
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
