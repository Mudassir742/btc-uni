import { cn } from "@/utils/shadcn";
import React from "react";

interface ProfileDateorSubCatProps {
  text: string;
  className?: string;
}

const ProfileDateorSubCat: React.FunctionComponent<ProfileDateorSubCatProps> = ({
  text,
  className,
}) => {
  const stylesMobile: React.CSSProperties = {
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "400",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "1", 
    WebkitBoxOrient: "vertical",
    letterSpacing: "-0.5px",
    lineHeight: '150%',
  };

  const stylesDesktop: React.CSSProperties = {
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "1", 
    WebkitBoxOrient: "vertical",
    letterSpacing: "-0.5px",
    lineHeight: '150%',
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

export default ProfileDateorSubCat;
