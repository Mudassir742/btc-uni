"use client";
import React, { useState, useEffect, useRef, CSSProperties } from "react";
import DOMPurify, {  } from "dompurify";
import styles from "@/styles/richText.module.css";
import H3Text from "./text/H3Text";

const maxLines = 6;

interface EducatorCardProps {
  educatorContent: string;
  themeColor: string;
}
const AboutTheEducatorLongBio: React.FC<EducatorCardProps> = ({ educatorContent, themeColor }) => {
  let screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;

  const [expanded, setExpanded] = useState(screenWidth > 700 ? false : false);

  const truncatedStyle: CSSProperties = {
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: `${maxLines}`,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    backgroundImage: "linear-gradient(to bottom, #523D34, #e6e6e6)", // Gradient from black to gray
    WebkitBackgroundClip: "text",
    color: "transparent",
    
  };
  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  if (!educatorContent) {
    return null;
  }

  const sanitizedHTML = DOMPurify.sanitize(educatorContent);

  return (
    <div >
      <div className="text-themeColor">


        <H3Text text="Bio" />
        <div className="space-under-category-titles" />

        {/* <div style={expanded ? {} : truncatedStyle}>
        <div>{parsedHTML}</div>
      </div> */}
        
        <div className="md:hidden">
          {sanitizedHTML && (
            <div style={expanded ? {} : truncatedStyle}>
              <div
                className={`${styles.postContent} `}
                dangerouslySetInnerHTML={{ __html: sanitizedHTML as string }}
              />
            </div>
          )}
          {/* <div className=" text-gray-400 flex justify-center py-2">
        <Button
          onClick={toggleExpansion}
          className="md:hidden cursor-pointer"
        >
          {expanded ? 'View Less' : 'View More'}
        </Button>
      </div> */}

          <button
            className="float-right mt-[-10px] mr-2" // Apply absolute positioning and adjust top, right, margin values
            onClick={toggleExpansion}
          >
            {expanded ? (
              <div className="text-sm">... less</div>
            ) : (
              <div className="text-sm">... more</div>
            )}
          </button>
        </div>

        <div className="hidden md:block">
          {sanitizedHTML && (
        
              <div
                className={`${styles.postContent} `}
                dangerouslySetInnerHTML={{ __html: sanitizedHTML as string }}
              />
       
          )}
    
        </div>

        

      </div>
      <div className="small-space" />
    </div>
  );
};

export default AboutTheEducatorLongBio;
