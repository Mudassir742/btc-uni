import { CREATE_USER_DATA } from "@/graphql/mutations";
import { UserSession } from "@/interfaces";
import { createClient } from "@/lib/apolloClient";

export const createUserData = async (user: UserSession) => {
  const client = createClient(user.authToken!);

  const { errors, extensions, data } = await client.mutate({
    mutation: CREATE_USER_DATA,
    variables: {
      input: {
        title: user.userData?.email,
        userDataMetadata: {
          emailAddress: user.userData?.email,
        },
      },
    },
    errorPolicy: "all",
  });

  if (errors && errors?.length > 0) {
    throw { errors, extensions };
  } else {
    user = {
      ...user,
      userDataId: data.createUserData.userData.databaseId,
    };
  }

  return user;
};