"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, HTMLAttributes, useState } from "react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// Create a client

interface IProps extends HTMLAttributes<HTMLDivElement> {}

export const QueryProvider: FC<IProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
};
