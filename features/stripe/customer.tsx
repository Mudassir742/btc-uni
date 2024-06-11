import { UserSession } from "@/interfaces";
import { stripe } from "@/lib/stripe-server";

export const createCustomerOnStripe = async (user: UserSession) => {
  try {
    const cus = await stripe.customers.create({
      email: user.userData?.email,
      name: user.userData?.name,
      metadata: {
        wp_database_id: String(user.userData?.databaseId),
      },
    });

    user = {
      ...user,
      stripe: {
        cus_id: cus.id,
      },
    };

    return user;
  } catch (error) {
    throw error;
  }
};
