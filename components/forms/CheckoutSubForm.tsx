"use client";
import { FC, HTMLAttributes, useState, useTransition } from "react";
// Utils
import { cn } from "@/utils/shadcn";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import { useMutation } from "@apollo/client";
import { refreshAuthToken } from "@/features/login/refreshToken";
import { createUrl } from "@/utils/url";
// Components
import { Button } from "@/components/ui/Button";
import { Form } from "@/components/ui/Form";
import CheckoutPaymentCard from "@/components/forms/CheckoutPaymentCard";
import Loader from "@/components/ui/Loader";
import Divider from "@/components/ui/Divider";
import TotalElement from "@/components/forms/TotalElement";
import DiscountCodeInput from "@/components/forms/DicountCodeInput";
import BillingInfoFields from "@/components/forms/BillingInfoFields";
import ReceiveText from "@/components/forms/ReceiveText";
import { Skeleton } from "@/components/ui/Skeleton";
// Lib
import { formSchema } from "@/lib/schemas/checkoutFormSchema";
import { useTax } from "@/lib/services/stripe/handleTax";
import {
	CREATE_SUBSCRIPTION,
	UPDATE_SUBSCRIPTION_IN_USERDATA,
} from "@/graphql/mutations";
import { UserSession } from "@/interfaces";
import {
	Discount,
	calculateBulkSubscriptionDiscountedPrice,
	calculateOrderTotal,
} from "@/utils/price";
// Services
import { createSubscription } from "@/lib/services/stripe/handleSubscription";
import { createCustomer } from "@/lib/services/stripe/handleCustomer";
import { isTokenExpired } from "@/features/login/isTokenValid";

// Types
import Stripe from "stripe";
import { handleError } from "@/utils/stripeErrorHandling";
import { createPaymentIntent } from "@/lib/services/stripe/handlePaymentIntent";
import { PurchaseType } from "@/lib/schemas/paymentIntentSchema";
import { annualSub, monthlySub } from "@/lib/constants";
import ButtonText from "../text/ButtonText";

interface IProps extends HTMLAttributes<HTMLDivElement> {
	pData: Stripe.Product;
	cusCardData?: Stripe.ApiList<Stripe.PaymentMethod>["data"];
	customerData: Stripe.Customer | null;
	couponData?: Stripe.Coupon;
	user: UserSession;
	planId?: string;
}

interface IStripeMetadata {
	"wp-id": string;
	type: "single" | "bulk";
}

const CheckoutSubForm: FC<IProps> = ({
	className,
	pData,
	cusCardData,
	customerData,
	couponData,
	planId,
	user,
	...props
}) => {
	// Mutation
	const [createWpSubscription] = useMutation(CREATE_SUBSCRIPTION);
	const [addSubscriptionToTheMetadata] = useMutation(
		UPDATE_SUBSCRIPTION_IN_USERDATA
	);
	const [pending, startTransition] = useTransition();
	const [isLoading, setIsLoading] = useState(false);
	const [discount, setDiscount] = useState<Discount>({
		type: couponData?.percent_off ? "percent" : "amount",
		value: couponData?.percent_off ?? couponData?.amount_off ?? 0,
		couponData: couponData,
	});
	const searchParams = useSearchParams();
	let newSearchParams = new URLSearchParams(searchParams!);

	const isGiftedBySomeone =
		discount.couponData?.metadata?.type === "gift" ? true : false;

	// Subscription Quantity
	const quantity = searchParams?.get("qty");
	const isBulk = !!quantity && Number(quantity) >= 1 && Number(quantity) <= 20;

	// Stripe
	const elements = useElements();
	const stripe = useStripe();

	// Userouter
	const { push, replace } = useRouter();

	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			"activate-immediately": true,
			forAnotherUser: isBulk,
			subscriptionId: couponData?.applies_to?.products[0] || planId,
			saveCard: false,
			existingCardId: cusCardData?.[0]?.id ?? undefined,
			textNotificationPreference: false,
			newCardInfo: cusCardData && cusCardData.length > 0 ? false : true,
			couponCode: couponData?.id ?? "",
			isGiftedBySomeone: isGiftedBySomeone,
		},
	});

	let amount = pData.default_price as Stripe.Price;

	// Amounts Casses
	const subTotal = (pData?.default_price as Stripe.Price)?.unit_amount;

	const totalWithoutTax = calculateOrderTotal({
		orderSummary: amount.unit_amount!,
		discountApplied: discount,
		// tax: 0,
		qty: isBulk ? Number(quantity) ?? 1 : 1,
		isGift: isBulk ?? false,
	});
	const bulkDiscountedAmount =
		((amount?.unit_amount &&
			(amount.unit_amount / 100) * Number(quantity)) as number) -
		totalWithoutTax;

	const total = calculateOrderTotal({
		orderSummary: amount.unit_amount!,
		discountApplied: discount,
		// tax: taxData ? taxData?.tax_amount_exclusive + taxData?.tax_amount_inclusive : 0,
		qty: isBulk ? Number(quantity) ?? 1 : 1,
		isGift: isBulk ?? false,
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		newSearchParams?.set("stripeSubscriptionId", pData.id);
		newSearchParams?.set(
			"subscriptionFinalValue",
			calculateOrderTotal({
				orderSummary: amount.unit_amount!,
				discountApplied: discount,
				qty: isBulk ? Number(quantity) ?? 1 : 1,
				isGift: isBulk ?? false,
			}).toFixed(2)
		);

		if (
			searchParams?.get("noState") !== "true" &&
			!values.state &&
			!isGiftedBySomeone &&
			!values.existingCardId &&
			!values.useExistingAddress
		) {
			form.setError("state", {
				type: "required",
				message: "State is required",
			});

			return;
		} else {
			form.setValue("state", "N/A");
		}

		setIsLoading(true);
		// Refresh Token
		const isExpired = await isTokenExpired(user?.authToken!);
		if (isExpired) {
			user = {
				...user,
				authToken: await refreshAuthToken(user.refreshToken!),
			};
		}
		try {
			// Check if stripe and element instance is not null
			if (stripe && elements) {
				// Validate card items
				const err = await elements.submit();
				if (err.error) {
					setIsLoading(false);
					return;
				}

				// Create Customer
				const customer = customerData?.id!;

				// Selected Card billing info
				const selectedCard = cusCardData?.find(
					(item) => item.id === values.existingCardId
				)?.billing_details;

				// Payment Intent Instance
				let paymentIntent: Stripe.PaymentIntent | undefined;

				// if we are using existing address
				if (values.useExistingAddress) {
					values.address1 = customerData?.address?.line1!;
					values.address2 = customerData?.address?.line2!;
					values.city = customerData?.address?.city!;
					values.state = customerData?.address?.state!;
					values.zipcode = customerData?.address?.postal_code!;
					values.country = customerData?.address?.country!;
					values.phoneNumber = customerData?.phone!;
				}

				// //////////////////////////////////
				// Bulk Subscription
				// //////////////////////////////////
				if (
					(isBulk && values.forAnotherUser) ||
					(discount?.couponData?.metadata?.type != "gift" && isGiftedBySomeone)
				) {
					// 2. Create Payment Method
					const paymentIntentReq = await createPaymentIntent({
						amount: total * 100, // Multiply by 100 to convert to cents
						customerName: customerData?.name!,
						customerId: customer,
						customerEmail: customerData?.email!,
						values,
						productId: form.getValues("subscriptionId"),
						counponData: discount,
						purchaseType: PurchaseType["subscription"],
						quantity: Number(quantity),
						PaymentMethod: values.existingCardId,
					});
					// Creatign Search Params
					newSearchParams.set("type", "bulk-subscription");

					// mihai may 30 to pass this information to assad for bulk-subscription, alongside amount (which is total amount), and type
					// event will still be purchase !!!
					// to do: run by Hamzah
					newSearchParams.set("qty", quantity!.toString());


					// newSearchParams.delete("source")
					// Set up payment intent
					paymentIntent = paymentIntentReq;
				}
				// //////////////////////////////////
				// Single Subscription
				// //////////////////////////////////
				else {
					// 2. Create Subscription and pass customer to it
					const subscription = await createSubscription(
						customer,
						pData,
						values,
						user,
						isGiftedBySomeone
					);

					// Setting Search Params
					newSearchParams.set("type", "single-subscription");

					// newSearchParams.delete("source")
					// Set up payment intent
					paymentIntent = subscription.paymentIntent;
					// Create Subscription on wp
					// await createWpSubscription({
					//   variables: {
					//     input: {
					//       title: `Subscription for ${user?.userData?.email}`,
					//       subscriptionMetadata: {
					//         subscriptionExpiresOn: isGiftedBySomeone ? new Date(subscription.current_period_end * 1000) : "",
					//         subscriptionRenewsOn: new Date(subscription.current_period_end * 1000),
					//         subscriptionStartsOn: new Date(subscription.current_period_start * 1000),
					//         userID: String(user?.userData?.databaseId),
					//         subscriptionType: subscription.metadata["wp-id"],
					//         stripeSubscriptionID: subscription.id,
					//         personalizedMessage: values.message,
					//         tiGiftRecipientEmail: isGiftedBySomeone
					//           ? user.userData?.email
					//           : "",
					//       },
					//     },
					//   },
					// })
					// .then(async (res) => {
					//   const { errors } = await addSubscriptionToTheMetadata({
					//     errorPolicy: "all",
					//     variables: {
					//       input: {
					//         id: user.userDataId,
					//         userDataMetadata: {
					//           latestSubscription:
					//             res.data?.createSubscription?.subscription?.databaseId,
					//           purchasedSubscriptions: [res.data?.createSubscription?.subscription?.databaseId]
					//         },
					//       },
					//     },
					//   });

					//   if (errors && errors.length > 0) {
					//     throw new Error(errors[0].message);
					//   }
					// })
					// .catch((err) => {
					//   console.error(err)
					//   throw err;
					// });

					// Redirect the user when the subscription is created and the subscription is a gift.
					if (discount.couponData?.metadata?.type === "gift") {
						newSearchParams.set("type", "single-subscription");
						newSearchParams.delete("source");
						startTransition(() => {
							push(createUrl("/complete", newSearchParams));
						});
					} else if (total <= 0) {
						newSearchParams.set("type", "single-subscription");
						newSearchParams.delete("source");
						startTransition(() => {
							push(createUrl("/complete", newSearchParams));
						});
					}
				}

				if (paymentIntent) {
					// 3. Confirm Payment
					const res = await stripe.confirmPayment({
						clientSecret: paymentIntent?.client_secret!,
						elements: !values.existingCardId ? elements : undefined,
						confirmParams: {
							save_payment_method: true,
							// setup_future_usage: "on_session",
							payment_method_data: {
								billing_details: {
									address: {
										country: selectedCard?.address?.country || values.country,
										city: selectedCard?.address?.city || values.city,
										line1: selectedCard?.address?.line1 || values.address1,
										line2: selectedCard?.address?.line2 || values.address2,
										state: selectedCard?.address?.state || values.state,
										postal_code:
											selectedCard?.address?.postal_code || values.zipcode,
									},
									phone: selectedCard?.phone || values.phoneNumber,
								},
							},
							return_url: `${process.env.NEXT_PUBLIC_SITE_URL}${createUrl(
								"/complete",
								newSearchParams
							)}`,
						},
					});
					if (res.error) {
						handleError(res.error);
					}
				}
			}
		} catch (error) {
			handleError(error);
		} finally {
			setIsLoading(false);
		}
	}

	const productMap = new Map<"single" | "bulk", Stripe.Product[]>();
	productMap.set("single", []);
	productMap.set("bulk", []);

	return (
		<div className={cn("w-full", className)} {...props}>
			{/* Form */}
			<Form {...form}>
				<form
					id="checkout-sub-form"
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-full space-y-3 bg-white "
				>
					{/* Summary */}
					<div className="flex justify-between text-themeColor gap-x-4">
						<div>
							<h2 className=" capitalize text-30 font-bold text-themecolor-500">
								{isBulk
									? "Bulk Subscription"
									: pData.id === annualSub
									? "Annual Subscription"
									: pData.id === monthlySub
									? "Monthly Subscription"
									: "6 Months Subscription"}
							</h2>
							<h3 className="font-normal text-themeColor text-16">
								{isBulk || isGiftedBySomeone
									? "Does not auto-renew"
									: "Auto renewal"}
							</h3>
						</div>
						<h3>
							$
							{isBulk
								? `${(amount.unit_amount! / 100).toFixed(2)} x 
                ${quantity}`
								: `${(amount.unit_amount! / 100).toFixed(2)}`}
						</h3>
					</div>

					{/* Discount */}
					{!isBulk && (
						<DiscountCodeInput
							user={user}
							productId={form.watch("subscriptionId")}
							key={form.watch("subscriptionId")}
							className="mt-4"
							setDiscount={setDiscount}
							form={form}
						/>
					)}
					<div className="!mt-8 flex flex-col gap-y-2">
						{isBulk && bulkDiscountedAmount > 0 && (
							<div className="flex gap-x-4 justify-between">
								<ButtonText text="Bulk Discount" />

								<span>-${bulkDiscountedAmount.toFixed(2)}</span>
							</div>
						)}
						{!isBulk && discount.couponData?.id && (
							<div className="flex gap-x-4 justify-between">
								<ButtonText text="Discount" />

								<span>
									{discount.type === "percent"
										? // totalWithoutTax
										  `${discount.value}% off`
										: `-$${(discount.value / 100).toFixed(2)}`}
								</span>
							</div>
						)}
						{/* <div className="flex gap-x-4 justify-between">
              <ButtonText text="Tax" />

             
              <span>
                {
                  isTaxLoading ? <Skeleton className="h-7 w-14" /> :
                    <>
                      ${!isGiftedBySomeone && !!taxData ? (taxData?.tax_amount_exclusive + taxData?.tax_amount_inclusive).toFixed(2) : "0.00" ?? 0}
                    </>
                }
              </span>
            </div> */}
						<div className="flex gap-x-4 justify-between">
							<ButtonText text="Total" />

							<span>
								{
									<>
										$
										{calculateOrderTotal({
											orderSummary: amount.unit_amount!,
											discountApplied: discount,
											qty: isBulk ? Number(quantity) ?? 1 : 1,
											isGift: isBulk ?? false,
										}).toFixed(2)}
									</>
								}
							</span>
						</div>
					</div>
					<div className="grey-line" />

					{/* Bulk Subscription Text */}
					{isBulk && (
						<p className="py-4 px-4 !mt-7 text-14 text-themeColor font-semibold rounded-xl bg-offgreen">
							After purchasing, you will receive an email confirmation with
							access codes to distribute to your team.
						</p>
					)}

					{/* only display if not gifted by someone */}
					{!isGiftedBySomeone && (
						<>
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
										useExistingAddress: "useExistingAddress",
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
							id={
								isGiftedBySomeone ? "Claim-Your-Gift-Button" : "Purchase-Button"
							}
							onClick={() => {
								// Pushing data to the dataLayer using type assertion // temporary solution
								(window as any).dataLayer.push({
									event: isGiftedBySomeone
										? "userClickedClaimYourGift"
										: "begin_checkout",

									userDataId: user.userDataId,

									coupon: couponData?.name,

									itemName: "subscription",
									stripeSubscriptionId: pData.id,
									listValue: Number((amount?.unit_amount || 0) / 100),
									discountValue: Number((discount.value / 100).toFixed(2)),
									discountType: discount.type,
									finalValue: Number(
										calculateOrderTotal({
											orderSummary: amount.unit_amount!,
											discountApplied: discount,
											qty: isBulk ? Number(quantity) ?? 1 : 1,
											isGift: isBulk ?? false,
										}).toFixed(2)
									),
									currency: "USD",
								});
							}}
							className="mx-auto text-center"
							isLoading={isLoading || pending}
							size={"lg"}
							disabled={isLoading || pending}
							type="submit"
							// onClick={() => {
							//   alert(`${searchParams?.get("noState")} ${searchParams?.get("noState") === "true"}`)
							//   if (searchParams?.get("noState") === "true") {
							//     alert("clicked")
							//     // startTransition(() => {
							//     form.setValue("state", "N/A")

							//     alert(`${form.watch("state")}`)
							//     // newSearchParams?.delete("noState")
							//     // replace(createUrl(location.pathname, newSearchParams), {
							//     //   scroll: false
							//     // })
							//     // })

							//   }
							// }}
						>
							{isLoading && <Loader />}
							{isGiftedBySomeone ? "Claim Your Gift" : "Purchase"}
						</Button>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default CheckoutSubForm;
