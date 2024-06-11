import React from 'react';
import { Category, Course } from '@/interfaces';
import { getCourseAll, extractCourseAll } from '@/app/courses/helper';
import '@/styles/globals.css';
import PlayButtonBaby from './PlayButtonBaby';

interface PlayButtonMommyProps {
  params: { slug: string };
  courseID: number;
  userDataDatabaseId: number;
  userId: number;
  accessedCourseDBId: number;
  startChapter: number;
  isPartOfAccessedCourses: boolean;
  hasCompletedCourse: boolean; // Whether user has an AccessedCourse object with isCompleted === true for this course
  startTime: number;
  canWatchMainContent: boolean;
  upcomingCourses: Course[];
  themeColor: string;
  educatorHandles: string[];
  pinned: boolean;
  userCanViewMainContent: boolean;
  isCourseFree: boolean;
  isSignedIn: boolean;
  level: string;
  canDownload: boolean;
  isPurchasableALaCarte: boolean;
  isPurchasableOnlyALaCarte: boolean;
  live: boolean;
  theCourseTitle: string;
  price: string;
  scheduledreleasedate: string;
  customeremail: string;
  certificateimage: string;
  coursesFromTheSameEducator: Course[]; // make sure current course is removed
  relatedCourses: Course[]; // this should already have current course removed
  hasPreviouslyPostedTestimonial: boolean;
  fullname: string;
  isPartOfSubscription: boolean;
  note: string;
  lastSavedOn: string;
  userDownloadableAccessLevel: string;
  courseDescription: string;
}

const PlayButtonMommy: React.FC<PlayButtonMommyProps> = async ({
  params,
  customeremail,
  courseID,
  certificateimage,
  userDataDatabaseId,
  userId,
  accessedCourseDBId,
  startChapter,
  isPartOfAccessedCourses,
  hasCompletedCourse,
  startTime,
  canWatchMainContent,
  themeColor,
  upcomingCourses,
  educatorHandles,
  pinned,
  userCanViewMainContent,
  isCourseFree,
  isSignedIn,
  canDownload,
  isPurchasableALaCarte,
  isPurchasableOnlyALaCarte,
  live,
  theCourseTitle,
  level,
  price,
  scheduledreleasedate,
  coursesFromTheSameEducator,
  relatedCourses,
  hasPreviouslyPostedTestimonial,
  fullname,
  isPartOfSubscription,
  note,
  lastSavedOn,
  userDownloadableAccessLevel,


}) => {


  const courseAllProm = getCourseAll(params);


  const courseAll = await courseAllProm;


  function formatDate(dateString: string): string {
    if (!dateString) {
      return 'Date not available';
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    const optionsDate: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      // year: 'numeric', // Year is commented out
      month: 'long',
      day: 'numeric'
    };

    // Updated time options to ensure lowercase 'am/pm'
    const optionsTime: Intl.DateTimeFormatOptions = {
       hour: 'numeric',
       minute: '2-digit',
       hour12: true,
       timeZoneName: 'short',
      //  timeZone: 'America/Chicago', // Central Time Zone
    };

    // Format the date and time
    let formattedDate = new Intl.DateTimeFormat('en-US', optionsDate).format(date);
    let formattedTime = new Intl.DateTimeFormat('en-US', optionsTime).format(date).toLowerCase();

    // Replace the time zone abbreviation with 'CT'
    formattedTime = formattedTime.replace(/(am|pm) .*/, '$1 CT');

    return `${formattedDate} @ ${formattedTime}`;
  }

  function formatTime(dateString: string): string {
    if (!dateString) {
      return 'Date not available';
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    // Since you only need the time in 24-hour format, you can simplify the options
    const optionsTime: Intl.DateTimeFormatOptions = {
       hour: 'numeric',
      minute: '2-digit',
      hour12: false, // Use 24-hour format
      // timeZone: 'America/Chicago' // Central Time Zone
    };

    const formattedTime = new Intl.DateTimeFormat('en-US', optionsTime).format(date);

    // Now, formattedTime will only contain the 24-hour format time
    return formattedTime;
  }

  // Usage
  const formattedTime = formatTime(scheduledreleasedate);



  const {
    courseDetailPicture,
    liveVideoId,
    courseThumbnailPicture,
    shareText,
    videoTrailerId,
    courseSlug,
    vimeoIdStrings,
    theCourseEducators,
    usedProducts,
    categories,
    downloadables,
    theCourseChapters,
    theCourseFormulas,
    courseDescription,

  } = extractCourseAll(courseAll);

  const upcoming = (categories.map((category: Category) => (category.name.toLowerCase()))).includes("upcoming");

  // const downloadables = courseDownloadables?.courseMetadata?.downloadables || [];

  const courseLink = "https://www.btcuniversity.com/courses/" + params.slug;

  // const formattedLaunchDate = extractDate(scheduledreleasedate);
  const formattedLaunchDate = formatDate(scheduledreleasedate); // switched to formatDate on jan 2

  const isCourseAvailableToBePurchasedALaCarte = isPurchasableALaCarte === true && price !== "0" && price !== "";


  return (
    <div className='py-2 md:py-0'>
      <PlayButtonBaby
        slug={params.slug}
        courseID={courseID}
        userDataDatabaseId={userDataDatabaseId}
        userId={userId}
        accessedCourseDBId={accessedCourseDBId}
        startChapter={startChapter}
        isPartOfAccessedCourses={isPartOfAccessedCourses}
        hasCompletedCourse={hasCompletedCourse}
        startTime={startTime}
        canWatchMainContent={canWatchMainContent}
        userCanViewMainContent={userCanViewMainContent}
        canDownload={canDownload}
        upcomingCourses={upcomingCourses}
        themeColor={themeColor}
        educatorHandles={educatorHandles}
        isCourseFree={isCourseFree}
        isSignedIn={isSignedIn}
        level={level}
        isPurchasableALaCarte={isPurchasableALaCarte}
        isPurchasableOnlyALaCarte={isPurchasableOnlyALaCarte}
        live={live}
        theCourseTitle={theCourseTitle}
        price={price}
        courseDetailPicture={courseDetailPicture}
        liveVideoId={liveVideoId}
        courseThumbnailPicture={courseThumbnailPicture}
        shareText={shareText}
        videoTrailerId={videoTrailerId}
        vimeoIdStrings={vimeoIdStrings}
        theCourseEducators={theCourseEducators}
        usedProducts={usedProducts}
        downloadables={downloadables}
        theCourseChapters={theCourseChapters}
        theCourseFormulas={theCourseFormulas}
        upcoming={upcoming}
        courseLink={courseLink}
        formattedLaunchDate={formattedLaunchDate}
        isCourseAvailableToBePurchasedALaCarte={isCourseAvailableToBePurchasedALaCarte}
        courseCardImage={courseThumbnailPicture}
        certificateimage={certificateimage}
        customeremail={customeremail}
        coursesFromTheSameEducator={coursesFromTheSameEducator}
        relatedCourses={relatedCourses}
        hasPreviouslyPostedTestimonial={hasPreviouslyPostedTestimonial}
        fullname={fullname}
        isPartOfSubscription={isPartOfSubscription}
        note={note}
        lastSavedOn={lastSavedOn}
        userDownloadableAccessLevel={userDownloadableAccessLevel} courseDescription={courseDescription} pinned={pinned} formattedLaunchTime={formattedTime} />
    </div>
  );
}

export default PlayButtonMommy;

