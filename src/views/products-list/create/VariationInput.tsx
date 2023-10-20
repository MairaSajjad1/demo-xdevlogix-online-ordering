import FileInput from "@/components/ui/file-input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetVariationsQuery } from "@/store/services/variationService";
import { Variation } from "@/views/variations";
import { useSession } from "next-auth/react";
import { FC, useMemo } from "react";
import { UseFieldArrayRemove } from "react-hook-form";
// import VariationTemplate from "./VariationTemplate";

interface VariationsInputProps {
  index: number;
  form: any;
}

const VariationsInput: FC<VariationsInputProps> = ({ index, form }) => {
  const { data: session } = useSession();

  return (
    <div className="col-span-3 grid grid-cols-3 gap-4">
      {form.watch("variation_id") && (
        <>
          <div className="col-span-3  gap-4 flex items-stretch justify-between">
            {/* <div className="flex-1"> */}
            {/* <div className="grid grid-cols-3 gap-4"> */}
            <FormField
              control={form.control}
              name={`variation_list.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      value={form.getValues("variation_list")[index].value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`variation_list.${index}.price_inclusive_tax`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Inc Tax</FormLabel>
                  <FormControl>
                    <Input placeholder="468" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`variation_list.${index}.price_exclusive_tax`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price Exc Tax</FormLabel>
                  <FormControl>
                    <Input placeholder="400" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`variation_list.${index}.profit_margin`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Margin</FormLabel>
                  <FormControl>
                    <Input placeholder="329" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`variation_list.${index}.selling_price`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selling Price</FormLabel>
                  <FormControl>
                    <Input placeholder="400" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`variation_list.${index}.selling_price_inc_tax`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selling Price Inc Tax</FormLabel>
                  <FormControl>
                    <Input placeholder="468" {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* </div> */}
            {/* </div> */}
            {/* <div className="flex-1">
        <FileInput fileAllowed={1} onChange={() => {}} />
      </div> */}
          </div>
        </>
      )}
    </div>
  );
};

export default VariationsInput;

// {variations?.variation_template?.map((variationTemplate) => (
//   <VariationTemplate
//     index={index}
//     variationTemplate={variationTemplate}
//     key={variationTemplate.id}
//     form={form}
//   />
// ))}
