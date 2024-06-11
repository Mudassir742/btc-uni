"use client"
import { FC, HTMLAttributes } from 'react'
import React, { useState } from 'react';
import CourseContent from '../CourseContent';
import { Course, CourseChapter, Downloadable, Educator, UsedProduct } from '@/interfaces';
import FullBTCULogoSVGWhite from '../icons/FullBTCULogoSVGWhite';

// import SaveCourse from '../SaveCourse';
import { XCircle } from 'lucide-react';


interface NoteData {
    note: string;
    lastSavedOn: string;
  }

interface IProps extends HTMLAttributes<HTMLDivElement> {
    liveVideoId: string;
    courseID: number;
    accessedCourseDBId: number;
    userDataDBId: number;
    userId: number;
    startChapter: number;
    isPartOfAccessedCourses: boolean;
    hasCompletedCourse: boolean; // Whether user has an AccessedCourse object with isCompleted === true for this course
    startTime: number;
    canWatchMainContent: boolean;
    courseIsLive: boolean;
    courseFormulas: string;
    courseTitle: string;
    shareText: string;
    // coursePinned: boolean;
    mediaItemUrl: string;
    educatorHandles: string[];
    isSignedIn: boolean;
    // canDownload: boolean;
    // isPurchasableALaCarte: boolean;
    // isPurchasableOnlyALaCarte: boolean;
    handleCloseClick: () => void;
    upcomingCourses: Course[];
    vimeoIds: string[];
    courseChapters: CourseChapter[];
    courseEducators: Educator[];
    downloadables: Downloadable[];
    usedProducts: UsedProduct[];
    courseCardImage: string;
    customeremail: string;
    certificateimage: string;
    themeColor: string;
    // coursesFromTheSameSeries: Course[]; // make sure current course is removed
    coursesFromTheSameEducator: Course[]; // make sure current course is removed
    relatedCourses: Course[]; // this should already have current course removed
    hasPreviouslyPostedTestimonial: boolean;
    // firstname: string;
    // lastname: string;
    fullname: string;
    note: string;
    lastSavedOn: string;
    userDownloadableAccessLevel: string;
    noteData: NoteData;
    onNoteUpdate: (newNote: string, newLastSavedOn: string) => void;
}

const WatchCourseOverlay: FC<IProps> = ({ 
    className, 
    certificateimage,
    customeremail,
    vimeoIds,
    courseCardImage,
    liveVideoId,
    courseID,
    accessedCourseDBId,
    userDataDBId,
    userId,
    startChapter,
    isPartOfAccessedCourses,
    hasCompletedCourse,
    startTime,
    canWatchMainContent,
    courseIsLive,
    courseChapters,
    courseFormulas,
    shareText,
    courseTitle,
    courseEducators,
    // coursePinned,
    downloadables,
    usedProducts,
    mediaItemUrl, 
    handleCloseClick,
    upcomingCourses,
    educatorHandles,
    isSignedIn,
    // canDownload,
    // isPurchasableALaCarte,
    // isPurchasableOnlyALaCarte,
    themeColor,
    // coursesFromTheSameSeries,
    coursesFromTheSameEducator,
    relatedCourses,
    hasPreviouslyPostedTestimonial,
    // firstname,
    // lastname,
    fullname,
    note,
    lastSavedOn,
    userDownloadableAccessLevel,
    noteData,
    onNoteUpdate,
     ...props }) => {
    return (
        <div className='container text-white mx-auto p-4'>
          
      
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    // justifyContent: 'flex-start', // Adjusted justifyContent to align with the top
                    // alignItems: 'center',
                    backgroundColor: 'black',
                    zIndex: '30',
                    overflow: 'auto',
 
                }}
            >






            
                <div className=''>
                    {/* <div className='h-[24px]'>
                        <FullBTCULogoSVGWhite height={''}  />
                    </div> */}
                    <div className='fixed top-[10px] right-[4%]'>
                        <button
                            onClick={handleCloseClick}
                            className='text-white '>

<XCircle />

                        </button>
                    </div>
                </div>



                <div className='space-between-categories' />

             
                

                {/* Pass along props inherited from course slug page to CourseContent */}

                <CourseContent
                    noteData={noteData} 
                    onNoteUpdate={onNoteUpdate}
                    vimeoIds={vimeoIds}
                    liveVideoId={liveVideoId}
                    courseID={courseID}
                    accessedCourseDBId={accessedCourseDBId}
                    userDataDBId={userDataDBId}
                    userId={userId}
                    isSignedIn={isSignedIn}
                    startChapter={startChapter}
                    isPartOfAccessedCourses={isPartOfAccessedCourses}
                    hasCompletedCourse={hasCompletedCourse}
                    startTime={startTime}
                    courseIsLive={courseIsLive}
                    courseChapters={courseChapters}
                    courseFormulas={courseFormulas}
                    courseTitle={courseTitle}
                    courseEducators={courseEducators}
                    downloadables={downloadables}
                    usedProducts={usedProducts}
                    upcomingCourses={upcomingCourses}
                    educatorHandles={educatorHandles}
                    // canDownload={canDownload}
                    // isPurchasableALaCarte={isPurchasableALaCarte}
                    // isPurchasableOnlyALaCarte={isPurchasableOnlyALaCarte}
                    courseCardImage={courseCardImage}
                    certificateimage={certificateimage}
                    customeremail={customeremail}
                    themeColor={themeColor}
                    // coursesFromTheSameSeries={coursesFromTheSameSeries}
                    coursesFromTheSameEducator={coursesFromTheSameEducator}
                    relatedCourses={relatedCourses}
                    hasPreviouslyPostedTestimonial={hasPreviouslyPostedTestimonial}
                    // firstname={firstname}
                    // lastname={lastname}
                    fullname={fullname}
                    note={note}
                    lastSavedOn={lastSavedOn}
                    // userDownloadableAccessLevel={userDownloadableAccessLevel}
                />

            </div>

        </div>

    )
}

export default WatchCourseOverlay