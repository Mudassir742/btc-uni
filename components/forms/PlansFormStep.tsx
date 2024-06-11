"use client";
import { Dispatch, FC, HTMLAttributes, SetStateAction } from "react";
// Utils
import { cn } from "@/utils/shadcn";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/lib/schemas/checkoutFormSchema";
import Stripe from "stripe";
import { parseText } from "@/utils/parseText";
// Components
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { FormHeader } from "@/components/forms/FormHeader";
import { KeyedMutator, mutate, useSWRConfig } from "swr";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  productMap:  Stripe.Product[];
  setDiscount?: Dispatch<
    SetStateAction<{
      type: "amount" | "percent";
      value: number;
    }>
  >;
  refetch: KeyedMutator<any>;
}

const PlansFormFields: FC<IProps> = ({
  className,
  refetch,
  form,
  productMap,
  setDiscount,
  ...props
}) => {
  const { cache } = useSWRConfig();
  return (
    <div className={cn(className)}>
      <FormHeader>Plans</FormHeader>
      <FormField
        control={form.control}
        name="subscriptionId"
        render={({ field }) => (
          <FormItem className="mt-5 space-y-3">
            <FormControl>
              <RadioGroup
                onValueChange={(e) => {
                  cache.delete("/api/tax/");
                  refetch()
                  form.setValue("couponCode", undefined);
                  setDiscount && setDiscount({ type: "percent", value: 0 });
                  field.onChange(e);
                }}
                defaultValue={field.value}
                className="flex flex-col space-y-1 "
              >
                {/* <h2 className="font-bold uppercase ">Premium Subscription</h2> */}
                {productMap
                  ?.slice() // to avoid mutating the original array
                  .sort((a, b) => {
                    // sort by price
                    const priceA =
                      (a?.default_price as Stripe.Price)?.unit_amount || 0;
                    const priceB =
                      (b?.default_price as Stripe.Price)?.unit_amount || 0;
                    return priceA - priceB;
                  })
                  ?.map((item) => {
                    const priceData = item.default_price as Stripe.Price;
                    return (
                      <FormItem
                        key={item.id}
                        className="flex items-center mt-2 gap-x-2"
                      >
                        <FormControl>
                          <RadioGroupItem value={item.id} id={item.id} />
                        </FormControl>
                        <FormLabel
                          className="!m-0 font-normal cursor-pointer"
                          htmlFor={item.id}
                        >
                          {parseText(item.description ?? "")}
                          {/* {priceData.unit_amount && priceData.unit_amount / 100} */}
                        </FormLabel>
                      </FormItem>
                    );
                  })}
                {/* <h2 className="pt-3 font-bold uppercase">Bulk Subscription</h2> */}
                {/* {productMap?.map((item) => {
                  const priceData = item.default_price as Stripe.Price;
                  return (
                    <FormItem
                      key={item.id}
                      className="flex items-center mt-2 gap-x-2"
                    >
                      <FormControl>
                        <RadioGroupItem value={item.id} id={item.id} />
                      </FormControl>
                      <FormLabel
                        className="!m-0 font-normal cursor-pointer"
                        htmlFor={item.id}
                      >
                        <span className="font-bold">
                          {priceData.unit_amount &&
                            `$${priceData.unit_amount / 100}`}
                        </span>
                      </FormLabel>
                    </FormItem>
                  );
                })} */}
              </RadioGroup>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default PlansFormFields;
