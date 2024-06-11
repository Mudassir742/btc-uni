import React, { Suspense } from "react";
import { createUrl, objectToURLSearchParams } from "@/utils/url";
//  Components
import OAuthButtons from "@/components/auth/OAuthButton";
import SignupForm from "@/components/auth/SignupForm";
import { BlackWhiteGridLeftContent, BlackWhiteGridRightContent, BlackWhiteGridWrapper } from "@/components/wrapper/BlackWhiteGridWrapper";
import SH1Text from "@/components/text/SH1Text";
import Link from "next/link";
import { Skeleton } from "@/components/ui/Skeleton";
import IndividualPlansServerComp from "@/app/(subscriptions)/subscribe/IndividualPlansServerComp";
import Image from "next/image";
import { ChevronLeft } from "lucide-react"

import { shimmer, toBase64 } from "@/utils/image";

const page = ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | undefined;
  };
}) => {
  return (
    <main>

      <BlackWhiteGridWrapper variant="default">
        <BlackWhiteGridLeftContent image="https://cms.btcuniversity.com/wp-content/uploads/2024/05/Frame-1597888062.png">
          
          {/* Go Back */}
          {/* <div className="bg-white rounded-xl pb-8 pt-2 shadow max-w-sm mx-auto px-6 justify-center sticky top-20 "> */}
            <Suspense fallback={
              <div className="md:max-w-sm flex flex-col gap-y-8 lg:gap-y-5 mt-5">
                <Skeleton className="w-full h-12" />
                <Skeleton className="w-full h-12" />
                <Skeleton className="w-full h-12" />
              </div>
            }>
          </Suspense>
         

          {/* </div> */}
          <div className="w-full h-full mx-auto flex justify-center items-center relative">
        

          </div>
        </BlackWhiteGridLeftContent>
        <BlackWhiteGridRightContent>


{/* Mobile */}
<div className='md:hidden '>
  </div>
    

<div className="container justify-center mx-auto">
  
          <SH1Text
            text="Create Your Account"
            className="!text-themeColor"
          />
            {/* <p className="text-16 text-themeColor mt-1 font-normal lg:max-w-sm">
              Unlock free resources by making an account
          </p> */}
          <div className="mt-7 lg:max-w-sm">
            <Suspense fallback={
              <div className="w-full flex flex-col gap-y-6">
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
              </div>
            }>
              <OAuthButtons searchParams={searchParams} />
            </Suspense>

            {/* Divider */}
            <div className="flex items-center my-6 gap-x-5">
              <span className="w-full flex-1 h-[1px] bg-blackV1/40"></span>
                <span className="uppercase text-themeColor  text-16">or</span>
              <span className="w-full flex-1 h-[1px] bg-blackV1/40"></span>
            </div>
            {/* Signup Form */}
            <div>
              <SignupForm />
            </div>
          </div>

          <h4 className="md:max-w-sm mt-7  !text-themeColor text-center text-14">Already have an account? <Link className="text-themeColor underline font-semibold pr-1" href={createUrl("/log-in", objectToURLSearchParams(searchParams))}>Log In</Link></h4>
          </div>
        </BlackWhiteGridRightContent>
      </BlackWhiteGridWrapper>
   
    </main>
  );
};

export default page;
