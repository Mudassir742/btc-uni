"use client";
import React, { useState } from 'react';
import LiveText from './text/LiveText';
import UpComingClassDate from './text/UpcomingClassDate';

// import PlayButton from './buttons/PlayButton';
import { Rating } from '@mui/material';


import '@/styles/globals.css';
import ParagraphText from './text/Paragraph';




interface CourseHeroNotStickyClientProps {
  
    
   
    themeColor: string;
    releaseDate: string;
   
    live: boolean;
 
    ratingNumber: number;
  
    avgRating: number;

    upcoming: boolean;

    formattedLaunchDate: string;


}





const CourseHeroNotStickyClient: React.FC<CourseHeroNotStickyClientProps> = ({
    themeColor,
    releaseDate,
    live,
    ratingNumber,
    avgRating,
    upcoming,
    formattedLaunchDate,

}) => {


    return (
        <div className="">
            <div className=''>
                <div className='container md:px-0'>
                    {upcoming ? (
                        <div className="flex items-center">
                            {live ? (
                                <div>
                                    <LiveText textColor='white' themeColor={themeColor} />
                                    {upcoming === true && releaseDate !== "" && (<UpComingClassDate date={formattedLaunchDate} />)}
                                    {/* changed releaseDate to formattedLaunchDate on jan 2 */}
                                </div>
                            ) : (
                                <>
                                    <div >
                                        <div className="items-center flex">
                                            <div className="pr-2">

                                                <div className=" text-sm font-semibold leading-[150%] text-themecolor-500">
                                                    Premiering:
                                                </div>
                                            </div>
                                            {upcoming === true && releaseDate !== "" && (
                                                <UpComingClassDate date={formattedLaunchDate} />
                                            )}
                                            {/* changed releaseDate to formattedLaunchDate on jan 2 */}
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                    ) : (
                        <div className="flex pt-1 ">


                            <div className='flex items-center'>
                                <Rating name="half-rating-read" defaultValue={avgRating} precision={0.5} readOnly style={{ color: themeColor }} />
                                <div className='flex items-center'>
                                    {ratingNumber > 5 && ( // !! ratingNumber here is actually the NUMBER OF TESTIMONIALS !!
                                        <div className='flex items-center pl-2'>

                                            <ParagraphText text="(" className="text-themeColor" />
                                            <ParagraphText text={ratingNumber.toString()} className="text-themeColor underline" />
                                            <ParagraphText text=")" className="text-themeColor" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </div>

    );
}

export default CourseHeroNotStickyClient;