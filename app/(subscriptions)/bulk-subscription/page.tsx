import { BlackWhiteGridLeftContent, BlackWhiteGridRightContent, BlackWhiteGridWrapper } from "@/components/wrapper/BlackWhiteGridWrapper";
import SH1Text from "@/components/text/SH1Text";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import Link from "next/link";
// import { BulkSubscription } from "./BulkSubscription";
import BulkSubServer from "./BulkSubServer";



export default function BulkSubscriptions() {

  return (
    <main>
      <BlackWhiteGridWrapper >

        <BlackWhiteGridRightContent className="order-1 md:order-2 container justify-center mx-auto">

          <div className="md:max-w-sm">
            <SH1Text
              text="Give The Gift Of Growth"
              className="!text-themeColor"
            />
            <p className="mt-2 text-16 text-themeColor">Upgrade the skills of your entire team with convenient, on-demand access to the largest library of hair resources in the world.  
            </p>
            <p className="mt-2 text-16 text-themeColor">Choose between 1 and 20 subscriptions and save up to 42%!
            </p>
            <p className="mt-2 text-16 text-themeColor"> For groups larger than 20, please contact our support team at&nbsp;<Link href="mailto:membership@btcuniversity.com" className="underline pl-0.5"> membership@btcuniversity.com.</Link>
            </p>
          </div>
          <Suspense fallback={
            <div className="md:max-w-sm flex flex-col gap-y-5 md:gap-y-6 mt-5">
              <Skeleton className="w-full h-12" />
            </div>
          }>
            <BulkSubServer />
          </Suspense>

          <h4 className="md:max-w-sm mt-7 !text-secondarythemecolor text-center text-12">
            By signing up you agree to our{" "}
            <Link className="underline" href="https://behindthechair.com/privacy-policy/" target="_blank">
              Terms of Use & Privacy Policy
            </Link>
          </h4>
        </BlackWhiteGridRightContent>
        <BlackWhiteGridLeftContent className="order-2 md:order-1">
          <div className="h-1/2 mx-auto ">
   
          </div>
        </BlackWhiteGridLeftContent>

      </BlackWhiteGridWrapper>
    </main>
  )
}

