'use server'

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

interface IProp {
    name: string | undefined;
    email: string | undefined;
    current_period_end: string;
}


export async function cancelSubscriptionEmail(prop: IProp) {
    console.log('the function has called')

    

    try {


        // Todo - Get user details from the metadata and send an email instead of fetching customer by ID

        // if (!customerData) {
        //     throw new Error('Customer not found')
        // }

        const res = await sendEmail(prop);
        console.log('Email Response:', res)

        // if (res[0].status === 'error' || res[0].status === 'rejected') {
        //     console.log('res.status is '. res[0].status)
        //     throw new Error('Email not sent')
        // }
        console.log('the cancellation mail has sent')
        return NextResponse.json(`Successful Webhook`);
    } catch (error) {
        console.log('there was some err')
        console.log(error)
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

const sendEmail = async (prop: IProp) => {

    // jan 22 - to add back  transformWpUrl func below TO DO
    const themecolor = '#523D34'
    const htmlContent = `
    <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; color: #333;">
       <p style="text-align:center;"><img src="${"https://cms.btcuniversity.com/wp-content/uploads/2023/03/btcuniversity-logotype-black.png"}" alt="BTC University Logo" style="width:50%;"></p>
  
       <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">Hi ${prop.name},</p>
       <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">We’re confirming that your BTC-U subscription has been canceled and will end on ${formatDateToDisplay(prop.current_period_end)},</p>
  
   <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">This means you’ll switch to our free plan with very limited access to courses and must-have resources. 
  </p>
   <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">You can resubscribe to BTC University at any time by tapping below to find a new plan that’s right for you.  
  </p>
   <p style="text-align:center;">
          <a href="btcuniversity.com/profile?q=update-subscription" style="background-color: ${themecolor}; color: black; padding: 10px 20px; text-decoration: none; border-radius: 15px; font-weight: bold; display: inline-block;">Rejoin BTC-U</a>
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
                email: prop.email,
                type: "to"
            }
        ]
    };
    const response = await mailchimpTx.messages.send({
        message
    });
    console.log('message: ', message);
    console.log('response: ', response);
    return response;
}