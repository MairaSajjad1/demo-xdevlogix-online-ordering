import { FC } from "react";
import FileInput from "@/components/ui/file-input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { VariationTemplate } from "@/views/variations";

interface VariationTemplateProps {
  form: any;
  variationTemplate: VariationTemplate;
  index: number;
}

const VariationTemplate: FC<VariationTemplateProps> = ({
  form,
  variationTemplate,
  index,
}) => {
  return (
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
              <Input {...field} value={variationTemplate?.tem_name} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name={`variation_list.${index}.sku`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>SKU</FormLabel>
            <FormControl>
              <Input placeholder="P302" {...field} type="number" />
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
  );
};

export default VariationTemplate;
