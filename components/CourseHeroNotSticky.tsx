import React from 'react';
import { Category, Course } from '@/interfaces';
import { extractDate, getCourseAll, extractCourseAll } from '@/app/courses/helper';
import '@/styles/globals.css';
import CourseHeroNotStickyClient from './CourseHeroNotStickyClient';

interface CourseHeroNotStickyProps {
  params: { slug: string };
  themeColor: string;
  releaseDate: string;
  live: boolean;
   price: string;
  scheduledreleasedate: string;
  
}

const CourseHeroNotSticky: React.FC<CourseHeroNotStickyProps> = async ({
  params,
  themeColor,
  releaseDate,
  live,
  price,
  scheduledreleasedate,
}) => {

  const courseAllProm = getCourseAll(params);


  const courseAll = await courseAllProm;

  // mihai note: this is the format date func that actually is running for date under trailer in course slug page
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

  const {

    ratingNumber,

    courseSlug,
    avgRating,
   
    categories,

    
  } = extractCourseAll(courseAll);

  const upcoming = (categories.map((category: Category) => (category.name.toLowerCase()))).includes("upcoming");

  // const downloadables = courseDownloadables?.courseMetadata?.downloadables || [];

  const courseLink = "https://www.btcuniversity.com/courses/" + courseSlug;

  // const formattedLaunchDate = extractDate(scheduledreleasedate);
  const formattedLaunchDate = formatDate(scheduledreleasedate); // switched to formatDate on jan 2



  return (
    <div>
      <CourseHeroNotStickyClient
        themeColor={themeColor}
        releaseDate={releaseDate}
        live={live}
        ratingNumber={ratingNumber}
        avgRating={avgRating}
        upcoming={upcoming}
        formattedLaunchDate={formattedLaunchDate}
       />
    </div>
  );
}

export default CourseHeroNotSticky;

