import { cn } from "@/utils/shadcn";
import React from "react";

interface ReviewCaptionProps {
  text: string;
  className?: string;
}

const ReviewCaption: React.FunctionComponent<ReviewCaptionProps> = ({
  text,
  className,
}) => {
  const StylesMobile: React.CSSProperties = {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "1", 
    WebkitBoxOrient: "vertical",
    flex: "none",
   
    textAlign: 'right',
  };

  const StylesDesktop: React.CSSProperties = {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "14px",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "1", 
    WebkitBoxOrient: "vertical",
    flex: "none",
    textAlign: 'right',
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

export default ReviewCaption;