"use client";
import React from "react";
import Image from "next/image";
import { Category, Course } from "@/interfaces";
import Link from "next/link";
import Checkmark from "./icons/Checkmark";
import Rating from "@mui/material/Rating";
import YouTubeTrailerVideoPlayer from "./YouTubeTrailerVideoPlayer";
import SaveMySpotButton from "./buttons/SaveMySpotButton";
import UpComingClassDate from "./text/UpcomingClassDate";


import ParagraphText from "./text/Paragraph";
import EducatorsName from "./text/EducatorsName";
import CourseTitle from "./text/CourseTitle";
import Duration from "./text/Duration";
import DurationText from "./text/Duration";
import FreeTextWords from "./text/FreeTextWords";

interface YouTubeVideoCardMoreCoursesYouMayLikeProps {
  course: Course;
  completed: boolean;
  themeColor: string;
  educators: string[];
  backgroundColor?: string;
  subscriber?: boolean;
  courseId: number;
  userDataBaseId: string;
}
// to do: (briana's note to mihai on 1/19/23) make the subscriber not ?. we need to know if user is a subscriber or not so we know if we should should the free component or not.

const YouTubeVideoCardMoreCoursesYouMayLike: React.FC<YouTubeVideoCardMoreCoursesYouMayLikeProps> = ({
  themeColor,
  completed,
  course,
  educators,
  backgroundColor,
  subscriber,
  courseId,
  userDataBaseId,
}) => {
  // commented out on jan 6 due to rerendering performance issues. moreover, yt video cards were not resizing anyway
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (containerRef.current) {
  //       setContainerWidth(containerRef.current.offsetWidth);
  //     }
  //   };

  //   // Log a message to check if the function is called
  //   console.log("Resizing");
  //   // Set the initial width
  //   handleResize();

  //   // Add event listener
  //   window.addEventListener("resize", handleResize);

  //   // Remove event listener on cleanup
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);

  // useEffect(() => {
  //   const resizeHandler = () => {
  //     // Trigger a re-render when the window resizes
  //     setContainerWidth(containerRef.current?.offsetWidth || 500);
  //   };

  //   // Call the resize handler initially and add the event listener
  //   resizeHandler();
  //   window.addEventListener("resize", resizeHandler);

  //   // Clean up the event listener
  //   return () => {
  //     window.removeEventListener("resize", resizeHandler);
  //   };
  // }, []);
  // commented out on jan 6 due to rerendering performance issues. moreover, yt video cards were not resizing anyway

  if (!course) {
    return null;
  }

  const { title, courseMetadata, slug, categories, databaseId } = course;
  const pictureUrl =
    courseMetadata?.courseDetailPicture?.mediaItemUrl || "/placeholder.png";
  const vimeoPromoId = courseMetadata?.vimeoPromoId || "";
  const durationOfCourse = courseMetadata?.courseDuration || "";
  // const mainEducatorHandle = courseMetadata?.maineducatorinstahandl || "";
  // const educators = (courseMetadata?.educators || []).map((educator: Educator) => educator?.educatorMetaData?.instahandle || "");
  const noOfTestimonials = courseMetadata?.noOfTestimonials || 0;
  const avgRating = courseMetadata?.averageRating || 0;
  const price = courseMetadata?.price?.toString() ?? "";
  const isCourseFree = price === "0";
  const shortDescription = courseMetadata?.courseHeroDescription || "";
  const upcoming = (categories?.nodes || [])
    .map((category: Category) => (category?.name || "").toLowerCase())
    .includes("upcoming");

  const courseLink = "https://www.btcuniversity.com/courses/" + slug;

  function formatLaunchDate(dateString: string): string {
    if (!dateString) {
      return 'Date not available';
    }

    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }

    // Updated options to include periods and ensure the format is like "Mon. Apr. 8"
    const optionsDate: Intl.DateTimeFormatOptions = {
      weekday: 'short', // "Mon" for Monday
      month: 'short', // "Apr" for April
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

    // Add periods to the formatted date for "Mon." and "Apr."
    formattedDate = formattedDate.replace(/^(\w+),/, '$1.').replace(/(\w+) (\d+),/, '$1. $2');

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
  const formattedLaunchDate = formatLaunchDate(courseMetadata?.scheduledreleasedate || "");
  const formattedTime = formatTime(courseMetadata?.scheduledreleasedate || "");


  function convertTimeToHoursMinutes(time: string): string {
    if (!time) {
      return "";
    }

    const timeParts = time.split(":").map(Number);

    if (timeParts.length === 3) {
      const [hours, minutes, seconds] = timeParts;
      const totalMinutes = hours * 60 + minutes + (seconds >= 30 ? 1 : 0);

      if (totalMinutes === 60) {
        return "1 hr";
      } else {
        const hoursPart =
          totalMinutes >= 60 ? `${Math.floor(totalMinutes / 60)} hr` : "";
        const minutesPart =
          totalMinutes % 60 > 0 ? `${totalMinutes % 60} min` : "";
        return `${hoursPart} ${minutesPart}`;
      }
    } else if (timeParts.length === 2) {
      const [minutes, seconds] = timeParts;
      const totalMinutes = minutes + (seconds >= 30 ? 1 : 0);

      if (totalMinutes === 60) {
        return "1 hr";
      } else {
        return `${totalMinutes} min`;
      }
    } else {
      return "";
    }
  }

  const onUserClick = () => {
    // send to GA
    (window as any).dataLayer.push({
      event: "clickedMoreCoursesYouMayLike",

      onPageOfCourse: courseId.toString(),
      userDataId: userDataBaseId,

      newCourseId: databaseId,
      newCourseName: title,

      timestamp: new Date().toISOString(),
    });
  }

  return (
    <div className={`p-4 min-w-[327px] w-full md:w-[370px]`} >

      {/* <div className="!w-full md:w-[370px]  border-[1px] border-border rounded-xl h-full"> */}
      <div className={`!w-full md:w-[370px]  border-[1px] border-border rounded-xl h-full bg-${backgroundColor}`} >

        <Link id="Suggested-Course-Card" href={`/courses/${slug}`} onClick={onUserClick}>
          <div className="relative">
            {/* to do: checkmark & Overlay, will only appear if the user has completed the course. */}
            {completed && (
              <div >

              <div
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.7)", // White with 70% opacity
                  zIndex: "2", // Ensure it's above the image
                }}
              ></div>
                 <div
                style={{
                  zIndex: "3",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "58px",
                  height: "58px",
                  borderRadius: "50%",
                  borderColor: "white",
                  backgroundColor: "white", // Set background color to white
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Checkmark fill={"#C4A18D"} width={40} height={40} />

              </div>
                </div>
              
            )}
            {/* to do: checkmark & Overlay, will only appear if the user has completed the course. */}
            {completed && (
              <div
                style={{
                  zIndex: "2",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "58px",
                  height: "58px",
                  borderRadius: "50%",
                  borderColor: "white",
                  backgroundColor: "white", // Set background color to white
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Checkmark fill={"#C4A18D"} width={40} height={40} />

              </div>
            )}

            
            {/* {vimeoPromoId !== "" && (
              <YouTubeTrailerVideoPlayer videoId={vimeoPromoId} />
            )} */}
            {vimeoPromoId !== "" && (
              <>
                <YouTubeTrailerVideoPlayer videoId={vimeoPromoId} />
                {/* Overlay with Tailwind CSS */}
                <Link href={`/courses/${slug}`} className="absolute inset-0 z-2" />
              </>
            )}
            {vimeoPromoId === "" && (
              <div className="!w-full object-cover relative pb-[56.25%] h-0 overflow-hidden ">

                <Image
                  src={pictureUrl}
                  alt={slug}
                  fill={true}
                  className="object-cover rounded-t-xl  "

                />
              </div>
            )}

            {durationOfCourse !== "" && (
              <div className={`absolute top-2 right-2 z-1`}>
                <DurationText text={convertTimeToHoursMinutes(durationOfCourse)} color="white" />
              </div>
            )}


           

  
            {isCourseFree && !subscriber && (
              <FreeTextWords />

            )}
          </div>

          <div >
            <div >
              <div className="py-2 container">
                {upcoming ? (
                  <div >
                    <div className="items-center flex">
                      <div className="pr-2">
                        <div className=" text-sm font-semibold leading-[150%]">
                          Premiering:
                        </div>
                      </div>
                      {upcoming === true && formattedLaunchDate !== "" && (
                        <UpComingClassDate date={formattedLaunchDate} />
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex pt-1 items-center">
                    {noOfTestimonials > 5 && avgRating > 4.5 && (
                      <Rating
                        name="half-rating-read"
                        defaultValue={avgRating}
                        precision={0.5}
                        readOnly
                        style={{ color: themeColor }}
                        size="small"
                      />
                    )}
                    {noOfTestimonials > 5 && avgRating > 4.5 && (

                      <div className="flex pl-[8px] items-center">
                        <ParagraphText text="(" className="text-themeColor" />
                        <ParagraphText
                          text={noOfTestimonials.toString()}
                          className="text-themeColor underline"
                        />
                        <ParagraphText text=")" className="text-themeColor" />
                      </div>


                    )}


                  </div>
                )}




                <CourseTitle text={title} />
                {shortDescription ? (
                  <div className="line-clamp-3">

                    <ParagraphText text={shortDescription} className="line-clamp-3 text-themeColor"/>
                    </div>
                ) : null}

                <div className="overflow-x-auto whitespace-nowrap">
                  {educators.length > 0 && (
                    <EducatorsName
                      text={educators.join(", ")}
                      className="text-secondarythemecolor truncate overflow-ellipsis"
                    />
                  )}


                </div>

              </div>

            </div>
          </div>
        </Link>
        {upcoming ? (
          <div className="px-4">
            <SaveMySpotButton
              theCourseTitle={title}
              courseLink={courseLink}
              formattedLaunchDate={formattedLaunchDate}
              formattedTime={formattedTime}
              userDataBaseId={userDataBaseId}
            />
          </div>
        ) : null}
      </div>

  
  
    </div>
  );
};

export default YouTubeVideoCardMoreCoursesYouMayLike;
