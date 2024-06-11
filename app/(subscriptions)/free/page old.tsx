// Utils
import { shimmer, toBase64 } from "@/utils/image";
// Components
// import { Suspense } from "react";
// import SH1Text from "@/components/text/SH1Text";
// import { Skeleton } from "@/components/ui/Skeleton";
import Link from "next/link";
import { BlackWhiteGridLeftContent, BlackWhiteGridRightContent, BlackWhiteGridWrapper } from "@/components/wrapper/BlackWhiteGridWrapper";
import FullBTCULogoSVGWhite from "@/components/icons/FullBTCULogoSVGWhite";
import Image from "next/image"
import { createUrl, transformWpUrl } from "@/utils/url";
import SH2Text from "@/components/text/SH2Text";

import { Button } from "@/components/ui/Button";
import { Crown } from "lucide-react"

export default async function Subscribe() {
  const searchParams = new URLSearchParams()
  return (
    <main>
      <BlackWhiteGridWrapper variant="v2">
        {/* <BlackWhiteGridLeftContent>
          <div className="md:mr-10 ">
            <div className="slider-container">
              <SH1Text className="text-themeColor" text="Learn from more than 250+ courses" />
              <ParagraphText className="mt-3 text-secondarythemecolor" text="Learn from the biggest names in hair!" />
            </div>
            <Suspense fallback={<div className={`flex overflow-auto gap-x-4 mt-8 slider-container`}>
              <Skeleton className="w-full " />
            </div>}>

              <div className="space-under-category-titles mt-5" />
              <TopClassesCards className="flex overflow-x-auto space-x-4 slider-container" />
            </Suspense>
            <div className="flex justify-center mt-8">
         

              <Link href="/bulk-subscription">
                  <Button variant="secondary" className="mx-auto">Gift A Subscription</Button>
                </Link>

            </div>
          </div>
        </BlackWhiteGridLeftContent> */}
        <BlackWhiteGridRightContent>
          <div className=" relative top-0 min-h-screen py-20">
            <div className="absolute top-5 left-5 !z-20">
            </div>
            <Image
              alt="background"
              // src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/11/s-o-c-i-a-l-c-u-t-OjnmCKmzr3A-unsplash-1.png")!}
              src={"https://cms.btcuniversity.com/wp-content/uploads/2023/11/s-o-c-i-a-l-c-u-t-OjnmCKmzr3A-unsplash-1.png"!}
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
            />
            <Image
              alt="background"
              // src={transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/11/Image.png")}
              src={"https://cms.btcuniversity.com/wp-content/uploads/2023/11/Image.png"}
              quality={100}
              fill
              sizes="100vw"
              className="object-cover absolute -z-10 object-bottom w-full md:hidden"
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer(
                  "100%",
                  "auto"
                )
              )}`}
            />
            <div className="z-10 px-5">
              <FullBTCULogoSVGWhite height="28" />
              <div className="mt-8 max-w-sm mx-auto text-center">
                <SH2Text
                  text="Start learning today"
                  className="!text-white justify-center !font-semibold text-24 "
                />

                <div className="mt-5">
                  <div className="flex flex-col items-center">
                    <Link className="w-fit" href={createUrl("/signup", searchParams)}>
                      <Button
                        size={"subOptions"}
                        variant={"white"}>
                                                Get Started for Free
                      </Button> 
                    </Link>


                    <Link  href={createUrl("/subscribe", searchParams)}>
                      <Button
                        className="flex mt-5 items-center gap-x-2"
                        size={"subOptions"}
                        variant={"primary"}>
                        <Crown  size={20} />
                        Go Premium
                      </Button>
                    </Link>
                  </div>
                </div>
                <h4 className="justify-center my-7 !text-secondarythemecolor text-center text-14 max-w-sm mx-auto">
                  By signing up you agree to our
                  <Link className="underline pl-1" href="https://behindthechair.com/privacy-policy/" target="_blank">
                    Terms of Use & Privacy Policy
                  </Link>
                </h4>
                <h4 className="md:max-w-sm mt-7  !text-themeColor text-center text-14">Already have an account?
                  <Link className=" underline font-semibold ml-1" href={"/log-in"}>
                    Log In
                  </Link>
                </h4>
              </div>
            </div>
          </div>
        </BlackWhiteGridRightContent>
      </BlackWhiteGridWrapper >





    </main>
  );
}

