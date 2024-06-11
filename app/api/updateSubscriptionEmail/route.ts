import { NextRequest } from "next/server";
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
    await updateSubscription(body.email, body.name, body.currentSub, body.selectedSubName, body.date, body.paySchedule, body.amount);

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
