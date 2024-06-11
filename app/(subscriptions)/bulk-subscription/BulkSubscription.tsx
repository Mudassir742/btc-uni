"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"

import { subscriptionQty, annualSub } from "@/lib/constants"
import { cn } from "@/utils/shadcn"

import { Button } from "@/components/ui/Button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/Command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/Popover"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { createUrl } from "@/utils/url"
import { getEachGiftPriceInCents } from "@/utils/price"



interface IProps extends React.HTMLAttributes<HTMLDivElement> {
    priceInCents: number
}
export function BulkSubscription({ className, priceInCents }: IProps) {
    const [open, setOpen] = React.useState(false)

    const searchParams = useSearchParams();

    const [pending, startTransition] = React.useTransition();
    const { replace, push } = useRouter()
    const value = searchParams?.get("qty");

    const newSearchParams = new URLSearchParams(searchParams!);
    newSearchParams.set("subscription", annualSub)
    return (
        <div className={cn("relative ", className)}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger className="w-full" asChild>
                    <Button
                        variant="combobox"
                        role="combobox"
                        size={"combobox"}
                        
                        aria-expanded={open}
                    >
                        {value
                            ? `${subscriptionQty.find((qty) => qty === value)} Subscriptions`
                            : "Number of Subscriptions"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 -mt-[3px] w-popover-content-width-same-as-its-trigger
                max-h-popover-content-width-same-as-its-trigger
                ">
                    <Command className="!w-full  bg-transparent">
                        <CommandInput placeholder="Number of subscriptions" />
                        <CommandEmpty>No Subscription found.</CommandEmpty>
                        {/* <ScrollArea className="max-h-48"> */}
                        <CommandGroup className="!h-full max-h-48 overflow-y-auto ">
                            {subscriptionQty.map((qty) => (
                                <CommandItem
                                    key={qty}
                                    value={qty}
                                    className="!h-full text-themeColor"
                                    onSelect={(currentValue: any) => {
                                        setOpen(false)
                                        startTransition(() => {
                                            if (currentValue !== value) {
                                                newSearchParams.set("qty", currentValue)
                                            } else {
                                                newSearchParams.delete("qty")
                                            }
                                            replace(createUrl("/bulk-subscription", newSearchParams), {
                                                scroll: false
                                            })
                                        })
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === qty ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    <div className="flex w-full justify-between ">
                                        <span className="text-themeColor">
                                            {qty} Subscriptions
                                        </span>
                                        <span className="pr-2">

                                            {`($${getEachGiftPriceInCents(Number(qty), priceInCents) / 100} each) `}
                                        </span>
                                    </div>
                                </CommandItem>
                            ))}
                        </CommandGroup>
                        {/* </ScrollArea> */}
                    </Command>
                </PopoverContent>
            </Popover>
            <Button
                // colors={"default"}
                
                className="w-full mt-7 "
                disabled={pending || !value}
                onClick={() => {
                    startTransition(() => {
                        push(createUrl(`/signup`, searchParams!))
                    })
                }}
            >
                Continue
            </Button>
        </div>
    )
}
