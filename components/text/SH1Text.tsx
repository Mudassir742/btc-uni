import { cn } from "@/utils/shadcn";
import React from "react";

interface SH1TextProps {
  text: string;
  className?: string; 
  color?: string;
}

const SH1Text: React.FunctionComponent<SH1TextProps> = ({
  text,
  className = "text-themeColor",
  color
}) => {
  const SH1TextStylesMobile: React.CSSProperties = {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "20px",
    // fontSize: "20px",
    display: "flex",
    // textTransform: "uppercase",
    color: color,
    letterSpacing: "-1px",
    flex: "none",
  };

  const SH1TextStylesDesktop: React.CSSProperties = {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "24px",
    lineHeight: "150%",
    display: "flex",
    letterSpacing: "-1px",
    // textTransform: "uppercase",
    color: color,

    flex: "none",
  };

  return (
    <>
      <div className="hidden md:block">
        <p className={cn("", className)} style={SH1TextStylesDesktop}>
          {text}
        </p>
      </div>

      <div className="md:hidden">
        <p className={cn("", className)} style={SH1TextStylesMobile}>
          {text}
        </p>
      </div>
    </>
  );
};

export default SH1Text;