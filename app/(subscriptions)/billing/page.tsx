import React, { Suspense } from "react";
// Utils
import { cookies } from "next/headers";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { redirect } from "next/navigation";
// Components
import BackWithOnClick from "@/components/buttons/BackWithOnClick";
import SH1Text from "@/components/text/SH1Text";
import CreditCardDetails, {
  BillingHeader,
} from "@/components/cards/CreditCardDetails";
import { Skeleton } from "@/components/ui/Skeleton";
import InvoicesList from "@/components/molecules/InvoicesList";
import ParagraphText from "@/components/text/Paragraph";

const page = async () => {
  const user = await getRequestCookie(cookies());

  if (!user) {
    redirect("/log-in");
  }

  return (
    <main>
      <div className="grid w-full grid-cols-12 ">
        <div className="col-span-12 md:col-span-4 md:min-h-screen !px-5 md:px-5 py-6 pl-8 bg-gray-200">
          <div className="flex flex-row justify-between ">
            <BackWithOnClick className="pt-0 pl-0"  />
          </div>
          <SH1Text
            className="mt-5 font-bold text-themeColor"
            text="Welcome to the BTC University Billing Center!"
          />
        </div>
        <div className="w-full mb-16 col-span-12 md:col-span-8 !px-5 md:px-10 pt-6 ">
          <BillingHeader>Payment Details</BillingHeader>
          {/* <ParagraphText text="Ready to keep your payment info up to date? Simply click 'Add Payment Method' below to add new options. Once added, don't forget to remove the old method, ensuring your new one becomes the default for hassle-free transactions. Miss this step, and we'll keep trying to charge the old card. Stay current and keep things smooth"/> */}
          {/* <h2 className="font-semibold text-24"></h2>
          <div className="w-full h-0.5 bg-gray-300 my-4" /> */}
          <div className="max-w-lg mt-4">
            <Suspense
              fallback={
                <div>
                  <Skeleton className="w-full h-10 max-w-sm" />
                  <Skeleton className="w-full h-10 max-w-sm" />
                </div>
              }
            >
              <CreditCardDetails user={user} />
            </Suspense>
          </div>
          {/* Invoices */}
          <Suspense
            fallback={
              <div>
                <Skeleton className="w-full h-10 max-w-sm" />
                <Skeleton className="w-full h-10 max-w-sm" />
              </div>
            }
          >
            <InvoicesList className="mt-8" user={user} />
          </Suspense>
        </div>
      </div>
    </main>
  );
};

export default page;
