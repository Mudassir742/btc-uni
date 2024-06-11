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
export async function updateSubscription(email:string,name:string,currentSub:string,selectedSubName:string, date:string, paySchedule:string, amount:string) {
  try {

    const res = await sendEmail(email,name,currentSub,selectedSubName,date, paySchedule, amount);
    console.log('Email Response:', res)

    if (res[0].status === 'error' || res[0].status === 'rejected') {
      throw new Error('Email not sent')
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

const sendEmail = async (email:string, name:string,currentSub:string,selectedSubName:string,date:string, paySchedule:string, amount:string) => {
  
  // jan 22 - to add back  transformWpUrl func below TO DO
const themecolor = '#523D34'
  const htmlContent = `
  <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; color: #333; white-space: pre;">
  <p style="text-align:center;"><img src="${"https://cms.btcuniversity.com/wp-content/uploads/2023/03/btcuniversity-logotype-black.png"}" alt="BTC University Logo" style="width:50%;"></p>
Hi ${name}!

Your BTC-U subscription has been changed from ${currentSub} to ${selectedSubName} effective ${formatDateToDisplay(date)}. Your new bill will be $${amount} and you will be billed per ${paySchedule} on the same day.
  
Happy learning!
The BTC University Team
  </div>
`;

  const message = {
    from_email: "membership@btcuniversity.com",
    subject: "Your BTC-U Subscription Has Been Updated",
    text: ``,
    html: htmlContent,
    to: [
      {
        email: email,
        type: "to"
      }
    ]
  };
  const response = await mailchimpTx.messages.send({
    message
  });

  return response;
}