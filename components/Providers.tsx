"use client";
// if use client isn't used I get Error: Cannot read properties of undefined (reading 'Symbol(__APOLLO_CONTEXT__)')

import React from "react";
import { ApolloProvider } from "@apollo/client";
import { client, createClient } from "../lib/apolloClient";

// const link = createHttpLink({
// 	uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
// 	credentials: 'include',
//   });

// export const Providers = ({ children }: { children: React.ReactNode }) => {
// 	// const client = new ApolloClient({
// 	// 	// uri: "http://localhost:3000/api/graphql",
//     //     uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL,
// 	// 	cache: new InMemoryCache(),
// 	// 	// link
// 	// 	// uri: process.env.NEXT_PUBLIC_WORDPRESS_API_URL
// 	// });
	
// 	return <ApolloProvider client={client}>{children}</ApolloProvider>;
// };

export const Providers = ({
	children,
	authToken,
  }: {
	children: React.ReactNode;
	authToken?: string;
  }) => {
	return (
	  <ApolloProvider client={authToken ? createClient(authToken) : client}>
		{children}
	  </ApolloProvider>
	);
  };
  ``;