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
import H3Text from "../text/H3Text";
import H1Text from "../text/H1Text";

// Components

interface IProps extends HTMLAttributes<HTMLDivElement> {
  plansData: Stripe.Product[];
  needNewSub?: boolean
}

const IndividualPlans: FC<IProps> = ({ plansData, needNewSub = false, className, ...props }) => {
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
      <div className="">
        {
          isGift ?
            <Button
              size={"subOptions"}
              variant={"primary"}
              onClick={() => {
                const newSearchParams = new URLSearchParams(searchParams!);
                newSearchParams.set("subscription", annualSub);
                startTransition(() => {
                  NProgress.start();
                  if (needNewSub) {
                    push(createUrl(`/checkout/${newSearchParams.get("subscription")}`, newSearchParams))

                  } else {
                    push(createUrl("/signup", newSearchParams))
                  }
                })
              }}
              disabled={pending}
            >
              Claim your gift
            </Button>
            :
            <ul className="gap-y-2 md:flex md:slider-container md:justify-center">
              <li className="cursor-pointer">
                <Image onClick={() => {
                  newSearchParams.set("subscription", annualSub);
                  // Coupon code
                  newSearchParams.set("couponId", 'NEWANNUAL');
                  startTransition(() => {
                    NProgress.start();
                    if (needNewSub) {
                      push(createUrl(`/checkout/${newSearchParams.get("subscription")}`, newSearchParams))

                    } else {
                      push(createUrl("/signup", newSearchParams))
                    }
                  })
                }} width={327} height={156} 
                  // src={transformWpUrl('https://cms.btcuniversity.com/wp-content/uploads/2024/01/BTC-U-2.0-social-media-for-hairdressers-400-x-532-px-1080-x-5000-px_01.png')} 
                  src={'https://cms.btcuniversity.com/wp-content/uploads/2024/01/BTC-U-2.0-social-media-for-hairdressers-400-x-532-px-1080-x-5000-px_01.png'} 
                  className="w-full" alt="1 year subscription" 
                />
              </li>
              <li className="cursor-pointer">
                <Image onClick={() => {
                  newSearchParams.set("subscription", biannual);
                  startTransition(() => {
                    NProgress.start();
                    if (needNewSub) {
                      push(createUrl(`/checkout/${newSearchParams.get("subscription")}`, newSearchParams))

                    } else {
                      push(createUrl("/signup", newSearchParams))
                    }
                  })
                }} width={327} height={156} 
                  // src={transformWpUrl('https://cms.btcuniversity.com/wp-content/uploads/2024/01/BTC-U-2.0-social-media-for-hairdressers-400-x-532-px-1080-x-5000-px_02.png')} 
                  src={'https://cms.btcuniversity.com/wp-content/uploads/2024/01/BTC-U-2.0-social-media-for-hairdressers-400-x-532-px-1080-x-5000-px_02.png'} 
                  className="w-full" alt="6 months subscription" />
              </li>
{/* monthly sub-pulled per mary on jan 25, 2024 -briana */}

              {/* <li className="cursor-pointer">
                <Image onClick={() => {
                  newSearchParams.set("subscription", monthlySub);
                  // Coupon code
                  newSearchParams.set("couponId", 'NEWMONTHLY');
                  startTransition(() => {
                    NProgress.start();
                    if (needNewSub) {
                      push(createUrl(`/checkout/${newSearchParams.get("subscription")}`, newSearchParams))

                    } else {
                      push(createUrl("/signup", newSearchParams))
                    }
                  })
                }} width={327} height={156} 
                  // src={transformWpUrl('https://cms.btcuniversity.com/wp-content/uploads/2024/01/BTC-U-2.0-social-media-for-hairdressers-400-x-532-px-1080-x-5000-px_03.png')} 
                  src={'https://cms.btcuniversity.com/wp-content/uploads/2024/01/BTC-U-2.0-social-media-for-hairdressers-400-x-532-px-1080-x-5000-px_03.png'} 
                  className="w-full" alt="1 month subscription" />
              </li> */}

              

              

              {/* <li className="cursor-pointer">
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
                }} width={327} height={156} src={transformWpUrl('https://cms.btcuniversity.com/wp-content/uploads/2024/01/free.png')} className="w-full" alt="Free subscription" />
              </li> */}
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

export default IndividualPlans;

