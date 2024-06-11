import { cn } from "@/utils/shadcn";
import React from "react";

interface SubCategoryTextProps {
  text: string;
  className?: string;
}

const SubCategoryText: React.FunctionComponent<SubCategoryTextProps> = ({
  text,
  className,
}) => {
  const StylesMobile: React.CSSProperties = {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "12px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "1", 
    WebkitBoxOrient: "vertical",
  };

  const StylesDesktop: React.CSSProperties = {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "1", 
    WebkitBoxOrient: "vertical",


  };

  return (
    <>
      <div className="hidden md:block line-clamp-1">
        <p className={cn("", className)} style={StylesDesktop}>
          {text}
        </p>
      </div>

      <div className="md:hidden line-clamp-1">
        <p className={cn("", className)} style={StylesMobile}>
          {text}
        </p>
      </div>
    </>
  );
};

export default SubCategoryText;