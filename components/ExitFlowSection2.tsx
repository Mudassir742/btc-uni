"use client";
import React, { useState } from 'react';


import Certificate from './icons/Certificate';

import B1Text from './text/B1Text';

import Link from 'next/link';
import { Button } from './ui/Button';

import Image from "next/image";


interface ExitFlowSection2Props {
  certificateimage: string;
  customeremail: string;
  courseId: number;
  userDataId: string;
}





const NextButton = ({ handleNext, text }: { handleNext: () => void; text?: string }) => (
  <div onClick={handleNext}>
    <Button >
      Next</Button>

  </div>
);



const ExitFlowSection2: React.FC<ExitFlowSection2Props> = ({ customeremail, certificateimage, courseId, userDataId }) => {

  const [section, setSection] = useState(1);


  const onUserClickDownload = () => {
    // send to GA
    (window as any).dataLayer.push({
      event: "clickedDownloadCertificate",
  
      onPageOfCourse: courseId.toString(),
      userDataId: userDataId,
  
      timestamp: new Date().toISOString(),
    });
  }

  const handleNext = () => {
    setSection(section + 1);
  };

  const handleBack = () => {
    setSection(section - 1);
  };


  return (
    <div className="flex items-center justify-center ">
      <div >

        <div className="flex justify-center">
          {certificateimage ? (
            // Display the image if certificateimage is not empty
            <div className="flex justify-center text-center">
              <Image src={certificateimage} alt="just anderson interview" width={1000} height={1000} />
            </div>
          ) : (
            // Show the certificate if certificateimage is empty
            <Certificate fill="black" width={104} height={130} />
          )}
        </div>
        <div className="space-under-category-titles" />
        <div className="flex justify-center font-semibold text-2xl">
          You&apos;ve earned a certificate of completion!
        </div>


        <div className="space-under-category-titles" />
        <div className="flex justify-center">
          <B1Text text='You can find copies of your certificates in your BTC-U dashboard.' />

        </div>
        <div className="space-under-category-titles" />
        <div className="flex justify-center">




          <Link className='w-full mx-auto flex justify-center mt-4' target='_blank' href="/profile?q=certificates" >
            <Button onClick={onUserClickDownload} className=''>
              Download
            </Button>
          </Link>
          {/* to do: should open the certificate as a pdf in a new page */}

        </div>
        {/* <div className="space-under-category-titles"/> 
            <div className="flex justify-center">
         
            <Button >
            <Link href={`mailto:${customeremail}`}>Email Copy</Link>
</Button>

            </div> */}
        <div className='space-between-categories' />
 

        {/* <div >
              <B1Text text=' Tag us on Instagram for a chance to be featured!'/>
             
            </div> */}
        <div className="space-under-category-titles" />

        <div className="flex justify-center">
          {/* <div className='rounded-full bg-themeColor h-20 w-20 flex justify-center items-center'>

            <ShareButton shareText={'I completed a course of BTCU!'} shareImg={certificateimage} />

          </div> */}


          <div className='space-between-categories' />
        </div>

      </div>

    </div>
  );
};

export default ExitFlowSection2;