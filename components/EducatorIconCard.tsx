"use client";
import React, { Component, useEffect, useState } from 'react';
import Image from 'next/image';
import T1Text from './text/T1Text';
import SH4Text from './text/SH4Text';
import { transformWpUrl } from '@/utils/url';

let imageWidth = 72;
let imageHeight = 72;
let containerWidth = 103; // Default container width


const EducatorIconCard: React.FC = () => {
  // Hardcoded educator data, to do: query this
  const educatorData = {
    firstName: 'firstName',
    lastName: 'lastName',

    educatorMetaData: {
      educatorpicture: {
        // mediaItemUrl: transformWpUrl('https://cms.btcuniversity.com/wp-content/uploads/2023/07/Mary-Rector-300x300-1.jpg'),
        mediaItemUrl: 'https://cms.btcuniversity.com/wp-content/uploads/2023/07/Mary-Rector-300x300-1.jpg', // Update with the actual image URL
      },
      educatorhandle: '@examplehandle', // Update with the actual handle
    },
  };
 
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
  
  
  if (screenWidth < 768) {
    imageHeight = 72;
    imageWidth = 72;
    containerWidth = 103;
  }
  else {  
    imageHeight = 160;
    imageWidth = 160;
     containerWidth = 232;
  }
  
  
  
  return (
    <div className={`items-center flex w-${containerWidth}px`}>
 

      <div className="justify-center items-center p-2" style={{ width: imageWidth, height: imageWidth }}>
  <div className="rounded-full overflow-hidden w-full h-full">
    <Image
      // src={educatorData.educatorMetaData.educatorpicture?.mediaItemUrl || transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/05/Ellipse-25.png")}
      src={educatorData.educatorMetaData.educatorpicture?.mediaItemUrl || "https://cms.btcuniversity.com/wp-content/uploads/2023/05/Ellipse-25.png"}
      alt="Educator Image"
      width={imageWidth}
      height={imageWidth} // Set height to be the same as width for a perfect circle
      className="w-full h-full object-cover"
    />
  </div>
</div>
 
      <div className="text-center">
      <div className="flex justify-center m-[-3px]">
        <SH4Text text={educatorData.firstName} />
        </div>
        <div className="flex justify-center">
        <SH4Text text={educatorData.lastName} />
        </div>
        <div className="flex justify-center">
               <T1Text text={educatorData.educatorMetaData.educatorhandle} />
      </div>
      </div>
    </div>
  );
}

export default EducatorIconCard;
