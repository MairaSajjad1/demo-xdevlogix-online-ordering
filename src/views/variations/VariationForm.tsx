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
import { Variation } from "./index";
import { useSession } from "next-auth/react";
import {
  useCreateVariationMutation,
  useUpdateVariationMutation,
} from "@/store/services/variationService";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  variation_templates: z.array(
    z.object({
      tem_name: z.string(),
    })
  ),
  business_id: z.coerce.number(),
  created_by: z.coerce.number(),
});

interface VariationFormProps {
  setOpen: () => void;
  data?: Variation | null;
}

const VariationForm: FC<VariationFormProps> = ({ setOpen, data }) => {
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || "",
      variation_templates: data?.variation_template || [{ tem_name: "" }],
      business_id: data?.business_id || Number(session?.user?.business_id),
      created_by: data?.created_by || Number(session?.user?.customer_id),
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variation_templates",
  });

  const handleAppend = () => {
    append({
      tem_name: "",
    });
  };

  const handleRemove = (index: number) => {
    remove(index);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (data) {
      update({ data: { ...values, id: data.id } });
    } else {
      create({ data: values });
    }
  }

  const [create, createResponse] = useCreateVariationMutation();
  const [update, updateResponse] = useUpdateVariationMutation();

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
      toast.error("Something went wrong.");
    }
    if (createSuccess) {
      toast.success("Variation Added Successfully.");
      setOpen();
    }
  }, [createError, createSuccess]);

  useEffect(() => {
    if (updateError) {
      toast.error("Something Wrong.");
    }
    if (updateSuccess) {
      toast.success("Variation Update Successfully.");
      setOpen();
    }
  }, [updateError, updateSuccess]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
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
        />

        <div>
          <div>Variation Templates</div>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4 w-full">
              <div className="flex-1">
                <FormField
                  control={form.control}
                  name={`variation_templates.${index}.tem_name`}
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
        </div>
        <div className="flex items-center justify-center">
          <Button type="button" onClick={handleAppend}>
            Append{" "}
          </Button>
        </div>
        <Button disabled={createLoading || updateLoading} className="w-full" type="submit">
          {(createLoading || updateLoading) && <Loader className="mr-2 h-4 w-4 animate-spin" />}
          {data ? "Update" : "Add"}
        </Button>
      </form>
    </Form>
  );
};

export default VariationForm;
