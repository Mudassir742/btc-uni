// Utils
// import { shimmer, toBase64 } from "@/utils/image";
// Components
import IndividualPlansServerComp from "./IndividualPlansServerComp";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import Link from "next/link";
// import { BlackWhiteGridLeftContent, BlackWhiteGridRightContent, BlackWhiteGridWrapper } from "@/components/wrapper/BlackWhiteGridWrapper";

import Image from "next/image"
import { transformWpUrl } from "@/utils/url";

import { Button } from "@/components/ui/Button";
import H1Text from "@/components/text/H1Text";

export const metadata = {
  title: 'Subscribe',
  description: 'Ready to level up? Join BTC University now to unlock 250+ pro tutorials from the industry&apos;s best educators!',
}

export default async function Subscribe() {

  return (
    <main>
      <div >


        <div className="bg-themecolor-50 ">
          

          <div className="md:container md:mx-auto">
          <div className="absolute top-5 left-5 ">
          </div>

          {/* <Image
              alt="background"
              src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/11/s-o-c-i-a-l-c-u-t-OjnmCKmzr3A-unsplash-1.png")!}
              quality={100}
              fill
              sizes="100vw"
              className="object-cover absolute -z-10 hidden md:block object-bottom w-full"
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(
                  "100%",
                  "auto"
                )
              )}`}
            /> */}


            {/* Mobile */}
            <div className='md:hidden'>
              <Image
                alt="subscribe"
                src={"http://cms.btcuniversity.com/wp-content/uploads/2024/01/Untitled-1000-x-2500-px-800-x-3200-px-800-x-3000-px.png"!}
                width={1000}
                height={1000}
                className="md:mx-auto"
              />

            </div>


            {/* Desktop */}
            <div className='hidden md:block'>
              <Image
                alt="subscribe"
                src={"http://cms.btcuniversity.com/wp-content/uploads/2024/01/desktop-2.png"!}
                width={1000}
                height={1000}
                className="md:mx-auto"
              />
            </div>




          <div >

            {/* <FullBTCULogoSVGWhite height="28" /> */}
            <div className="mx-auto text-center">
              {/* <SH2Text
                  text="Start learning today"
                  className="!text-white justify-center !font-semibold text-24 "
                /> */}
              {/* <div className=" flex justify-center">

                  <ParagraphText
                    className="mt-3 !text-white/60 font-normal justify-center"
                    text="Cancel at any time, effective at the end of the payment period."
                  />
                </div> */}

                <div className="flex justify-center">
                  <H1Text text="Choose Your Plan" className="text-themeColor" />
                </div>

                
              <Suspense
                fallback={
                  <div className="flex flex-col gap-y-5 md:gap-y-6 mt-8 justify-center">
                    <Skeleton className="w-full h-[3.75rem]" />
                    <Skeleton className="w-full h-[3.75rem]" />
                  </div>
                }
              >
                <IndividualPlansServerComp className=" mt-2" />
                </Suspense>
                {/* <div className="md:hidden justify-center pt-4 container ">
                  <ParagraphText text="By signing up you agree to our&nbsp;" />
                  <div className="pt-[-5px] md:pt-0">
                    <Link className="underline" href="https://behindthechair.com/privacy-policy/" target="_blank">
                      <ParagraphText text="Terms of Use & Privacy Policy" />
                    </Link>
                  </div>

                </div>

                <div className="hidden md:flex justify-center py-2">
                  <ParagraphText text="By signing up you agree to our&nbsp;" />
                  <Link className="underline" href="https://behindthechair.com/privacy-policy/" target="_blank">
                    <ParagraphText text="Terms of Use & Privacy Policy" />
                  </Link>
                </div> */}


                {/* <div className="flex justify-center py-2">
                  <ParagraphText text="Already have an account?" />
                  <Link className="underline pl-1" href="/log-in" target="_blank">
                    <ParagraphText text="Log In" />
                  </Link>
                </div> */}

        
      
                <div className="med-space" /> 
                <div className="flex justify-center mt-8">
                  <Link href="/bulk-subscription">
                    <Button size={"subOptions"}
                      className="mx-auto">Gift A Subscription</Button>
                  </Link>
                </div>
            </div>
          </div>

        </div>
        </div>
          {/* <div className="py-[32px] md:py-[72px]">
          <div className="slider-container">
            <SH1Text className="text-themeColor" text="Learn from more than 250+ courses" />
            <ParagraphText className="mt-3 text-secondarythemecolor" text="Learn from the biggest names in hair!" />
          </div>
          <Suspense fallback={<div className={`flex overflow-auto gap-x-4 mt-8 slider-container`}>
            <Skeleton className="w-full " />
          </div>}>

            <div className="space-under-category-titles " />
            <TopClassesCards className="flex overflow-x-auto space-x-4 slider-container" />
          </Suspense>
          <div className="flex justify-center mt-8">
            <Link href="/bulk-subscription">
              <Button size={"subOptions"}
                className="mx-auto">Gift A Subscription</Button>
            </Link>
          </div>
        </div> */}
     
 
      </div>

    </main>
  );
}

