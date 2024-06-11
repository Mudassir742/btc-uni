import { cn } from "@/utils/shadcn";
import React from "react";

interface H5TextProps {
  text: string;
  className?: string;
} 

const H5Text: React.FunctionComponent<H5TextProps> = ({
  text,
  className = "text-themeColor",
}) => {
  const StylesMobile: React.CSSProperties = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    lineHeight: "150%",
    overflow: "hidden",
    display: "-webkit-box",
    // WebkitLineClamp: "2", 
    WebkitBoxOrient: "vertical",
  };

  const StylesDesktop: React.CSSProperties = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "150%",
    overflow: "hidden",
    display: "-webkit-box",
    // WebkitLineClamp: "2", 
    WebkitBoxOrient: "vertical",
  };

  return (
    <>
      <div className="hidden md:block">
        <p className={cn("", className)} style={StylesDesktop}>
          {text}
        </p>
      </div>

      <div className="md:hidden">
        <p className={cn("", className)} style={StylesMobile}>
          {text}
        </p>
      </div>
    </>
  );
};

export default H5Text;
