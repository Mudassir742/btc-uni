import { Downloadable, UserSession } from '@/interfaces';
import React, { HTMLAttributes } from 'react';
import { getCourseHighlights, getCourseBasics, getCourseSubscriptionData, getCurrentUserDataPurchasedBundles, getCurrentUserDataPurchasedCourses, getCurrentUserDataPurchasedSubscriptions, extractCourseHighlights, extractCourseSubscriptionData, extractCourseBasics, today, getCourseAll, getCurrentUserDataForCourseSlugPageAll, extractCourseAll } from '../helper';
import CourseHighlights from '@/components/CourseHighlights';
import { checkSubIsValidSubscriptionObject } from '@/utils/subValidation';

interface CourseSlugHighlightsProps extends HTMLAttributes<HTMLDivElement> {
    params: { slug: string };
    user: UserSession | null;

}

const CourseSlugHighlights: React.FC<CourseSlugHighlightsProps> = async ({ params, user, className }) => {

    // check if user is logged in
    const isLoggedIn = (user?.userDataId || 0) > 0;

    // const courseHighlightsProm = getCourseHighlights(params);
    // const courseBasicsProm = getCourseBasics(params);
    // const courseSubscriptionDataProm = getCourseSubscriptionData(params);
    const courseAllProm = getCourseAll(params);


    const userDataPurchasedSubscriptionsPromise = getCurrentUserDataPurchasedSubscriptions(user?.userDataId || 0);
    const userDataPurchasedCoursesPromise = getCurrentUserDataPurchasedCourses(user?.userDataId || 0);// doing no-store since dec30
    const userDataPurchasedBundlesPromise = getCurrentUserDataPurchasedBundles(user?.userDataId || 0);// doing no-store since dec30
    // const userDataAllProm = getCurrentUserDataForCourseSlugPageAll(user?.userDataId || 0);


    // fetch course chapters and user data in parallel
    const [
        courseAll,
        userDataPurchasedCourses,// doing no-store since dec30
        userDataPurchasedBundles,// doing no-store since dec30
        // userDataAll,
        userDataPurchasedSubscriptions
    ] = await Promise.all([
        courseAllProm,
        userDataPurchasedCoursesPromise,// doing no-store since dec30
        userDataPurchasedBundlesPromise,// doing no-store since dec30
        // userDataAllProm,
        userDataPurchasedSubscriptionsPromise
    ]);

    const { courseID, isPartOfSubscription, subscriptiontier, price, isCoursePurchasableALaCarte, isCourseAvailableToBePurchasedOnlyALaCarte, newCourseHighlights } = extractCourseAll(courseAll);
    // const { isCoursePurchasableALaCarte, isCourseAvailableToBePurchasedOnlyALaCarte } = extractCourseBasics(courseBasics)
    // const { newCourseHighlights } = extractCourseHighlights(courseHighlights);

    const isCourseFree = price === "0";

    // Convert subscription start and expiration dates to Date objects
    const purchasedSubscriptions = userDataPurchasedSubscriptions?.userDataMetadata.purchasedsubscriptions || [];
    // Sorting the array in descending order based on the subscription start date
    purchasedSubscriptions.sort((a, b) => {
      const dateA = new Date(a.subscriptionMetadata.subscriptionstartson).getTime();
      const dateB = new Date(b.subscriptionMetadata.subscriptionstartson).getTime();
      return dateA - dateB;  // Ascending order
    });
    // Now the last element in the sorted array is the most recent subscription
    const lastSubscription = purchasedSubscriptions[purchasedSubscriptions.length - 1] || {};

    const userIsCurrentlySubscribed = await checkSubIsValidSubscriptionObject(lastSubscription);

    // Checking if this course is part of purchased courses
    // const purchasedCourses = userDataAll?.userDataMetadata?.purchasedcourses || [];
    const purchasedCourses = userDataPurchasedCourses?.userDataMetadata?.purchasedcourses || []; // doing no-store since dec30
    const isPartOfPurchasedCourses = purchasedCourses.some(
        (course) => course.databaseId === courseID
    );

    // Checking if this course is part of purchased bundles
    // const purchasedBundles = userDataAll?.userDataMetadata?.purchasedbundles || [];
    const purchasedBundles = userDataPurchasedBundles?.userDataMetadata?.purchasedbundless || [];// doing no-store since dec30
    const isPartOfPurchasedBundles = purchasedBundles.some(
        (bundle) => {
            // Check if courseID matches any course inside the bundle
            return bundle.coursebundlemetadata.coursesinbundle.some(
                (course) => course.databaseId === courseID
            );
        }
    );

    // Checking if the user can view the main content
    const userCanViewMainContent = (
        (isCourseFree === true) ||
        (isLoggedIn === true) && (
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


    return (
        <div className={className}>
            {newCourseHighlights.length > 0 && (
                <div>
                    <CourseHighlights
                        courseHighlights={newCourseHighlights}
                        canWatch={userCanViewMainContent}
                        isPurchasableALaCarte={isCoursePurchasableALaCarte}
                        isPurchasableOnlyALaCarte={isCourseAvailableToBePurchasedOnlyALaCarte}
                        userDataBaseId={(user?.userDataId || 0).toString()}
                        courseId={courseID} />
                
                </div>)}
        </div>
    );
}

export default CourseSlugHighlights;