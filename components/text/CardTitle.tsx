import { cn } from "@/utils/shadcn";
import React from "react";

interface CardTitleProps {
  text: string;
  className?: string;
}

const CardTitle: React.FunctionComponent<CardTitleProps> = ({
  text,
  className,
}) => {
  const cardTitleStylesMobile: React.CSSProperties = {
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2", 
    WebkitBoxOrient: "vertical",
  };

  const cardTitleStylesDesktop: React.CSSProperties = {
    fontSize: "18px",
    fontStyle: "normal",
    fontWeight: "400",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "2", 
    WebkitBoxOrient: "vertical",
  };

  return (
    <>
      <div className="hidden md:block line-clamp-2">
        <p className={cn("", className)} style={cardTitleStylesDesktop}>
          {text}
        </p>
      </div>

      <div className="md:hidden line-clamp-2">
        <p className={cn("", className)} style={cardTitleStylesMobile}>
          {text}
        </p>
      </div>
    </>
  );
};

export default CardTitle;
