"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import EducatorsHandle from './text/EducatorsHandle';
import EducatorsName from './text/EducatorsName';
import { Educator } from '@/interfaces';

let imageWidth = 60;
let imageHeight = 60;
let containerWidth = 103; // Default container width



interface EducatorTeamCardProps {
  instahandle: string;
  firstName: string;
  lastName: string;
  educatorImage: string;
}

const EducatorTeamCardHorizontal: React.FC<EducatorTeamCardProps> = ({ instahandle, firstName, lastName, educatorImage }) => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);

    // Add an event listener to update the screenWidth when the window is resized
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (screenWidth < 768) {
    imageHeight = 80;
    imageWidth = 80;
    containerWidth = 301;
  } else {
    imageHeight = 80;
    imageWidth = 80;
    containerWidth = 301;
  }

  return (
    <div className='educatorteamcardhorizontal'>
      <div className='flex items-center text-center'>
        <div
          className='rounded-full overflow-hidden'
          style={{
            width: `${imageWidth}px`,
            height: `${imageHeight}px`,
          }}
        >
          <Image
            src={educatorImage}
            alt={instahandle}
            width={imageWidth}
            height={imageHeight}
            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
          />
        </div>
        <div className='pl-4 pr-4'>
          <div className=''>
            <EducatorsHandle text={instahandle} />
          </div>
          <div className='flex max-w-[180px]'>
            <EducatorsName text={firstName} /> <EducatorsName text={lastName} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducatorTeamCardHorizontal;