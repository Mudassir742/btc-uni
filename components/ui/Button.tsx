import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/shadcn";
const themeColor = '#523D34'

const buttonVariants = cva(
  "inline-flex duration-300 whitespace-nowrap items-center text-themecolor-500 justify-center disabled:!cursor-not-allowed rounded-[44px] text-[14px] md:text-[16px] font-medium  ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-2  text-16 !duration-300 disabled:border-border disabled:!shadow-none disabled:text-blackV1/40 disabled:bg-[#A99E9A] disabled:border-[#A99E9A]",
  {
    variants: {
      variant: {
        primary: "bg-themecolor-500 border-[2px] border-themecolor-500 text-white  ",
        secondary: "bg-transparent border-[2px] border-themecolor-500 text-themecolor-500 ",
        light: "bg-[#FAF3F0] border-[2px] border-[#FAF3F0]  w-full  ",
        white: "bg-white  w-full border-[2px] border-border text-themecolor-500 ",
        outline: "bg-transparent w-full border-[2px] border-border ",
        homepage: "bg-white ",
        underlineText: "bg-transparent underline whitespace-pre",
        combobox:
          `lg:max-w-sm w-full h-14 font-bold mt-5 bg-transparent 
          justify-between text-themecolor-500 border-[1px] border-themecolor-500 bg-transparent`,
      },
      align: {
        default: "",
        center: "mx-auto block"
      },
      // colors: {
      //   default: "",
      //   themecolor: "bg-themecolor-500 text-white disabled:bg-gray-300",
      //   beige: "bg-themeColor text-white hover:bg-beige/90 disabled:bg-opacity-50",
      //   combobox: "bg-transparent text-themeColor",
      // },
      size: {
        default: "h-[42px] w-full md:max-w-[400px] gap-2 md:gap-3 py-0 px-[20px] md:py-[16px] md:px-[32px] ",
        sm: "h-10 px-3 gap-2.5 md:gap-2.5 ",
        subOptions: "h-14 px-4 py-2  w-[14.438rem]",


        lg: 'h-10 px-4 py-2 w-full',
        combobox: "h-10 px-4 py-2",
        icon: "h-10 w-10",
        "w-full": "h-10 px-4 py-2 w-full",
        downloadbutton: "w-full h-[42px]",
      },
    },
    defaultVariants: {
      variant: "primary",
      // colors: "default",
      size: "default",
      align: "default"
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      align,
      // colors,
      asChild = false,
      isLoading = false,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, align, className }))}
        disabled={isLoading}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };