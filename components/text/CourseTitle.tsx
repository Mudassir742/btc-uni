import { cn } from "@/utils/shadcn";
import React from "react";
import { Poppins } from 'next/font/google'

interface CourseTitleProps {
  text: string;
  className?: string;
}

const CourseTitle: React.FunctionComponent<CourseTitleProps> = ({
  text,
  className = "text-themeColor",
}) => {
  const mobileStyles: React.CSSProperties = {
    overflow: "hidden",
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "150%",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2", 
    WebkitBoxOrient: "vertical",
  };

  const desktopStyles: React.CSSProperties = {

    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "150%",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2", 
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

export default CourseTitle;
