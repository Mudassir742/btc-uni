import { createClient } from "@/lib/apolloClient";
import { gql } from "@apollo/client";
import { NextRequest } from "next/server";
import Stripe from "stripe";

interface IMetadata {
  wp_database_id: string;
  user_temp_session: string;
}

export const updateCustomerONWordpress = async (
  stripeObject: Stripe.Customer
) => {
  const metadata = stripeObject.metadata as Stripe.Metadata & IMetadata;
  const client = createClient(metadata.user_temp_session);

  client.mutate({
    mutation: gql``,
    errorPolicy: "all",
    variables: {
      customer_id: stripeObject.id,
    },
  });
};
