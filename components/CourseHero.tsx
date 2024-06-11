import React, { useEffect } from 'react';
import {  getUpcomingCourses, getCourseAll, extractCourseAll, } from '@/app/courses/helper';
import '@/styles/globals.css';
import CourseHeroSticky from './CourseHeroSticky';
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { headers } from 'next/headers';

interface CourseHeroProps {
  params: { slug: string };

}
const CourseHero: React.FC<CourseHeroProps> = async ({
  params,
 
}) => {


  const courseAllProm = getCourseAll(params);

  const upcomingCoursesProm = getUpcomingCourses();

  // fetch course chapters and user data in parallel
  const [
    courseAll,
        ] = await Promise.all([
    courseAllProm,

    upcomingCoursesProm
  ]);


  const {
    courseDuration,

    theCourseTitle,

  } = extractCourseAll(courseAll)

  // const { accessedCourses } = extractCurrentUserDataForCourseSlugPageAll(userDataAll)

  const headersList = headers();
  const referer = headersList.get('referer');


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

 

  // Converting the time entered in wp (e.g. 1:22) to minutes
  function convertTimeToHoursMinutes(time: string): string {
    if (!time) {
      return '';
    }

    const timeParts = time.split(':').map(Number);

    if (timeParts.length === 3) {
      const [hours, minutes, seconds] = timeParts;
      const totalMinutes = hours * 60 + minutes + (seconds >= 30 ? 1 : 0);

      if (totalMinutes === 60) {
        return '1 hr';
      } else {
        const hoursPart = totalMinutes >= 60 ? `${Math.floor(totalMinutes / 60)} hr` : '';
        const minutesPart = totalMinutes % 60 > 0 ? `${totalMinutes % 60} min` : '';
        return `${hoursPart} ${minutesPart}`;
      }
    } else if (timeParts.length === 2) {
      const [minutes, seconds] = timeParts;
      const totalMinutes = minutes + (seconds >= 30 ? 1 : 0);

      if (totalMinutes === 60) {
        return '1 hr';
      } else {
        return `${totalMinutes} min`;
      }
    } else {
      return '';
    }
  }



  return (
    <div className=" ">
        <div >

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                </div>}>
                <CourseHeroSticky
                // userToken={`${user?.authToken}`}
            params={params}
            duration={convertTimeToHoursMinutes(courseDuration)}
            theCourseTitle={theCourseTitle}
           />
          </Suspense>
        </div>
      <div className="shadow-lg"/>
    </div>
  );
}

export default CourseHero;





