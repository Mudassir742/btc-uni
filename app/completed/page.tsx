import React, { Suspense } from "react";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
// Components
import Certificate from './components/Certificate'
import Sort from './components/Sort';
import H3Text from '@/components/text/H3Text';
import { cn } from "@/utils/shadcn";
import CompletedMain from "./components/CompletedMain";

const Page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {

  return (
    <CompletedMain searchParams={searchParams} />
  )
};

export default Page;
