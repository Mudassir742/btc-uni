import { cn } from "@/utils/shadcn";
import React from "react";

interface CardReviewsProps {
  text: string;
  className?: string;
}

const CardReviews: React.FunctionComponent<CardReviewsProps> = ({
  text,
  className,
}) => {
  const mobileStyles: React.CSSProperties = {
    overflow: "hidden",
    textOverflow: "ellipsis",
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "20px",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
  };

  const desktopStyles: React.CSSProperties = {
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "20px",
    maxHeight: "3.6em", // Two lines with 1.8em line height
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
  };

  return (
    <>
      <div className="hidden md:block line-clamp-2">
        <p className={cn("", className)} style={desktopStyles}>
          {text}
        </p>
      </div>

      <div className="md:hidden line-clamp-2">
        <p className={cn("", className)} style={mobileStyles}>
          {text}
        </p>
      </div>
    </>
  );
};

export default CardReviews;
