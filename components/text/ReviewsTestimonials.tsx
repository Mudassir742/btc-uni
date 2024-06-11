import { cn } from "@/utils/shadcn";
import React from "react";

interface ReviewsTestimonialsProps {
  text: string;
  className?: string;
}

const ReviewsTestimonials: React.FunctionComponent<ReviewsTestimonialsProps> = ({
  text,
  className,
}) => {
  const mobileStyles: React.CSSProperties = {

    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "162.023%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "6", 
    WebkitBoxOrient: "vertical",

  };

  const desktopStyles: React.CSSProperties = {
 
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "162.023%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "6", 
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

export default ReviewsTestimonials;
