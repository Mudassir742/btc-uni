import React, { HTMLAttributes } from 'react';
import { getCurrentUserDataPurchasedCourses, getCurrentUserDataPurchasedBundles, } from '@/app/courses/helper';
import { Course, CourseBundle, Downloadable, Educator, UserSession } from '@/interfaces';

import { checkSubIsValidSubscriptionObject } from '@/utils/subValidation';
import CollectionsMainClientComponent from '@/components/CollectionsMainClientComponent';
import CourseCard from '@/components/CourseCard';
import { getCurrentUserDataPurchasedSubscriptions } from '@/app/courses/helper';
import { GET_COURSE_BUNDLE_BY_SLUG } from '@/graphql/queries';
import { generateWpPageError } from '@/utils/wpErrorHandling';
import { transformDataForWpUrl } from '@/utils/url';
import DownloadableCard from '@/components/DownloadableCard';
import { themeColor } from '../helper';

interface MainServerComponentProps extends HTMLAttributes<HTMLDivElement> {
    params: { slug: string };
    user: UserSession | null;

}

const MainServerComponent: React.FC<MainServerComponentProps> = async ({ params, className, 
    user, 
   }) => {

    
  // get UserData database id
  const userDataDatabaseId = user?.userDataId || 0;
  // check if user is logged in
  const isLoggedIn = (user?.userDataId || 0) > 0;
  // get full UserData object
  // get collections
  const courseBundleDataPromise = getCourseBundle(params);
  const userDataPurchasedSubscriptionsPromise = getCurrentUserDataPurchasedSubscriptions(userDataDatabaseId);
  const userDataPurchasedBundlesPromise = getCurrentUserDataPurchasedBundles(userDataDatabaseId);
  const userDataPurchasedCoursesPromise = getCurrentUserDataPurchasedCourses(userDataDatabaseId);
  // const currentUserData = await getCurrentUserDataIfExist(user);
  // const subscriptionStartsOn = new Date(lastSubscription?.subscriptionMetadata?.subscriptionstartson || "");
  // const subscriptionExpiresOn = new Date(lastSubscription?.subscriptionMetadata?.subscriptionexpireson || "");
  // // Check if subscription start date is today or one day before today
  // const isSubscriptionStartTodayOrBefore = subscriptionStartsOn <= today;
  // // Check if subscription expiration date is today or one day after today
  // const isSubscriptionExpireTodayOrAfter = subscriptionExpiresOn >= today;
  // // Checking if the user is currently subscribed
  // const userIsCurrentlySubscribed = (
  //   (isLoggedIn === true) && (
  //     isSubscriptionStartTodayOrBefore === true &&
  //     isSubscriptionExpireTodayOrAfter === true
  //   )
  // )

  const [
    courseBundleData,
    userDataPurchasedSubscriptions,
    userDataPurchasedCourses,// doing no-store since dec30 // found not used on jan 15 so removed
    userDataPurchasedBundles,// doing no-store since dec30 // found not used on jan 15 so removed
    // userDataAll // found not used on jan 15 so removed
] = await Promise.all([
    courseBundleDataPromise,
    userDataPurchasedSubscriptionsPromise,
    userDataPurchasedCoursesPromise,// doing no-store since dec30 // found not used on jan 15 so removed
    userDataPurchasedBundlesPromise,// doing no-store since dec30 // found not used on jan 15 so removed
    // userDataAllProm // found not used on jan 15 so removed
]);

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

  const purchasedCourses = userDataPurchasedCourses?.userDataMetadata?.purchasedcourses || [];

  const collectionId = courseBundleData?.databaseId || 0;
  const collectionSlug = courseBundleData?.slug || "";
  const collectionTitle = courseBundleData?.title || "";
  const description = courseBundleData?.content || "";
  // removing html entities from content
  // const formattedContent = he.decode(description).replace(/<\/?p>/g, '').split('<br />').join('\n');
  const formattedContent = description;
  const trailerImage =
    courseBundleData.coursebundlemetadata?.bundleimage?.mediaItemUrl ||
    "/placeholder.png";
  const collectionPrice =
    courseBundleData.coursebundlemetadata?.actualprice?.toString() ?? "";
  const isCourseFree = collectionPrice === "0";
  const numberofCoursesinCollection = (
    (courseBundleData?.coursebundlemetadata?.coursesinbundle || []).length || 10
  ).toString();
  const includedCourses =
    courseBundleData?.coursebundlemetadata?.coursesinbundle || [];

  const bundleIsNotCompletelyPartOfSubscription = includedCourses.some((course) => {
    return course.isPartOfSubscription === false;
  });

  // Checking if this course is part of purchased bundles
  // const purchasedBundles = userDataAll?.userDataMetadata?.purchasedbundles || [];
  const purchasedBundles = userDataPurchasedBundles?.userDataMetadata?.purchasedbundless || [];// doing no-store since dec30
  const userPurchasedBundle = purchasedBundles.some(
      (bundle) => bundle.databaseId === collectionId
  );

  console.log("purchasedCourses are: "), purchasedCourses;
  console.log("includedCourses are: "), includedCourses;
  // TO DO WHEN I COME BACK FROM BREAK: THE ABOVE ARE EMPTY

  const userPurchasedAllCoursesInBundle = includedCourses.every(includedCourse => 
    purchasedCourses.some(purchasedCourse => purchasedCourse.databaseId === includedCourse.databaseId)
  );

  // EDUCATORS within a collection
  const educatorsOfIncludedCourses = includedCourses.flatMap(
    (course: Course) => course?.courseMetadata?.educators || []
  );
  // Remove duplicate educators. Assumes slug is a unique identifier for each educator.
  const uniqueEducatorIds = Array.from(
    new Set(educatorsOfIncludedCourses.map((educator) => educator.slug))
  );
  const uniqueEducators = uniqueEducatorIds
    .map((slug) =>
      educatorsOfIncludedCourses.find((educator) => educator.slug === slug)
    )
    .filter((educator): educator is Educator => educator !== undefined);
  const educatorsOfIncludedCoursesAndTheirCourses = uniqueEducators.map(
    (educator) => ({
      educator,
      numberOfCourses: educator.educatorMetaData?.courses.length || 0,
    })
  );
  const handlesOfEducatorsOfIncludedCourses = educatorsOfIncludedCourses.map(
    (educator: Educator) => educator?.educatorMetaData?.instahandle
  );

  const createCourseCards = (courses: Course[]) =>
    courses.map((course: Course) => (
      <CourseCard key={course.uri} course={course} />
    ));

  const includedCoursesCards = createCourseCards(includedCourses);

// for downloadables mihai march 20
  const lastSubscriptionTypeID =
    lastSubscription?.subscriptionMetadata?.subscriptiontype?.databaseId || 0;
  const upcomingSubscriptionTypeID = Number(
    lastSubscription?.subscriptionMetadata?.upcomingsubscriptionid || "" === ""
      ? "0"
      : lastSubscription?.subscriptionMetadata?.upcomingsubscriptionid
  );

  let userDownloadableAccessLevel = "nr";

  if (
    lastSubscriptionTypeID === 229341 ||
    upcomingSubscriptionTypeID === 229341
  ) {
    userDownloadableAccessLevel = "free";
  } else if (
    (userIsCurrentlySubscribed && lastSubscriptionTypeID === 229342) ||
    upcomingSubscriptionTypeID === 229342
  ) {
    userDownloadableAccessLevel = "monthly";
  } else if (
    (userIsCurrentlySubscribed && lastSubscriptionTypeID === 229343) ||
    upcomingSubscriptionTypeID === 229343
  ) {
    userDownloadableAccessLevel = "biannualy";
  } else if (
    (userIsCurrentlySubscribed && lastSubscriptionTypeID === 229344) ||
    upcomingSubscriptionTypeID === 229344
  ) {
    userDownloadableAccessLevel = "annualy";
  } else if (lastSubscriptionTypeID === 0 && isLoggedIn) {
    userDownloadableAccessLevel = "free";
  }

  // above deprecared by mihai on feb 7 2024 and replaced with link action cards that take to the downloadables page
  const createActionCards = (downloadables: Downloadable[] = []) =>
    (downloadables ?? []).map((downloadable: Downloadable) => (
      <DownloadableCard
        key={downloadable.databaseId}
        slug={downloadable.slug}
        text={downloadable?.title || ""}
        link={
          downloadable?.downloadablemetadata?.downloadableFile?.mediaItemUrl ||
          ""
        }
        description={downloadable?.content || ""}
        // canDownload={userIsCurrentlySubscribed}
        downloadImage={
          downloadable?.downloadablemetadata?.downloadableImage?.mediaItemUrl ||
          ""
        }
        themecolor={themeColor}
      />
    ));

    const downloadables = courseBundleData?.coursebundlemetadata?.collectionDownloadables || [];

  const downloadableCards = createActionCards(
    downloadables,
    // userDownloadableAccessLevel
  );


//  // for downloadables mihai march 20
//  const lastSubscriptionTypeID =
//  lastSubscription?.subscriptionMetadata?.subscriptiontype?.databaseId || 0;
// const upcomingSubscriptionTypeID = Number(
//  lastSubscription?.subscriptionMetadata?.upcomingsubscriptionid || "" === ""
//    ? "0"
//    : lastSubscription?.subscriptionMetadata?.upcomingsubscriptionid
// );

// let userDownloadableAccessLevel = "nr";

// if (
//  lastSubscriptionTypeID === 229341 ||
//  upcomingSubscriptionTypeID === 229341
// ) {
//  userDownloadableAccessLevel = "free";
// } else if (
//  (userIsCurrentlySubscribed && lastSubscriptionTypeID === 229342) ||
//  upcomingSubscriptionTypeID === 229342
// ) {
//  userDownloadableAccessLevel = "monthly";
// } else if (
//  (userIsCurrentlySubscribed && lastSubscriptionTypeID === 229343) ||
//  upcomingSubscriptionTypeID === 229343
// ) {
//  userDownloadableAccessLevel = "biannualy";
// } else if (
//  (userIsCurrentlySubscribed && lastSubscriptionTypeID === 229344) ||
//  upcomingSubscriptionTypeID === 229344
// ) {
//  userDownloadableAccessLevel = "annualy";
// } else if (lastSubscriptionTypeID === 0 && isLoggedIn) {
//  userDownloadableAccessLevel = "free";
// }

// // above deprecared by mihai on feb 7 2024 and replaced with link action cards that take to the downloadables page
// const createActionCards = (downloadables: Downloadable[] = []) =>
//  (downloadables ?? []).map((downloadable: Downloadable) => (
//    <DownloadableCard
//      key={downloadable.databaseId}
//      slug={downloadable.slug}
//      text={downloadable?.title || ""}
//      link={
//        downloadable?.downloadablemetadata?.downloadableFile?.mediaItemUrl ||
//        ""
//      }
//      description={downloadable?.content || ""}
//      // canDownload={userIsCurrentlySubscribed}
//      downloadImage={
//        downloadable?.downloadablemetadata?.downloadableImage?.mediaItemUrl ||
//        ""
//      }
//      themecolor={themeColor}
//    />
//  ));

//  const downloadables = courseBundleData?.coursebundlemetadata?.collectionDownloadables || [];

// const downloadableCards = createActionCards(
//  downloadables,
//  // userDownloadableAccessLevel
// );


  const shareUrl =
    "https://www.btcuniversity.com/collections/" + collectionSlug;
  // const shareText = description; // fetched directly in sharebutton

  // const description = 'Elevate your cutting skills with the ultimate haircutting class bundle tailored to meet the demands of 2023! You'll get to join forces with the industry's most revered educators who have mastered this year's most sought-after hairstyles and unlock their closely guarded expert techniques. In this limited-time bundle, you'll gain unparalleled access to five trending cuts curated by @chrisjones_hair, @brianacisneros, @ahappyjustin and @rachelwstylist. With this collection, you'll not only expand your knowledge but also increase your earning potential behind the chair. Learn more and earn more before this bundle is gone for good!';


    return (
        <div>
            <CollectionsMainClientComponent 
                trailerImage={trailerImage} 
                collectionTitle={collectionTitle} 
                numberofCoursesinCollection={numberofCoursesinCollection} 
                collectionPrice={collectionPrice} 
                bundleIsNotCompletelyPartOfSubscription={bundleIsNotCompletelyPartOfSubscription} 
                userIsCurrentlySubscribed={userIsCurrentlySubscribed} 
                userPurchasedBundle={userPurchasedBundle} 
                userPurchasedAllCoursesInBundle={userPurchasedAllCoursesInBundle} 
                userDataDatabaseId={userDataDatabaseId} 
                description={description} 
                educatorsOfIncludedCourses={educatorsOfIncludedCourses} 
                educatorsOfIncludedCoursesAndTheirCourses={educatorsOfIncludedCoursesAndTheirCourses} 
                courseBundleData={courseBundleData} 
                includedCoursesCards={includedCoursesCards}
                formattedContent={formattedContent}
                downloadableCards={downloadableCards}/>
        </div>
    );
}

export default MainServerComponent;

async function getCourseBundle(params: {
    slug: string;
  }): Promise<CourseBundle> {
    const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
      // or we could do:
      // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
      // cache: "no-cache", // changed from no-store on jan 2
      cache: "no-store", // brough back on jan 3 as no-cache was causing weird issues
      body: JSON.stringify({
        query: GET_COURSE_BUNDLE_BY_SLUG.loc?.source.body,
        variables: {
          id: `${params.slug}`,
        },
      }),
    });
  
    const { data, errors } = await response.json();
  
    if (errors) {
      throw generateWpPageError(errors);
    }
    const courseBundle: CourseBundle = data?.courseBundle;
    return transformDataForWpUrl(courseBundle);
  }
