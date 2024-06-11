import { cn } from "@/utils/shadcn";
import React from "react";

interface H4TextProps {
  text: string;
  className?: string;
} 

const H4Text: React.FunctionComponent<H4TextProps> = ({
  text,
  className = "text-themeColor",
}) => {
  const StylesMobile: React.CSSProperties = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
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
    fontSize: "24px",
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

export default H4Text;
