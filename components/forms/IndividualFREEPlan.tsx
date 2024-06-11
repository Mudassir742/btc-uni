"use client";
import { FC, HTMLAttributes, useCallback, useEffect, useState, useTransition } from "react";
// Utils
import { cn } from "@/utils/shadcn";
import Stripe from "stripe";
import { stripePriceDisplay } from "@/utils/price";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrl, transformWpUrl } from "@/utils/url";
import { Button } from "../ui/Button";
import ParagraphText from "../text/Paragraph";
import { annualSub, biannual, monthlySub } from "@/lib/constants";
import * as NProgress from 'nprogress';
import Image from "next/image"
import H1Text from "../text/H1Text";

// Components

interface IProps extends HTMLAttributes<HTMLDivElement> {
  plansData: Stripe.Product[];
  needNewSub?: boolean
}

const IndividualFREEPlan: FC<IProps> = ({ plansData, needNewSub = false, className, ...props }) => {
  const [pending, startTransition] = useTransition();
  const pathname = usePathname();
  const searchParams = useSearchParams()

  const { push, replace } = useRouter();

  useEffect(() => {
    return () => {
      NProgress.done();
    }
  }, [pathname]);

  plansData.sort((a, b) => {
    const aprice = a.default_price as Stripe.Price
    const bprice = b.default_price as Stripe.Price

    return bprice.unit_amount! - aprice.unit_amount!
  });
  const isGift = searchParams?.get("isGift") === "true" ? true : false
  const newSearchParams = new URLSearchParams(searchParams!);

  return (
    <div className={cn("", className)} {...props}>
      {/* Plans */}
      {/* <div className="flex justify-center">
        <H1Text text="FREE Account" />
      </div> */}
    
      <div className="w-full ">
        {
          isGift ?
            <div>
              </div>
            :
            <ul className="flex flex-col gap-y-0">
       
       
          
              <li className="cursor-pointer">
                <Image onClick={() => {
                  newSearchParams.set("subscription", 'free');
                  startTransition(() => {
                    NProgress.start();
                    if (needNewSub) {
                      push(createUrl(`/checkout/${newSearchParams.get("subscription")}`, newSearchParams))

                    } else {
                      push(createUrl("/signup", newSearchParams))
                    }
                  })
                }} width={327} height={156} 
                    // src={transformWpUrl('https://cms.btcuniversity.com/wp-content/uploads/2024/01/BTC-U-2.0-social-media-for-hairdressers-400-x-532-px-1080-x-5000-px_04-1.png')} 
                    src={'https://cms.btcuniversity.com/wp-content/uploads/2024/01/BTC-U-2.0-social-media-for-hairdressers-400-x-532-px-1080-x-5000-px_04-1.png'} 
                    className="w-full" alt="Free subscription" />
              </li>
            </ul>
          // Changed on 16 th Jan
          // <ul className="flex flex-col gap-y-5 md:gap-y-6 mx-auto ">
          //   {plansData.map((item, i) => {
          //     const price = item.default_price as Stripe.Price
          //     price.unit_amount
          //     return (
          //       <Button
          //         key={item.id}
          //         disabled={pending}
          //         size={"subOptions"}
          //         variant={item.id === annualSub ? "primary" : "white"}
          //         onClick={() => {
          //           const searchParams = new URLSearchParams();
          //           searchParams.set("subscription", item.id);

          //           startTransition(() => {
          //             NProgress.start();
          //             if (needNewSub) {
          //               push(createUrl(`/checkout/${searchParams.get("subscription")}`, searchParams))

          //             } else {
          //               push(createUrl("/signup", searchParams))
          //             }
          //           })
          //         }}
          //         align={"center"}>

          //         {stripePriceDisplay(price.unit_amount ?? 0)} / {item.id === annualSub ? "year" : item.id === biannual ? "6 months" : "month"}
          //       </Button>
          //     )
          //   })}
          // </ul>
        }
      </div>
    </div>
  );
};

export default IndividualFREEPlan;

