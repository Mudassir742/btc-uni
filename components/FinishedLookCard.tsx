
"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Course } from '@/interfaces';
import ActionButton from './buttons/ActionButton';

interface FinishedLooksCardProps {
  imageURL: string;
  userDataId: string;
  courseId: number;
}
let imageWidth = 300; // Default for mobile
let screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
if (screenWidth < 766) {
  imageWidth = 327;
} else {
  imageWidth = 400;
}
const FinishedLookCard: React.FC<FinishedLooksCardProps> = ({ imageURL, userDataId, courseId }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (!imageURL) {
    return null;
  }

  const openLightbox = () => {
    (window as any).dataLayer.push({
        event: "expandedTransformationImage",

        onPageOfCourse: courseId.toString(),
        userDataId: userDataId,

        imageURL: imageURL,

        timestamp: new Date().toISOString(),
    });
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  return ( 
    <div >
      {/* Image with lightbox functionality */}
      <div id="Transformation-Image" className="pr-4 cursor-zoom-in" onClick={openLightbox}>
  


        <div style={{ position: 'relative', width: `${imageWidth}px`, height: 'auto' }}>
          <div className="relative ">

            <Image
              src={imageURL || '/placeholder.png'}
              alt="Finished Look in btcu course"
              width={1000}
              height={1000}
              className='rounded-xl'
         

            />
          </div>
        </div>

        

</div>





      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-75"
          onClick={closeLightbox}
        >
          <div className="max-w-3xl">
            <Image
              src={imageURL || '/placeholder.png'}
              alt="Image"
              width={8000}
              height={8000}
              className="z-50"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FinishedLookCard;
