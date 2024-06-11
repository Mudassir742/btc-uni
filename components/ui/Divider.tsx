import { FC, HTMLAttributes } from "react";
// Utils
import { cn } from "@/utils/shadcn";

interface IProps extends HTMLAttributes<HTMLDivElement> {}

const Divider: FC<IProps> = ({ className, ...props }) => {
  return <div className={cn("h-[1px] w-full bg-black ", className)} {...props}></div>;
};

export default Divider;
