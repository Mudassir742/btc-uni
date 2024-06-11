"use client";
import { FC, HTMLAttributes, Key, useState } from "react";
// Utils
import { cn } from "@/utils/shadcn";
// Components
import { PaymentElement } from "@stripe/react-stripe-js";
import Collapsible from "@/components/ui/Collapsible";
import { Minus, Plus } from "lucide-react";
// Types
import { Form, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import Stripe from "stripe";
import PaymentMethod from "@/components/forms/PaymentMethods";
import { FormItem } from "@/components/ui/Form";

interface IProps extends HTMLAttributes<HTMLDivElement> {
	initialShow?: boolean;
	form: UseFormReturn<any>;
	cusCardData?: Stripe.PaymentMethod[];
}

const CheckoutPaymentCard: FC<IProps> = ({
	className,
	initialShow = true,
	form,
	cusCardData,
	children,
}) => {
	const [show, setShow] = useState(initialShow);

	const uniqueCards = cusCardData?.filter((card, index, self) => {
		return index === self.findIndex((c) => c.card?.last4 === card.card?.last4);
	});

	const hasCustomerCard = cusCardData && cusCardData?.length > 0;

	return (
		<div className={cn("", className)}>
			{/* Payment Method */}
			{uniqueCards && uniqueCards?.length > 0 && (
				<PaymentMethod
					key={form.watch("existingCardId")}
					className="!mt-6"
					cusData={uniqueCards}
					form={form}
					disabled={show}
				/>
			)}
			<FormItem>
				<div className="mt-6">
					<Collapsible
						onClick={() => {
							if (!hasCustomerCard) {
								form.setValue("newCardInfo", true);
							} else {
								form.setValue("newCardInfo", !show);
								// Check or uncheck existing card
								if (show) {
									form.setValue("existingCardId", cusCardData?.[0]?.id);
								} else {
									form.setValue("existingCardId", "");
								}
								setShow((prev) => !prev);
							}
						}}
						setShow={setShow}
					>
						{hasCustomerCard ? "New Card" : "Card Details"}
						{hasCustomerCard &&
							(show ? (
								<Minus
									className={cn(["w-5 h-5"], { "transform rotate-180": show })}
								/>
							) : (
								<Plus
									className={cn(["w-5 h-5"], { "transform rotate-180": show })}
								/>
							))}
					</Collapsible>
					{show && (
						<>
							<PaymentElement
								className="mt-6 "
								options={{
									// wallets: {
									// 	googlePay: "auto",
									// 	applePay: "auto"
									// },
									fields: {
										billingDetails: {
											address: {
												country: "never",
												// postalCode: "auto"
											},
										},
									},
								}}
							/>
						</>
					)}
				</div>
			</FormItem>
		</div>
	);
};

export default CheckoutPaymentCard;
