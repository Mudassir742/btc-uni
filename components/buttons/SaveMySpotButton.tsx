"use client";
import React from 'react';
import Link from 'next/link';
import ButtonText from '../text/ButtonText';
import { cn } from '@/utils/shadcn';
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import { Button } from '../ui/Button';
import { CalendarDays } from 'lucide-react';
import { addOneHour, convertToYYYYMMDD } from '@/utils/formatDate';

type SaveMySpotButtonProps = {
  theCourseTitle: string;
  courseLink: string;
  formattedLaunchDate: string;
  formattedTime: string;
  userDataBaseId: string;
};

const SaveMySpotButton = ({
  theCourseTitle,
  courseLink,
  formattedLaunchDate,
  formattedTime,
  userDataBaseId,
}: SaveMySpotButtonProps) => {

  const updatedFormattedLaunchDate = convertToYYYYMMDD(formattedLaunchDate)
  const updatedFormattedTime = addOneHour(formattedTime)


  console.log("mihai SaveMySpotButton formattedLaunchDate is: ", formattedLaunchDate);
  console.log("mihai SaveMySpotButton formattedTime is: ", formattedTime);

  console.log("mihai SaveMySpotButton updatedFormattedLaunchDate is: ", updatedFormattedLaunchDate);
  console.log("mihai SaveMySpotButton updatedFormattedTime is: ", updatedFormattedTime);

  const onUserClick = () => {
    // Send to GA
    (window as any).dataLayer.push({
      event: "clickedAddToCalendar",

      courseTitle: theCourseTitle,
      userDataId: userDataBaseId,

      formattedLaunchDate: formattedLaunchDate,
      formattedTime: formattedTime,

      timestamp: new Date().toISOString(),
    });
  }

  return (
    <>
      <div className='py-2'>


        <Button id="Add-To-Calendar-Button" variant='secondary' className='flex justify-center !z-[10000000]' onClick={onUserClick}>
          <CalendarDays color='#523D34' />
          <AddToCalendarButton
            name={`BTC-U Premiere: ${theCourseTitle}`}
            description={
                          `Please check updated launch time and more juicy details at ${courseLink}.`
                          +
                          " "
                          +
                          "If you are not already subscribed, go to https://btcuniversity.com/subscribe and subscribe in order to watch the class."
                        }
            startDate={updatedFormattedLaunchDate}
            endDate={updatedFormattedLaunchDate}
            startTime={formattedTime}
            endTime={updatedFormattedTime}
            options={['Apple', 'Google']}
            label="Add To Calendar"
            timeZone='America/Chicago'
            forceOverlay={true}
            iCalFileName="Reminder-Event"
            lightMode="light"
            styleLight={
              "--btn-padding: 0px; " +
              "--btn-shadow: none; " +
              "--btn-border: transparent; " +
              "shadow: none; " +
              "--btn-background: transparent; " +
              "--btn-text: #523D34; " +
              "--font: 'poppins', sans-serif;"
            }
            size="4"
            hideIconButton={true}
          />
        </Button>
      </div>
    </>
  );
};

export default SaveMySpotButton;