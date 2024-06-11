import { NextResponse } from "next/server";
import Stripe from "stripe";
const mailchimpTx = require("@mailchimp/mailchimp_transactional")(
  process.env.TRANSACTIONAL_EMAIL_API_KEY
);
// Lib
import { stripe } from "@/lib/stripe-server";
import { formatDateToDisplay } from "@/utils/formatDate";
import { transformWpUrl } from "@/utils/url";


// Create an html email template with the coupon code note that it is a gift and sent by someone

export async function cancelSubscription(stripeObject: Stripe.Subscription) {
  try {

    console.log(`💰 Cancel Subscription Id: ${stripeObject.id}`);
    let shouldSendEmail = stripeObject.metadata?.email === 'false' ? false : true;

    // Todo - Get user details from the metadata and send an email instead of fetching customer by ID

    const cus = await stripe.customers.retrieve(stripeObject.customer as string) as Stripe.Response<Stripe.Customer>;

    if (!cus) {
      throw new Error('Customer not found')
    }
    if (shouldSendEmail) {
      const res = await sendEmail(cus, stripeObject);
      console.log('Email Response:', res)

      if (res[0].status === 'error' || res[0].status === 'rejected') {
        throw new Error('Email not sent')
      }
    }

    return NextResponse.json(`Successful Webhook`);
  } catch (error) {
    if (error instanceof Error) {
      throw NextResponse.json(`Webhook error: ${error.message}`, {
        status: 400,
      });
    } else {
      throw NextResponse.json(`Webhook error: ${error}`, {
        status: 400,
      });
    }
  }
}

const sendEmail = async (customerData: Stripe.Response<Stripe.Customer>, stripeObject: Stripe.Subscription) => {

  // jan 22 - to add back  transformWpUrl func below TO DO
  const themecolor = '#523D34'
  const htmlContent = `
  <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; color: #333;">
     <p style="text-align:left;"><img src="${"https://cms.btcuniversity.com/wp-content/uploads/2023/03/btcuniversity-logotype-black.png"}" alt="BTC University Logo" style="width:40%;"></p>

     <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">Hi ${customerData.name ?? ""},</p>
     <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">We’re confirming that your BTC-U subscription has been canceled and will end on ${formatDateToDisplay(stripeObject.canceled_at!)},</p>

 <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">This means you’ll switch to our free plan with very limited access to courses and must-have resources. 
</p>
 <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">You can resubscribe to BTC University at any time by tapping below to find a new plan that’s right for you.  
</p>
 <p style="text-align:left;">
        <a href="btcuniversity.com/profile?q=update-subscription" style="background-color: ${themecolor}; color: white; padding: 10px 20px; text-decoration: none; border-radius: 15px; font-weight: bold; display: inline-block;">Rejoin BTC-U</a>
    </p>
 <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">We hope to see you back soon! 
</p>
<p style="font-size:16px; margin-top:10px; margin-bottom:10px;">The BTC University Team

</p>

  </div>
`;

  const message = {
    from_email: "membership@btcuniversity.com",
    subject: "Your BTC-U Subscription Has Been Canceled",
    text: ``,
    html: htmlContent,
    to: [
      {
        email: customerData.email,
        type: "to"
      }
    ]
  };
  const response = await mailchimpTx.messages.send({
    message
  });

  return response;
}