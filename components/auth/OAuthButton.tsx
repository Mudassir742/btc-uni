import { FC, HTMLAttributes } from "react";
// Lib
import { AUTH_PROVIDERS } from "@/graphql/queries";
import { client } from "@/lib/apolloClient";
import { updateUrlWithState } from "@/utils/genAuthorizationUrl";
// Types
import { IAuthProvidersQueryResponse } from "@/interfaces";
import { ILoginClient } from "@/interfaces";
// Images
import GoogleImage from "/public/images/google.png";
import FacebookImage from "/public/images/facebook.png";
// Utils
import { cn } from "@/utils/shadcn";
// Components
import Image from "next/image";
import { ApolloQueryResult } from "@apollo/client";
import { IWpErrors, generateWpPageError } from "@/utils/wpErrorHandling";

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  searchParams: {
    [key: string]: string | undefined;
  };
}

const OAuthButtons: FC<IProps> = async ({
  className,
  searchParams,
  ...props
}) => {
  // const d = await client.query<IAuthProvidersQueryResponse>({
  //   query: AUTH_PROVIDERS,
  // });

  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    // Todo: Implment Cache Before Launch 
    cache: "force-cache",
    body: JSON.stringify({
      query: AUTH_PROVIDERS.loc?.source.body,
    }),
  });

  const { data, errors } = await response.json() as ApolloQueryResult<IAuthProvidersQueryResponse>;

  if (errors) {
    throw generateWpPageError(errors as unknown as IWpErrors[])
  }

  const clientsData = data?.loginClients.filter((item) => item.clientId);
  clientsData.reverse();

  return (
    <>
      <div className="flex flex-col gap-y-5">
        {clientsData?.length
          ? clientsData?.map((client: ILoginClient) => {
            return (
              <a
                href={`${updateUrlWithState(
                  client.authorizationUrl,
                  "signup",
                  searchParams
                )}`}
                key={client.clientId}
              >
                <button
                  key={client.clientId}
                  className={`flex items-center justify-center w-full px-8 
                    py-4  text-14 sm:text-16 font-medium relative text-themeColor   border-[1px] border-border rounded-xl  gap-x-3 `}
                  {...props}
                >
                  <Image
                    className="absolute h-6 w-6 top-4 left-4"
                    alt={client.name}
                    src={
                      client.name.toLowerCase() === "google"
                        ? GoogleImage
                        : FacebookImage
                    }
                  />
                  Continue with {client.name}
                </button>
              </a>
            );
          })
          : null}
      </div>
    </>
  );
};

export default OAuthButtons;
