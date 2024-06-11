"use client";
import React from 'react';
import SH1Text from './text/SH1Text';
import B1Text from './text/B1Text';
import T1Text from './text/T1Text';
import { CourseChapter } from '@/interfaces';
import ParagraphText from './text/Paragraph';
import InputTextBold from './text/InputTextBold';
import cn from 'classnames';

interface ChapterCardClickableProps {
  courseChapter: CourseChapter;
  onClick: () => void; // Add an onClick prop
  selectedCourseChapter: number;
  indexOfChapterArray: number;
}
// const isActive = true;

const ChapterCardClickable: React.FC<ChapterCardClickableProps> = ({ courseChapter, onClick, selectedCourseChapter, indexOfChapterArray }) => {

  const isActive = selectedCourseChapter === indexOfChapterArray;

  return (
    <div className={`flex items-center mt-2 bg-black`} onClick={onClick}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          minWidth: '53px', 
          background: '#DEE4DC',
          opacity: '0.5',
          borderRadius: '4px',
          padding: '2px',
          // color: isActive ? 'red !important' : 'orange !important',
          backgroundColor: isActive ? "white" : "grey",
        }}
      >
        <InputTextBold text={courseChapter.chapterStartsAt}/>
      </div>
      <div className="pl-2">
      <ParagraphText text={courseChapter.chapterName} color={isActive ? "white" : "grey"} />
      </div>
    </div>
  );
};


export default ChapterCardClickable;
