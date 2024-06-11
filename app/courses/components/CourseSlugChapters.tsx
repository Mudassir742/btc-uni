import React, { HTMLAttributes } from 'react';
import { getCurrentUserDataPurchasedCourses, getCurrentUserDataPurchasedBundles, today, getCourseSubscriptionData, extractCourseSubscriptionData, getCourseAll, getCurrentUserDataForCourseSlugPageAll, extractCourseAll } from '../helper';
import { headers } from 'next/headers';
import { UserSession } from '@/interfaces';
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import CourseSlugRelatedCoursesInner from './CourseSlugRelatedCoursesInner';
import Chapters from '@/components/Chapters';
import { checkSubIsValidSubscriptionObject } from '@/utils/subValidation';

interface CourseSlugChaptersProps extends HTMLAttributes<HTMLDivElement> {
    params: { slug: string };
    // user: UserSession | null;
    themeColor: string;
}

const CourseSlugChapters: React.FC<CourseSlugChaptersProps> = async ({ params, className, 
    // user, 
    themeColor }) => {

    // check if user is logged in
    // const isLoggedIn = (user?.userDataId || 0) > 0;

    // console.log("current userdata id is: ", user?.userDataId);

    // const courseChaptersProm = getCourseChapters(params);
    // const courseSubscriptionDataProm = getCourseSubscriptionData(params);
    const courseAllProm = getCourseAll(params);
    // here we're just getting the chapters


    // const userDataPurchasedSubscriptionsPromise = getCurrentUserDataPurchasedSubscriptions(user?.userDataId || 0);
    // const userDataPurchasedCoursesPromise = getCurrentUserDataPurchasedCourses(user?.userDataId || 0);// doing no-store since dec30
    // const userDataPurchasedBundlesPromise = getCurrentUserDataPurchasedBundles(user?.userDataId || 0);// doing no-store since dec30
    // const userDataAllProm = getCurrentUserDataForCourseSlugPageAll(user?.userDataId || 0);

    const courseAll = await courseAllProm;
    // fetch course chapters and user data in parallel
    // const [
    //     courseAll,
    //     // userDataPurchasedCourses,// doing no-store since dec30 // found not used on jan 15 so removed
    //     // userDataPurchasedBundles,// doing no-store since dec30 // found not used on jan 15 so removed
    //     // userDataAll // found not used on jan 15 so removed
    // ] = await Promise.all([
    //     courseAllProm,
    //     // userDataPurchasedCoursesPromise,// doing no-store since dec30 // found not used on jan 15 so removed
    //     // userDataPurchasedBundlesPromise,// doing no-store since dec30 // found not used on jan 15 so removed
    //     // userDataAllProm // found not used on jan 15 so removed
    // ]);

    const { 
        // courseID, isPartOfSubscription, subscriptiontier, price, 
        theCourseChapters } = extractCourseAll(courseAll);

    // const isCourseFree = price === "0";

    // Convert subscription start and expiration dates to Date objects
    // const purchasedSubscriptions = userDataAll?.userDataMetadata.purchasedsubscriptions || [];
    // const lastSubscription = purchasedSubscriptions[purchasedSubscriptions.length - 1] || {};
    // const subscriptionStartsOn = new Date(lastSubscription?.subscriptionMetadata?.subscriptionstartson || "");
    // const subscriptionExpiresOn = new Date(lastSubscription?.subscriptionMetadata?.subscriptionexpireson || "");

    // // Check if subscription start date is today or one day before today
    // const isSubscriptionStartTodayOrBefore = subscriptionStartsOn <= today;
    // // Check if subscription expiration date is today or one day after today
    // const isSubscriptionExpireTodayOrAfter = subscriptionExpiresOn >= today;

    // const userIsCurrentlySubscribed = await checkSubIsValidSubscriptionObject(lastSubscription);

    // // Checking if this course is part of purchased courses
    // // const purchasedCourses = userDataAll?.userDataMetadata?.purchasedcourses || [];
    // const purchasedCourses = userDataPurchasedCourses?.userDataMetadata?.purchasedcourses || [];// doing no-store since dec30
    // const isPartOfPurchasedCourses = purchasedCourses.some(
    //     (course) => course.databaseId === courseID
    // );

    // // Checking if this course is part of purchased bundles
    // // const purchasedBundles = userDataAll?.userDataMetadata?.purchasedbundles || [];
    // const purchasedBundles = userDataPurchasedBundles?.userDataMetadata?.purchasedbundles || [];// doing no-store since dec30
    // const isPartOfPurchasedBundles = purchasedBundles.some(
    //     (bundle) => {
    //         // Check if courseID matches any course inside the bundle
    //         return bundle.coursebundlemetadata.coursesinbundle.some(
    //             (course) => course.databaseId === courseID
    //         );
    //     }
    // );

    // // Checking if the user can view the main content
    // const userCanViewMainContent = (
    //     (isCourseFree === true) ||
    //     (isLoggedIn === true) && (
    //         isPartOfPurchasedCourses === true ||
    //         isPartOfPurchasedBundles === true ||
    //         (isPartOfSubscription === true &&
    //             // ((isSubscriptionStartTodayOrBefore === true && isSubscriptionExpireTodayOrAfter === true) &&
    //             //     subscriptiontier <= lastSubscription?.subscriptionMetadata?.subscriptiontype?.subscriptionTypeMetadata?.tier
    //             // )
    //             // TO DO AFTER LAUNCH: in the future we will need to check for tier as well if we implement tiers
    //             userIsCurrentlySubscribed === true
    //         )
    //     )
    // )


    return (
        <div className={className}>
            {theCourseChapters.length > 0 && (
                <div>
                    <Chapters
                        courseChapters={theCourseChapters}
                        themeColor={themeColor}
                        // userAccess={userCanViewMainContent} 
                        />

                </div>
            )}
        </div>
    );
}

export default CourseSlugChapters;