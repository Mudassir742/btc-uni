import React from 'react';
import { Course, Educator, UserSession } from '@/interfaces';
import {
  today, getUpcomingCourses, getCourseAll, getCurrentUserDataForCourseSlugPageAll, extractCourseAll, extractCurrentUserDataForCourseSlugPageAll, getRandomTagCourses, getRandomCategoryCourses, shuffleArray, getCurrentUserDataLikedCourses, getCurrentUserDataAccessedCoursesExtendedCourseHero, getCurrentUserDataPurchasedCourses, getCurrentUserDataPurchasedBundles, getCurrentUserDataPurchasedSubscriptions,
  // getCurrentUserDataTestimonialsCourseHero 
} from '@/app/courses/helper';
import '@/styles/globals.css';
import CourseHeroSticky from './CourseHeroSticky';
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import { checkSubIsValidSubscriptionObject } from '@/utils/subValidation';
import { headers } from 'next/headers';
import PlayButtonMommy from './PlayButtonMommy';

interface PlayButtonDaddyProps {
  params: { slug: string };
  user: UserSession | null;
  themeColor: string;
}
const PlayButtonDaddy: React.FC<PlayButtonDaddyProps> = async ({
  params,
  user,
  themeColor,
}) => {


  // check if user is logged in
  const isSignedIn = (user?.userDataId || 0) > 0;

  const userDataDatabaseId = user?.userDataId || 0;
  const userDatabaseId = user?.userData?.databaseId || 0;

  // const courseDataExtraCourseHeroProm = getCourseExtrasCourseHero(params);
  // const courseBasicsProm = getCourseBasics(params);
  // const courseSubscriptionDataProm = getCourseSubscriptionData(params);
  const userDataPurchasedSubscriptionsPromise = getCurrentUserDataPurchasedSubscriptions(userDataDatabaseId);
  const userDataPurchasedCoursesPromise = getCurrentUserDataPurchasedCourses(userDataDatabaseId);// doing no-store since dec30
  const userDataPurchasedBundlesPromise = getCurrentUserDataPurchasedBundles(userDataDatabaseId);// doing no-store since dec30
  // const userDataLikedCoursesProm = getCurrentUserDataLikedCourses(userDataDatabaseId);
  const userDataAccessedCoursesPromise = getCurrentUserDataAccessedCoursesExtendedCourseHero(userDataDatabaseId);
  // const userDataTestimonialsPromise = getCurrentUserDataTestimonialsCourseHero(userDataDatabaseId); // deprecated, fetching hasPostedTestimonial inside accessedcourse instead
  const courseAllProm = getCourseAll(params);
  const userDataAllProm = getCurrentUserDataForCourseSlugPageAll(userDataDatabaseId);
  const upcomingCoursesProm = getUpcomingCourses();

  // fetch course chapters and user data in parallel
  const [
    courseAll,
    userDataAll,
    userDataPurchasedSubscriptions,
    userDataPurchasedCourses,
    userDataPurchasedBundles,
    accessedCourses,
    // userDataLikedCourses,
    // userDataTestimonials, // deprecated, fetching hasPostedTestimonial inside accessedcourse instead
    upcomingCourses
  ] = await Promise.all([
    courseAllProm,
    userDataAllProm,
    userDataPurchasedSubscriptionsPromise,
    userDataPurchasedCoursesPromise,
    userDataPurchasedBundlesPromise,
    userDataAccessedCoursesPromise,
    // userDataLikedCoursesProm, 
    // userDataTestimonialsPromise, // deprecated, fetching hasPostedTestimonial inside accessedcourse instead
    upcomingCoursesProm
  ]);


  const {
    level,
    scheduledreleasedate,
    theCourseEducators,
    courseID,
    isPartOfSubscription,
    price,
    isCoursePurchasableALaCarte,
    isCourseAvailableToBePurchasedOnlyALaCarte,
    live,
    theCourseTitle,
    categories,
    tags,
    relatedCourses,
    courseDescription
  } = extractCourseAll(courseAll)

  // const { accessedCourses } = extractCurrentUserDataForCourseSlugPageAll(userDataAll)

  const headersList = headers();
  const referer = headersList.get('referer');
  let uncapCourseCategory = "";
  let courseCategory = "";

  // const { categories, tags, relatedCourses, courseID } = extractCourseAll(courseAll);
  // const { accessedCourses } = extractCurrentUserDataForCourseSlugPageAll(userDataAll);


  // course category is first category of course in case there is nor referrer (user opens the course link directly)
  const firstCategoryOfCourse = categories[0]?.name || "";
  if (
    (referer !== null) && (referer !== "")

  ) {
    const parts = referer.split('/'); // Split the URL by "/"
    uncapCourseCategory = parts[parts.length - 1]; // Get the last part of the URL
    const processedCategoryNameFromReferer = uncapCourseCategory.charAt(0).toUpperCase() + uncapCourseCategory.slice(1).toLowerCase();
    if (
      processedCategoryNameFromReferer.toLowerCase() === "haircolor" ||
      processedCategoryNameFromReferer.toLowerCase() === "haircutting" ||
      processedCategoryNameFromReferer.toLowerCase() === "styling" ||
      processedCategoryNameFromReferer.toLowerCase() === "texture" ||
      processedCategoryNameFromReferer.toLowerCase() === "business" ||
      processedCategoryNameFromReferer.toLowerCase() === "mens" ||
      processedCategoryNameFromReferer.toLowerCase() === "hairextensions" ||
      processedCategoryNameFromReferer.toLowerCase() === "events" ||
      processedCategoryNameFromReferer.toLowerCase() === "languages"
    ) {
      courseCategory = processedCategoryNameFromReferer;
    }
  } else {
    courseCategory = firstCategoryOfCourse // if user goes on course slug page from anywhere else, use course's first category
  }

  // course tag names
  const courseTagNames = tags?.map((tag) => tag?.slug || "") || [];
  // CAN BE CHANGED: get only the tag relevant to the category page the user is coming from
  const filteredTagName = courseTagNames?.filter((tagName) => { return tagName.includes(courseCategory.toLowerCase()) ? tagName.includes(courseCategory.toLowerCase()) : tagName })[0];
  // ALTERNATIVELY, we can show courses with any of the tags that course has by using for example where: {tag: "haircutting-shags, haircutting-extensions"} in our gql query; in this case we won't need the category below


  const doubleFilteredTagName = filteredTagName ? filteredTagName : "";
  const tagCoursesProm = getRandomTagCourses(doubleFilteredTagName);
  const filteredCourseCategory = courseCategory.toLowerCase() === "haircolor" ? "hair-color" : (courseCategory.toLowerCase() === "hairextensions" ? "extensions" : (courseCategory.toLowerCase() === "events" ? "btc-events" : courseCategory.toLowerCase()));
  const categoryCoursesProm = getRandomCategoryCourses(filteredCourseCategory.toLowerCase());

  // below in CoursesInnerComponents, gets filteredTagName and courseID as prop
  // fetch 10 random courses in the category
  let displayedRelatedCourses: Course[] = relatedCourses;
    if (relatedCourses.length < 1) {
      const [fetchedTagCourses, fetchedCategoryCourses] = await Promise.all([tagCoursesProm, categoryCoursesProm]);
      // Fetch same tag and same category courses in parallel
      // randomize the order of the courses
      const randomTagCourses = shuffleArray<Course>(fetchedTagCourses);
      const randomCategoryCourses = shuffleArray<Course>(fetchedCategoryCourses);
      // merge arrays
      const combinedRelatedAndTagCourses = [...relatedCourses, ...randomTagCourses];
      // const combinedRelatedAndCategoryCourses = [...relatedCourses, ...randomCategoryCourses];
      // filtered to exclude current course (would be weird to see same course as a related course)
      const eitherTagOrCategoryCourses = combinedRelatedAndTagCourses.length < 20 ? [...combinedRelatedAndTagCourses, ...randomCategoryCourses] : combinedRelatedAndTagCourses;
      displayedRelatedCourses = eitherTagOrCategoryCourses.filter((course: Course) => course.databaseId !== courseID);
    }

    // const customeremail = userDataAll?.userDataMetadata?.emailaddress || ""; 
    const customeremail = user?.userData?.email || "";
    // const customerFullName = user?.userData?.name || ""; 
    // TO DO IMMEDIATELY AFTER LAUNCH, customerFullName is actually same as customeremail

    console.log("customeremail is: ", customeremail);
    // console.log("customerFullName is: ", customerFullName);
    // const customerFirstName = userDataAll?.userDataMetadata?.firstname || ""; 
    // const customerSecondName = userDataAll?.userDataMetadata?.lastname || ""; 
    const customerFullName = userDataAll?.userDataMetadata?.fullname || ""; 

    const isCourseFree = price === "0";
    console.log("price in coursehero is: ",price);
    console.log("isCourseFree in coursehero is: ",isCourseFree);
    const certificateimage = ""; // TO DO: add the only image we're using to build certificates, probably add locally to project

  

    const educatorHandles = theCourseEducators.map((educator: Educator) => educator?.educatorMetaData?.instahandle || "");
  
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

  // Usage
  const formattedReleaseDate = formatDate(scheduledreleasedate || "");

  // Convert subscription start and expiration dates to Date objects
  const purchasedSubscriptions = userDataPurchasedSubscriptions?.userDataMetadata.purchasedsubscriptions || [];
  // console.log("purchasedSubscriptions CourseHero: ", purchasedSubscriptions);
  // Sorting the array in descending order based on the subscription start date
  purchasedSubscriptions.sort((a, b) => {
    const dateA = new Date(a.subscriptionMetadata.subscriptionstartson).getTime();
    console.log("dateA CourseHero: ", dateA);
    const dateB = new Date(b.subscriptionMetadata.subscriptionstartson).getTime();
    console.log("dateB CourseHero: ", dateB);
    return dateA - dateB;  // Ascending order
  });
  // console.log("sorted purchasedSubscriptions CourseHero: ", purchasedSubscriptions);
  // Now the last element in the sorted array is the most recent subscription
  const lastSubscription = purchasedSubscriptions[purchasedSubscriptions.length - 1] || {};
  // console.log("lastSubscription CourseHero: ", lastSubscription);
  const userIsCurrentlySubscribed = await checkSubIsValidSubscriptionObject(lastSubscription);

  const lastSubscriptionTypeID = lastSubscription?.subscriptionMetadata?.subscriptiontype?.databaseId || 0;
  const upcomingSubscriptionTypeID = Number(lastSubscription?.subscriptionMetadata?.upcomingsubscriptionid || "" === "" ? "0" : lastSubscription?.subscriptionMetadata?.upcomingsubscriptionid);

  let userDownloadableAccessLevel = "nr";
  
  if (lastSubscriptionTypeID === 229341 || upcomingSubscriptionTypeID === 229341) {
    userDownloadableAccessLevel = "free";
  }
  else if  ((userIsCurrentlySubscribed && lastSubscriptionTypeID === 229342) || upcomingSubscriptionTypeID === 229342) {
    userDownloadableAccessLevel = "monthly";
  }
  else if  ((userIsCurrentlySubscribed && lastSubscriptionTypeID === 229343) || upcomingSubscriptionTypeID === 229343) {
    userDownloadableAccessLevel = "biannualy";
  }
  else if  ((userIsCurrentlySubscribed && lastSubscriptionTypeID === 229344) || upcomingSubscriptionTypeID === 229344) {
    userDownloadableAccessLevel = "annualy";
  }
  else if (lastSubscriptionTypeID === 0 && isSignedIn) {
      userDownloadableAccessLevel = "free";
  }

  const subscriptionStartsOn = new Date(lastSubscription?.subscriptionMetadata?.subscriptionstartson || "");
  const subscriptionExpiresOn = new Date(lastSubscription?.subscriptionMetadata?.subscriptionexpireson || "");

  // Check if subscription start date is today or one day before today
  const isSubscriptionStartTodayOrBefore = subscriptionStartsOn <= today;
  // Check if subscription expiration date is today or one day after today
  const isSubscriptionExpireTodayOrAfter = subscriptionExpiresOn >= today;

  // Checking if this course is part of accessed courses
  const isPartOfAccessedCourses = accessedCourses.some(
    (accessedcourse) => accessedcourse.accessedcoursemetadata.courseid === courseID
  );

  // Checking if user completed course
  const hasCompletedCourse = accessedCourses.some(
    (accessedcourse) => (accessedcourse?.accessedcoursemetadata?.courseid === courseID) && (accessedcourse.isCompleted === true)
  );

  // Checking if this course is part of previously posted testimonials
  // const hasPreviouslyPostedTestimonial = userDataTestimonials.some(
  //   (testimonial) => testimonial.testimonialMetadata.courseid === courseID.toString()
  // );
  const hasPreviouslyPostedTestimonial = accessedCourses.some(
    (accessedcourse) => (accessedcourse?.accessedcoursemetadata?.courseid === courseID) && (accessedcourse.hasPostedTestimonial === true)
  );

  // Get chapter if this course has already been viewed
  let startChapter: number;
  if (isPartOfAccessedCourses) {
    // If the user is part of accessed courses, find the endTime for the courseID
    const accessedCourse = accessedCourses.find(
      (accessedcourse) => accessedcourse.accessedcoursemetadata.courseid === courseID
    );

    if (accessedCourse) {
      startChapter = accessedCourse?.accessedcoursemetadata?.endedAtChapter || 1;
    } else {
      // Handle the case where the courseID is not found in accessed courses
      // You can set a default value or handle it as needed.
      startChapter = 1;
    }
  } else {
    // If the user is not part of accessed courses, set startTime to 0
    startChapter = 1;
  }

  // Get start time if this course has already been viewed
  let startTime: number = 0;
  let note = "";
  let lastSavedOn = "";
  if (isPartOfAccessedCourses) {
    // If the user is part of accessed courses, find the endTime for the courseID
    const accessedCourse = accessedCourses.find(
      (accessedcourse) => accessedcourse.accessedcoursemetadata.courseid === courseID
    );

    if (accessedCourse) {
      startTime = accessedCourse?.accessedcoursemetadata?.endTime || 0;
      note = accessedCourse?.accessedcoursemetadata?.coursenotes || "";
      lastSavedOn = accessedCourse?.accessedcoursemetadata?.courseNotesLastSavedOn || "";
    } else {
      // Handle the case where the courseID is not found in accessed courses
      // You can set a default value or handle it as needed.
      startTime = 0;
    }
  } else {
    // If the user is not part of accessed courses, set startTime to 0
    startTime = 0;
  }

  // Get databaseId of AccessedCourse in case it exists
  let accessedCourseDBId = 1;
  if (isPartOfAccessedCourses) {
    // If the user is part of accessed courses, find the endTime for the courseID
    const accessedCourse = accessedCourses.find(
      (accessedcourse) => accessedcourse.accessedcoursemetadata.courseid === courseID
    );

    if (accessedCourse) {
      startTime = accessedCourse?.accessedcoursemetadata?.endTime || 0;
      accessedCourseDBId = accessedCourse.databaseId;
    } else {
      // Handle the case where the courseID is not found in accessed courses
      // You can set a default value or handle it as needed.
      startTime = 0;
    }
  } else {
    // If the user is not part of accessed courses, set startTime to 0
    startTime = 0;
  }


  // Checking if this course is part of purchased courses
  // const purchasedCourses = userDataAll?.userDataMetadata?.purchasedcourses || [];
  const purchasedCourses = userDataPurchasedCourses?.userDataMetadata?.purchasedcourses || [];
  const isPartOfPurchasedCourses = purchasedCourses.some(
    (course) => course.databaseId === courseID
  );

  // Checking if this course is part of purchased bundles
  // const purchasedBundles = userDataAll?.userDataMetadata?.purchasedbundles || [];
  const purchasedBundles = userDataPurchasedBundles?.userDataMetadata?.purchasedbundless || [];

  const isPartOfPurchasedBundles = purchasedBundles.some(
    (bundle) => {
      // Check if courseID matches any course inside the bundle
      return bundle.coursebundlemetadata.coursesinbundle.some(
        (course) => course.databaseId === courseID
      );
    }
  );
  // Checking if the user can view the main content
  const userCanWatchMainContent = (
    (isCourseFree === true) ||
    (isSignedIn === true) && (
      isPartOfPurchasedCourses === true ||
      isPartOfPurchasedBundles === true ||
      (isPartOfSubscription === true &&
        // ((isSubscriptionStartTodayOrBefore === true && isSubscriptionExpireTodayOrAfter === true) &&
        //     subscriptiontier <= lastSubscription?.subscriptionMetadata?.subscriptiontype?.subscriptionTypeMetadata?.tier
        // )
        // TO DO AFTER LAUNCH: in the future we will need to check for tier as well if we implement tiers
        userIsCurrentlySubscribed === true
      )
    )
  )

  // Checking if the user can view the main content but with a tweak for watchforfree button to show
  const userCanViewMainContent = (
    // (isCourseFree === false) &&
    (isSignedIn === true) && (
      isPartOfPurchasedCourses === true ||
      isPartOfPurchasedBundles === true ||
      (isPartOfSubscription === true &&
        // ((isSubscriptionStartTodayOrBefore === true && isSubscriptionExpireTodayOrAfter === true) &&
        //     subscriptiontier <= lastSubscription?.subscriptionMetadata?.subscriptiontype?.subscriptionTypeMetadata?.tier
        // )
        // TO DO AFTER LAUNCH: in the future we will need to check for tier as well if we implement tiers
        userIsCurrentlySubscribed === true
      )
    )
  )

  const isCourseAvailableToBePurchasedALaCarte = isCoursePurchasableALaCarte === true && price !== "0" && price !== "";

  const coursesOfAllEducators = theCourseEducators.flatMap(educator => educator?.educatorMetaData?.courses || []);

  // remove the current course from this array as it would be redundant to show it
  const coursesOfAllEducatorsExceptCurrentCourse = coursesOfAllEducators.filter(course => course.databaseId !== courseID);

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
    <div className="">

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                </div>}>
          <PlayButtonMommy
            params={params}
            courseID={courseID}
            accessedCourseDBId={accessedCourseDBId}
            userId={userDatabaseId}
            canWatchMainContent={userCanWatchMainContent}
            canDownload={userCanWatchMainContent}
            userCanViewMainContent={userCanViewMainContent}
            isPartOfAccessedCourses={isPartOfAccessedCourses}
            hasCompletedCourse={hasCompletedCourse}
            startChapter={startChapter}
            startTime={startTime}
            userDataDatabaseId={userDataDatabaseId}
            upcomingCourses={upcomingCourses}
            themeColor={themeColor}
            educatorHandles={educatorHandles}
            // pinned={pinned}
            isCourseFree={isCourseFree}
            isSignedIn={isSignedIn}
            level={level}
            isPurchasableALaCarte={isCourseAvailableToBePurchasedALaCarte}
            isPurchasableOnlyALaCarte={isCourseAvailableToBePurchasedOnlyALaCarte}
            live={live}
            theCourseTitle={theCourseTitle}
            price={price}
            scheduledreleasedate={scheduledreleasedate}
            customeremail={customeremail}
            certificateimage={certificateimage}
            // coursesFromTheSameSeries={coursesFromTheSameSeries}
            coursesFromTheSameEducator={coursesOfAllEducatorsExceptCurrentCourse}
            relatedCourses={displayedRelatedCourses}
            hasPreviouslyPostedTestimonial={hasPreviouslyPostedTestimonial}
            // firstname={customerFirstName}
            // lastname={customerSecondName}
            fullname={customerFullName}
            isPartOfSubscription={isPartOfSubscription}
            note={note}
            lastSavedOn={lastSavedOn}
            userDownloadableAccessLevel={userDownloadableAccessLevel} courseDescription={courseDescription} pinned={false} />
          </Suspense>
       
  
    </div>
  );
}

export default PlayButtonDaddy;





