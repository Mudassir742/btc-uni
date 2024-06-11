"use server"
import { stripe } from "@/lib/stripe-server";
import { handleError } from "@/utils/stripeErrorHandling";
import Stripe from "stripe";

/**
 * Creates an invoice with custom details.
 * 
 * @param customerId - The customer's Stripe ID.
 * @param paymentIntentId - The PaymentIntent's Stripe ID.
 * @param items - An array of items for the invoice, each containing a description, amount, and metadata.
 * @returns A promise that resolves to the finalized invoice.
 * @throws If an error occurs during the invoice creation process.
 */
export async function createInvoiceWithCustomDetails(customerId: string, paymentIntentId: string, items: Array<{ description: string, amount: number, metadata: { [key: string]: string } }>) {
    try {
        // Create invoice items with metadata
        for (const item of items) {
            await stripe.invoiceItems.create({
                customer: customerId,
                amount: item.amount,
                currency: 'usd',
                description: item.description,
                metadata: item.metadata,

            });
        }

        // Create the invoice
        const invoice = await stripe.invoices.create({
            pending_invoice_items_behavior: "include",
            customer: customerId,
            auto_advance: true, // Auto-finalize this invoice
            metadata: items[0].metadata
        });

        // Finalize the invoice
        const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id, {
            // auto_advance: false // Auto-finalize this invoice

        });


        // Manually mark the invoice as paid
        const paidInvoice = await stripe.invoices.markUncollectible(invoice.id, {
            // paid_out_of_band: true, // Specify that the payment was made outside of 

            // forgive: true, // Forgive any previously uncollected amounts
            // source: paymentIntentId, // Specify the PaymentIntent used to pay

        });

        // const updatedInvoice = await stripe.invoices.update(invoice.id, {

        // })

        return finalizedInvoice;
    } catch (error) {
        handleError(error);
        throw error;
    }
}

