"use client"
import React, { useState, CSSProperties } from 'react';
import he from 'he';
import ParagraphText from './text/Paragraph';
import CoursePageTitles from './text/CoursePageTitles';
import { Button } from './ui/Button';
import styles from '@/styles/richText.module.css'
import H4Text from './text/H4Text';
import YouWillLearnText from './text/YouWillLearnText';

interface YouWillLearnProps {
  youWillLearn: string;
}

const YouWillLearn: React.FC<YouWillLearnProps> = ({ youWillLearn }) => {
  // const [expanded, setExpanded] = useState(false); // Start with content collapsed
  if (!youWillLearn.trim()) {
    return null;
  }



  // const toggleExpansion = () => {
  //   setExpanded(!expanded);
  // };

  const contentWithLineBreaks = he
    .decode(youWillLearn)
    .replace(/<\/?p>/g, '') // Remove <p> tags
    .replace(/<br\s*\/?>/g, '\n') // Replace <br> and <br /> with \n for line breaks
    .split('\n') // Split the content into paragraphs

  const paragraphs = contentWithLineBreaks.filter((paragraph) => paragraph.trim() !== ''); // Remove empty paragraphs

  // Add bullets to each paragraph
  
  const formattedContent = paragraphs.map((paragraph, index) => (


    <p
      key={index}
      className="flex items-center "
      
    >
      <span className="mr-1 text-xl md:text-xxl items-center mt-1 ">✓</span>
      <ParagraphText text={paragraph.trim()} className='pt-3 items-center'/>
    </p>
  ));


  return (
    <main>
 

      <div className="container md:px-0">
        <div className=''>



          <H4Text text='You Will Learn'  />

          <div className="space-under-category-titles" />


          <div className='text-themeColor'>
            {formattedContent}
          </div>


        </div>



      </div>
      <div className='space-between-categories' />
    </main>
  );
};

export default YouWillLearn;
