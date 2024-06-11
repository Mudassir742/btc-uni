"use client";
import { FC, HTMLAttributes, useState, useTransition } from "react";
// Utils
import { cn } from "@/utils/shadcn";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useElements, useStripe } from "@stripe/react-stripe-js";
// Components
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import Image from "next/image";
import CheckoutPaymentCard from "@/components/forms/CheckoutPaymentCard";
import Loader from "@/components/ui/Loader";
import Divider from "@/components/ui/Divider";
import PlansFormFields from "@/components/forms/PlansFormStep";
import TotalElement from "@/components/forms/TotalElement";
import DiscountCodeInput from "@/components/forms/DicountCodeInput";
import GiftFields from "@/components/forms/GiftFields";
import BillingInfoFields from "@/components/forms/BillingInfoFields";
import ReceiveText from "@/components/forms/ReceiveText";
// Lib
import {
  CheckoutProductsFormSchema,
  checkoutProductformSchema,
  formSchema,
} from "@/lib/schemas/checkoutFormSchema";
import { paymentIntentReq } from "@/features/stripe/actions/createPaymentIntent";
import { useTax } from "@/lib/services/stripe/handleTax";
// Services
import { createSubscription } from "@/lib/services/stripe/handleSubscription";
import { createCustomer } from "@/lib/services/stripe/handleCustomer";
import CartProductCard from "@/components/cards/CartProductCard";
// Types
import Stripe from "stripe";
import { handleError } from "@/utils/stripeErrorHandling";
import Link from "next/link";
import {
  createPaymentIntent,
  setupPaymentIntent,
} from "@/lib/services/stripe/handlePaymentIntent";
import { useRouter, useSearchParams } from "next/navigation";
import { PurchaseType } from "@/lib/schemas/paymentIntentSchema";
import { Address, PurchasedBundle, PurchasedCourse, UserSession } from "@/interfaces";
import { createUrl } from "@/utils/url";
import { setupProductPurchaseIntent } from "@/features/stripe/actions/serupPaymentIntent";


interface IProps extends HTMLAttributes<HTMLDivElement> {
  pData: PurchasedCourse | PurchasedBundle
  cusCardData?: Stripe.ApiList<Stripe.PaymentMethod>["data"];
  user: UserSession;
  couponData?: Stripe.Coupon;
  userAddressData: Address & {
    firstName: string;
    lastName: string;
    phone: string;
  }
}

const ProductsCheckoutForm: FC<IProps> = ({
  className,
  pData,
  cusCardData,
  userAddressData,
  user,
  couponData,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [discount, setDiscount] = useState<{
    type: "amount" | "percent";
    value: number;
    couponData?: Stripe.Coupon;
  }>({
    type: "percent",
    value: couponData?.percent_off ?? 0,
    couponData: couponData,
  });
  const [pending, startTransition] = useTransition();

  // SearchParams:
  const searchParams = useSearchParams();
  const purchaseType = searchParams?.get("type");
  const stripeCusId = user.stripe.cus_id;
  const newSearchParams = new URLSearchParams(searchParams!);
  // Course Info
  let price: number;
  let pid: string;
  let uri: string;
  let name: string;

  if ("course" in pData) {
    price = pData.course.courseMetadata.price * 100;
    pid = String(pData.course.databaseId);
    newSearchParams.set("coursePurchase", "yes") // Mihai: i pull this data in CourseHero
    newSearchParams.set("coursePurchasePrice", `${price}`) // Mihai: i pull this data in CourseHero
    newSearchParams.set("coursePurchaseCourseName", `${pData?.course?.title}`) // Mihai: i pull this data in CourseHero
    newSearchParams.set("coursePurchaseCourseId", `${pData?.course?.databaseId}`) // Mihai: i pull this data in CourseHero
    newSearchParams.set("coursePurchaseUserId", `${user?.userDataId}`) // Mihai: i pull this data in CourseHero
    // uri = createUrl(`/courses/${pData.course.slug}`, searchParams!) // commented out with Hamzahs blessing, newSearchParams already has searchParams as per line 93
    uri = createUrl(`/courses/${pData.course.slug}`, newSearchParams!)
    name = pData.course.title
  }
  else {
    price = pData.courseBundle.coursebundlemetadata.actualprice * 100;
    pid = String(pData.courseBundle.databaseId);
    newSearchParams.set("bundlePurchase", "yes") // Mihai: i pull this data in CollectionsMainClientComponent
    newSearchParams.set("bundlePurchasePrice", `${price}`) // Mihai: i pull this data in CollectionsMainClientComponent
    newSearchParams.set("bundlePurchaseBundleName", `${pData?.courseBundle?.title}`) // Mihai: i pull this data in CollectionsMainClientComponent
    newSearchParams.set("bundlePurchaseBundleId", `${pData?.courseBundle?.databaseId}`) // Mihai: i pull this data in CollectionsMainClientComponent
    newSearchParams.set("bundlePurchaseUserId", `${user?.userDataId}`) // Mihai: i pull this data in CollectionsMainClientComponent
    // uri = createUrl(`/collections/${pData.courseBundle.slug}`, searchParams!) // commented out with Hamzahs blessing, newSearchParams already has searchParams as per line 93
    uri = createUrl(`/collections/${pData.courseBundle.slug}`, newSearchParams!)
    name = pData.courseBundle.title
  }


  // Stripe
  const elements = useElements();
  const stripe = useStripe();

  // Userouter
  const { push, refresh } = useRouter();

  // 1. Define your form.
  const form = useForm<CheckoutProductsFormSchema>({
    resolver: zodResolver(checkoutProductformSchema),
    defaultValues: {
      "activate-immediately": true,
      forAnotherUser: false,
      saveCard: false,
      existingCardId: cusCardData?.[0]?.id ?? undefined,
      textNotificationPreference: false,
      newCardInfo: cusCardData && cusCardData.length > 0 ? false : true,
      isGiftedBySomeone: couponData?.metadata?.type === "gift" ? true : false,
    },
  });

  // Fetching Tax Data
  // const {
  //   isError,
  //   isLoading: isTaxLoading,
  //   taxData,
  // } = useTax(
  //   [
  //     {
  //       product: pData.id,
  //       amount: productPrice.unit_amount!,
  //     },
  //   ],
  //   stripeCusId,
  //   form.getValues("isGiftedBySomeone")
  // );

  // Error Validation for tax calculation
  // if (isError) {
  //   handleError(isError);
  // }

  // 2. Define a submit handler.
  async function onSubmit(values: CheckoutProductsFormSchema) {
    setIsLoading(true);
    // console.log(elements?.getElement(PaymentElement));
    try {
      // Check if stripe and element instance is not null

      // 1. Create Customer
      // Check if customer already exists if not send api request to create customer


      // Check if it's free
      const totalWithDiscount = (discount.type === "percent" ? price - (price * discount.value / 100) : price - discount.value) / 100; // Total Amount with discount

      const isFree = totalWithDiscount <= 0;


      if (isFree) {
        startTransition(async () => {
          const paymentRes = await setupProductPurchaseIntent({
            description: `${name}`,
            customer: stripeCusId!,
            metadata: {
              purchaseType: purchaseType!,
              pid: pid,
              userDataId: user.userDataId!,
              couponData: JSON.stringify(discount.couponData),

            }
          });

          push(uri);
        })
      } else {
        if (values.isGiftedBySomeone) {
          await setupPaymentIntent({
            customerId: stripeCusId!,
            couponId: discount.couponData?.id,
          });
          push(uri);
        } else {



          // const paymentIntentReq = await createPaymentIntent(
          //   {
          //     amount: productPrice.unit_amount,
          //     customerId: customer,
          //     values: values,
          //     productId: pData.id,
          //     counponData: discount,
          //     purchaseType: PurchaseType["one-time"],
          //     customerEmail: user.userData?.email!,
          //     quantity: 1,
          //     PaymentMethod: selectedCard?.id,
          //   });

          if (stripe && elements) {
            // Validate card items
            const err = await elements.submit();
            if (err.error) {
              setIsLoading(false);
              return;
            }

            const convertedToCents = Math.round(totalWithDiscount * 100); // Convert to cents
            // 2. Create Payment Method
            let paymentIntent: string;
            startTransition(async () => {
              const paymentRes = await paymentIntentReq(
                {
                  amount: convertedToCents,
                  currency: "usd",
                  setup_future_usage: "off_session",
                  customer: stripeCusId!,
                  receipt_email: user.userData?.email!,
                  description: `${name}`,
                  metadata: {
                    productData: JSON.stringify(pData),
                    userWpData: JSON.stringify(user.userData),
                    userAddressData: JSON.stringify(userAddressData),
                    purchaseType: purchaseType!,
                    type: "one-time",
                    pid: pid,
                    userDataId: user.userDataId!,
                  }
                }
              );
              const intentData = JSON.parse(paymentRes) as Stripe.PaymentIntent;
              paymentIntent = intentData.client_secret!;

              if (!paymentIntent!) {
                throw new Error("Payment Failed!")
              }
              refresh();
              // if we are using existing address
              if (values.useExistingAddress) {
                values.address1 = userAddressData?.address1
                values.address2 = userAddressData?.address2
                values.city = userAddressData?.city
                values.state = userAddressData?.state
                values.zipcode = userAddressData?.zipcode
                values.country = userAddressData?.country
                values.phoneNumber = userAddressData?.phone!
              }
              // refresh(); // added on jan 15 to see if double refresh will consistently update purchased course Start Course button after purchasing

              // Confirm Payment
              let confirmPaymentParams = {
                clientSecret: paymentIntent!,
                elements: !values.existingCardId ? elements : undefined,
                confirmParams: {
                  save_payment_method: true,
                  payment_method_data: !values.
                    existingCardId ? {
                    billing_details: {
                      phone: values.phoneNumber,
                      address: {
                        line1: values.address1,
                        line2: values.address2,
                        city: values.city,
                        state: values.state,
                        country: values.country,
                        postal_code: values.zipcode,
                      },
                      email: user.userData?.email,
                      name: `${userAddressData?.firstName} ${userAddressData?.lastName}`,
                    }
                  } : undefined,
                  payment_method: values.existingCardId || undefined,
                  return_url: `${process.env.NEXT_PUBLIC_SITE_URL}${uri}`,
                },
              }

              // If using a new card
              if (!values.existingCardId) {
                if (elements) {
                  confirmPaymentParams.elements = elements;

                }
              }
              // If using an existing card
              else {
                confirmPaymentParams.confirmParams.payment_method = values.existingCardId;
              }

              const res = await stripe.confirmPayment(confirmPaymentParams);
              try {

                if (res.error) {
                  handleError(res.error);
                }
              } catch (err) {
                // handleError(res.error);
              }
            });
          }

        }
      };

    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  }

  const productMap = new Map<"single" | "bulk", Stripe.Product[]>();

  return (
    <div className={cn("w-full", className)} {...props}>
      {/* Form */}
      {/* Product */}

      <Form {...form}>
        <form
          id="products-checkout"
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full  py-6 space-y-3 bg-white  "
        >
          {pData && <CartProductCard pData={pData} />}

          <Divider className="!my-9" />
          <div>
            {/* Total */}
            <TotalElement
              orderSummary={price ? price / 100 : 0}
              discountApplied={discount}
              taxLoading={false}
              // taxLoading={isTaxLoading}
              // key={
              //   taxData?.tax_amount_exclusive ?? taxData?.tax_amount_inclusive
              // }
              tax={
                // taxData?.tax_amount_exclusive ??
                // taxData?.tax_amount_inclusive ??
                0
              }
            />
          </div>

          {/* only display if not gifted by someone */}
          {!form.getValues("isGiftedBySomeone") && (
            <>
              {/* Discount */}
              <DiscountCodeInput
                user={user}
                productId={pid}
                // key={form.watch("subscriptionId")}
                className="!mt-6"
                setDiscount={setDiscount}
                form={form}
              />
              {/* Gift */}
              {/* <GiftFields form={form} className="!mt-7" /> */}

              {/* Card Element */}
              <div className={cn("mt-8", className)} {...props}>
                <CheckoutPaymentCard
                  cusCardData={cusCardData}
                  form={form}
                  initialShow={
                    cusCardData && cusCardData?.length > 0 ? false : true
                  }
                  className="rounded-xl"
                />
              </div>

              {form.watch("newCardInfo") && (
                // {/* Biling Info */}
                <BillingInfoFields
                  className="!mt-6"
                  label="Billing Information"
                  initialShow={
                    cusCardData && cusCardData?.length > 0 ? false : true
                  }
                  fieldNames={{
                    useExistingAddress: 'useExistingAddress',
                    address1: "address1",
                    address2: "address2",
                    city: "city",
                    state: "state",
                    zipCode: "zipcode",
                    phone: "phone",
                    country: "country",
                  }}
                  cusCardData={cusCardData}
                  form={form}
                />
              )}
            </>
          )}
          {/* Receive Text */}
          {/* <ReceiveText form={form} /> */}

          <div className="pt-2  flex justify-center !mt-12 w-full">
            <Button
              className="mx-auto text-center"
              isLoading={isLoading || pending}
              disabled={isLoading || pending}
              size={"lg"}

              type="submit"
            >
              {(isLoading || pending) && <Loader />}
              {form.getValues("isGiftedBySomeone")
                ? "Claim Your Gift"
                : "Purchase"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default ProductsCheckoutForm;


// <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="w-full max-w-md px-5 py-6 space-y-3 bg-white border rounded-xl shadow"
//         >

//           <Divider className="!my-9" />
//           <div>
//             {/* Total */}
//             <TotalElement
//               orderSummary={price ? price / 100 : 0}
//               discountApplied={discount}
//               taxLoading={false}
//               // taxLoading={isTaxLoading}
//               // key={
//               //   taxData?.tax_amount_exclusive ?? taxData?.tax_amount_inclusive
//               // }
//               tax={
//                 // taxData?.tax_amount_exclusive ??
//                 // taxData?.tax_amount_inclusive ??
//                 0
//               }
//             />
//           </div>

//           {!form.getValues("isGiftedBySomeone") && (
//             <>
//               {/* Discount */}
//               {/* <DiscountCodeInput
//                 productId={pData.id}
//                 // key={form.watch("subscriptionId")}
//                 className="!mt-6"
//                 setDiscount={setDiscount}
//                 form={form}
//               /> */}
//               {/* Gift */}
//               <GiftFields form={form} className="!mt-7" />

//               {/* Card Element */}
//               <div className={cn("mt-8", className)} {...props}>
//                 <CheckoutPaymentCard
//                   cusCardData={cusCardData}
//                   form={form}
//                   initialShow={
//                     cusCardData && cusCardData?.length > 0 ? false : true
//                   }
//                   className="rounded-xl"
//                 />
//               </div>

//               {form.watch("newCardInfo") && (
//                 // {/* Biling Info */}
//                 <BillingInfoFields
//                   className="!mt-6"
//                   label="Billing Information"
//                   initialShow={
//                     cusCardData && cusCardData?.length > 0 ? false : true
//                   }
//                   fieldNames={{
//                     address1: "address1",
//                     address2: "address2",
//                     city: "city",
//                     state: "state",
//                     zipCode: "zipcode",
//                     phone: "phone",
//                     country: "country",
//                   }}
//                   cusCardData={cusCardData}
//                   form={form}
//                 />
//               )}
//             </>
//           )}
//           {/* Receive Text */}
//           <ReceiveText form={form} />

//           <div className="pt-2  flex justify-center !mt-12 w-full">
//             <Button
//               className="mx-auto text-center"
//               isLoading={isLoading}
//               disabled={isLoading}
//               size={"lg"}
//               variant={"secondary"}
//               type="submit"
//             >
//               {(isLoading && <Loader />)}
//               {form.getValues("isGiftedBySomeone")
//                 ? "Claim Your Gift"
//                 : "Purchase"}
//             </Button>
//           </div>
//         </form>
//       </Form>