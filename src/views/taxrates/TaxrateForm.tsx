import { FC, useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { Taxrate } from "./index";
import { useCreateTaxrateMutation } from "@/store/services/taxrateService"; 
import { useUpdateTaxratesMutation } from "@/store/services/taxrateService";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  amount: z.coerce.number().positive(),
  business_id: z.coerce.number(),
  created_by: z.coerce.number(),
});

interface TaxrateFormProps {
  setOpen: () => void;
  data?: Taxrate | null;
}

const TaxrateForm: FC<TaxrateFormProps> = ({ setOpen, data }) => {
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || "",
      amount: Number(data?.amount) || 0,
      business_id: data?.business_id || Number(session?.user?.business_id),
      created_by: data?.created_by || Number(session?.user?.customer_id),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    data
    ? update({ data: { ...values, id: data.id } })
    : create({ data: values });
  }

  const [create, createResponse] = useCreateTaxrateMutation();
  const [update, updateResponse] = useUpdateTaxratesMutation();

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
      toast.success("Tax Rate Added Successfully.");
      setOpen();
    }
  }, [createError, createSuccess]);

  useEffect(() => {
    if (updateError) {
      toast.error("Something Wrong.");
    }
    if (updateSuccess) {
      toast.success("Taxrate Update Successfully.");
      setOpen();
    }
  }, [updateError, updateSuccess]);

    console.log( form.watch())

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
                <Input placeholder="GST" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tax Rate %</FormLabel>
              <FormControl>
                <Input placeholder="10" {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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

export default TaxrateForm;
