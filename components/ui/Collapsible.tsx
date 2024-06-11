"use client";
import { Dispatch, FC, HTMLAttributes, SetStateAction } from "react";
// Utils
import { cn } from "@/utils/shadcn";

interface IProps extends HTMLAttributes<HTMLButtonElement> {
  setShow: Dispatch<SetStateAction<boolean>>;
}

const Collapsible: FC<IProps> = ({
  className,
  setShow,
  children,
  ...props
}) => {
  return (
    <button
      onClick={() => setShow((prev) => !prev)}
      type="button"
      className="flex capitalize items-center text-left cursor-pointer text-15 font-bold  gap-x-3 text-lightgrey"
      {...props}
    >
      {children}
    </button>
  );
};

export default Collapsible;
