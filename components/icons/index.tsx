import { FC, HTMLAttributes } from "react";
// Utils
import { cn } from "@/utils/shadcn";

interface IProps extends HTMLAttributes<HTMLOrSVGElement> {}

const FullStar: FC<IProps> = ({ className, ...props }) => {
  return (
    <svg
      className={cn("", className)}
      width="19"
      height="20"
      viewBox="0 0 19 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.5 14.75L3.91604 17.6857L4.98248 11.4678L0.464963 7.06434L6.70802 6.15717L9.5 0.5L12.292 6.15717L18.535 7.06434L14.0175 11.4678L15.084 17.6857L9.5 14.75Z"
        fill="#C4A18D"
      />
    </svg>
  ); 
};
const EmptyStar: FC<IProps> = ({ className, ...props }) => {
  return (
    <svg
      className={cn("", className)}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.6528 13.8649L10.1875 13.6202L9.72216 13.8649L5.93167 15.8576L6.65559 11.6369L6.74446 11.1187L6.36799 10.7517L3.30142 7.76258L7.53932 7.14678L8.05959 7.07118L8.29226 6.59974L10.1875 2.75955L12.0827 6.59974L12.3154 7.07118L12.8357 7.14678L17.0736 7.76258L14.007 10.7517L13.6305 11.1187L13.7194 11.6369L14.4433 15.8576L10.6528 13.8649Z"
        fill="white"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};

export { FullStar, EmptyStar };
