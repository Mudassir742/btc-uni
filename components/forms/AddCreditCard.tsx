"use client";

import { FC, HTMLAttributes, useState, useTransition } from "react";
// Utils
import { cn } from "@/utils/shadcn";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { UserSession } from "@/interfaces";
import { Stripe } from "stripe";
// Components
import { Form } from "@/components/ui/Form";
import toast from "react-hot-toast";
import BillingInfoFields from "@/components/forms/BillingInfoFields";
import CheckoutPaymentCard from "./CheckoutPaymentCard";
import { handleError } from "@/utils/stripeErrorHandling";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/Button";
import { updateCustomerAndAttachCard } from "@/features/stripe/actions/addCustomerCard";
import { createUrl } from "@/utils/url";

interface IProps extends HTMLAttributes<HTMLDivElement> {
	user: UserSession;
	cardData?: Stripe.PaymentMethod[];
	showDefault?: boolean;
}

const formSchema = z.object({
	address1: z.string().refine((val) => val.length > 0, {
		message: "Billing Address is required",
	}),
	address2: z.string().optional(),
	state: z.string(),
	country: z.string().refine((val) => val.length > 0, {
		message: "Country is required",
	}),
	city: z.string().refine((val) => val.length > 0, {
		message: "city is required",
	}),
	zipcode: z.string().refine((val) => val.length > 0, {
		message: "Postal Code is required",
	}),
});

const AddCreditCard: FC<IProps> = ({
	className,
	user,
	showDefault = false,
	cardData,
	...props
}) => {
	const [showCardForm, setShowCardForm] = useState(showDefault);
	const [loading, setLoading] = useState(false);
	const [pending, startTransition] = useTransition();
	const { refresh, replace } = useRouter();
	const searchParams = useSearchParams();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
	});

	// Stripe
	const elements = useElements();
	const stripe = useStripe();

	const onSubmit = async (data: z.infer<typeof formSchema>) => {
		setLoading(true);
		if (stripe && elements) {
			try {
				if (searchParams?.get("noState") !== "true" && !data.state) {
					form.setError("state", {
						type: "required",
						message: "State is required",
					});

					return;
				} else {
					const newSearchParams = new URLSearchParams(searchParams!);

					replace(createUrl(location.pathname, newSearchParams), {
						scroll: false,
					});
				}
				// Validate card items
				const err = await elements.submit();
				if (err.error) {
					setLoading(false);
					return;
				}

				const { error, paymentMethod } = await stripe.createPaymentMethod({
					elements: elements,

					params: {
						billing_details: {
							email: user.userData?.email,
							address: {
								line1: data.address1,
								line2: data.address2,
								city: data.city,
								state: data.state!,
								country: data.country,
								postal_code: data.zipcode,
							},
						},
					},
				});
				if (error || !paymentMethod) {
					handleError(error);
				}
				startTransition(async () => {
					await updateCustomerAndAttachCard(
						user.stripe.cus_id,
						paymentMethod?.id!
					)
						.then(() => {
							toast.success("Card added successfully");
							refresh();
							setShowCardForm(false);
							typeof window !== undefined && window.scroll(0, 0);
						})
						.catch((err) => {
							toast.error(
								err?.message.startsWith("An error occurred in")
									? "Unable to add this card"
									: err?.message
							);
						});
				});
			} catch (error) {
				// Handle error here
			} finally {
				setLoading(false);
			}
		}
	};

	return (
		<div className={className} {...props}>
			{!showDefault && (
				<button
					onClick={() => setShowCardForm(!showCardForm)}
					className={cn([
						" text-gray-500 duration-300 disabled:hover:text-gray-500 hover:text-blackV1 disabled:cursor-not-allowed  font-medium",
						{
							"text-red-500 hover:text-red-700": showCardForm,
							"mt-3": cardData?.length,
						},
					])}
				>
					{showCardForm ? "- Cancel" : "+ Add payment method"}
				</button>
			)}
			{showCardForm && (
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} id="add-credit-card">
						<CheckoutPaymentCard form={form} className="rounded-xl" />
						<BillingInfoFields
							className="!mt-6"
							label="Billing information"
							fieldNames={{
								address1: "address1",
								address2: "address2",
								city: "city",
								state: "state",
								zipCode: "zipcode",
								phone: "phone",
								country: "country",
							}}
							form={form}
						/>
						<Button
							disabled={loading || pending}
							isLoading={loading || pending}
							className="mt-7"
							type="submit"
						>
							Add Card
						</Button>
					</form>
				</Form>
			)}
		</div>
	);
};

export default AddCreditCard;
