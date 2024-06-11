import { client } from "../../lib/apolloClient";
import { GET_ALL_COURSE_BUNDLES } from "@/graphql/queries";
import RecommendedEducator from "@/components/RecommendedEducator";
import { CategoryBlock, Course, EducatorGroup, TagBlockNew, CourseBundle } from "@/interfaces";
import SH1Text from "@/components/text/SH1Text";
import MasterClassCourseCard from "@/components/MasterClassCourseCard";
import CategoryHero from "@/components/CategoryHero";
import CourseSpotlight from "@/components/CourseSpotlight";
import SpecialtiesButton from "@/components/buttons/SpecialtiesButton";
import CourseSubCallOut from "@/components/CourseSubCallOut";
import ExploreMoreCategories from "@/components/ExploreMoreCategories";
import Herotext from "@/components/text/Hero";
import TipParent from "@/components/TipParent";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";
import { getCurrentUserDataIfExist, today, getCategoriesPage, getEducatorsPage, filterAndSortCourses, getCategoryPageBasics, getCategoryPageDownloadables, createActionCards, getCategoryPageSpotlight, getCategoryPageTips, getCategoryPageEducators } from "./helper";
import { generateWpPageError } from "@/utils/wpErrorHandling";
import { ChevronRight } from "lucide-react";
import { checkSubIsValidSubscriptionObject } from "@/utils/subValidation";
import { getCurrentUserDataPurchasedSubscriptions } from "../courses/helper";
import H3Text from "@/components/text/H3Text";
import { transformDataForWpUrl, transformWpUrl } from "@/utils/url";

import { Metadata, ResolvingMetadata } from "next/types";
import { getCategoryPageMetadata } from "./helper";

// mihai may 24 2024: below deprecated and changed to dynamic metadata (based on what editors enter in wp) -- in this case these were not in the master classes wordpress page so i added them
// export const metadata = {
//   title: 'COLLECTIONS',
//   description: 'Get our Best-Selling Cutting Collection, Top Trending Haircuts Collection, Barbering Collection and TONI&GUY education.',
// }

// TO DO: description field above, see comment in haircutting/page.tsx -- This should be dinamically pulled from every category page
// or entered here until launch

// export const dynamic = "force-dynamic"

export default async function MasterClasses() {

  // get category data for masterclasses page
  // const categoryData = getCategoriesPage(); // deprecated on jan 3, replaced with below
  const basicCategoryDataProm = getCategoryPageBasics("433292");
  const downloadableCategoryDataPromise = getCategoryPageDownloadables("433292");
  const spotlightCategoryDataPromise = getCategoryPageSpotlight("433292");
  const tipsCategoryDataPromise = getCategoryPageTips("433292");
  const educatorsCategoryDataPromise = getCategoryPageEducators("433292");

  // get masterclasses courses
  const masterCourses = getMasterclassCourses();

  // Selected educators for this category
  // const categoryEducators = getEducatorsPage(); changed to above on jan 4

  // User Data
  // fetch user cookie
  const userProm = getRequestCookie(cookies());

  // Fetching data in parallel
  const [
    // courseCategories, 
    basicCategoryData,
    downloadablesCategoryData,
    spotlightCategoryData,
    tipsCategoryData,
    getAllMasterclassCourses, 
    user, 
    educatorCategoryData
  ] = await Promise.all([
      // categoryData, 
      basicCategoryDataProm,
      downloadableCategoryDataPromise,
      spotlightCategoryDataPromise,
      tipsCategoryDataPromise,
      masterCourses, 
      userProm, 
      educatorsCategoryDataPromise
    ])

  // Category specific data
  // const masterclassesCategoryData = courseCategories.categoriesPage.categoryBlock.filter((categoryBlock: CategoryBlock) => {
  //   return categoryBlock?.category?.name.toLowerCase() === "master-classes";
  // })[0];
  // const heroTitle = masterclassesCategoryData?.title || "";
  // const desktopImage = masterclassesCategoryData?.desktopImage?.mediaItemUrl;
  // const mobileImage = masterclassesCategoryData?.mobileImage?.mediaItemUrl;
  // const heroSubtitle = masterclassesCategoryData?.subtitle || "";
  // const spotlightCourseTitle = masterclassesCategoryData?.courseSpotlight?.title || "";
  // const courseSlug = masterclassesCategoryData?.courseSpotlight?.slug || "";
  // const courseTrailerId = masterclassesCategoryData?.courseSpotlight?.courseMetadata?.vimeoPromoId || "";
  // const courseDetailImage = masterclassesCategoryData?.courseSpotlight?.courseMetadata?.courseDetailPicture?.mediaItemUrl || "https://cms.btcuniversity.com/wp-content/uploads/2023/10/trailer.png";
  // const courseSpecialReviews = masterclassesCategoryData?.specialReviews || [];
  // const spotlightCourseEducators = masterclassesCategoryData?.courseSpotlight?.courseMetadata?.educators || [];
  // const heroVideo = masterclassesCategoryData?.video || "";
  // const tipVideos = masterclassesCategoryData?.tips || [];


  const heroTitle = basicCategoryData?.title || "";
  const desktopImage = basicCategoryData?.desktopImage?.mediaItemUrl || "";
  const mobileImage = basicCategoryData?.mobileImage?.mediaItemUrl || "";
  const heroSubtitle = basicCategoryData?.subtitle || "";
  const heroVideo = basicCategoryData?.video || "";
  const spotlightCourseTitle = spotlightCategoryData?.courseSpotlight?.title || "";
  const courseSlug = spotlightCategoryData?.courseSpotlight?.slug || "";
  const courseTrailerId = spotlightCategoryData?.courseSpotlight?.courseMetadata?.vimeoPromoId || "";
  // const courseDetailImage = spotlightCategoryData?.courseSpotlight?.courseMetadata?.courseDetailPicture?.mediaItemUrl || transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/10/trailer.png");
  const courseDetailImage = spotlightCategoryData?.courseSpotlight?.courseMetadata?.courseDetailPicture?.mediaItemUrl || "https://cms.btcuniversity.com/wp-content/uploads/2023/10/trailer.png";
  const courseSpecialReviews = spotlightCategoryData?.specialReviewsForCourseSpotlight || [];
  const spotlightCourseEducators = spotlightCategoryData?.courseSpotlight?.courseMetadata?.educators || [];
  const externalLink = basicCategoryData?.externalLink || ""; // TO DO: Briana to use if needed


  // const eduBlock = (educatorPage?.educatorsPage?.tagBlockNew || [])
  //   .filter((categoryBlock: TagBlockNew) => {
  //     return (categoryBlock?.educatorCategory?.name || "").toLowerCase() === "business";
  //   })[0]
  // const educators = eduBlock.educatorGroup
  //   .map((eduGroup: EducatorGroup) => (
  //     eduGroup?.educator || {}
  //   ));

  const educators = educatorCategoryData?.categoryEducators || [];

  // get UserData database id
  const userDataDatabaseId = user?.userDataId || 0;
  const userDataPurchasedSubscriptionsPromise = getCurrentUserDataPurchasedSubscriptions(userDataDatabaseId);
  // check if user is logged in
  const isLoggedIn = (user?.userDataId || 0) > 0;
  // get full UserData object
  // const currentUserData = await getCurrentUserDataIfExist(user); // deprecated dec 30
  const currentUserPurchasesSubscriptions = await userDataPurchasedSubscriptionsPromise;
  // Convert subscription start and expiration dates to Date objects
  const purchasedSubscriptions = currentUserPurchasesSubscriptions?.userDataMetadata.purchasedsubscriptions || [];
  // Sorting the array in descending order based on the subscription start date
  purchasedSubscriptions.sort((a, b) => {
    const dateA = new Date(a.subscriptionMetadata.subscriptionstartson).getTime();
    const dateB = new Date(b.subscriptionMetadata.subscriptionstartson).getTime();
    return dateA - dateB;  // Ascending order
  });
  // Now the last element in the sorted array is the most recent subscription
  const lastSubscription = purchasedSubscriptions[purchasedSubscriptions.length - 1] || {};
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
  else if (lastSubscriptionTypeID === 0 && isLoggedIn) {
      userDownloadableAccessLevel = "free";
  }

  const categoryDownloadables = downloadablesCategoryData?.newCategoryDownloadables || [];
  const downloadableCards = createActionCards(categoryDownloadables, 
    // userDownloadableAccessLevel
    );

  const tipVideos = tipsCategoryData ? tipsCategoryData?.newTips || [] : [];

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
  // our dynamic card generator function
  const createCourseBundleCards = (courses: CourseBundle[], courseBundleTag: string) => courses
    .filter((courseBundle: CourseBundle) => {
      return courseBundle.tags.nodes.slice(0, 5).some((tag) => tag.slug.toLowerCase() === courseBundleTag);
    })
    .map((courseBundle: CourseBundle) => (
      <MasterClassCourseCard key={courseBundle.uri} courseBundle={courseBundle} />
    ));

  // console.log("getAllMasterclassCourses are :", getAllMasterclassCourses);

  // cards per bundle tag
  const collectionCards = createCourseBundleCards(getAllMasterclassCourses, "master-classes-collection");
  const toniAndGuyCards = createCourseBundleCards(getAllMasterclassCourses, "master-classes-toni-guy");
  const schoremCards = createCourseBundleCards(getAllMasterclassCourses, "master-classes-schorem");
  const socialMediaCards = createCourseBundleCards(getAllMasterclassCourses, "master-classes-social-media");

  // const recentBusinessCourses = filterAndSortCourses(getAllMasterclassCourses);


  return (
    <main >

      {heroTitle !== "" && desktopImage && mobileImage && (
        <CategoryHero
          heroTitle={heroTitle}
          // heroVideo={heroVideo}
          // description={heroSubtitle}
          mobileImage={mobileImage}
          desktopImage={desktopImage}
          externalLink={externalLink}
        />
      )}
      <div className="flex container">
        <H3Text text={heroTitle}  />
      </div>

      <div className="flex  items-center pt-2 pb-10 ">
      {/* <div className="h-full">
      <ChevronRight size={18}/>
      </div> */}
        <div className="flex slider-container overflow-x-auto ">
          <SpecialtiesButton
            text="Social Media" scrollToId={"Social-Media-section"} number="4" />
          <SpecialtiesButton
            text="Schorem" scrollToId={"schorem-section"} number="4" />
          <SpecialtiesButton
            text="Collections" scrollToId={"Collections-section"} number="4" />
          <SpecialtiesButton
            text="TONI&GUY" scrollToId={"ToniAndGuy-section"} number="4" />
        




        </div>
      </div>
      {tipVideos.length > 0 && (
        <TipParent heroTitle={heroTitle} tipVideos={tipVideos} isSubscribed={userIsCurrentlySubscribed} userDataId={`${user?.userDataId || 0}`} />
      )}
      <div id="Social-Media-section">
        <Section title="Social Media" cards={socialMediaCards} />
      </div>
      <div id="schorem-section">
        <Section title="Schorem" cards={schoremCards} />
      </div>
      <div id="Collections-section">
        <Section title="Collections" cards={collectionCards} />
      </div>
      <div id="ToniAndGuy-section">
        <Section title="TONI&GUY" cards={toniAndGuyCards} />
      </div>
     

      {educators.length > 0 && (
        <RecommendedEducator educators={educators} heroTitle={heroTitle} />
      )}
    
      {/* {spotlightCourseTitle !== "" && (
        <CourseSpotlight
          courseTitle={spotlightCourseTitle}
          courseSlug={courseSlug}
          educators={spotlightCourseEducators}
          courseTrailerId={courseTrailerId}
          courseDetailImage={courseDetailImage}
          specialReviews={courseSpecialReviews} />
      )} */}
      <div className="space-under-category-titles" />
      {!userIsCurrentlySubscribed && (<CourseSubCallOut />)}
      {/* <ExploreMoreCategories activeCategory="masterclasses" /> */}

    </main>

  );
}
const Section = ({ title, cards }: { title: string, cards: JSX.Element[] }) => (
  <div>
    <div className="slider-container">
      <SH1Text
        text={title}
        className="!text-themeColor"
      />       <div className="space-under-category-titles" />
    </div>
    <div className="flex overflow-x-auto space-x-4 slider-container">
      {cards}
    </div>
    <div className="space-between-categories" />
  </div>
);

// async function getMasterclassCourses(): Promise<CourseBundle[]> {
//   const masterclassResponse = await client.query({
//     query: GET_ALL_COURSE_BUNDLES
//   })
//   const coursebundles: [CourseBundle] = (masterclassResponse.data.courseBundles.nodes);

//   return coursebundles;
// }

async function getMasterclassCourses(): Promise<CourseBundle[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      next:{
          revalidate: 600
      },
      // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
      // or we could do:
      // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
      body: JSON.stringify({
          query: GET_ALL_COURSE_BUNDLES.loc?.source.body,
      }),
  });

  const { data, errors } = await response.json();

  if (errors) {
      throw generateWpPageError(errors)
  }
  const coursebundles: [CourseBundle] = (data.courseBundles.nodes);

  return transformDataForWpUrl(coursebundles);
}

// mihai may 24: added dynamic title description and feature image to collections/masterclasses page (same as any category page: metatitle, metadescription, and featured image)
export async function generateMetadata(
  { params }: { params: { databaseId: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {

  const metadata = await getCategoryPageMetadata();

  return {
    title: metadata?.categoryPage?.metaTitle,
    description: metadata?.categoryPage?.metaDescription,
    openGraph: {
      title: metadata?.categoryPage?.metaTitle,
      description: metadata?.categoryPage?.metaDescription,
      images: [
        {
          url: metadata?.featuredImage?.node?.mediaItemUrl || '/btc-u_social-brown.png', // Provide a default image URL in case the featured image is not available
          width: 1200,
          height: 630,
          alt: metadata?.categoryPage?.metaTitle,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata?.categoryPage?.metaTitle,
      description: metadata?.categoryPage?.metaDescription,
      images: [
        metadata?.featuredImage?.node?.mediaItemUrl || '/btc-u_social-brown.png',
      ],
    },
  }
}