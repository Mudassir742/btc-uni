import Link from "next/link";
import toast from "react-hot-toast";
import Stripe from "stripe";

export const handleError = (e: unknown) => {
  if (e instanceof Stripe.errors.StripeError) {
    switch (e.type) {
      case "StripeCardError":
        console.log(`A payment error occurred: ${e.message}`);
        typeof toast?.error === "function" && toast.error(`${e.message}`);
        throw e.message;
      case "StripeError":
        console.log(`${e.message}`);
        typeof toast?.error === "function" && toast.error(`${e.message}`);
        throw e.message;
      case "StripeRateLimitError":
        console.log(`Rate limit exceed error: ${e.message}`);
        typeof toast?.error === "function" && toast.error(`${e.message}`);
        throw e.message;
      case "StripeInvalidRequestError":
        console.log(`An invalid request occurred: ${e.message}`);
        typeof toast?.error === "function" && toast?.error(e.message);
        throw e.message;
      default:
        console.log(e.message);
        typeof toast?.error === "function" && toast?.error(e.message);
        throw e.message;
    }
  } else if (e instanceof Error) {
    typeof toast?.error === "function" && toast?.error(e.message);
    console.log(e.message);
    throw e.message;
  } else if (e instanceof Stripe.errors.StripeError) {
    typeof toast?.error === "function" && toast?.error(e.message);
    console.log(e.message);
    throw e.message;
  }
  else if (typeof e === "string") {
    // typeof toast?.error === "function" && toast?.error(e);
    // console.log(e);
    // throw e;
  }
  // check if there is message in e object and naroow e type to {message:string}
  else if (e && "raw" in (e as { raw: { message: string } })) {
    const error = e as { raw: { message: string }; code: string };
    // If invalid location
    if (error.code === "customer_tax_location_invalid") {
      typeof toast?.error === "function" &&
        toast.error(
          <div >
            <p>
              Invalid Location Please{" "}
              <Link
                href={`/basics?source=signup`}
                className="text-blue-500 underline"
              >
                Update
              </Link>{" "}
              your location
            </p>
          </div>
        );
    } else {
      typeof toast?.error === "function" && toast.error(error.raw.message);
    }
  } else if (e && "message" in (e as { message: string })) {
    toast.error((e as { message: string }).message);
    typeof toast?.error === "function" && console.log(e);
    throw (e as { message: string }).message;
  } else {
    typeof toast?.error === "function" &&
      toast.error("unexpected server error");
    console.log(e);
    throw "unexpected server error";
  }
};