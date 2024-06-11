// "use client";
// import { Dispatch, FC, HTMLAttributes, SetStateAction, useState } from "react";
// // Utils
// import { cn } from "@/utils/shadcn";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { UseFormReturn, useForm } from "react-hook-form";
// import { useElements, useStripe } from "@stripe/react-stripe-js";
// import { useRouter } from "next/navigation";
// import { MutationFunctionOptions, useMutation } from "@apollo/client";
// import { StripeElements, Stripe as S } from "@stripe/stripe-js";
// // Components
// import { Button } from "@/components/ui/Button";
// import { Form } from "@/components/ui/Form";
// import CheckoutPaymentCard from "@/components/forms/CheckoutPaymentCard";
// import Loader from "@/components/ui/Loader";
// import Divider from "@/components/ui/Divider";
// import PlansFormFields from "@/components/forms/PlansFormStep";
// import TotalElement from "@/components/forms/TotalElement";
// import DiscountCodeInput from "@/components/forms/DicountCodeInput";
// import GiftFields from "@/components/forms/GiftFields";
// import BillingInfoFields from "@/components/forms/BillingInfoFields";
// import ReceiveText from "@/components/forms/ReceiveText";
// // Lib
// import { formSchema } from "@/lib/schemas/checkoutFormSchema";
// import { useTax } from "@/lib/services/stripe/handleTax";
// import {
//   CREATE_SUBSCRIPTION,
//   UPDATE_SUBSCRIPTION_IN_USERDATA,
// } from "@/graphql/mutations";
// import { UserSession } from "@/interfaces";
// // Services
// import { createSubscription } from "@/lib/services/stripe/handleSubscription";
// import { createCustomer } from "@/lib/services/stripe/handleCustomer";
// import { isTokenExpired } from "@/features/login/isTokenValid";

// // Types
// import Stripe from "stripe";
// import { handleError } from "@/utils/stripeErrorHandling";
// import Link from "next/link";
// import { createPaymentIntent } from "@/lib/services/stripe/handlePaymentIntent";
// import { PurchaseType } from "@/lib/schemas/paymentIntentSchema";
// import { formatDate } from "@/utils/formatDate";
// import { refreshAuthToken } from "@/features/login/refreshToken";

// interface IProps extends HTMLAttributes<HTMLDivElement> {
//   pData: Stripe.Product[];
//   cusCardData?: Stripe.ApiList<Stripe.PaymentMethod>["data"];
//   customerData: Stripe.Customer | null;
//   couponData?: Stripe.Coupon;
//   user: UserSession;
//   planId?: string;
// }

// interface IStripeMetadata {
//   "wp-id": string;
//   type: "single" | "bulk";
// }

// const CheckoutSubForm: FC<IProps> = ({
//   className,
//   pData,
//   cusCardData,
//   customerData,
//   couponData,
//   planId,
//   user,
//   ...props
// }) => {
//   // Mutation
//   const [createWpSubscription] = useMutation(CREATE_SUBSCRIPTION);
//   const [addSubscriptionToTheMetadata] = useMutation(
//     UPDATE_SUBSCRIPTION_IN_USERDATA
//   );

//   const [isLoading, setIsLoading] = useState(false);
//   const [discount, setDiscount] = useState<{
//     type: "amount" | "percent";
//     value: number;
//     couponData?: Stripe.Coupon;
//   }>({
//     type: "percent",
//     value: couponData?.percent_off ?? 0,
//     couponData: couponData,
//   });

//   // Stripe
//   const elements = useElements();
//   const stripe = useStripe();

//   // Userouter
//   const { push } = useRouter();

//   // 1. Define your form.
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//     defaultValues: {
//       "activate-immediately": true,
//       forAnotherUser: false,
//       subscriptionId: couponData?.applies_to?.products[0] || planId,
//       saveCard: false,
//       existingCardId: cusCardData?.[0]?.id ?? undefined,
//       textNotificationPreference: false,
//       newCardInfo: cusCardData && cusCardData.length > 0 ? false : true,
//       couponCode: couponData?.id ?? "",
//       isGiftedBySomeone: couponData?.metadata?.type === "gift" ? true : false,
//     },
//   });

//   // SelectedSubg
//   const selectedSub = pData.find(
//     (item) => item.id === form.getValues("subscriptionId")
//   );

//   // Fetching Tax Data

//   const {
//     isError,
//     isLoading: isTaxLoading,
//     taxData,
//     refetch,
//   } = useTax(
//     selectedSub
//       ? [
//         {
//           amount:
//             (selectedSub.default_price as Stripe.Price).unit_amount ?? 0,
//           product: selectedSub.id,
//         },
//       ]
//       : [],
//     customerData?.id,
//     form.getValues("isGiftedBySomeone")
//   );

//   // mutate(form.getValues("subscriptionId"));
//   // Mutate the data to get the tax data

//   // Error Validation for tax calculation
//   if (isError) {
//     handleError(isError);
//   }
//   // 2. Define a submit handler.
//   async function onSubmit(values: z.infer<typeof formSchema>) {
//     setIsLoading(true);
//     // Refresh Token
//     try {
//       // Refresh Token
//       user = await handleTokenRefresh(user);

//       // Check if stripe and element instance is not null
//       if (stripe && elements) {
//         // Validate card items
//         await validateCardItems({
//           elements,
//           setIsLoading,
//         });

//         // Selected Product Data
//         const productData = pData.find((item) => item.id === values.subscriptionId)!;

//         // Selected Card billing info
//         const selectedCard = cusCardData?.find(
//           (item) => item.id === values.existingCardId
//         )?.billing_details;

//         // Check if user is purchasing for another user or it's a gift
//         if (shouldCreatePaymentIntent(values, discount, form)) {
//           await handlePaymentIntentCreation({
//             customerId: user.stripe.cus_id,
//             discount,
//             elements,
//             form: form,
//             selectedCard,
//             stripe,
//             subTotal: subTotal || 0,
//             taxData,
//             values,
//           });
//         } else {
//           await handleSubscriptionCreation({
//             values,
//             customerId: customerData?.id!,
//             addSubscriptionToTheMetadata: addSubscriptionToTheMetadata as any,
//             createWpSubscription: createWpSubscription as any,
//             form,
//             productData,
//             user
//           });
//         }
//       }
//     } catch (error) {
//       handleError(error);
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   const productMap = new Map<"single" | "bulk", Stripe.Product[]>();
//   productMap.set("single", []);
//   productMap.set("bulk", []);

//   pData?.forEach((product) => {
//     const metadata = product.metadata as Stripe.Metadata & IStripeMetadata;
//     if (metadata.type === "single") {
//       productMap.get("single")?.push(product);
//     } else if (metadata.type === "bulk") {
//       productMap.get("bulk")?.push(product);
//     }
//   });

//   // Current amount of subscription
//   const selectedPlan = pData.find(
//     (item) => item.id === form.watch("subscriptionId")
//   );
//   const subTotal = (selectedPlan?.default_price as Stripe.Price)?.unit_amount;

//   return (
//     <div className={cn("w-full", className)} {...props}>
//       {/* Form */}
//       <Form {...form}>
//         <form
//           onSubmit={form.handleSubmit(onSubmit)}
//           className="w-full max-w-md px-5 py-6 space-y-3 bg-white border rounded-xl shadow"
//         >
//           {/* Plans */}
//           <PlansFormFields
//             setDiscount={setDiscount}
//             form={form}
//             productMap={
//               // If subscription is gifted then only show single subscription
//               form.getValues("isGiftedBySomeone")
//                 ? productMap
//                   .get("single")
//                   ?.filter(
//                     (item) => item.id === form.getValues("subscriptionId")
//                   )!
//                 : productMap.get("single")!
//             }
//             refetch={refetch}
//           />

//           <Divider className="!my-9" />
//           <div>
//             {/* Total */}
//             <TotalElement
//               orderSummary={subTotal ? subTotal / 100 : 0}
//               discountApplied={discount}
//               taxLoading={isTaxLoading}
//               key={
//                 taxData?.tax_amount_exclusive ?? taxData?.tax_amount_inclusive
//               }
//               tax={
//                 taxData?.tax_amount_exclusive ??
//                 taxData?.tax_amount_inclusive ??
//                 0
//               }
//             />
//           </div>

//           {/* only display if not gifted by someone */}
//           {!form.getValues("isGiftedBySomeone") && (
//             <>
//               {/* Discount */}
//               <DiscountCodeInput
//                 productId={form.watch("subscriptionId")}
//                 key={form.watch("subscriptionId")}
//                 className="!mt-6"
//                 setDiscount={setDiscount}
//                 form={form}
//               />
//               {/* Gift */}
//               {/* <GiftFields form={form} className="!mt-7" /> */}

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
//               disabled={isLoading || isTaxLoading}
//               size={"lg"}
//               variant={"secondary"}
//               type="submit"
//             >
//               {isTaxLoading || (isLoading && <Loader />)}
//               {form.getValues("isGiftedBySomeone")
//                 ? "Claim Your Gift"
//                 : "Purchase"}
//             </Button>
//           </div>
//         </form>
//       </Form>
//     </div>
//   );
// };

// export default CheckoutSubForm;

// // Handle Token Refresh
// async function handleTokenRefresh(user: UserSession) {
//   const isExpired = await isTokenExpired(user?.authToken!);
//   if (isExpired) {
//     return {
//       ...user,
//       authToken: await refreshAuthToken(user.refreshToken!)
//     }
//   } else {
//     return user
//   }
// }

// // Validate Card Items
// async function validateCardItems({
//   elements,
//   setIsLoading
// }: {
//   elements: StripeElements,
//   setIsLoading: Dispatch<SetStateAction<boolean>>,
// }) {
//   const err = await elements.submit();
//   if (err.error) {
//     setIsLoading(false);
//     throw err.error;
//   }
// }

// type Discount = {
//   type: "amount" | "percent";
//   value: number;
//   couponData?: Stripe.Coupon;
// }
// // Check if Payment Intent should be created
// function shouldCreatePaymentIntent(values: z.infer<typeof formSchema>, discount: Discount, form: UseFormReturn<z.infer<typeof formSchema>>) {
//   return values.forAnotherUser ||
//     (discount?.couponData?.metadata?.type != "gift" && form.getValues("isGiftedBySomeone"));
// }

// // Handle Payment Intent Creation
// async function handlePaymentIntentCreation(
//   {
//     customerId,
//     subTotal,
//     taxData,
//     values,
//     discount,
//     form,
//     stripe,
//     elements,
//     selectedCard
//   }: {
//     values: z.infer<typeof formSchema>,
//     subTotal: number,
//     taxData: Stripe.Tax.Calculation,
//     customerId: string,
//     discount: Discount,
//     form: UseFormReturn<z.infer<typeof formSchema>>
//     stripe: S,
//     elements: StripeElements,
//     selectedCard: Stripe.PaymentMethod.BillingDetails | undefined
//   }
// ) {
//   try {
//     const paymentIntentReq = await createPaymentIntent({
//       amount: (subTotal! * 1) +
//         taxData.tax_amount_exclusive +
//         taxData.tax_amount_inclusive,
//       customerId: customerId,
//       values,
//       productId: form.getValues("subscriptionId"),
//       counponData: discount,
//       purchaseType: PurchaseType["subscription"],
//       quantity: Number(1),
//       PaymentMethod: values.existingCardId,
//       customerEmail: ""
//     });

//     // Assuming paymentIntentReq contains client_secret for confirming the payment
//     const paymentConfirmation = await stripe.confirmPayment({
//       clientSecret: paymentIntentReq?.client_secret!,
//       elements: !values.existingCardId ? elements : undefined,
//       confirmParams: {
//         save_payment_method: true,
//         // setup_future_usage: "on_session",
//         payment_method_data: {
//           billing_details: {
//             address: {
//               country: selectedCard?.address?.country || values.country,
//               city: selectedCard?.address?.city || values.city,
//               line1: selectedCard?.address?.line1 || values.address1,
//               line2: selectedCard?.address?.line2 || values.address2,
//               state: selectedCard?.address?.state || values.state,
//               postal_code:
//                 selectedCard?.address?.postal_code || values.zipcode,
//             },
//             phone: selectedCard?.phone || values.phoneNumber,
//           },
//         },
//         return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/complete`,
//       },
//     });

//     if (paymentConfirmation.error) {
//       throw paymentConfirmation.error;
//     }

//     // Handle successful payment confirmation, e.g., update UI, navigate user, etc.
//   } catch (error) {
//     handleError(error); // Ensure error is handled or logged appropriately
//   }

//   // Handle payment confirmation here...
// }

// async function handleSubscriptionCreation(
//   { customerId,
//     productData,
//     user,
//     values,
//     form,
//     createWpSubscription,
//     addSubscriptionToTheMetadata
//   }: {
//     values: z.infer<typeof formSchema>,
//     customerId: string,
//     productData: Stripe.Product,
//     user: UserSession,
//     form: UseFormReturn<z.infer<typeof formSchema>>,
//     createWpSubscription: (opt: MutationFunctionOptions) => Promise<{ data: any }>
//     addSubscriptionToTheMetadata: (opt: MutationFunctionOptions) => Promise<{ data: any, errors: Error[] }>

//   }
// ) {
//   try {
//     const subscription = await createSubscription(customerId, productData, values, user);

//     // Create Subscription on WP
//     const wpSubscription = await createWpSubscription({
//       variables: {
//         input: {
//           title: `Subscription for ${user?.userData?.email}`,
//           subscriptionMetadata: {
//             subscriptionExpiresOn: values.isGiftedBySomeone ? new Date(subscription.current_period_end * 1000) : "",
//             subscriptionRenewsOn: new Date(subscription.current_period_end * 1000),
//             subscriptionStartsOn: new Date(subscription.current_period_start * 1000),
//             userID: String(user?.userData?.databaseId),
//             subscriptionType: subscription.metadata["wp-id"],
//             personalizedMessage: values.message,
//             tiGiftRecipientEmail: form.getValues("isGiftedBySomeone")
//               ? user.userData?.email
//               : "",
//           },
//         },
//       },
//     });

//     // Add Subscription to User Metadata
//     const { errors } = await addSubscriptionToTheMetadata({
//       errorPolicy: "all",
//       variables: {
//         input: {
//           id: user.userDataId,
//           userDataMetadata: {
//             latestSubscription: wpSubscription.data?.createSubscription?.subscription?.databaseId,
//             purchasedSubscriptions: [wpSubscription.data?.createSubscription?.subscription?.databaseId]
//           },
//         },
//       },
//     });

//     if (errors && errors.length > 0) {
//       throw new Error(errors[0].message);
//     }

//     // Handle successful subscription creation, e.g., update UI, navigate user, etc.
//   } catch (error) {
//     handleError(error); // Ensure error is handled or logged appropriately
//   }
// }
