import { cn } from "@/utils/shadcn";
import React from "react";

interface H3TextProps {
  text: string;
  className?: string;
}

const H3Text: React.FunctionComponent<H3TextProps> = ({
  text,
  className = "text-themeColor",
}) => {
  const StylesMobile: React.CSSProperties = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "150%",
    overflow: "hidden",
    display: "-webkit-box",
    // WebkitLineClamp: "2", 
    WebkitBoxOrient: "vertical",
    letterSpacing: "-1px",

  };

  const StylesDesktop: React.CSSProperties = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "32px",
    lineHeight: "150%",
    overflow: "hidden",
    display: "-webkit-box",
    // WebkitLineClamp: "2", 
    WebkitBoxOrient: "vertical",
    letterSpacing: "-1px",
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

export default H3Text;
