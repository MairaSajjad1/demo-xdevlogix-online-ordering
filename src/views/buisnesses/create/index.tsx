"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { BiLoaderAlt as Loader } from "react-icons/bi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useCreateBuisnessMutation } from "@/store/services/buisnessService";


const formSchema = z.object({
    name: z.string().min(1, { message: "Name is required." }),
    address: z.string().min(1, { message: "Address is required." }),
    city: z.string().min(1, { message: "City is required." }),
    state: z.string().min(1, { message: "State is required." }),
    country: z.string().min(1, { message: "Country is required." }),
    landmark: z.string().min(1, { message: "Landmark is required." }), 
    owner_details: z.object({
      name: z.string().min(1, { message: "Owner's name is required." }), 
      username: z.string().min(1, { message: "Username is required." }),
      password: z.string().min(1, { message: "Password is required." }),
      // user_type: z.string().min(1, { message: "User type is required." }),
      mobile_no: z.string().min(1, { message: "Mobile number is required." }),
    }),
  });

//   interface BusinessFormProps {
//     setOpen: () => void;
//     data?: Buisness | null;
//   }

const Create = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:   "",
      address:   "",
      city:   "",
      state:   "",
      country:  "",
      landmark:  "",
      owner_details: {
        name:"",
        username: "",
        password: "",
        // user_type:"",
        mobile_no:"",
      },
    },
  });

  const [create, createResponse] = useCreateBuisnessMutation();

  const {
    isLoading: createLoading,
    isError: createError,
    isSuccess: createSuccess,
  } = createResponse;

  useEffect(() => {
    if (createError) {
      toast.error("Something went wrong.");
    }
    if (createSuccess) {
      toast.success("business Added Successfully.");
      router.push("/settings/buisnesses");
    }
  }, [createError, createSuccess]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    create({
      data: values,
    });
  }
  return (
    <div className="bg-[#FFFFFF] p-2 rounded-md overflow-hidden space-y-4">
      <h1 className="text-[hsl(242,73%,57%)] font-semibold">Add New Business</h1>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
      className="gap-4 grid grid-cols-3 justify-center items-center">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Restaurant" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Gulberg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="Lahore" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="Punjab" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Country</FormLabel>
              <FormControl>
                <Input placeholder="Pakistan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
            <FormField
          control={form.control}
          name="landmark"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Landmark</FormLabel>
              <FormControl>
                <Input placeholder="Pakistan" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner_details.name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Owner's Name</FormLabel>
              <FormControl>
                <Input placeholder="Owner's Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner_details.username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Owner's UserName" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="owner_details.password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         {/* <FormField
          control={form.control}
          name="owner_details.user_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>UserType</FormLabel>
              <FormControl>
                <Input placeholder="UserType" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <FormField
          control={form.control}
          name="owner_details.mobile_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mobile No</FormLabel>
              <FormControl>
                <Input placeholder="923411415567" {...field} type="number" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
       <div className="col-span-3 flex items-center justify-center">
            <Button disabled={createLoading} type="submit" className="w-full">
              {createLoading && (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              )}
              Add
            </Button>
          </div>
      </form>
      </Form>
    </div>
  );
};

export default Create;
