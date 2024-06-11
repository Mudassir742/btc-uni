import { cn } from "@/utils/shadcn";
import React from "react";

interface SH2TextProps {
  text: string;
  className?: string;
}

const SH2Text: React.FunctionComponent<SH2TextProps> = ({
  text,
  className,
}) => {
  const SH2TextStylesMobile: React.CSSProperties = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "normal",
    display: "-webkit-box",
    WebkitLineClamp: "2", // Limit to 2 lines
    WebkitBoxOrient: "vertical",
  };

  const SH2TextStylesDesktop: React.CSSProperties = {
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "normal",
    maxHeight: "3.6em", // Two lines with 1.8em line height
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2", // Limit to 2 lines
    WebkitBoxOrient: "vertical",

  };

  return (
    <>
      <div className="hidden md:block line-clamp-2">
        <p className={cn("", className)} style={SH2TextStylesDesktop}>
          {text}
        </p>
      </div>

      <div className="md:hidden line-clamp-2">
        <p className={cn("", className)} style={SH2TextStylesMobile}>
          {text}
        </p>
      </div>
    </>
  );
};

export default SH2Text;
