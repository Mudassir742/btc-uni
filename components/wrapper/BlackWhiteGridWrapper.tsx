"use client"
import { FC, HTMLAttributes, createContext, useContext } from 'react'
// Utils
import { cn } from '@/utils/shadcn'
import Image from 'next/image'



interface IProps extends HTMLAttributes<HTMLDivElement> {
    variant?: "default" | "v2" | "v3"
    image?: string;
}



const BlackWhiteGridContext = createContext<{ variant: "default" | "v2" | "v3"}>({ variant: 'default' });

export const useBlackWhiteGridContext = () => useContext(BlackWhiteGridContext);



const BlackWhiteGridWrapper: FC<IProps> = ({ className, variant = "default", children, ...props }) => {
    return (
        <div className={cn("w-full  relative", className)}>
            {/* For full width gray and white effect */}
            <BGBlackWhiteGrid className='min-h-screen' />
            <BlackWhiteGridContext.Provider value={{ variant }}>
                <div className={cn(" min-h-screen gap-x-10 2xl:gap-x-28 grid grid-cols-1 gap-y-10 md:grid-cols-2", {
                    "2xl:gap-x-0 2xl:wrapper gap-x-0": variant === "v2" || variant === "v3",
                    "lg:wrapper": variant !== "v2",
                    "!px-0 gap-y-4": variant === "v3"
                })}>
                    {children}
                </div>
            </BlackWhiteGridContext.Provider>
        </div>
    )
}





const BlackWhiteGridLeftContent: FC<IProps> = ({ className, children, image, ...props }) => {
    const { variant } = useBlackWhiteGridContext();

    return (
        <div className={cn(["w-full h-full   hidden md:block", className], {
            "block order-last md:order-first ": variant === "v2",
            "py-0 ": variant === "default"
        })} {...props}>

            {image ? (
                <div className='flex justify-center  h-full w-full'>
                    <div style={{ maxWidth: '100%' }}>
                        <Image
                            alt="btc university"
                            src={image}
                            width={17000}
                            height={1000}
                            className="md:my-auto rounded-xl"
                        />
                    </div>
                </div>
            ) : (
                <div>
                    {children}
                </div>
            )}


        </div>
    );
};





const BlackWhiteGridRightContent: FC<Omit<IProps, "variant">> = ({ className, children, ...props }) => {
    const { variant } = useBlackWhiteGridContext();

    return (
        <div className={cn(["w-full ", className], {
            "pb-4": variant === "v2"
        })} {...props}>
            {children}
        </div>
    )
}
const BGBlackWhiteGrid: FC<Omit<IProps, "variant">> = ({ className, ...props }) => {
    return (
        <div className={cn("grid h-full md:gap-x-10 lg:gap-x-20 grid-cols-1 md:grid-cols-2 w-full absolute -z-10", className)}
            {...props}>
            <div className="h-full hidden md:block  bg-transparent">
            </div>
            <div className="h-full">
            </div>
        </div>
    )
}

export { BlackWhiteGridLeftContent, BlackWhiteGridRightContent, BlackWhiteGridWrapper }