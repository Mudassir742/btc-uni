import React from 'react';
import Image from 'next/image';

import B1Text from './text/B1Text';
import FreeText from './text/FreeText';
import SH2Text from './text/SH2Text';
import { Course, Educator } from '@/interfaces';
import Link from 'next/link';
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import { Button } from './ui/Button';

// THIS IS NOT IN USE AS OF FEB 23 2024


interface UpcomingCourseCardProps {
  upcomingCourse: Course;
}

function extractDate(dateTimeStr: string) {
  return dateTimeStr.split(' ')[0];
}


const calendarLink = "https://calendar.google.com/calendar/event?action=TEMPLATE&tmeid=NzYyY3JwdHRlOGRvZ3BlcmFxdWMzcG1sYmwgYnJpYW5hc0BiZWhpbmR0aGVjaGFpci5jb20&tmsrc=brianas%40behindthechair.com";
let imageWidth = 260;
let imageHeight = 347;

const startTime = "";
const endTime = "";

const UpcomingCourseCard: React.FC<UpcomingCourseCardProps> = ({ upcomingCourse }) => {

  const price = upcomingCourse?.courseMetadata?.price?.toString() ?? "";
  const isCourseFree = price === "0";
  // const educatorHandle = upcomingCourse.courseMetadata?.maineducatorinstahandl || "";
  const educators = (upcomingCourse.courseMetadata?.educators || []).map((educator: Educator) => educator?.educatorMetaData?.instahandle || "");
  const courseTitle = upcomingCourse.title || "";
  const launchDate = upcomingCourse.courseMetadata?.scheduledreleasedate || "";
  const formattedLaunchDate = extractDate(launchDate);
  const upcomingBio = upcomingCourse.content || "";
  const imageSrc = upcomingCourse.courseMetadata?.courseThumbnailPicture?.mediaItemUrl || '/placeholder.png';
  const slug = upcomingCourse?.slug || "";
  const courseLink = "https://www.btcuniversity.com/courses/" + slug;

  return (
    <Link href={`/courses/${slug}`}>
      <div className="bg-[#F8F4F2] bg-opacity-100 rounded-xl" style={{ maxWidth: '260px' }}>
        <div style={{ position: 'relative', width: `${imageWidth}px`, height: 'auto' }}>
          <Image
            src={imageSrc}
            alt={courseTitle}
            width={imageWidth}
            height={imageHeight}
            style={{ borderTopLeftRadius: '15px', borderTopRightRadius: '15px' }}
          />
          {/* <Duration /> */}
          {isCourseFree && <FreeText price="FREE" />}

        </div>
        <div >
          <div className="pt-2">
 
            <AddToCalendarButton
              name={`BTC-U Premiere: ${courseTitle}`}
              description={`Please check updated launch time and more juicy details at ${courseLink}`}
              startDate={formattedLaunchDate}
              options={['Apple', 'Google']}
              label="Add To Calendar"
              forceOverlay={true}
              iCalFileName="Reminder-Event"
              lightMode="light"
              styleLight={
               
                "--btn-shadow: none; " +
                "--btn-border: #523D34; " +
                "shadow: none; " +
                "--btn-background: transparent; " +
                "--btn-text: #523D34; " +
                "--font: 'poppins', sans-serif;"
              }
              size="4"

            //  endDate="2023-06-05"
            //  startTime="12:00"
            //  endTime="14:00"
            //  startTime={startTime}
            //  endTime={endTime}
            // "--btn-border-color: white; " +
            // "--font-size: 6px !important" + 
            // "--base-font-size-l: 6px !important;" +
            // "--base-font-size-m: 6px !important;" +
            // "--base-font-size-s: 6px !important;" +
            // "--btn-width: 176px; " +
            // "--btn-height: 40px; " +
            // "--btn-radius: 8px;" +
            // above don't work

            //  timeZone="America/New_York"
            //  location="The Gran Centurions 440 Madison Hill Rd, Clark, NJ 07066"
            // above not needed for now but can be used
            />


          
             </div>


       
            
                <div className="p-2">
            <div >
              <SH2Text text={courseTitle} />
            </div>
            <div >
              {/* <SH2Text text={educatorHandle} /> */}
              {educators.length > 0 && (
                <SH2Text text={educators.join(', ')} className="text-secondarythemecolor" />
              )}
            </div>
            <B1Text text={upcomingBio} />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UpcomingCourseCard;


