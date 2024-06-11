"use client"
import { ChevronDown } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { createUrl } from "@/utils/url"
import { cn } from "@/utils/shadcn"
// Components
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/Popover"
import { FC } from "react"
import { Button } from "@/components/ui/Button"
import ButtonText from "@/components/text/ButtonText"

interface IProps extends React.HTMLAttributes<HTMLDivElement> { }

const Sort: FC<IProps> = ({ className }) => {
    const searchParams = useSearchParams()
    const newSearchParams = new URLSearchParams(searchParams!)
    const { replace } = useRouter();

    return (
        <div className={cn(className)}>
            <Popover key={newSearchParams.get("sort")}>
                <PopoverTrigger className="flex items-center gap-x-2 text-20 font-semibold text-themeColor">
                    <Button variant={"secondary"}>
                        Sort by<ChevronDown />
                    </Button> 
                </PopoverTrigger>
                <PopoverContent className="p-0 py-2">
                    <div className="flex flex-col  duration-300 font-normal">
                        <button className="hover:bg-themecolor-100 border-b  relative px-5 py-2" onClick={() => {
                            newSearchParams.set("sort", "asc")
                            replace(createUrl(location.pathname, newSearchParams))
                        }}>
                            {
                                newSearchParams.get("sort") === "asc" &&
                                <span className="h-full absolute bg-themecolor-500 w-1 top-0 left-0"></span>
                            }
                            <ButtonText text="Newest First"/> 
                        </button>

                        <button
                            className="hover:bg-themecolor-100  relative px-5 py-2"
                            onClick={() => {
                                newSearchParams.set("sort", "desc")
                                replace(createUrl(location.pathname, newSearchParams))
                            }}>
                            {
                                newSearchParams.get("sort") === "desc" &&
                                <span className="h-full absolute bg-themecolor-500 w-1 top-0 left-0"></span>
                            }
                            <ButtonText text="Oldest First" /> 
                        </button>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}

export default Sort