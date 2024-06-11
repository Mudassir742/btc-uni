  import React, { Suspense } from "react";

import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// Interfaces
import BasicsFormSuspense from "./BasicsFormSuspense";
import { headers } from "next/headers";

//  Components
import { BlackWhiteGridLeftContent, BlackWhiteGridRightContent, BlackWhiteGridWrapper } from "@/components/wrapper/BlackWhiteGridWrapper";
import SH1Text from "@/components/text/SH1Text";
import { Skeleton } from "@/components/ui/Skeleton";
import ParagraphText from "@/components/text/Paragraph";
import SH4Text from "@/components/text/SH4Text";
import H4Text from "@/components/text/H4Text";



 

export const dynamic = "force-dynamic";

const page = async ({
  searchParams,
}: {
  searchParams: {
    source: string;
  };
}) => {
  const token = await headers().get("auth-token");

  // let user2 = await getUserSession(cookies())


  const user = await getRequestCookie(cookies());

  console.log("user in basics is: ", user);
  console.log("userDataId in basics is: ", user?.userDataId);

  if (!user) {
    redirect("/log-in");
  }

  return (
    <main>
      <div className='md:hidden'>
        {/* <BackWithOnClick onClick={????} fill='black' />  */}

      </div>
      <BlackWhiteGridWrapper>

        <BlackWhiteGridLeftContent>

    

          {/* <div className="w-full h-full mx-auto bg-gray-200 relative">
      
            <Image
              alt="background"
              src={welcomeImg}
              quality={100}
              fill
              className="object-cover absolute z-0 hidden md:block object-bottom w-full"
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(
                  "100%",
                  "auto"
                )
              )}`}
            />
          </div> */}
          {/* <div className="h-1/2 mx-auto w-1/2 bg-gray-200"> */}
          {/* <BackWithOnClick onClick={????} fill='black' />  */}


          {/* </div> */}
        </BlackWhiteGridLeftContent>
        <BlackWhiteGridRightContent className="container mx-auto justify-center">

         

          <H4Text
            text="Let’s start with the basics"
          
          />

          <ParagraphText
            className="lg:max-w-sm mt-2 text-14 text-themeColor"
            text="We just need some basic information to set up your account.     
             " />
          <div className="mt-7 lg:max-w-sm">
            <div>
              <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
              </div>}>
                <BasicsFormSuspense refreshedToken={token!} user={user} />
              </Suspense>
            </div>
          </div>
        </BlackWhiteGridRightContent>
      </BlackWhiteGridWrapper>
    </main>
  );
};

export default page;
