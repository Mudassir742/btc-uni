"use client";
import React, { useState } from 'react';
import VideoCard from './VideoCard';
import { Course, CourseChapter, Downloadable, Educator, UsedProduct } from '@/interfaces';

// we need to inserts props coming from the PlayButton component

interface NoteData {
  note: string;
  lastSavedOn: string;
}

interface CourseContentProps {

  liveVideoId: string;
  courseID: number;
  accessedCourseDBId: number;
  userDataDBId: number;
  userId: number;
  isSignedIn: boolean;
  startChapter: number;
  isPartOfAccessedCourses: boolean;
  hasCompletedCourse: boolean; // Whether user has an AccessedCourse object with isCompleted === true for this course
  startTime: number;
  courseIsLive: boolean;
  courseFormulas: string;
  courseTitle: string;
  educatorHandles: string[];
  // canDownload: boolean;
  // isPurchasableALaCarte: boolean;
  // isPurchasableOnlyALaCarte: boolean;
  vimeoIds: string[];
  courseChapters: CourseChapter[];
  courseEducators: Educator[];
  downloadables: Downloadable[];
  usedProducts: UsedProduct[];
  upcomingCourses: Course[];
  courseCardImage: string;
  certificateimage: string;
  customeremail: string;
  themeColor: string;
  // coursesFromTheSameSeries: Course[]; // make sure current course is removed
  coursesFromTheSameEducator: Course[]; // make sure current course is removed
  relatedCourses: Course[]; // this should already have current course removed
  hasPreviouslyPostedTestimonial: boolean;
  // firstname: string;
  // lastname: string;
  fullname:string;
  note: string;
  lastSavedOn: string;
  // userDownloadableAccessLevel: string;
  noteData: NoteData;
  onNoteUpdate: (newNote: string, newLastSavedOn: string) => void;
}

const CourseContent: React.FC<CourseContentProps> = ({
  vimeoIds,
  liveVideoId,
  customeremail,
  courseID,
  accessedCourseDBId,
  userDataDBId,
  userId,
  isSignedIn,
  startChapter,
  courseCardImage,
  isPartOfAccessedCourses,
  hasCompletedCourse,
  startTime,
  courseIsLive,
  courseChapters,
  courseFormulas,
  courseTitle,
  courseEducators,
  downloadables,
  usedProducts,
  upcomingCourses,
  educatorHandles,
  // canDownload,
  // isPurchasableALaCarte,
  // isPurchasableOnlyALaCarte,
  // userDownloadableAccessLevel,
  certificateimage,
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

  noteData,
  onNoteUpdate,
}) => {

  // State to track whether the exit flow button has been clicked
  const [exitFlowClicked, setExitFlowClicked] = useState(false);

  // Function to handle the click event of the "exit flow!" button
  const handleExitFlowClick = () => {
    // Set the state to indicate that the button has been clicked
    setExitFlowClicked(true);
  };



  const [notesVisible, setNotesVisible] = useState(false);

  // Function to toggle the visibility of the notes component
  const handleButtonClick = () => {
    setNotesVisible((prevState) => !prevState);
  };

  return (
    <main >

       
        <VideoCard
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
          customeremail={customeremail} 
          certificateimage={certificateimage}
          themeColor={themeColor}
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
  


        {/* {courseIsLive === true ? (
                    // LiveVideoPlayer playing main content
                    <LiveVideoPlayer
                      videoId={liveVideoId}
                    />
                  ) : (
                    // VideoPlayer playing main content
                    <VideoPlayer
                      videoIds={vimeoIds}
                      courseId={courseID}
                      accessedCourseId={accessedCourseDBId}
                      userDataId={userDataDBId}
                      startAtChapter={startChapter}
                      hasAccessedCourse={isPartOfAccessedCourses}
                      startTime={startTime} // Pass the start time as a prop
                    />
                  )} */}
        {/* to do: mihai, above needs to go inside the video card so that it can have all the other data as well.  */}
        {/* </div> */}
 
      <div className="space-under-category-titles" />
 

    </main>

  );
};

export default CourseContent;

// to do: if notes are already TrackEvent, change words to "see notes"