import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import ButtonText from "@/components/text/ButtonText";
import ParagraphText from "@/components/text/Paragraph";
import SH1Text from "@/components/text/SH1Text";
import { Skeleton } from "@/components/ui/Skeleton";
import { cn } from "@/utils/shadcn";
import Image from "next/image";
import React, { FC, Suspense } from "react";

interface MyComponentProps {
  className?: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}

const ForgotPassword: FC<MyComponentProps> = ({
  searchParams,
  className,
}: MyComponentProps) => {
  const searchVal = searchParams?.q;
  return (
    searchVal == "forgot-password" && (
      <div className={cn("max-w-md mx-auto my-20", className)}>
        <div>
          <div className="bg-white p-4 border border-border max-w-md rounded-xl">
            <div className="text-center">
              <div className="pb-4 text-themeColor flex justify-center whitespace-normal">
                <div>
                  <p className="text-2xl font-semibold">
                    Welcome to an all-new
                  </p>
                  <div className="px-6 pt-1">
                    <Image
                      src={"/logo.png"}
                      className="relative"
                      width={350}
                      height={150}
                      alt="btcuniversity"
                    />
                  </div>
                </div>
              </div>

              <div className="pb-4">
                <ParagraphText text="We can’t wait for you to see everything" />
                <div className=" md:mt-0">
                  <ParagraphText text="our new site has to offer! " />
                </div>
              </div>

              <div className="pb-2 justify-center">
                <div></div>
                <ButtonText
                  text="If you have not already:"
                  className="text-themeColor flex justify-center"
                />
                <ButtonText
                  text="All current subscribers as of January 22nd, 2024 must reset their password below to unlock their account."
                  className="text-themeColor flex justify-center"
                />
              </div>
            </div>
          </div>
        </div>
        <SH1Text text="Reset Password" className="!text-themeColor mt-6" />

        {/* <ParagraphText
              className="lg:max-w-sm mt-2 text-14"
              text={`We’re so happy to have you! Let’s set up a password so you can access your account from anywhere, anytime!`} /> */}
        <div className="mt-7 lg:max-w-sm">
          <Suspense
            fallback={
              <div className="w-full flex flex-col gap-y-6">
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
              </div>
            }
          >
            <ForgotPasswordForm />
          </Suspense>
        </div>
      </div>
    )
  );
};

export default ForgotPassword;
