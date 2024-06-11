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
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import ChangeDefaultCardButton from "./ChangeDefaultCard";
import DeleteCard from "./DeleteCard";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";

export interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  user: UserSession;
  newDefaultCardId?: string;
}

const isCardDefault = async (
  customerId: string,
  paymentMethodId: string
): Promise<boolean> => {
  try {
    const defaultCardId = await getDefaultCard(customerId);

    return defaultCardId === paymentMethodId;
  } catch (error) {
    console.error("Error checking if card is default:", error);
    throw error;
  }
};

const CreditCardDetails: FC<IProps> = async ({ user, className }) => {
  const cardsData = await getCustomerCards(user.stripe.cus_id);

  if (!cardsData) {
    return <h2>No Saved Card</h2>;
  }

  return (
    <>
      <div className={cn("pt-2 ", className)}>
        <div className="flex flex-col justify-center w-full">
          {/* <div className="flex flex-row justify-between">
            <BackWithOnClick  />
          </div> */}
          <div className="flex flex-col gap-y-5">
            {cardsData?.map(async (card) => {
              return (
                <div
                  key={card.id}
                  className="w-full p-4 rounded-lg bg-themecolor-50"
                >
                  <div className="w-full flex items-center !justify-between gap-x-6 gap-y-3 flex-wrap text-16">
                    <div className="flex items-center gap-x-3 flex-wrap">
                      <img
                        width={50}
                        height={30}
                        // src={`${
                        //   card.card?.brand == "visa"
                        //     ? "/images/cards/visa.png"
                        //     : "/images/cards/master-card.png"
                        // }`}
                        src={`/images/cards/${card.card?.brand}.png`}
                        alt="credit card"
                      />
                      <h3 className="capitalize">{card.card?.brand}</h3>
                      <p className="whitespace-pre"> •••• •••• {card.card?.last4}</p>
                    </div>
                    <div className="flex items-center gap-x-3 lg:gap-x-10">
                      <p>
                        {card.card?.exp_month}/{card.card?.exp_year}
                      </p>
                      <div className="flex items-center gap-x-2">
                        {/* <Link
                          href={`?${new URLSearchParams({
                            q: "update-payment-method",
                          })}`}
                        >
                          <Pencil size={20} />
                        </Link> */}
                        {/* <span className="text-24 font-thin">|</span> */}
                        <div
                          // href={`?${new URLSearchParams({
                          //   q: "payment",
                          // })}`}
                          // scroll={false}
                          className={`${(await isCardDefault(
                            user.stripe.cus_id,
                            card.id
                          )) && "hidden"
                            }`}
                        >
                          <DeleteCard
                            // user={user}
                            customerId={user.stripe.cus_id}
                            cardId={card.id}
                          />
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="icon" variant="outline" className="h-8 w-8 border-none">
                              <MoreVertical className="h-3.5 w-3.5" />
                              <span className="sr-only">More</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>

                              {(await isCardDefault(
                                user.stripe.cus_id,
                                card.id
                              )) ? (
                                <p className="opacity-70 cursor-not-allowed w-full">
                                  Default
                                </p>
                              ) : (
                                <ChangeDefaultCardButton
                                  user={user}
                                  newDefaultCardId={card.id}
                                />
                              )}
                            </DropdownMenuItem>

                          </DropdownMenuContent>
                        </DropdownMenu>

                      </div>
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
              <AddCreditCard cardData={cardsData} user={user} />
            </StripeWrapper>
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

const getDefaultCard = async (customerId: string): Promise<string | null> => {
  try {
    const customer = await stripe.customers.retrieve(customerId);

    if (customer.deleted) {
      // Handle the case where the customer has been deleted
      console.log("Customer has been deleted");
      return null;
    }

    // Check if customer has invoice_settings and default_payment_method
    if (
      customer.invoice_settings &&
      customer.invoice_settings.default_payment_method
    ) {
      return customer.invoice_settings.default_payment_method as string;
    }

    return null;
  } catch (error) {
    console.error("Error retrieving default card:", error);
    throw error;
  }
};


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
