import { cn } from "@/utils/shadcn";
import React from "react";
import { Poppins } from 'next/font/google'

interface CardHandleProps {
  text: string;
  className?: string;
}

const CardHandle: React.FunctionComponent<CardHandleProps> = ({
  text,
  className,
}) => {
  const mobileStyles: React.CSSProperties = {
    overflow: "hidden",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "1", 
    WebkitBoxOrient: "vertical",
  };

  const desktopStyles: React.CSSProperties = {

    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "1", 
    WebkitBoxOrient: "vertical",
  };

  return (
    <>
      <div className="hidden md:block line-clamp-2">
        <p className={cn("", className)} style={desktopStyles}>
          {text}
        </p>
      </div>

      <div className="md:hidden line-clamp-2">
        <p className={cn("", className)} style={mobileStyles}>
          {text}
        </p>
      </div>
    </>
  );
};

export default CardHandle;
