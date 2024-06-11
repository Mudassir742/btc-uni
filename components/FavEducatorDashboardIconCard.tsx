"use client";
import React, { Component, useEffect, useState } from 'react';
import Image from 'next/image';
import T1Text from './text/T1Text';
import SH4Text from './text/SH4Text';
import B1Text from './text/B1Text';
import { transformWpUrl } from '@/utils/url';

let imageWidth = 72;
let imageHeight = 72;
const FavEducatorDashboardIconCard: React.FC = () => {
  // Hardcoded educator data, to do: query this
  const educatorData = {
    firstName: 'firstName',
    lastName: 'lastName',

    educatorMetaData: {
      educatorpicture: {
        // mediaItemUrl: transformWpUrl('https://cms.btcuniversity.com/wp-content/uploads/2023/05/Ellipse-25.png'),
        mediaItemUrl: 'https://cms.btcuniversity.com/wp-content/uploads/2023/05/Ellipse-25.png', // Update with the actual image URL
      },
      instahandle: '@examplehandle', // Update with the actual handle
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
    imageWidth = 72
  }
  else {  
    imageHeight = 72;
    imageWidth = 72
  }
  

  return (
    <div className="justify-center items-center">
    <div className="justify-center items-center p-2">
    <Image
  // src={educatorData.educatorMetaData.educatorpicture?.mediaItemUrl || transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/05/Ellipse-25.png")}
  src={educatorData.educatorMetaData.educatorpicture?.mediaItemUrl || "https://cms.btcuniversity.com/wp-content/uploads/2023/05/Ellipse-25.png"}
  alt="Educator Image"
  width={imageWidth}
  height={imageHeight}
  className="rounded-full justify-center"
/>

      </div>
 
      <div className="text-center ">
      <div className="flex justify-center ">
        <B1Text text={educatorData.educatorMetaData.instahandle} />
        </div>
        <div className="flex justify-center ">
        <T1Text text={educatorData.lastName} />
        </div>
        <div className="flex justify-center">
        <T1Text text={educatorData.firstName} />
      </div>
      </div>
    </div>
  );
}

export default FavEducatorDashboardIconCard;





// TO DO: dynamically pull in image, name and handle. also add a heart function here. 