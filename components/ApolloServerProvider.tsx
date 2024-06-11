import React from "react";
import { Providers } from "./Providers";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";


export const ApolloServerProvider = async ({ children }: { children: React.ReactNode }) => {
	// fetch user cookie
	const user = await getRequestCookie(cookies());
	return (
		<Providers authToken={user?.authToken}>
			{children}
		</Providers>
	);
};
``;