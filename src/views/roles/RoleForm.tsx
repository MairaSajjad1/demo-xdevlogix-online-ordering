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
import { useSession } from "next-auth/react";
import { Role } from "./index";
import { useCreateRoleMutation } from "@/store/services/roleService";
import { useUpdateRoleMutation } from "@/store/services/roleService";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  bussines_id: z.coerce.number(),
});

interface RoleFormProps {
  setOpen: () => void;
  data?: Role | null;
}

const RoleForm: FC<RoleFormProps> = ({ setOpen, data }) => {
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data?.name || "",
      bussines_id: data?.bussines_id || Number(session?.user?.business_id),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    data
    ? update({ data: { ...values, id: data.id } })
    : create({ data: values });
  }

  const [create, createResponse] = useCreateRoleMutation();
  const [update, updateResponse] = useUpdateRoleMutation();

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
      toast.success("Role Added Successfully.");
      setOpen();
    }
  }, [createError, createSuccess]);


  useEffect(() => {
    if (updateError) {
      toast.error("Something Wrong.");
    }
    if (updateSuccess) {
      toast.success("Role Update Successfully.");
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
                <Input placeholder="Customer" {...field} />
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

export default RoleForm;
