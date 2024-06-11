// Utils
import UpdateSubscriptionServerComp from "@/app/(subscriptions)/update-subscription/components/UpdateSubscriptionServerComp";
// Components
import { Suspense } from "react";
import SH1Text from "@/components/text/SH1Text";
import { Skeleton } from "@/components/ui/Skeleton";
import Link from "next/link";
import {
  BlackWhiteGridLeftContent,
  BlackWhiteGridRightContent,
  BlackWhiteGridWrapper,
} from "@/components/wrapper/BlackWhiteGridWrapper";


export default async function UpdateSubscription({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  return (
    <main>
      <BlackWhiteGridWrapper variant="v3">
        <BlackWhiteGridLeftContent>
          <div className="w-full h-full mx-auto relative">
          {/* <Image
                alt="background"
                src={welcomeImg}
                quality={100}
                fill
                className="object-fill absolute z-0 hidden md:block object-bottom w-full"
                placeholder={`data:image/svg+xml;base64,${toBase64(
                  shimmer(
                    "100%",
                    "auto"
                  )
                )}`}
              /> */}
          </div>
        </BlackWhiteGridLeftContent>
        <BlackWhiteGridRightContent className="container justify-center mx-auto">
        
          <div className=" lg:max-w-sm">
            <div>
              <Suspense
                fallback={
                  <div className="flex flex-col mt-5 md:max-w-sm gap-y-5 md:gap-y-6">
                    <Skeleton className="w-full h-12" />
                    <Skeleton className="w-full h-12" />
                    <Skeleton className="w-full h-12" />
                  </div>
                }
              >
                <UpdateSubscriptionServerComp
                  searchParams={searchParams}
                  className="mt-6 "
                />
              </Suspense>

            
            </div>
          </div>
        </BlackWhiteGridRightContent>
      </BlackWhiteGridWrapper>
    </main>
  );
}
