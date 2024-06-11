import { cn } from "@/utils/shadcn";
import React from "react";
import styles from '@/styles/richText.module.css'


interface YouWillLearnTextProps {
  text: string; // HTML content as a string
  className?: string;
  fontWeight?: number;
 color?: string; // Add color prop with a default value of "white"
}

const YouWillLearnText: React.FunctionComponent<YouWillLearnTextProps> = ({
  text,
  className,
  fontWeight = 400,
  color,
}) => {
  const mobileStyles: React.CSSProperties = {
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: fontWeight.toString(),
    lineHeight: "normal",
    color: color,


    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: "3",
    WebkitBoxOrient: "vertical",
  };

  const desktopStyles: React.CSSProperties = {
    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: fontWeight.toString(),
    lineHeight: "normal",
    color: color,


    overflow: "hidden",
    textOverflow: "ellipsis",
    WebkitLineClamp: "3",
    WebkitBoxOrient: "vertical",
    
  };

  return ( 
    <>
      
      <div className="hidden md:block">
        <p className={className} style={desktopStyles} dangerouslySetInnerHTML={{ __html: text }} />
      </div>
      <div className="md:hidden overflow-x-auto">
        <p className={className} style={mobileStyles} dangerouslySetInnerHTML={{ __html: text }} />
      </div>

      

    </>
  );
};

export default YouWillLearnText;
