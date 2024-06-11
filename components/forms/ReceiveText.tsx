import { FC, HTMLAttributes } from "react";
// Utils
import { cn } from "@/utils/shadcn";
import { CheckedState } from "@radix-ui/react-checkbox";
import { UseFormReturn } from "react-hook-form";
import {
  CheckoutProductsFormSchema,
  CheckoutSubscriptionFormSchema,
} from "@/lib/schemas/checkoutFormSchema";
// Components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  form: UseFormReturn<
    any
  >;
}

const ReceiveText: FC<IProps> = ({ className, form, ...props }) => {
  return (
    <div className={cn("flex flex-col gap-y-6", className)} {...props}>
      {/* Checkbox */}
      <FormField
        control={form.control}
        name="textNotificationPreference"
        render={({ field }) => (
          <FormItem className="flex gap-x-3 items-center !mt-6">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={
                  field.onChange as (check: CheckedState) => void
                }
              />
            </FormControl>
            <FormLabel className="!-mt-0">
              Receive texts for offers and order updates
            </FormLabel>
            <FormMessage />
          </FormItem>
        )}
      />
      {form.getValues("textNotificationPreference") && (
        <FormField
          control={form.control}
          name="customerPhoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </div>
  );
};

export default ReceiveText;
