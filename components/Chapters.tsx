// Chapters.tsx
import React from 'react';
import ChapterCard from './ChapterCard';
import { CourseChapter } from '@/interfaces';
import CoursePageTitles from './text/CoursePageTitles';
import H4Text from './text/H4Text';
import H3Text from './text/H3Text';

interface ChaptersProps {
  courseChapters: CourseChapter[] | null;
  themeColor: string; 
  // userAccess: boolean;

}

const Chapters: React.FC<ChaptersProps> = ({ 
  // userAccess, // this was not in use when checked on jan 15 so removed entire chain of data fetching just for this
  themeColor, 
  courseChapters }) => {
  // Check if courseChapters is null, and if so, return null to not render anything
  if (courseChapters === null) {
    return null;
  }

  return (
    <main>

    
    <div className=' rounded-xl'>
      <div className="flex flex-col items-start ">
        <div className="flex items-center">
          <H4Text text='Chapters' />

        
          </div>
          <div className="space-under-category-titles" /> 

        {courseChapters.map((courseChapter: CourseChapter, index) => (
          <ChapterCard key={index} courseChapter={courseChapter} themeColor={themeColor}  />
        ))}
      </div>
     

      </div>
      <div className='space-between-categories' />
    </main>
  );
};

export default Chapters;
