import { FC, HTMLAttributes } from "react";
//  Types
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  CheckoutProductsFormSchema,
  CheckoutSubscriptionFormSchema,
  formSchema,
} from "@/lib/schemas/checkoutFormSchema";
// Utils
import { cn } from "@/utils/shadcn";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/textarea";
import Collapsible from "@/components/ui/Collapsible";
import { Minus, Plus } from "lucide-react";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  form: UseFormReturn<
    any
  >;
}

const GiftFields: FC<IProps> = ({ className, form, ...props }) => {
  const show = form.getValues().forAnotherUser;
  return (
    <div className={cn("", className)} {...props}>
      <Collapsible
        setShow={() => {
          form.watch("forAnotherUser");
          form.setValue("forAnotherUser", !show);
        }}
      >
        MAKE THIS PURCHASE A GIFT
        {show ? (
          <Minus
            className={cn(["w-5 h-5"], { "transform rotate-180": show })}
          />
        ) : (
          <Plus className={cn(["w-5 h-5"], { "transform rotate-180": show })} />
        )}
      </Collapsible>
      {/* Email */}
      {show && (
        <div className="flex flex-col mt-5 gap-y-5">
          <FormField
            control={form.control}
            name="recipient-email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled={!form.getValues().forAnotherUser ? true : false}
                    placeholder="Recipient Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Textare for message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default GiftFields;
