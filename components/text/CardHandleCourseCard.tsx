import { cn } from "@/utils/shadcn";
import React from "react";
import { Poppins } from 'next/font/google';
import '@/styles/globals.css';

interface CardHandleCourseCardProps {
  text: string;
  className?: string;
}

const cardHandleStyles: React.CSSProperties = {
  whiteSpace: 'nowrap',
overflow: 'hidden',
textOverflow: 'ellipsis',
};

const CardHandleCourseCard: React.FunctionComponent<CardHandleCourseCardProps> = ({
  text,
  className,
}) => {
  const mobileStyles: React.CSSProperties = {
    overflow: "hidden",
    fontSize: "10px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
  };

  const desktopStyles: React.CSSProperties = {

    fontSize: "16px",
    fontStyle: "normal",
    fontWeight: "400",
    lineHeight: "normal",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: "1",
    WebkitBoxOrient: "vertical",
  };

  return (
    <>


<div className="hidden md:block">
        <p className={`truncate ${className}`}>{text}</p>
      </div>
      <div className="md:hidden overflow-x-auto whitespace-nowrap">
        <p className={`truncate ${className}`}>{text}</p>
      </div>




    
    </>
  );
};

export default CardHandleCourseCard;
