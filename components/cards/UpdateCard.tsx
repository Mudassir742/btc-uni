import React, { FC } from "react";
// Utils
import { handleError } from "@/utils/stripeErrorHandling";
import { stripe } from "@/lib/stripe-server";
import { UserSession } from "@/interfaces";
// Components

import { Button } from "@/components/ui/Button";
import UpdateCreditCard from "../forms/UpdateCreditCard";
import StripeWrapper from "../forms/StripeWrapper";
import { cn } from "@/utils/shadcn";
import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  user: UserSession;
  searchParams: { [key: string]: string | string[] | undefined }
}

const UpdateCard: FC<IProps> = async (
  { user, className, searchParams },
) => {
  const cardsData = await getCustomerCards(user.stripe.cus_id);
//   const updateDataDetails = {
//     ""
//   }

  if (!cardsData) {
    return <h2>No Saved Card</h2>;
  }

  const searchVal = searchParams?.q;
  return (
    <>
      {searchVal === "update-payment-method" && (
        <div className={cn("pt-2 ", className)}>
          <div className="flex flex-col justify-center w-full">
            {/* <div className="flex flex-row justify-between">
            <BackWithOnClick  />
          </div> */}
            <div className="flex flex-col gap-y-5 p-4 rounded-lg bg-themecolor-50">
              {cardsData?.map((card) => {
                return (
                  <div key={card.id} className="w-full ">
                    <div className="w-full flex items-center !justify-between gap-x-3 text-16">
                      <div className="flex items-center gap-x-3">
                        <img
                          width={50}
                          height={30}
                          src={`${
                            card.card?.brand == "visa"
                              ? "/images/cards/visa.png"
                              : "/images/cards/master-card.png"
                          }`}
                          alt="credit card"
                        />
                        <h3 className="capitalize">{card.card?.brand}</h3>
                        <p>{card.card?.last4}</p>
                      </div>
                      <div className="flex items-center gap-x-10">
                        <p>
                          {card.card?.exp_month}/{card.card?.exp_year}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className={cn([], {
                "-mt-4": !cardsData || !cardsData?.length,
                "p-2": cardsData?.length,
              })}
            >
              <StripeWrapper className="w-full">
              <UpdateCreditCard cardData={cardsData} user={user} />
            </StripeWrapper>
            </div>
            {/* <Button>Billing History</Button> */}
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateCard;

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
