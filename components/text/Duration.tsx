import { cn } from "@/utils/shadcn";
import React from "react";
import styles from '@/styles/richText.module.css'


interface DurationTextProps {
  text: string; // HTML content as a string
  className?: string;
  fontWeight?: number;
  color?: string; // Add color prop with a default value of "white"
}

const DurationText: React.FunctionComponent<DurationTextProps> = ({
  text,
  className,
  fontWeight = 600,
  color = "white"
}) => {
  const mobileStyles: React.CSSProperties = {
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: fontWeight.toString(),
    lineHeight: "150%",
    display: "inline-block",
    color: color,
    paddingRight: "10px", 
    paddingLeft: "10px", 
    paddingTop: "6px", 
    paddingBottom: "6px", 
    borderRadius: "8px",
    // backgroundColor: "black",
    // opacity: '0.4',
    background: "rgba(0, 0, 0, 0.4)", 
  };

  const desktopStyles: React.CSSProperties = {
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: fontWeight.toString(),
    lineHeight: "150%",
    display: "inline-block",
    color: color,
    paddingRight: "10px",
    paddingLeft: "10px",
    paddingTop: "6px",
    paddingBottom: "6px",
    borderRadius: "8px",
    // backgroundColor: "black",
    // opacity: '0.4',
    background: "rgba(0, 0, 0, 0.4)", 
  };

  return (
    <>  
      <div className="hidden md:block justify-center pl-2 w-full">
        <div
          className={cn(`${styles.postContent}`, className)}
          style={desktopStyles}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>

      <div className="md:hidden flex justify-center pl-2 w-full">
        <div
          className={cn(`${styles.postContent}`, className)}
          style={mobileStyles}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </>
  );
};

export default DurationText;
