"use client";
import React, { Component, useEffect, useState } from 'react';
import Image from 'next/image';
import T1Text from './text/T1Text';
import SH4Text from './text/SH4Text';
import SH2Text from './text/SH2Text';
import ParagraphText from './text/Paragraph';
import EducatorsHandle from './text/EducatorsHandle';
import EducatorsName from './text/EducatorsName';
import { Educator } from '@/interfaces';
import Link from 'next/link';
import { transformWpUrl } from '@/utils/url';


interface RecommendedEducatorIconCardProps {
  educatorData: Educator;
}

let imageWidth = 72;
let imageHeight = 72;
const RecommendedEducatorIconCard: React.FC<RecommendedEducatorIconCardProps> = ({ educatorData }) => {
  // Hardcoded educator data, to do: query this
  // const educatorData = {
  //   firstName: 'firstName',
  //   lastName: 'lastName',

  //   educatorMetaData: {
  //     educatorpicture: {
  //       mediaItemUrl: 'https://cms.btcuniversity.com/wp-content/uploads/2023/09/o10vtt745j5z-qbvgg4gig5jj-3.jpg', // Update with the actual image URL
  //     },
  //     instahandle: '@examplehandle', // Update with the actual handle
  //   },
  // };

  const educatorSlug = educatorData?.slug || "";
  const educatorFirstName = educatorData?.educatorMetaData?.firstname || "";
  const educatorLastName = educatorData?.educatorMetaData?.lastname || "";
  const educatorInstaHandle = educatorData?.educatorMetaData?.instahandle || "";
  // const educatorPictureUrl = educatorData.educatorMetaData.educatorpicture?.mediaItemUrl || transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/05/Ellipse-25.png");
  const educatorPictureUrl = educatorData.educatorMetaData.educatorpicture?.mediaItemUrl || "https://cms.btcuniversity.com/wp-content/uploads/2023/05/Ellipse-25.png";

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
    imageHeight = 153;
    imageWidth = 153
  }
  else {
    imageHeight = 153;
    imageWidth = 153
  }


  return (
    <Link href={`/educator/${educatorSlug || ""}`}>
      <div className='' style={{ minWidth: '100px', minHeight: '100px', flexShrink: 0 }}>
        <div className="justify-center items-center min:w-[175px]">
          <div className="flex flex-col items-center"> {/* Use flexbox to center content */}
            <div className="rounded-full overflow-hidden w-[153px] h-[153px]">
              <Image
                src={educatorPictureUrl}
                alt="Educator Image"
                width={imageWidth}
                height={imageHeight}
                className="w-full h-full object-cover"
              />
            </div>


 



            <div className="justify-center  truncate line-clamp-1 overflow-ellipsis text-center">
              <div className="flex justify-center  truncate line-clamp-1 overflow-ellipsis">
                <EducatorsHandle text={educatorData.educatorMetaData.instahandle} className='truncate line-clamp-1 overflow-ellipsis text-secondarythemecolor'/>
              </div>

             


              <div className="flex justify-center truncate mt-[-20px] md:mt-0">
                <EducatorsName text={educatorFirstName} className='text-themeColor'/> 
                &nbsp;
                <EducatorsName text={educatorLastName} className='text-themeColor' /> 
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default RecommendedEducatorIconCard;





// TO DO: dynamically pull in image, name and handle. also add a heart function here. 