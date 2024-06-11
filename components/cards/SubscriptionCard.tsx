"use client";
import { useCallback, useTransition } from "react";
// Utils
import { cn } from "@/utils/shadcn";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { createUrl } from "@/utils/url";
import { Button } from "../ui/Button";
// Components


const SubscriptionCard = ({ data: { price, id, pName, pDescription }, disabled }: {
    data: {
        price: number,
        pName: string,
        id: string,
        pDescription: string,
    },
    disabled?: boolean
}) => {
    const [pending, startTransition] = useTransition();
    const { replace } = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname();


    // Base option params on current params so we can preserve any other param state in the url.
    const optionSearchParams = new URLSearchParams(searchParams?.toString());

    // Update the option params using the current option to reflect how the url *would* change,
    // if the option was clicked.
    optionSearchParams.set("subscription", id);

    const subUrl = useCallback(() => {
        return createUrl(pathname!, optionSearchParams);
    }, [pathname, optionSearchParams])();


    return (
        <div className="p-2">

       
        <Button
            data-type={disabled}
            onClick={() => {
                startTransition(() => {
                    if (!disabled) {
                        replace(subUrl, { scroll: false });
                    }
                })
            }}
            className=
            {cn(
                [" border-[1px] p-1 bg-white text-themeColor border-border font-bold flex  justify-between gap-x-2 cursor-pointer   py-4 px-4 rounded-xl",
                "data-[type=true]:!cursor-not-allowed"
            ]
            , 
            {
                " bg-themecolor text-white": searchParams?.get("subscription") === id,

                "cursor-not-allowed": pending

            })}>

<div className="flex justify-center">
     
               {/* {pName} */}
             <span className="">
             {price ? `$${(price / 100).toFixed(2)}` : "Free"} / {pDescription}
             </span>
      
            
     </div>

     
            {/* <h2 className="flex flex-col">
                {pName}
                <span className="font-normal mt-0.5 text-themeColor">
                    {pDescription}
                </span>
            </h2>
            <span className="uppercase">
                {price ? `$${(price / 100).toFixed(2)}` : "Free"}
            </span> */}
        </Button>
        </div>
    )
}


export default SubscriptionCard

    // <div className = "flex justify-center" >

    //     <Button className="justify-center" onClick={onClick}>
    //         {/* {pName} */}
    //         <span className="text-white">
    //             {price ? `$${(price / 100).toFixed(2)}` : "Free"} / {pDescription}
    //         </span>

    //     </Button>
    //  </div >