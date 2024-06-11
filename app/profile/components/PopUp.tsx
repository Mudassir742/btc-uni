"use client"
import Image from "next/image"
import welcome from "@/public/images/welcome.svg"
import { Button } from "@/components/ui/Button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/Dialog"
import { useRouter, useSearchParams } from "next/navigation"
import { createUrl } from "@/utils/url"
import { FC, useTransition } from "react"
import WelcomeComponent from "@/components/WelcomeComponent"
import { ScrollArea } from "@/components/ui/ScrollArea"
import { UserSession } from "@/interfaces"

interface IProps {
    user: UserSession;
    customerName: string
    customerEmail: string
}

const PopUp: FC<IProps> = ({
    user,
    customerName,
    customerEmail,
}) => {
    const router = useRouter();
    const [pending, startTransition] = useTransition();
    const searchParams = useSearchParams();
    const isOpen = searchParams?.get("welcomePopUp") == "true" ? true : false;



    return (
        <div className="w-full">

            <Dialog defaultOpen={isOpen} onOpenChange={() => {
                const newSearchParams = new URLSearchParams(searchParams!);
                newSearchParams.delete("welcomePopUp");
                router.replace(createUrl(location.pathname, newSearchParams))
            }} >
                {/* <DialogTrigger asChild>
                        <Button variant="light">Share</Button>
                    </DialogTrigger> */}
                <DialogContent className="">
                    <ScrollArea className="">

                        <DialogHeader>

                        </DialogHeader>
                        <div className="flex flex-col items-center space-y-7">
                            {/* <Image
                                src={welcome}
                                alt="welcome"
                                width={1000}
                                height={1000}
                                className="w-40 h-40 object-contain"
                            /> */}
                            <WelcomeComponent email={customerEmail} customerName={`
                            ${customerName.at(0)?.toUpperCase()}${customerName.slice(1)}`
                            } />

                        </div>
                        <DialogFooter className=" mt-1 mb-3">
                            <DialogClose asChild>
                                <Button disabled={pending} type="button"
                                    className="mx-auto"
                                    variant="secondary" onClick={() => {
                                        startTransition(() => {
                                            const newSearchParams = new URLSearchParams(searchParams!);
                                            newSearchParams.delete("welcomePopUp");
                                            router.replace(createUrl(location.pathname, newSearchParams))
                                        })
                                    }}>
                                    Continue To Account
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </ScrollArea>

                </DialogContent>
            </Dialog>
        </div>
    )
}

export default PopUp