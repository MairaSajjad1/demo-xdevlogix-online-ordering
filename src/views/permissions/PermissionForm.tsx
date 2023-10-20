import { FC, useEffect } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BiLoaderAlt as Loader } from "react-icons/bi";
import toast from "react-hot-toast";
import { useUpdatePermissionMutation } from "@/store/services/permissionServices";
import { Permission } from "./index";

const formSchema = z.object({
  can_create: z.string(),
  can_view: z.string(),
  can_delete: z.string(),
  can_update: z.string(),
  business_id: z.number(),
  permission_id: z.number(),
  role_id: z.string(),
});

interface PermissionFormProps {
  setOpen: () => void;
  data?: Permission | null;
  roleId?: number;
}

const PermissionForm: FC<PermissionFormProps> = ({ setOpen, data, roleId }) => {
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      can_create: data?.role_permission[0]?.can_create ?? "0",
      can_view: data?.role_permission[0]?.can_view ?? "0",
      can_delete: data?.role_permission[0]?.can_delete ?? "0",
      can_update: data?.role_permission[0]?.can_update ?? "0",
      business_id: Number(session?.user?.business_id),
      permission_id: data?.id || 0,
      role_id: String(roleId) || "",
    },
  });

  const [update, updateResponse] = useUpdatePermissionMutation();


  console.log(form.watch())
  function onSubmit(values: z.infer<typeof formSchema>) {
    update({
      data: {
        ...values,
        permission_id: values.permission_id,
      },
    });
  }

  const {
    isLoading: updateLoading,
    isError: updateError,
    isSuccess: updateSuccess,
  } = updateResponse;

  useEffect(() => {
    if (updateError) {
      toast.error("Something went wrong.");
    }
    if (updateSuccess) {
      toast.success("Permission updated successfully.");
      setOpen();
    }
  }, [updateError, updateSuccess]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-2">
      <FormField
        control={form.control}
        name="can_create"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-1 rounded-md border p-1">
            <FormControl>
              <Input
                type="checkbox"
                id="can_create"
                checked={field.value === '1'}
                onChange={(e) => field.onChange(e.target.checked ? '1' : '0')}
                className="w-4 h-4"
              />
            </FormControl>
            <FormLabel className="text-sm">Create</FormLabel>
          </FormItem>
        )}
      />

      <FormField
          control={form.control}
          name="can_view"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-1 rounded-md border p-1">
              <FormControl>
                <Input
                  type="checkbox"
                  id="can_view"
                  checked={field.value === '1'}
                  onChange={(e) => field.onChange(e.target.checked ? '1' : '0')}
                  className="w-4 h-4"
                />
              </FormControl>
              <FormLabel className="text-sm">View</FormLabel>
            </FormItem>
          )}
        />

    <FormField
        control={form.control}
        name="can_update"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-1 rounded-md border p-1">
            <FormControl>
              <Input
                type="checkbox"
                id="can_update"
                checked={field.value === '1'}
                onChange={(e) => field.onChange(e.target.checked ? '1' : '0')}
                className="w-4 h-4"
              />
            </FormControl>
            <FormLabel className="text-sm">Update</FormLabel>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="can_delete"
        render={({ field }) => (
          <FormItem className="flex items-center space-x-1 rounded-md border p-1">
            <FormControl>
              <Input
                type="checkbox"
                id="can_delete"
                checked={field.value === '1'}
                onChange={(e) => field.onChange(e.target.checked ? '1' : '0')}
                className="w-4 h-4"
              />
            </FormControl>
            <FormLabel className="text-sm">Delete</FormLabel>
          </FormItem>
        )}
      />
        <Button
          disabled={updateLoading}
          className="col-span-2"
          type="submit"
        >
          {updateLoading ? (
            <Loader className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Update"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default PermissionForm;
