import { FC, HTMLAttributes } from "react";
// Utils
import { cn } from "@/utils/shadcn";
import { stripe } from "@/lib/stripe-server";
import { UserSession } from "@/interfaces";
import { handleError } from "@/utils/stripeErrorHandling";
// Components
import { BillingHeader } from "../cards/CreditCardDetails";
import Link from "next/link";
import { formatDateToDisplay } from "@/utils/formatDate";
import { ExternalLink } from "lucide-react";
import { ScrollArea } from "../ui/ScrollArea";
import H5Text from "../text/H5Text";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  user: UserSession;
}

const InvoicesList: FC<IProps> = async ({ className, user, ...props }) => {
  const invoiceData = await getBillingHistory(user.stripe.cus_id);

  return (
    <div className={cn("", className)} {...props}>
      <H5Text text="Payment History" className="mt-10 text-themeColor" />
 
      <div className="max-w-lg mt-4  text-themeColor">
        {/* <ScrollArea className="h-fit pr-6 bg-red-500 "> */}
        <div className="flex flex-col gap-y-5 ">
          {invoiceData?.length ? invoiceData?.map((item) => {
            if (!item.paid) {
              return null;
            }
            return (
              <div
                key={item.id}
                className="grid sm:grid-cols-[1fr,1fr] gap-y-2 text-18  gap-x-10 tabular-nums items-center"
              >
                <div>
                  <a
                    target="_blank"
                    href={item.receipt_url!}
                    className="flex items-center col-span-1 cursor-pointer gap-x-1 w-fit tabular-nums"
                  >
                    {formatDateToDisplay(item.created)}
                    <ExternalLink className="shrink-0" size={18} />
                  </a>
                </div>
                <div className="flex items-center justify-between col-span-1">
                  <h4 className="">${(item.amount / 100).toFixed(2)}</h4>
                  <div className="px-3 py-1 text-green-700   border-[1px] border-border rounded-xl text-12 bg-green-500/10 w-fit">
                    {item.paid ? "Paid" : "UnPaid"}
                  </div>
                </div>
              </div>
            );
          }) :
            <p className="mt-2 font-medium text-gray-400">
              You have no payment history yet.
            </p>
          }
        </div>
        {/* </ScrollArea> */}
      </div>
    </div>
  );
};

export default InvoicesList;

async function getBillingHistory(customerId: string) {
  try {
    // Retrieve a customer's billing history
    const invoices = await stripe.charges.list({
      customer: customerId,

      // expand: ['data.payment_intent.payment_method']
    });

    // const charges = stripe.charges.list({
    //   customer: customerId
    // });


    // Process and analyze the retrieved invoices
    return invoices.data;
  } catch (error) {
    handleError(error);
  }
}
