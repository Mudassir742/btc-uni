"use client";
import React, { Component, useEffect, useState } from 'react';
import Image from 'next/image';
import T1Text from './text/T1Text';
import SH4Text from './text/SH4Text';
import { Educator } from '@/interfaces';
import Link from 'next/link';
import EducatorsHandle from './text/EducatorsHandle';
import EducatorsName from './text/EducatorsName';
import { transformWpUrl } from '@/utils/url';

let imageWidth = 80;
let imageHeight = 80;
let containerWidth = 103; // Default container width


interface SearchEducatorCardSearchProps {
  educator: Educator;
}
 
const EducatorIconCardSearch: React.FC<SearchEducatorCardSearchProps> = ({ educator }) => {
 
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    // Check if we are on the client side before accessing the window object.
    if (typeof window !== 'undefined') {
      setScreenWidth(window.innerWidth);
    }
  
    // Add an event listener to update the screenWidth when the window is resized
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
  
    window.addEventListener('resize', handleResize);
  
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Check if educator or educatorMetaData is undefined
  if (!educator || !educator.educatorMetaData) {
    return null; // Return null or a placeholder for the card
  }
  
  // const mediaItemUrl = educator.educatorMetaData?.educatorpicture?.mediaItemUrl || transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/05/Ellipse-25.png");
  
  
  if (screenWidth < 768) {
    imageHeight = 80;
    imageWidth = 80;
    containerWidth = 130;
  }
  else {  
    imageHeight = 80;
    imageWidth = 80;
     containerWidth = 130 ;
  }
  
  return (
    <Link href={`/educator/${educator.slug}`}>
  




<div className='educatorteamcardhorizontal pb-6'>
<div className='items-center flex justify-center" '>
<div
      className="rounded-full overflow-hidden"
      style={{ aspectRatio: '1 / 1', position: 'relative' }}
    >
    <Image
     src={educator.educatorMetaData.educatorpicture?.mediaItemUrl || ""}
     alt={educator.educatorMetaData.instahandle}
     
      width={imageWidth}
      height={imageWidth} // Set height to be the same as width for a perfect circle
      className=" object-cover "
    />
  </div>
  <div className='pl-4 pr-4'>
    <div className=''>
      <EducatorsHandle text={educator.educatorMetaData.instahandle} />
    </div>

    <div className='flex max-w-[180px]'>
      <EducatorsName text={educator.educatorMetaData.firstname} /> <EducatorsHandle text='&nbsp;' /> <EducatorsName text={educator.educatorMetaData.lastname} />
    </div>
  </div>
</div>
</div>


    </Link>
  );
}









export default EducatorIconCardSearch;
