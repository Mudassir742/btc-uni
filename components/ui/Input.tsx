import * as React from "react";

import { cn } from "@/utils/shadcn";
import { VariantProps, cva } from "class-variance-authority";



const inputVariants = cva("flex h-14 w-full px-4 py-2 text-[16px] ring-offset-white file:border-0 file:bg-transparent file:text-[16px] file:font-medium placeholder:text-lightgrey focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-800 rounded-md placeholder:font-medium",
  {
    variants: {
      variant: {
        default: "bg-themecolor-50",
        withOutline: "bg-transparent border border-border placeholder:text-themeColor ",
        withOutlineV2: " border border-border placeholder:text-themeColor  rounded-xl"

      },

      _size: {
        default: "h-14",
        md: "h-12",
        lg: "h-16",
      },
    },
    defaultVariants: {
      variant: "default",
      _size: "default",
    },
  }
);


export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputVariants> {
  asChild?: boolean;
}



const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, _size, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, _size, className }))}

        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
