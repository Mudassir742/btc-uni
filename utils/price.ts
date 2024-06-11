import { BulkSubDiscounts } from "@/lib/constants";
import Stripe from "stripe";

export interface Discount {
    type: "amount" | "percent";
    value: number;
    couponData?: Stripe.Coupon;
}
export function calculateOrderTotal({
    discountApplied,
    orderSummary,
    tax = 0,
    qty = 1,
    isGift = false
}:
    {
        orderSummary: number,
        discountApplied: Discount,
        tax?: number,
        qty?: number
        isGift?: boolean
    }): number {
    let discount: number;

    if (discountApplied.type === "percent") {
        discount = orderSummary * (discountApplied.value / 100);
    } else { // Assuming the other type is "fixed"
        discount = discountApplied.value;
    }

    // Bulk Subscription discount if any
    const discountedPrice = isGift ? (calculateBulkSubscriptionDiscountedPrice(qty || 1, orderSummary)) : orderSummary

    const total = (discountedPrice) - discount + (tax || 0);

    return total / 100;
}


export const stripePriceDisplay = (price: number): string => {
    return `$${(price / 100).toFixed(2)}`
}

export function calculateBulkSubscriptionDiscountedPrice(
    quantity: number = 1,
    originalPrice: number = 120 * 100 // multiplied by 100 because stripe gives pricing in cents
): number {
    if (!BulkSubDiscounts[quantity]) {
        throw new Error("Invalid quantity provided.");
    }

    const discountedPricePerSubscription = originalPrice - BulkSubDiscounts[quantity];
    return discountedPricePerSubscription * quantity;
}

export const getEachGiftPriceInCents = (qty: number, originalPrice: number) => {
    const discountedPricePerSubscription = originalPrice - BulkSubDiscounts[qty];
    return discountedPricePerSubscription
}

export const calculateDiscount = (coupon: Stripe.Coupon) => {
    if (coupon.amount_off) {
        // Return string message like -$10.00
        return `$${(coupon.amount_off / 100).toFixed(2)} off`;
    } else {
        return `${coupon.percent_off}% off`;
    }
}