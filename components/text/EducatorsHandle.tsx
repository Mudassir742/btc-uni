import { cn } from "@/utils/shadcn";
import React from "react";

interface EducatorsHandleProps {
  text: string;
  className?: string;
}

const EducatorsHandle: React.FunctionComponent<EducatorsHandleProps> = ({
  text,
  className,
}) => {
  const educatorsHandleStylesMobile: React.CSSProperties = {
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "136.023%",
  
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",



  };

  const educatorsHandleStylesDesktop: React.CSSProperties = {
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "136.023%",
 
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
  };

  return (
    <>

<div className="hidden md:block">
        <p className={`truncate ${className}`} style={educatorsHandleStylesDesktop}>{text} </p>
      </div>
      <div className="md:hidden overflow-x-auto whitespace-nowrap">
        <p className={`truncate ${className}`} style={educatorsHandleStylesMobile}>{text}</p>
      </div>

 


 
      {/* <div className="hidden md:block">
        <h2 className={cn("", className)} style={educatorsHandleStylesDesktop}>
          {text}
        </h2>
      </div>

      <div className="md:hidden">
        <h2 className={cn("", className)} style={educatorsHandleStylesMobile}>
          {text}
        </h2>
      </div> */}
    </>
  );
};

export default EducatorsHandle;
