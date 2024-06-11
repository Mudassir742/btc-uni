import { FC, HTMLAttributes } from "react";
// Utils
import { cn } from "@/utils/shadcn";
interface IRadioHeaderProps extends HTMLAttributes<HTMLHeadingElement> {}

export const FormHeader: FC<IRadioHeaderProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <h2 className={cn("text-3xl font-normal", className)} {...props}>
      {children}
    </h2>
  );
};
