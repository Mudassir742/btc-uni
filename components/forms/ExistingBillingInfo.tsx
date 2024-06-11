import { FC, HTMLAttributes } from "react";
// Utils
import { cn } from "@/utils/shadcn";
import {
  CheckoutSubscriptionFormSchema,
  formSchema,
} from "@/lib/schemas/checkoutFormSchema";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
// Components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
// Types
import Stripe from "stripe";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  form: UseFormReturn<CheckoutSubscriptionFormSchema>;
  cusData: Stripe.ApiList<Stripe.PaymentMethod>["data"];
  disabled?: boolean;
  name?: keyof CheckoutSubscriptionFormSchema;
}

const ExistingBillingInfo: FC<IProps> = ({
  className,
  form,
  disabled = false,
  cusData,
  name,
  ...props
}) => {
  return (
    <div className={cn("", className, (name = "existingCardId"))} {...props}>
      <h2 className="font-bold capitalize">PAYMENT METHOD</h2>
      <div>
        <FormField
          control={form.control}
          name={"existingCardId"}
          render={({ field }) => (
            <FormItem className="mt-4 space-y-3">
              <FormControl>
                <RadioGroup
                  disabled={disabled}
                  onValueChange={(e) => {
                    field.onChange(e);
                  }}
                  defaultValue={field.value}
                  className="flex flex-col space-y-2 "
                >
                  {cusData.map((item) => {
                    return (
                      <FormItem
                        key={item.id}
                        className="flex items-center mt-2 gap-x-2"
                      >
                        <FormControl>
                          <RadioGroupItem value={item.id} id={item.id} />
                        </FormControl>
                        <FormLabel
                          className="!m-0 font-normal cursor-pointer disabled:cursor-not-allowed"
                          htmlFor={item.id}
                        >
                          Same as card ending in {item.card?.last4}
                        </FormLabel>
                      </FormItem>
                    );
                  })}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default ExistingBillingInfo;
