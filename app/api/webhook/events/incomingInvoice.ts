"use server"


export async function incomingInvoice(customerId: string){
    const stripeApiKey = process.env.STRIPE_SECRET_KEY;
    const response = await fetch(
      `https://api.stripe.com/v1/invoices/upcoming?customer=${customerId}`,
      {
        cache: "no-cache",
        method: "GET",
        headers: {
          Authorization: `Bearer ${stripeApiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
  
    const responseData = await response.json();
  
    if (!response.ok) {
      throw new Error(
        `Failed to fetch upcoming invoice: ${responseData.error.message}`
      );
    }
  
    return responseData.amount_due / 100;
  };
  