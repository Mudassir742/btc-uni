import { cn } from "@/utils/shadcn";
import React from "react";

interface ButtonTextProps {
  text: string;
  className?: string;
  color?: string;
}

const ButtonText: React.FunctionComponent<ButtonTextProps> = ({
  text,
  className = "text-themeColor",
  color
}) => {
  const StylesMobile: React.CSSProperties = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "14px",
    display: "flex",
    color: color,
    lineHeight: "150%",
    flex: "none",
  };

  const StylesDesktop: React.CSSProperties = {
    fontStyle: "normal",
    fontWeight: "600",
    fontSize: "16px",
    display: "flex",
    lineHeight: "150%",
    color: color,

    flex: "none",
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

export default ButtonText;