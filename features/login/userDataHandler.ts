import { AuthSource, UserSession } from "@/interfaces";
import { stripe } from "@/lib/stripe-server";
import { createUserData } from "./createUserData";
import { createCustomerOnStripe } from "../stripe/customer";

export async function userDataHandler(
  user: UserSession,
  source: AuthSource
) {
  let usr: UserSession;

  if ((user.isLoggedIn && source === "signup") || !user.stripe?.cus_id) {
    console.log("Searching for customer: ", user.userData?.email);
    try {
      const customers = await stripe.customers.list({
        email: user.userData?.email,
      });

      if (customers.data.length === 0) {
        console.log(
          "Stripe Customer not found creating one: ",
          user.userData?.email
        );
        const [userData, stripeData] = await Promise.all([
          createUserData(user),
          createCustomerOnStripe(user),
        ]);

        usr = {
          ...stripeData,
          ...userData,
        };
        return usr;
      } else {
        console.log("Stripe Customer found: ", customers.data[0].id);
        usr = {
          ...user,
          stripe: {
            cus_id: customers.data[0].id,
          },
        };
        return usr;
      }
    } catch (e) {
      throw e;
    }
  }
}
