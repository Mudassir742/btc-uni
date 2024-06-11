import { Dispatch, FC, HTMLAttributes, SetStateAction, useState } from "react";
// Utils
import { cn } from "@/utils/shadcn";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  CheckoutProductsFormSchema,
  CheckoutSubscriptionFormSchema,
  formSchema,
} from "@/lib/schemas/checkoutFormSchema";
import toast from "react-hot-toast";
import { handleError } from "@/utils/stripeErrorHandling";
// Type
import Stripe from "stripe";
// Components
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { UserSession } from "@/interfaces";
// import Collapsible from "@/components/ui/Collapsible";
// import { Minus, Plus } from "lucide-react";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  form: UseFormReturn<any>;
  user: UserSession;
  productId: string;
  setDiscount: Dispatch<
    SetStateAction<{
      type: "amount" | "percent";
      value: number;
      couponData?: Stripe.Coupon;
    }>
  >;
}

const DiscountCodeInput: FC<IProps> = ({
  className,
  user,
  productId,
  form,
  setDiscount,
  ...props
}) => {
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const getCoupon = async (couponCode?: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/coupon?couponId=${couponCode}`, {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY!,
        }
      });
      const couponData: Stripe.Response<Stripe.Coupon> = await res.json();
      if (res.ok) {
        // check if coupon data is valid and check applies to current subscription or not
        if (couponData.valid === false) {
          throw new Error("Coupon is not valid");
        } else {
          if (
            (couponData.applies_to?.products.some(
              (product) => product === productId
            ) ||
              (!couponData.applies_to && !(couponData.metadata as { pid: string }).pid)) ||
            // Check if product id is in the metadata of the coupon
            (couponData.metadata as { pid: string }).pid === String(productId)
          ) {
            toast.success("Coupon Applied");
            (couponData.percent_off || couponData.amount_off) &&
              setDiscount({
                type: couponData.percent_off ? "percent" : "amount",
                value: couponData.percent_off
                  ? couponData.percent_off
                  : couponData.amount_off!,
                couponData: couponData,
              });
            if (couponData?.metadata?.type === "gift") {
              form.setValue("isGiftedBySomeone", true)
            }
          } else {
            throw new Error("Coupon is not valid for this Product");
          }
        }
      } else {
        throw couponData;
      }
      // Pushing data to the dataLayer using type assertion // temporary solution
      (window as any).dataLayer.push({
        event: "userClickedApplyCoupon",

        userDataId: user.userDataId,

        productId: productId,
        couponType: couponData.percent_off ? "percent" : "amount",
        couponValue: couponData.percent_off ? couponData.percent_off : couponData.amount_off!,

        // subscriptionValue: subValue, // TO DO mihai: discuss with hamzah how to get the sub value on the basics page
        // note: productId above indirectly gives us this information 
      });
      
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={cn("", className)} {...props}>

      <div className="mt-5 ">
        <FormField
          control={form.control}
          name="couponCode"
          render={({ field }) => (
            <FormItem className="flex w-full">
              <FormControl>
                <div className="flex w-full">
                  <Input
                    variant={"withOutline"}
                    // _size={"md"}
                    placeholder="Promo code" className="bg-white border rounded-r-none" {...field} />
                  <Button
                    id="Apply-Coupon-Button-Checkout"
                    onClick={() => getCoupon(field.value)}
                    type="button"
                    disabled={loading || !form.getValues("couponCode")}
                    className="p-0 w-48 font-bold block rounded-r-md !rounded-l-none h-14 top-0 right-0 text-14 text-white"
                  >
                    Apply
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default DiscountCodeInput;
