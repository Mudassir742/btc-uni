import React, { Suspense } from "react";

// Components
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import ResetPassword from "@/components/auth/ResetPassword";
import { redirect } from "next/navigation";
import { Skeleton } from "@/components/ui/Skeleton";
import ParagraphText from "@/components/text/Paragraph";
import { BlackWhiteGridLeftContent, BlackWhiteGridRightContent, BlackWhiteGridWrapper } from "@/components/wrapper/BlackWhiteGridWrapper";
import SH1Text from "@/components/text/SH1Text";

export const dynamic = "force-dynamic";

const page = async ({
  searchParams,
}: {
  searchParams: {
    key: string;
    login: string;
  };
}) => {
  if (!searchParams.key || !searchParams.login) {
    redirect("/log-in/");
  }

  return (
    <main>
      <BlackWhiteGridWrapper>
        <BlackWhiteGridLeftContent>
          {/* <div className="h-1/2 mx-auto w-1/2 bg-gray-200">
            Content
          </div> */}
        </BlackWhiteGridLeftContent>
        <BlackWhiteGridRightContent className="container mx-auto justify-center">
          <SH1Text
            text="Set up a password"
            className="!text-themeColor"
          />

          <ParagraphText
            className="lg:max-w-sm mt-2 text-14"
            text={`We’re so happy to have you! Let’s set up a password so you can access your account from anywhere, anytime!`} />
          <div className="mt-7 lg:max-w-sm">
            <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
              <Skeleton className="h-14" />
              <Skeleton className="h-14" />
              <Skeleton className="h-14" />
            </div>}>
              <ResetPassword />
            </Suspense>
          </div>
        </BlackWhiteGridRightContent>
      </BlackWhiteGridWrapper>

    </main>
  );
};

export default page;
