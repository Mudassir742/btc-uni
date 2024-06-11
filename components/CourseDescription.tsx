"use client"
import React, { useState, useEffect, useRef, CSSProperties, Suspense } from 'react';
import SH1Text from './text/SH1Text';
import B1Text from './text/B1Text';
import SH2Text from './text/SH2Text';
import he from 'he';
import dynamic from 'next/dynamic';
import ParagraphText from './text/Paragraph';
import { Button } from './ui/Button';
import CoursePageTitles from './text/CoursePageTitles';
import styles from '@/styles/richText.module.css'


interface CourseDescriptionProps {
  text: string;
}



const CourseDescription: React.FC<CourseDescriptionProps> = ({ text }) => {
const [expanded, setExpanded] = useState(false);

  // const truncatedStyle: CSSProperties = {
  //   textOverflow: 'ellipsis',
  //   display: '-webkit-box',
  //   WebkitLineClamp: '7',
  //   WebkitBoxOrient: 'vertical',
  //   overflow: 'hidden',
  //   backgroundImage: 'linear-gradient(to bottom, #000, #e6e6e6)', // Gradient from black to gray
  //   WebkitBackgroundClip: 'text',
  //   color: 'transparent',
  // };

  const toggleExpansion = () => {
    setExpanded(!expanded); 
  };

  // Removing HTML entities from content
  // const formattedContent = he.decode(text).replace(/<\/?p>/g, '').split('<br />').join('\n');
  const customStyle: React.CSSProperties = {
    lineHeight: '1.5', // Increase line height
    color: '#523D34', // Set the text color to your theme color
  };


  return (
    <div className="text-sm course-content">
        {/* <SH2Text text='Course Details' /> */}
    {/* <div className="space-under-category-titles" /> */}



  
    {/* <div style={expanded ? {} : truncatedStyle}> */}
  
      <div className={`${styles.postContent} text-themeColor`} style={customStyle} dangerouslySetInnerHTML={{ __html: text }} />    <div className='med-space' />
                     {/* <ParagraphText text={formattedContent} /> */}
      {/* <div dangerouslySetInnerHTML={{formattedContent}} /> */}
    </div>
  
  // </div>

  );
};

export default CourseDescription;



