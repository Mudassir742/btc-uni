import { cn } from "@/utils/shadcn";
import React from "react";

interface ProfileCourseTitleProps {
  text: string;
  className?: string;
}

const ProfileCourseTitle: React.FunctionComponent<ProfileCourseTitleProps> = ({
  text,
  className,
}) => {
  const stylesMobile: React.CSSProperties = {
    fontSize: "14px",
    fontStyle: "normal",
    fontWeight: "500",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2", 
    WebkitBoxOrient: "vertical",
    letterSpacing: "-0.5px",
    lineHeight: '140%',
  };

  const stylesDesktop: React.CSSProperties = {
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "500",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2", 
    WebkitBoxOrient: "vertical",
    letterSpacing: "-0.5px",
    lineHeight: '140%',
  };

  return (
    <>
      <div className="hidden md:block line-clamp-2">
        <p className={cn("", className)} style={stylesDesktop}>
          {text}
        </p>
      </div>

      <div className="md:hidden line-clamp-2">
        <p className={cn("", className)} style={stylesMobile}>
          {text}
        </p>
      </div>
    </>
  );
};

export default ProfileCourseTitle;
