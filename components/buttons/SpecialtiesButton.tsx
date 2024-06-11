"use client"
import React from 'react';

import SubCategoryText from '../text/SubCategoryText';

type SpecialtiesButtonProps = {
  text: string;
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  scrollToId: string; // Add scrollToId prop for the target section id
  number: string;
};

const SpecialtiesButton = ({
  text,
  textColor = 'secondarythemecolor',
  borderColor = 'border',
  backgroundColor = 'gray-400',
  number,
  scrollToId, // Use scrollToId prop for the target section id
}: SpecialtiesButtonProps) => {
  const handleClick = () => {
    // Scroll to the target section with the specified ID
    const targetSection = document.getElementById(scrollToId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="cursor-pointer  px-1 items-center">
   <div
        className={`justify-center rounded-md items-center text-${textColor} border-[2px] border-${borderColor} bg-${backgroundColor} `}
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',      
          background: backgroundColor,        
          flex: 'none',
          order: 0,
        }}
        onClick={handleClick} // Call handleClick on button click
      >

<div className='flex px-2 '>
  <div className='truncate '>
            <SubCategoryText text={text} className="text-secondarythemecolor" />

  </div>
  {/* <div className='flex px-1 ml-auto items-center'>
  <ReviewCaption text='(' className="text-themeColor" /> <ReviewCaption text={number} className="text-themeColor" /> <ReviewCaption text=')' className="text-themeColor" />
  </div> */}
</div>

      </div>
    </div>
  );
};

export default SpecialtiesButton;
