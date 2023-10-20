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
import { Textarea } from "@/components/ui/textarea";
import toast from "react-hot-toast";
import { TypeOfService } from "./index";
import {
  useCreateTypeOfServiceMutation,
  useUpdateTypeOfServiceMutation,
} from "@/store/services/typeOfServiceService";
import { useSession } from "next-auth/react";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  charge_type: z.string().min(1, { message: "Charge type is required." }),
  charge: z.coerce.number().positive(),
  business_id: z.coerce.number(),
});

interface ServiceFormProps {
  setOpen: () => void;
  data?: TypeOfService | null;
}

const ServiceForm: FC<ServiceFormProps> = ({ setOpen, data }) => {
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || "",
      description: data?.description || "",
      charge_type: data?.charge_type || "fixed",
      charge: Number(data?.charge) || 0,
      business_id: data?.business_id || Number(session?.user?.business_id),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    data
      ? update({ data: { ...values, id: data.id } })
      : create({ data: values });
  }

  const [create, createResponse] = useCreateTypeOfServiceMutation();
  const [update, updateResponse] = useUpdateTypeOfServiceMutation();

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
      toast.success("Service Added Successfully.");
      setOpen();
    }
  }, [createError, createSuccess]);

  useEffect(() => {
    if (updateError) {
      toast.error("Something Wrong.");
    }
    if (updateSuccess) {
      toast.success("Service Update Successfully.");
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
                <Input placeholder="Dine In" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="This service type is for the Dine in."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="charge_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Charge Type</FormLabel>
              <FormControl>
                <Input placeholder="Fixed" disabled {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="charge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Charges</FormLabel>
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

export default ServiceForm;
