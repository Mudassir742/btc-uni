// ChaptersClickable.tsx
import React, { useState } from 'react';
import SH1Text from './text/SH1Text';
import B1Text from './text/B1Text';
import T1Text from './text/T1Text';
import SH2Text from './text/SH2Text';
import ChapterCard from './ChapterCard';
import { CourseChapter } from '@/interfaces';
import ChapterCardClickable from './ChapterCardClickable';
import InputTextBold from './text/InputTextBold';
import CoursePageTitles from './text/CoursePageTitles';
import { Plus, Minus } from 'lucide-react';
import H3Text from './text/H3Text';
import H5Text from './text/H5Text';

interface ChaptersClickableProps {
    courseChapters: CourseChapter[];
    vimeoIds: string[];
    selectedChapterIndex: number;
    // indexOfChapterArray: number;
    updateSectionTitle: (newChapter: string) => void; // Callback function to update section title
    updateVideoPosition: (newChapter: number) => void; // Callback function to update video position
    updateChapterPosition: (newChapter: number) => void; // Callback function to update video position
    updateChapterPositionFromCard: (newValue: number) => void; // Callback function to update video position
    updateStartAtTime: (newTime: number) => void; // Callback function to update video position
    updateSelectedChapter: (newChapter: string) => void; // Callback function to update section title
}

const ChaptersClickable: React.FC<ChaptersClickableProps> = ({
    courseChapters,
    vimeoIds,
    selectedChapterIndex,
    // indexOfChapterArray,
    updateSectionTitle,
    updateVideoPosition,
    updateChapterPosition,
    updateChapterPositionFromCard,
    updateStartAtTime,
    updateSelectedChapter,
}) => {
    const [isExpanded, setIsExpanded] = useState(true);
    // const [activeChapterIndex, setActiveChapterIndex] = useState<number | null>(null);
    // const [selectedChapter, setSelectedChapter] = useState<string>(courseChapters[0].chapterName);

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    const onChapterClick = (index: number, chapterName: string) => {
        // Handle the click event for the chapter card here
        // You can add custom logic if needed
        // console.log("activeChapterIndex is: ", activeChapterIndex);
        updateSectionTitle(chapterName); // Update the section title if needed
        updateVideoPosition(index); // Update the video position
        // setActiveChapterIndex(index);
        // setSelectedChapter(chapterName);
        updateSelectedChapter(chapterName);
        updateChapterPositionFromCard(index);
    };

    return (
        <div className='border-[1px] border-white rounded-xl w-full'>
            <div className="container py-4 flex flex-col items-start">
            <div className="flex items-center justify-between" onClick={toggleExpansion}>
  <div className='items-center'>
  <H5Text text='Chapters' className='text-white' />
  </div>
  <div className="items-center justify-end"> {/* Use justify-end to move icons to the end */}
    {isExpanded ? (
        <Minus color='white' size={30}/>
    ) : (
        <Plus color='white' size={30}/>
    )}
  </div>
</div>


                {isExpanded && (
                    // Render the expanded content here
                    <div >
                        {courseChapters.map((courseChapter: CourseChapter, index) => (
                            <ChapterCardClickable
                                key={index}
                                courseChapter={courseChapter}
                                onClick={() => {
                                    onChapterClick(index, courseChapter.chapterName);
                                    // updateVideoPosition(index); // Update the video position -- this is already in the onChapterClick function
                                }}
                                selectedCourseChapter={selectedChapterIndex}
                                indexOfChapterArray={index}
                            />
                        ))}
                    </div>
                )}
            </div>
      
        </div>
    );
};

export default ChaptersClickable;
