import CourseHero from "@/components/CourseHero";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";

// import SaveCourse from "@/components/SaveCourse";
import CoursePageTitles from "@/components/text/CoursePageTitles";
import CourseSlugRelatedCourses from "../components/CourseSlugRelatedCourses";
import CourseSlugSubCallOutServer from "../components/CourseSlugSubCallOutServer";
import CourseSlugYouWillLearn from "../components/CourseSlugYouWillLearn";
import CourseSlugChapters from "../components/CourseSlugChapters";
import CourseSlugShareButton from "../components/CourseSlugShareButton";
import CourseSlugEducators from "../components/CourseSlugEducators";
import CourseSlugProductsUsed from "../components/CourseSlugProductsUsed";
import CourseSlugTestimonials from "../components/CourseSlugTestimonials";
import CourseSlugDownloadables from "../components/CourseSlugDownloadables";
import CourseSlugHighlights from "../components/CourseSlugHighlights";
import CourseSlugFinishedLooks from "../components/CourseSlugFinishedLook";
import CourseSlugCourseDescription from "../components/CourseSlugCourseDescription";
import CourseSlugPushPin from "../components/CourseSlugPushPin";
import { extractCourseAll, getCourseAll, getCourseMetadata, getCurrentUserDataPurchasedBundles, getCurrentUserDataPurchasedCourses, getCurrentUserDataPurchasedSubscriptions } from "../helper";
import { Metadata, ResolvingMetadata } from "next/types";
import CourseSlugUpcomingCourses from "../components/CourseSlugUpcomingCourses";
import CourseHeroReviews from "@/components/CourseHeroReviews";
import PlayButtonDaddy from "@/components/PlayButtonDaddy";
import { checkSubIsValidSubscriptionObject } from "@/utils/subValidation";
import CourseSlugBrand from "../components/CourseSlugBrand";
import UnlockPopup from "@/components/molecules/UnlockPopup";



const themeColor = '#523D34';

export default async function CourseSlugPage({ params, searchParams }: {
  params: { slug: string },
  searchParams: { courseSlug?: string, redirectType?: string };
}) {

  // User Data
  // fetch user cookie
  const userProm = getRequestCookie(cookies());

  // Fetching data in parallel
  const user = await userProm;


  // Checking if we have received course data
  if (!params) {
    return (
      <main>
        <div>Loading...</div>
      </main>
    );
  }

  const userDataDatabaseId = user?.userDataId || 0;

  const courseAllProm = getCourseAll(params);
  const userDataPurchasedSubscriptionsPromise = getCurrentUserDataPurchasedSubscriptions(userDataDatabaseId);
  const userDataPurchasedCoursesPromise = getCurrentUserDataPurchasedCourses(userDataDatabaseId);
  const userDataPurchasedBundlesPromise = getCurrentUserDataPurchasedBundles(userDataDatabaseId);

  const [
    courseAll,
    userDataPurchasedSubscriptions,
    userDataPurchasedCourses,
    userDataPurchasedBundles,
  ] = await Promise.all([
    courseAllProm,
    userDataPurchasedSubscriptionsPromise,
    userDataPurchasedCoursesPromise,
    userDataPurchasedBundlesPromise,
  ]);

  const {
    price,
    isPartOfSubscription,
    courseID,
    brandSlug
  } = extractCourseAll(courseAll)

  const purchasedSubscriptions = userDataPurchasedSubscriptions?.userDataMetadata.purchasedsubscriptions || [];
  const lastSubscription = purchasedSubscriptions[purchasedSubscriptions.length - 1] || {};
  const userIsCurrentlySubscribed = await checkSubIsValidSubscriptionObject(lastSubscription);

  const isCourseFree = price === "0";

  const isSignedIn = (user?.userDataId || 0) > 0;

  const purchasedCourses = userDataPurchasedCourses?.userDataMetadata?.purchasedcourses || [];
  const isPartOfPurchasedCourses = purchasedCourses.some(
    (course) => course.databaseId === courseID
  );

  const purchasedBundles = userDataPurchasedBundles?.userDataMetadata?.purchasedbundless || [];
  const isPartOfPurchasedBundles = purchasedBundles.some(
    (bundle) => {
      // Check if courseID matches any course inside the bundle
      return bundle.coursebundlemetadata.coursesinbundle.some(
        (course) => course.databaseId === courseID
      );
    }
  );

  const userCanViewMainContent = (
    (isSignedIn === true) && (
      isPartOfPurchasedCourses === true ||
      isPartOfPurchasedBundles === true ||
      (isPartOfSubscription === true &&
        userIsCurrentlySubscribed === true
      )
    )
  )
  return (
    <main className="  ">
      {/* Course Unlock popup */}
      {
        searchParams.courseSlug  && (
          <UnlockPopup message="Enjoy your free course." />
        )
      }
      {/* Desktop layout */}
      <div>
        {/* {courseFormulas.length > 0 && (
          <CourseFormulas courseFormulas={courseFormulas} />
        )} */}


        {/* <div >
          {courseData?.courseMetadata.vimeoPromoId && (
            <div className="ml-auto max-w-[551px] flex justify-end flex-col mr-[12.5%] mt-[-428px] z-10">
              <TrailerVideoPlayer
                videoId={videoTrailerId}
                startTime={trailerStartTime} />
            </div>
          )}
        </div> */}

        <div className="flex mx-auto flex-col lg:flex-row ">
          {/* Left Column - Container 1 */}

          <div className=" max-w-[1300px] lg:ml-auto w-full  lg:w-8/12 lg:pl-[6%] lg:pr-[24px]">


            <div className=" ml-auto flex-grow justify-end">
              <div className="ml-auto">

                <Suspense fallback={<div className="w-full flex flex-col gap-y-6 order-1 ">
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                </div>}>
                  <CourseHero

                    params={params}
                  />
                </Suspense>
                <div className={`${ isCourseFree && !isSignedIn ? '' : 'flex justify-between'} md:flex md:justify-between flex-wrap`}>
                  <div className="flex items-center flex-grow md:flex-grow-0">
                    <Suspense fallback={<div className="w-full flex flex-col gap-y-6 order-1 ">
                      <Skeleton className="h-14" />
                      <Skeleton className="h-14" />
                      <Skeleton className="h-14" />
                    </div>}>
                      <CourseHeroReviews
                        params={params}
                        themeColor={themeColor} />
                    </Suspense>

                    <div className="flex items-center flex-grow justify-end pr-4 md:pr-0 md:justify-center md:pl-4 ">
                      <Suspense fallback={<div className="flex flex-col   ">
                        <Skeleton className="h-14" />
                        <Skeleton className="h-14" />
                        <Skeleton className="h-14" />
                      </div>}>
                        <CourseSlugPushPin
                          params={params}
                          user={user} />
                      </Suspense>

                      <Suspense fallback={<div className="flex flex-col ">
                        <Skeleton className="h-14" />
                        <Skeleton className="h-14" />
                        <Skeleton className="h-14" />
                      </div>}>
                        <CourseSlugShareButton
                          params={params} user={user} />
                      </Suspense>
                    </div>
                  </div>

                  <div className={`${ isCourseFree && !isSignedIn ? '' :'flex justify-around md:justify-end'}`}>
                    <Suspense fallback={<div className="w-full flex flex-col gap-y-6 order-1 ">
                      <Skeleton className="h-14" />
                      <Skeleton className="h-14" />
                      <Skeleton className="h-14" />
                    </div>}>
                      <PlayButtonDaddy
                        user={user}
                        params={params}
                        themeColor={themeColor} />
                    </Suspense>
                  </div>
                </div>

                <Suspense fallback={<div className="flex flex-col min-w-[370px]  order-5">
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                </div>}>
                  <CourseSlugEducators
                    params={params}
                    user={user}
                  />
                </Suspense>

                {brandSlug &&
                  <Suspense fallback={<div className="flex flex-col min-w-[370px]  order-5">
                    <Skeleton className="h-14" />
                    <Skeleton className="h-14" />
                    <Skeleton className="h-14" />
                  </div>}>
                    <CourseSlugBrand brandSlug={brandSlug} />
                  </Suspense>
                }

                <div className="space-under-category-titles" />
                <Suspense fallback={<div className="w-full  flex flex-col gap-y-6 order-4">
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                </div>}>
                  <CourseSlugCourseDescription
                    params={params}
                    className="px-3 lg:px-0"
                  />
                </Suspense>





                <Suspense fallback={<div className=" ">
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                </div>}>
                  <div >

                    <CourseSlugYouWillLearn
                      params={params} />
                  </div>
                </Suspense>


                <Suspense fallback={<div className="flex flex-col min-w-[370px] container">
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                </div>}>
                  <CourseSlugChapters
                    params={params}
                    // user={user}
                    themeColor={themeColor}
                    className='px-3 lg:px-0'
                  />
                </Suspense>



                <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                </div>}>
                  <CourseSlugHighlights
                    params={params}
                    className=''

                    user={user} />
                </Suspense>

                <Suspense fallback={<div className="w-full">
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                </div>}>
                  <div >
                    <CourseSlugFinishedLooks
                      params={params} user={user} />
                  </div>

                </Suspense>


                {/* <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                </div>}>
                  <CourseSlugYouFormulas 
                  params={ params } />
                </Suspense> */}





                <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                </div>}>
                  <CourseSlugDownloadables
                    params={params}
                    user={user} />
                </Suspense>

              </div>

            </div>

            <div >





              <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
              </div>}>
                <CourseSlugProductsUsed
                  params={params}
                  user={user} />
              </Suspense>




              {/* Desktop */}
              <div className='hidden md:block'>
                <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                </div>}>
                  <CourseSlugUpcomingCourses themeColor={themeColor} userDataBaseId={(user?.userDataId || 0).toString()} />
                </Suspense>
              </div>



            </div>

          </div >
          {/* Right Column - Container 2 */}
          <div className="place-items-end items-center w-full  lg:w-4/12 min-w-[370px] mr-auto lg:pl-[24px] ">

            {/* <CourseInfo 
              categories={courseCategories} 
              courseDuration={courseDuration} 
              level={level} 
              series={series} 
              courseDescription={courseDescription} 
              youWillLearnText={youWillLearnText} 
              themeColor={themeColor} 
              hasDownloadables={hasDownloadables} 
              hasFormulas={hasFormulas} /> */}

            {/* Hamzah add to cart work */}
            {/* <AddToCartButton
                className="mt-4"
                product={{
                  currency: "USD",
                  id: courseID,
                  name: theCourseTitle,
                  price: Number(price),
                  description: courseDescription,
                  image: transformWpUrl(mediaItemUrl),
                  sku: "",
                  sku_id: "",
                }} >

                <Button>
                  Add To Cart
                </Button>
              </AddToCartButton > */}





            {/* <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
              </div>}>
                <CourseSlugWhatsIncluded
                  params={params}
                  themeColor={themeColor} />
              </Suspense> */}
            <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
              <Skeleton className="h-14" />
              <Skeleton className="h-14" />
              <Skeleton className="h-14" />
            </div>}>
              <CourseSlugTestimonials
                params={params}
                user={user}
                className=''

              />
            </Suspense>

            {/* Mobile */}
            <div className='md:hidden'>
              <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
              </div>}>
                <CourseSlugUpcomingCourses themeColor={themeColor} userDataBaseId={(user?.userDataId || 0).toString()} />
              </Suspense>
            </div>


            <Suspense fallback={<div className="w-full flex flex-col gap-y-6 ">
              <Skeleton className="h-14" />
              <Skeleton className="h-14" />
              <Skeleton className="h-14" />
            </div>}>


              <CourseSlugRelatedCourses
                params={params}
                user={user}
                themeColor={themeColor} />
            </Suspense>


          </div>
        </div >

      </div >



      {/* {!userIsCurrentlySubscribed && (<CourseSlugSubCallOut
          user={user}
          accessedCourseDBId={accessedCourseDBId}
          canWatchMainContent={userCanViewMainContent}
          isPartOfAccessedCourses={isPartOfAccessedCourses}
          params={params}
          startChapter={startChapter}
          startTime={startTime}
          userDataDatabaseId={userDataDatabaseId}
          upcomingCourses={upcomingCourses} duration={convertTimeToMinutes(courseDuration)} themeColor={themeColor} releaseDate={formattedReleaseDate}
          educatorName={educatorName}
          pinned={pinned} 
          userCanViewMainContent={userCanViewMainContent} 
          isCourseFree={isCourseFree}   
          />
        )} */}

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <CourseSlugSubCallOutServer user={user} />
      </Suspense>






    </main >
  );
}

// add dynamic title and description to each course slug page
// mihai added featured images on may 23
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {

  const metadata = await getCourseMetadata(params);

  return {
    title: metadata?.courseMetadata?.coursemetatitle,
    description: metadata?.courseMetadata?.coursemetadescription,
    openGraph: {
      title: metadata?.courseMetadata?.coursemetatitle,
      description: metadata?.courseMetadata?.coursemetadescription,
      images: [
        {
          url: metadata?.courseMetadata?.courseThumbnailPicture?.mediaItemUrl || '/btc-u_social-brown.png', // Provide a default image URL in case the featured image is not available
          width: 1200,
          height: 630,
          alt: metadata?.courseMetadata?.coursemetatitle,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata?.courseMetadata?.coursemetatitle,
      description: metadata?.courseMetadata?.coursemetadescription,
      images: [
        metadata?.courseMetadata?.courseThumbnailPicture?.mediaItemUrl || '/btc-u_social-brown.png',
      ],
    },
  }
}