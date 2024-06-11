"use client"
import React from 'react';

import SubCategoryText from '../text/SubCategoryText';

type CourseAnchorProps = {
  text: string;
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  scrollToId: string;
  number: string;
  icon?: string; // Add the 'icon' prop for your icon
};

const CourseAnchor = ({
  text,
  textColor = 'black',
  borderColor = 'black',
  backgroundColor = 'transparent',
  number,
  scrollToId,
  icon, // Use the 'icon' prop for your icon
}: CourseAnchorProps) => {
  const handleClick = () => {
    const targetSection = document.getElementById(scrollToId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="cursor-pointer">
      <div
        className={`justify-center items-center text-${textColor} border-[0px] border-${borderColor} bg-${backgroundColor}`}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          background: backgroundColor,
          borderRadius: '90px',
          flex: 'none',
          order: 0,
        }}
        onClick={handleClick}
      >
        <div className='flex px-1'>
          {icon && (
            <div className='mr-2'>
              {icon}  
            </div>
          )}
          <div className='truncate'>
            <SubCategoryText text={text} className="text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseAnchor;
