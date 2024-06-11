import React, { Suspense } from "react";
import Image from "next/image";
// Components
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import SH1Text from "@/components/text/SH1Text";


import { Skeleton } from "@/components/ui/Skeleton";
import { BlackWhiteGridLeftContent, BlackWhiteGridRightContent, BlackWhiteGridWrapper } from "@/components/wrapper/BlackWhiteGridWrapper";
import ButtonText from "@/components/text/ButtonText";
import ParagraphText from "@/components/text/Paragraph";
 


const page = async () => {
  return (
    <>
      <main>
      
        <BlackWhiteGridWrapper variant="v3">
   
          <BlackWhiteGridLeftContent>
         {/* <div className="h-1/2 mx-auto w-1/2 bg-gray-200">
            Content
          </div> */}
            
          </BlackWhiteGridLeftContent>
          <BlackWhiteGridRightContent className="container mx-auto justify-center">

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




             
               

                </div>
              </div>
            </div>
            <SH1Text
              text="Reset Password"
              className="!text-themeColor mt-6"
            />

            {/* <ParagraphText
              className="lg:max-w-sm mt-2 text-14"
              text={`We’re so happy to have you! Let’s set up a password so you can access your account from anywhere, anytime!`} /> */}
            <div className="mt-7 lg:max-w-sm">
              <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
              </div>}>
                <ForgotPasswordForm />
              </Suspense>
            </div>
          </BlackWhiteGridRightContent>
        </BlackWhiteGridWrapper>

      </main>
      {/* <main>
        <div className=" max-w-xl px-6 mx-auto mt-10 justify-center py-4 bg-white shadow">
          <SH1Text text="Forgot Password?" />

          <div className="mt-6">
          </div>
        </div>
      </main> */}
    </>
  );
};

export default page;
