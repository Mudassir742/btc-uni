import { REGISTER_USER } from "./../../graphql/mutations";
import { gql } from "@apollo/client";
import { GraphQLErrors } from "@apollo/client/errors";
import { client } from "@/lib/apolloClient";
import {
  IUserSession,
  LoginInput,
  RegisterUser,
  SignupInput,
  UserSession,
} from "@/interfaces";
import { LOGIN_MUTATION } from "@/graphql/mutations";

interface IGraphqlExtensions { }

interface IError {
  errors: GraphQLErrors;
  extensions: {
    debug: {
      type: string;
      message: string;
      stack: [];
    }[];
  };
}

export const authenticate = async (
  input: LoginInput | SignupInput,
  type: "login" | "signup"
): Promise<{
  login: UserSession;
  errors: GraphQLErrors | undefined;
}> => {
  try {
    const { data, errors, extensions } = (await client.mutate({
      mutation: type === "login" ? LOGIN_MUTATION : REGISTER_USER,
      errorPolicy: "all",
      variables: { input },
    })) as {
      data: { login: UserSession } | { registerUser: RegisterUser };
      errors: GraphQLErrors;
      extensions: IGraphqlExtensions;
    };

    if (errors && errors?.length > 0) {
      throw { errors, extensions };
    }
    if ("registerUser" in data) {
      const uData = data.registerUser.userData;

      return {
        login: {
          userData: {
            databaseId: uData.databaseId,
            isVerified: uData.isVerified,
            name: uData.name,
            email: uData.email,
          },
          authToken: uData.auth.authToken,
          refreshToken: uData.auth.refreshToken,
        } as UserSession,
        errors: [],
      };
    } else {

      return {
        login: {
          authToken: data?.login?.authToken,
          refreshToken: data?.login?.refreshToken,
          userDataId: data.login.userData?.userDatas.edges[0]?.node.databaseId,
          userData: {
            databaseId: data?.login?.userData?.databaseId,
            isVerified: data?.login?.userData?.isVerified,
            email: data?.login?.userData?.email,
            name: data?.login?.userData?.name,
          },
        } as UserSession,
        errors: [],
      };
    }
  } catch (error) {
    const errors = error as IError;
    console.log("Error while authenticating: ", errors);

    if (errors.extensions?.debug?.length) {
      for (let i in errors.extensions.debug) {
        if (errors.extensions.debug.some((msg) => msg.message.includes("already registered"))) {
          errors.errors[i].message = errors.extensions.debug[i].message;
        }
      }
    }

    return {
      login: {} as UserSession,
      errors: errors.errors,
    };
  }
};
