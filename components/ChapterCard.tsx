"use client";
import React from 'react';
import { CourseChapter } from '@/interfaces';
import ParagraphText from './text/Paragraph';
import InputTextBold from './text/InputTextBold';
import ParagraphSmall from './text/ParagraphSmall';
import Paragraph from './text/Paragraph';


interface ChapterCardProps {
  courseChapter: CourseChapter;
  themeColor: string;
  // userAccess: boolean;
}

const ChapterCard: React.FC<ChapterCardProps> = ({  themeColor, courseChapter }) => {
  return (
    <div className="flex items-center mt-2">
      <div className='pr-2'>
        {/* {userAccess ? ( */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '3px 6px',
              minWidth: '70px',
              opacity: '0.5',
              borderRadius: '4px',
            backgroundColor: "#A79A95",
            }}
          >
              <Paragraph text={courseChapter.chapterStartsAt} color='white' />
           
          </div>
        {/* ) : (
          <div style={{ color: 'white', paddingRight: '2px' }}>
                           <LockKeyhole fill={'white'} />

        </div>
        )} */}
      </div>
      <div >
        <ParagraphText text={courseChapter.chapterName} />
      </div>
    </div>
  );
};

export default ChapterCard;
