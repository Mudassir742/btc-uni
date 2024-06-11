import { cn } from "@/utils/shadcn";
import React from "react";

interface EducatorsNameProps {
  text: string;
  className?: string;
  color?: string; 
}

const EducatorsName: React.FunctionComponent<EducatorsNameProps> = ({
  text,
  className ='text-[#A79A95]',

}) => {
  const mobileStyles: React.CSSProperties = {
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "150%", 

    WebkitLineClamp: "1", 
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
 
  };

  const desktopStyles: React.CSSProperties = {
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "600",
    lineHeight: "150%",
    overflow: "hidden",
    textOverflow: "ellipsis",

    WebkitLineClamp: "1", 
    WebkitBoxOrient: "vertical",
 
  };

  return (
    <>
       
      <div className="hidden md:block">
        <p className={`truncate ${className}`} style={desktopStyles} >
          {text}</p>
      </div>
      <div className="md:hidden overflow-x-auto whitespace-nowrap">
        <p className={`truncate ${className}`} style={mobileStyles}>
          {text}</p>
      </div>


     
    </>
  );
};

export default EducatorsName;
