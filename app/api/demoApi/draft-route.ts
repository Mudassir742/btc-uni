import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { updateSubscription } from '../webhook/events/updateSubscription';
const mailchimpTx = require('@mailchimp/mailchimp_transactional')(
  process.env.TRANSACTIONAL_EMAIL_API_KEY
);

// ... (Your existing imports)

export async function POST(req: NextRequest) {
  try {
const body = await req.json();
    // Process cancellation logic and send email
    await checkApi(body.email, body.code, body.name);

    // Send an immediate response
    return new Response(`Email sent successfully`);
  } catch (error) {
    if (error instanceof Error) {
      return new Response(`Webhook error: ${error.message}`, {
        status: 400,
      });
    } else {
      return new Response(`Webhook error: ${error}`, {
        status: 400,
      });
    }
  }
};



const sendEmail = async (recipientEmail: string, codes: string[], name: string) => {
    const promoCodeHeading = codes.length === 1 ? "BTC University Subscription Gift" : "BTC University Subscription Gift";
    const themecolor = '#523D34'
    const s = codes.length === 1 ? "" : "s";
  
    // jan 22 - to add back  transformWpUrl func below TO DO
    const htmlContent = `
    <div style="font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif; font-size: 16px; color: #333;">
     <p style="text-align:left;">
         <img src="https://cms.btcuniversity.com/wp-content/uploads/2023/03/btcuniversity-logotype-black.png" alt="BTC University Logo" style="width:40%;"></p>
  
  
  </p>     
       
             <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">Hi ${name},</p>
              <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">Thank you for spreading the gift of knowledge with BTC University subscription${s}!</p>
            <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">Share the promo code${s} below with the people you’d like to gift the subscription${s} to, and they will be able to enjoy one free year of BTC University. All they need to do is go to this <a href="/subscribe?isGift=true">LINK</a>
   and enter their promo code.!</p>
            
             <p style="font-size:16px; margin-top:10px; margin-bottom:10px;"> While your promo code${s} do not expire, please note that each one is good for one subscription. If you are gifting multiple subscriptions, each recipient will have their own promo code.</p>
              <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">Should you or your gifted subscription recipient${s} have any questions or need assistance with the process, please don’t hesitate to reach out to our dedicated support team at membership@btcuniversity.com.</p>
              <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">Thanks for being a part of the BTC-U community!</p>
             <p style="font-size:16px; margin-top:10px; margin-bottom:10px;">BTC University Team</p>
  
   <h2 style="color: #523D34;">${promoCodeHeading}</h2>
        <ul style="list-style-type: none; padding: 0;">
            ${codes.map(code => `<li style="margin-bottom: 10px; background-color: #f2f2f2; padding: 10px; border-radius: 4px;">${code}</li>`).join('')}
        </ul>
    
    </div>
  `;
  
    const message = {
      from_email: "membership@btcuniversity.com",
      subject: "BTC University Subscription Gift",
      text: `Your exclusive promo codes:\n${codes.join('\n')}`,
      html: htmlContent,
      to: [
        {
          email: recipientEmail,
          type: "to"
        }
      ]
    };
    const response = await mailchimpTx.messages.send({
      message
    });
  
    return response;
  }

  // Create an html email template with the coupon code note that it is a gift and sent by someone
export async function checkApi(email:string,code:Array<string>,name:string) {
    try {
  
      const res = await sendEmail(email,code,name);
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
