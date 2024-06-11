"use client"
import React, { useState } from 'react';
import { Course, CourseChapter, Downloadable, Educator, UsedProduct } from '@/interfaces';
import dynamic from 'next/dynamic';
import { Button } from '../ui/Button';


// we need to inserts props coming from slug page

interface NoteData {
  note: string;
  lastSavedOn: string;
}

interface WatchForFREEButtonProps {
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
  courseCardImage: string;
  certificateimage: string;
  customeremail: string;
  // arrays
  vimeoIds: string[];
  courseChapters: CourseChapter[];
  courseEducators: Educator[];
  downloadables: Downloadable[];
  usedProducts: UsedProduct[];
  upcomingCourses: Course[];
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


// Lazy loading ~ so it won't run the watchCourseOverlay code before it gets open
const WatchCourseOverlay = dynamic(() => import("@/components/molecules/WatchCourseOverlay"), {
  ssr: false
})

const WatchForFREEButton: React.FC<WatchForFREEButtonProps> = ({
  vimeoIds,
  certificateimage,
  liveVideoId,
  customeremail,
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
  upcomingCourses,
  educatorHandles,
  isSignedIn,
  // canDownload,
  // isPurchasableALaCarte,
  courseCardImage,
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
  onNoteUpdate
}) => {
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [showCustomAlert, setShowCustomAlert] = useState(false);

  const [notesVisible, setNotesVisible] = useState(false);


  // Function to toggle the visibility of the notes component
  const handleToggleNotes = () => {
    setNotesVisible((prevState) => !prevState);
  };

  const handleButtonClick = () => {
    setIsOverlayOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scrolling on the body when overlay is open
  };

  const handleCloseClick = () => {
    setIsOverlayOpen(false);
    document.body.style.overflow = ''; // Restore default scrolling on the body when overlay is closed
  };

  const handleCustomAlertCancel = () => {
    // Handle the Cancel button click (close the custom alert)
    setShowCustomAlert(false);
  };

  const handleCustomAlertOk = () => {
    // Handle the OK button click (redirect to /subscribe page)
    window.location.href = '/subscribe';
  };


  // const [alertMessage, setAlertMessage] = useState<string | null>(null);

  return (
    <>

      <div onClick={handleButtonClick}>

        <div className="flex items-center">
          <Button variant={'secondary'}>
            Watch For FREE
           </Button>
          
      


         
   

        </div>
      </div>

      {/* Render the toast container */}
      {/* <ToastContainer
        position="top-right" // Position the toast container at the top-right corner
        autoClose={3000} // Auto-close the toast after 3 seconds (adjust as needed)
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}

      {isOverlayOpen && (
        <WatchCourseOverlay
          noteData={noteData} 
          onNoteUpdate={onNoteUpdate}
          vimeoIds={vimeoIds}
          liveVideoId={liveVideoId}
          courseID={courseID}
          accessedCourseDBId={accessedCourseDBId}
          userDataDBId={userDataDBId}
          userId={userId}
          startChapter={startChapter}
          isPartOfAccessedCourses={isPartOfAccessedCourses}
          hasCompletedCourse={hasCompletedCourse}
          startTime={startTime}
          canWatchMainContent={canWatchMainContent}
          courseIsLive={courseIsLive}
          courseChapters={courseChapters}
          courseFormulas={courseFormulas}
          courseTitle={courseTitle}
          courseEducators={courseEducators}
          shareText={shareText}
          // coursePinned={coursePinned}
          downloadables={downloadables}
          usedProducts={usedProducts}
          mediaItemUrl={mediaItemUrl}
          handleCloseClick={() => {setIsOverlayOpen(false); document.body.style.overflow = 'auto';}}
          upcomingCourses={upcomingCourses}
          educatorHandles={educatorHandles}
          isSignedIn={isSignedIn}
          // canDownload={canDownload}
          // isPurchasableALaCarte={isPurchasableALaCarte}
          // isPurchasableOnlyALaCarte={isPurchasableOnlyALaCarte}
          courseCardImage={courseCardImage}
          customeremail={customeremail}
          certificateimage={certificateimage} 
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
          userDownloadableAccessLevel={userDownloadableAccessLevel} />
      )}

      {/* Render the course access alert conditionally */}
      {/* {alertMessage && (
        <CourseAccessAlert message={alertMessage} />
      )} */}
      {/* {showCustomAlert && (
        <CourseAccessToast
          message="Please register to access the full video."
          onOkClick={handleCustomAlertOk}
          onCancelClick={handleCustomAlertCancel}
        />
      )} */}
    </>
  );
};

export default WatchForFREEButton;



// to do: need to do the styling for this button. 