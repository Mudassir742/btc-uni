import React, { FC } from "react";
// Utils
import { handleError } from "@/utils/stripeErrorHandling";
import { stripe } from "@/lib/stripe-server";
import { UserSession } from "@/interfaces";
// Components

import { Button } from "@/components/ui/Button";
import AddCreditCard from "../forms/AddCreditCard";
import StripeWrapper from "../forms/StripeWrapper";
import { cn } from "@/utils/shadcn";
import CardSelection from "./CardSelection";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  user: UserSession;
}

const CreditCardDetails: FC<IProps> = async ({ user, className }) => {
  const cardsData = await getCustomerCards(user.stripe.cus_id);

  if (!cardsData) {
    return <h2>No Saved Card</h2>;
  }

  return (
    <>
      <div className={cn("pt-2 bg-white", className)}>
        <div className="flex flex-col justify-center w-full bg-white">
          <h2 className="mb-5 font-bold text-24">Select your card</h2>

          {/* <div className="flex flex-row justify-between">
            <BackWithOnClick />
          </div> */}
          <div className="flex flex-col gap-y-5">
            {cardsData?.map((card) => {
              return <CardSelection key={card.id} card={card} />;
            })}
          </div>

          <div
            className={cn([], {
              "-mt-4": !cardsData || !cardsData?.length,
              "p-2": cardsData?.length,
            })}
          >
            {!cardsData ||
              (!cardsData?.length && (
                <StripeWrapper className="w-full">
                  <AddCreditCard showDefault cardData={cardsData} user={user} />
                </StripeWrapper>
              ))}
          </div>
          {/* <Button>Billing History</Button> */}
        </div>
      </div>
    </>
  );
};

export default CreditCardDetails;

async function getCustomerCards(customerId: string) {
  try {
    // List all payment methods for the customer
    const paymentMethods = await stripe.paymentMethods.list({
      customer: customerId,
      type: "card",
      //   expand: ["data.customer"],
    });

    return paymentMethods.data;
  } catch (error) {
    handleError(error);
  }
}

export const BillingHeader: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <>
      <h2 className="font-semibold text-24">{children}</h2>
      <div className="w-full h-0.5 bg-gray-200 my-4" />
    </>
  );
};
