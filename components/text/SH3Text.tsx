import { cn } from "@/utils/shadcn";
import React from "react";

interface SH3TextProps {
  text: string;
  className?: string;
}

const SH3Text: React.FunctionComponent<SH3TextProps> = ({
  text,
  className,
}) => {
  const StylesMobile: React.CSSProperties = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "500",
    lineHeight: "normal",
    display: "-webkit-box",
    WebkitLineClamp: "2", // Limit to 2 lines
    WebkitBoxOrient: "vertical",
  };

  const StylesDesktop: React.CSSProperties = {
    fontSize: "16px",
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
        <p className={cn("", className)} style={StylesDesktop}>
          {text}
        </p>
      </div>

      <div className="md:hidden line-clamp-2">
        <p className={cn("", className)} style={StylesMobile}>
          {text}
        </p>
      </div>
    </>
  );
};

export default SH3Text;
