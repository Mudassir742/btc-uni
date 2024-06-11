import React from 'react';
import {
  getUpcomingCourses, getCourseAll, extractCourseAll,} from '@/app/courses/helper';
import '@/styles/globals.css';
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import CourseHeroNotSticky from './CourseHeroNotSticky';

interface CourseHeroReviewsProps {
  params: { slug: string };

  themeColor: string;
}
const CourseHeroReviewsComplete: React.FC<CourseHeroReviewsProps> = async ({
  params,
  themeColor,
}) => {

  // const userDataTestimonialsPromise = getCurrentUserDataTestimonialsCourseHero(userDataDatabaseId); // deprecated, fetching hasPostedTestimonial inside accessedcourse instead
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
        scheduledreleasedate,
 
      price,
  
    live,
 
  } = extractCourseAll(courseAll)

 
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

    const optionsTime: Intl.DateTimeFormatOptions = {
       hour: 'numeric',
      // minute: '2-digit',
      // timeZone: 'America/Chicago', // Central Time Zone
      timeZoneName: 'short' // Display abbreviated time zone name (e.g., CT)
    };

    const formattedDate = new Intl.DateTimeFormat('en-US', optionsDate).format(date);
    const formattedTime = new Intl.DateTimeFormat('en-US', optionsTime).format(date);

    return `${formattedDate} @ ${formattedTime}`;
  }

  // Usage
  const formattedReleaseDate = formatDate(scheduledreleasedate || "");



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
          <CourseHeroNotSticky
            params={params}
            themeColor={themeColor}
            releaseDate={formattedReleaseDate}
            live={live}
            price={price}
            scheduledreleasedate={scheduledreleasedate}
                      />
          </Suspense>
        </div>
      <div className="shadow-lg"/>
    </div>
  );
}

export default CourseHeroReviewsComplete;





