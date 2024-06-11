import { Suspense } from "react";
// Components
import Logo from "/public/images/btcu-logo.png";
import OAuthButtons from "@/components/auth/OAuthButton";
import LoginForm from "@/components/auth/LoginForm";
import {
  BlackWhiteGridLeftContent,
  BlackWhiteGridRightContent,
  BlackWhiteGridWrapper,
} from "@/components/wrapper/BlackWhiteGridWrapper";
import SH1Text from "@/components/text/SH1Text";
import { Skeleton } from "@/components/ui/Skeleton";
import { createUrl, objectToURLSearchParams } from "@/utils/url";
import Link from "next/link";
import ReviewCaption from "@/components/text/ReviewCaption";
import ParagraphText from "@/components/text/Paragraph";

import Image from "next/image";

import { shimmer, toBase64 } from "@/utils/image";
import ButtonText from "@/components/text/ButtonText";
import { Button } from "@/components/ui/Button";


const page = ({
  searchParams,
}: {
  searchParams: {
    couponId: string;
  };
}) => {
  return (
    <main >
      <BlackWhiteGridWrapper variant="default">
        <BlackWhiteGridLeftContent image="https://cms.btcuniversity.com/wp-content/uploads/2024/05/Frame-1597888062.png">




        </BlackWhiteGridLeftContent>
        <BlackWhiteGridRightContent className="container mx-auto flex justify-center">
          <div>

            <div className="bg-white p-4 border border-border max-w-md rounded-xl">

              <div className="text-center">
                <div className="pb-4 text-themeColor flex justify-center whitespace-normal">
                  <div>
                    <p className="text-2xl font-semibold">Welcome to an all-new</p>
                    {/* <p className="text-2xl  font-semibold"> BTC University!</p> */}
                    <div className="px-6 pt-1">
                      <Image src={'/logo.png'}
                        className='relative'
                        width={350} height={150}
                        alt='btcuniversity' />
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
                  <div>

                  </div>
                  <ButtonText text="If you have not already:" className="text-themeColor flex justify-center" />
                  <ButtonText text="All current subscribers as of January 22nd, 2024 must reset their password below to unlock their account." className="text-themeColor flex justify-center" />


                </div>




                <div className="mt-2 flex justify-center">
                  {/* <Link href="/subscribe" className="px-3">
                  <Button variant="white">Subscribe</Button>
                </Link> */}
                  <Link href="/forgot-password" className="px-3">
                    <Button >Reset Password</Button>
                  </Link>
                </div>
                <div className="py-4">
                  <ButtonText text="If you have already reset your password, please log in below." className="text-themeColor  flex justify-center" />

                </div>

              </div>
            </div>

            <div className='space-between-categories' />
            <SH1Text text="Welcome back!" className="!text-themeColor" />
            <ParagraphText text="The biggest names in hair are ready to teach you their secrets!" />

            <div className="mt-7 lg:max-w-sm">
              <Suspense
                fallback={
                  <div className="w-full flex flex-col gap-y-6">
                    <Skeleton className="h-14" />
                    <Skeleton className="h-14" />
                  </div>
                }
              >
                <OAuthButtons searchParams={{ ...searchParams, source:"login" }} />
              </Suspense>

              {/* Divider */}
              <div className="flex items-center my-6 gap-x-5">
                <span className="w-full flex-1 h-[1px] bg-blackV1/40"></span>
                <span className="uppercase text-themeColor  text-16">or</span>
                <span className="w-full flex-1 h-[1px] bg-blackV1/40"></span>
              </div>
              {/* Signup Form */}
              <Suspense>
                <LoginForm />
              </Suspense>
            </div>

            <div className="flex mt-5 justify-center lg:max-w-sm">
              <ReviewCaption
                text="Don't have an account?"
                className="text-themeColor"
              />
              <Link
                className="font-semibold"
                href={createUrl(
                  "/subscribe",
                  objectToURLSearchParams(searchParams)
                )}
              >
                <ReviewCaption
                  text="&nbsp;Sign Up"
                  className="text-themeColor  underline justify-center"
                />
              </Link>
            </div>
          </div>
        </BlackWhiteGridRightContent>
      </BlackWhiteGridWrapper>
    </main>
  );
};

export default page;
