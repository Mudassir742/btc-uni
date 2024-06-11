import { cn } from "@/utils/shadcn";
import React from "react";

interface HerotextProps {
  text: string;
  className?: string;
}

const Herotext: React.FunctionComponent<HerotextProps> = ({
  text,
  className,
}) => {
  const HerotextStylesMobile: React.CSSProperties = {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "125%",
    overflow: "hidden",
    display: "-webkit-box",
    // WebkitLineClamp: "2", 
    WebkitBoxOrient: "vertical",
  };

  const HerotextStylesDesktop: React.CSSProperties = {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "22",
    lineHeight: "125%",
    overflow: "hidden",
    display: "-webkit-box",
    // WebkitLineClamp: "2", 
    WebkitBoxOrient: "vertical",
  };

  return (
    <>
      <div className="hidden md:block">
        <p className={cn("", className)} style={HerotextStylesDesktop}>
          {text}
        </p>
      </div>

      <div className="md:hidden">
        <p className={cn("", className)} style={HerotextStylesMobile}>
          {text}
        </p>
      </div>
    </>
  );
};

export default Herotext;
