import { UPDATE_ADDRESS, UPDATE_USER_DATA } from "@/graphql/mutations";
import { UserSession } from "@/interfaces";
import { createClient } from "@/lib/apolloClient";
import { BasicFormInfo } from "@/lib/schemas/basicInfoForm";
import { formatDate } from "@/utils/formatDate";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

export const updateAddress = async (
  userId: string | number,
  values: BasicFormInfo,
  client: ApolloClient<NormalizedCacheObject>,
  stripeData: UserSession["stripe"]
) => {
  try {
    const { data, errors } = await client.mutate({
      mutation: UPDATE_ADDRESS,
      errorPolicy: "all",
      variables: {
        input: {
          id: userId,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          address: {
            address1: values.address1,
            address2: values.address2,
            city: values.city,
            country: values.country,
            state: values.state,
            zipcode: values.zipcode,
          },

          role: "author", // Assign author role to the user.
          stripe: {
            cus_id: stripeData.cus_id,
          },
        },
      },
    });

    if (errors) {
      throw errors;
    }

    return data;
  } catch (error) {
    throw error;
  }
};
export const updateUserDataAddress = async (
  userId: string | number,
  authorId: number,
  values: BasicFormInfo,
  client: ApolloClient<NormalizedCacheObject>,
  stripeData: UserSession["stripe"]
) => {
  try {
    const { data, errors } = await client.mutate({
      mutation: UPDATE_USER_DATA,
      errorPolicy: "all",
      variables: {
        input: {
          id: userId,
          userDataMetadata: {
            firstName: values.firstName,
            lastName: values.lastName,
            fullName: `${values.firstName} ${values.lastName}`,
            userID: String(authorId),
            tiStripeCustomerID: stripeData.cus_id,
            address1: values.address1,
            address2: values.address2,
            city: values.city,
            country: values.country,
            state: values.state,
            zipCode: values.zipcode,
            joinDate: new Date(),
            // birthDay: values.dob,
          },
        },
      },
    });

    if (errors) {
      throw errors;
    }

    return data;
  } catch (error) {
    throw error;
  }
};