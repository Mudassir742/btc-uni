"use client";
import { FC, HTMLAttributes, useEffect, useLayoutEffect } from 'react'
// Utils
import { cn } from '@/utils/shadcn'
import { PurchaseTypes } from './page'
//  Components
import SH1Text from '@/components/text/SH1Text'
import ParagraphText from '@/components/text/Paragraph'
import Link from 'next/link'
import WelcomeComponent from '@/components/WelcomeComponent'
import { UserSession } from '@/interfaces'
import { getCurrentUserDataPurchasedSubscriptions } from '../helper';
import { useSearchParams } from 'next/navigation';
import WelcomeComponentFree from '@/components/WelcomeComponentFree';

interface IProps extends HTMLAttributes<HTMLDivElement> {
    user: UserSession;
    type: PurchaseTypes;
    customerEmail: string;
    customerName: string;
    userEmail: string;
    userPhone: string;
    userFirstName: string;
    userLastName: string;
    userStreet: string;
}

const SingleSubscription: FC<IProps> = ({ user, customerName, customerEmail, className, type,
    userEmail,
    userPhone,
    userFirstName,
    userLastName,
    userStreet,
     ...props }) => {
    
    const searchParams = useSearchParams();

    const stripeSubscriptionId = searchParams?.get("stripeSubscriptionId");
    const finalValue = searchParams?.get("subscriptionFinalValue");

//     useEffect(() => {
//       console.log('useEffect running without dependencies'); // Debugging
//   }, []);

//     useLayoutEffect(() => {
//       console.log('useLayoutEffect running'); // Debugging
//   }, []);

    useEffect(() => {
    //   console.log("mihai may 15 safari debugging ---- useEffect runs");
    //   console.log("mihai may 15 safari debugging ---- stripeSubscriptionId is: ", stripeSubscriptionId);
    //   console.log("mihai may 15 safari debugging ---- hasSeenFreeWelcome is: ", window.localStorage.getItem("hasSeenFreeWelcome"));

      if (stripeSubscriptionId === null) {
          console.log('StripeSubscriptionId is null'); // Debugging
          if (window.localStorage.getItem("hasSeenFreeWelcome") !== "hasbeenseen") {
              console.log('Pushing free registration to dataLayer'); // Debugging
              (window as any).dataLayer.push({
                  event: "free_registration",
                  itemName: "free_account_signup",
                  userDataId: user?.userDataId,
                //   userEmail: userEmail, // DEPRECATED, sensitive info
                //   userPhone: userPhone, // DEPRECATED, sensitive info
                //   userFirstName: userFirstName, // DEPRECATED, sensitive info
                //   userLastName: userLastName, // DEPRECATED, sensitive info
                  purchaseType: type,
                  finalValue: Number(finalValue),
                  currency: "USD",
              });
              window.localStorage.setItem("hasSeenFreeWelcome", "hasbeenseen");
          }
      } else {
          console.log('StripeSubscriptionId is not null'); // Debugging
          if (window.localStorage.getItem("hasAppearedPaidWelcome") !== "hasbeenseen") {
              console.log("mihai may 15 safari debugging ---- hasAppearedPaidWelcome inner func runs");
              (window as any).dataLayer.push({
                  event: "purchase",
                  itemName: "subscription",
                  userDataId: user?.userDataId,
                //   userEmail: userEmail, // DEPRECATED, sensitive info
                //   userPhone: userPhone, // DEPRECATED, sensitive info
                //   userFirstName: userFirstName, // DEPRECATED, sensitive info
                //   userLastName: userLastName, // DEPRECATED, sensitive info
                  purchaseType: type,
                  stripeProductId: stripeSubscriptionId,
                  finalValue: Number(finalValue),
                  currency: "USD",
              });
              window.localStorage.setItem("hasAppearedPaidWelcome", "hasbeenseen");
              console.log("mihai may 15 safari debugging ---- hasSeenFreeWelcome after inner func runs: ", window.localStorage.getItem("hasSeenFreeWelcome"));
          }
      }
  }, [stripeSubscriptionId, finalValue, type, user, userEmail, userPhone, userFirstName, userLastName]);

  // Check if the component renders correctly
  console.log('Component Rendered'); // Debugging


    // if (type !== "single-subscription") {
    //     return <></>
    // }
    return (
        <div id={(stripeSubscriptionId === null) ? "Single-Free-Subscription-Div" : "Single-Paid-Subscription-Div"} className={cn("", className)} {...props}>
        <WelcomeComponent email={customerEmail} customerName={customerName} />
        <WelcomeComponentFree email={customerEmail} customerName={customerName} />
        </div>
        
    )
}

export default SingleSubscription


// this should show once someone completed a purchse for a subscription that auto renews. monthly, 6 month, yearly. NOT FREE   