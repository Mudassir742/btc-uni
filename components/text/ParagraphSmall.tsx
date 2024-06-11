import { cn } from "@/utils/shadcn";
import React from "react";
import styles from '@/styles/richText.module.css'


interface ParagraphSmallProps {
  text: string; // HTML content as a string
  className?: string;
  fontWeight?: number;
  color?: string; // Add color prop with a default value of "white"
}

const ParagraphSmall: React.FunctionComponent<ParagraphSmallProps> = ({
  text,
  className,
  fontWeight = 400,
  color = ""
}) => {
  const mobileStyles: React.CSSProperties = {
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: fontWeight.toString(),
    lineHeight: "normal",
    display: "inline-block",
    color: color,
  };

  const desktopStyles: React.CSSProperties = {
    fontSize: "12px",
    fontStyle: "normal",
    fontWeight: fontWeight.toString(),
    lineHeight: "normal",
    display: "inline-block",
    color: color,
  };

  return (
    <>
      <div className="hidden md:block  ">
        <div
          className={cn(`${styles.postContent}`, className)}
          style={desktopStyles}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>

      <div className="md:hidden  ">
        <div
          className={cn(`${styles.postContent}`, className)}
          style={mobileStyles}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    </>
  );
};

export default ParagraphSmall;
