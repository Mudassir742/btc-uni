"use client";
import React, { Suspense, useEffect, useRef, useState } from 'react';
import Image from 'next/image';


import { CourseBundle, Educator } from '@/interfaces';
// import PlayButton from './buttons/PlayButton';
import { Button } from './ui/Button';
import Link from 'next/link';

import '@/styles/globals.css';
import ParagraphText from './text/Paragraph';
import { useRouter, useSearchParams } from 'next/navigation';

import ShareButton from './Share';
import EducatorTeamName from './EducatorTeamName';
import { Section } from '@/app/events/helper';
import CourseSubCallOut from './CourseSubCallOut';

import H4Text from './text/H4Text';
import H5Text from './text/H5Text';
import H3Text from './text/H3Text';

interface CollectionsMainClientComponentProps {
  trailerImage: string;
  collectionTitle: string;
  numberofCoursesinCollection: string;
  collectionPrice: string;
  bundleIsNotCompletelyPartOfSubscription: boolean;
  userIsCurrentlySubscribed: boolean;
  userPurchasedBundle: boolean;
  userPurchasedAllCoursesInBundle: boolean;
  userDataDatabaseId: number;
  description: string;
  educatorsOfIncludedCourses: Educator[]
  educatorsOfIncludedCoursesAndTheirCourses: {
    educator: Educator;
    numberOfCourses: number;
  }[];
  courseBundleData: CourseBundle;
  includedCoursesCards: JSX.Element[];
  formattedContent: string;
  // pinned: boolean;
  downloadableCards: React.JSX.Element[];
}

// Dynamic import 
// const  Rating  = dynamic(() => import("@mui/material").then(item => item.Rating), {
//   ssr: false,
//   loading: () => <p>Loading ...</p>,
// })

const CollectionsMainClientComponent: React.FC<CollectionsMainClientComponentProps> = ({
  trailerImage,
  collectionTitle,
  numberofCoursesinCollection,
  collectionPrice,
  bundleIsNotCompletelyPartOfSubscription,
  userIsCurrentlySubscribed,
  userPurchasedBundle,
  userPurchasedAllCoursesInBundle,
  userDataDatabaseId,
  description,
  educatorsOfIncludedCourses,
  educatorsOfIncludedCoursesAndTheirCourses,
  courseBundleData,
  includedCoursesCards,
  formattedContent,
  downloadableCards,

}) => {

  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []
  );
  // TO DO IMMEDIATELY AFTER LAUNCH: change to more efficient way, right now were improvising to show Start Course after subscribing, course purchase, or bundle purchase

  console.log("CMMCC userdata db id is: ", userDataDatabaseId);
  console.log("CMMCC userPurchasedBundle is: ", userPurchasedBundle);
  console.log("CMMCC userPurchasedAllCoursesInBundle is: ", userPurchasedAllCoursesInBundle);

  const searchParams = useSearchParams();
  
  const bundlePurchase = searchParams?.get("bundlePurchase");
  const bundlePurchasePrice = searchParams?.get("bundlePurchasePrice");
  const bundlePurchaseBundleName = searchParams?.get("bundlePurchaseBundleName");
  const bundlePurchaseBundleId = searchParams?.get("bundlePurchaseBundleId");
  const bundlePurchaseUserId = searchParams?.get("bundlePurchaseUserId");

  useEffect(() => {

    // mihai: making sure that this triggers 1. only in the case of a bundle purchase and 2. only if this particular bundle hasn't been purchased before
    if ((bundlePurchase === "yes") && (window.localStorage.getItem(`${collectionTitle}`) !== "purchased")) {
      console.log("mihai june 3 safari debugging ---- bundle purchased inner func runs");
      (window as any).dataLayer.push({
          event: "purchase",
          itemName: "course-bundle",

          userDataId: bundlePurchaseUserId,
          purchaseType: "course-bundle",

          bundleName: bundlePurchaseBundleName,
          bundleId: bundlePurchaseBundleId,
          price: bundlePurchasePrice,
          currency: "USD",
      });
      window.localStorage.setItem(`${collectionTitle}`, "purchased");
    }

}, [bundlePurchase, bundlePurchaseBundleId, bundlePurchaseBundleName, bundlePurchasePrice, bundlePurchaseUserId, collectionTitle]);

  return (

    <main className="">



      <div className="container mx-auto ">
        <div className="md:flex   ">
          {/* Left Column - Container 1 */}
          {/* <div className="place-items-end items-center w-4/12 min-w-[370px] ml-auto pl-[24px] bg-themecolor-50"> */}

          <div className="bg-white  md:w-8/12 md:ml-auto">
            <div className="flex justify-center text-center pb-[24px]">
              <Image
                src={trailerImage}
                alt={collectionTitle}
                width={1000}
                height={1000}
                className="rounded-xl"
              />
            </div>
            <div className='flex'>
              <H5Text text={collectionTitle} />
              <div className='flex flex-grow justify-end items-center'>

                <ShareButton shareText={description} shareImg={trailerImage} />
              </div>
            </div>



            {/* {handlesOfEducatorsOfIncludedCourses.length > 0 && (
    <CardHandleCourseCard text={handlesOfEducatorsOfIncludedCourses.join(', ')} className="text-gray-500" />
  )} */}
            <div className="space-under-category-titles" />
            <div className="md:flex ">
              <div className="flex ">
                <H5Text text={numberofCoursesinCollection} />
                <H5Text text="&nbsp;Course Collection" />
                {collectionPrice !== "" && (
                  <div className="flex ">
                  <H5Text text="&nbsp; -&nbsp;" />
                  <H5Text text="$" />
                  <H5Text text={collectionPrice} />
                  </div>
                )}
              </div>





              {!bundleIsNotCompletelyPartOfSubscription && (
                <div className='flex '>
                  <H5Text text='&nbsp;(' /> <H5Text text='Included In Subscription' />
                  <H5Text text=')' />
                </div>
              )}
            </div>



            <div className="space-under-category-titles" />

            <ParagraphText text={formattedContent} />

            <div className="space-under-category-titles" />


          </div>

          {/* Right Column - Container 2 */}
          {/* <div className="bg-white max-w-[1300px] ml-auto  w-8/12 pl-[6%] pr-[24px]  "> */}

          <div className="place-items-end items-center md:min-w-[370px] md:w-4/12 md:pl-[24px] md:pr-[24px] md:mr-auto ">
            <div className='hidden md:block'>


              <ParagraphText text={collectionTitle} />

              {/* {handlesOfEducatorsOfIncludedCourses.length > 0 && (
    <CardHandleCourseCard text={handlesOfEducatorsOfIncludedCourses.join(', ')} className="text-gray-500" />
  )} */}
              <div className="space-under-category-titles" />
              <div className="flex ">
                <ParagraphText text={numberofCoursesinCollection} />
                <ParagraphText text="&nbsp;Course Collection" />
                {collectionPrice !== "" && (
                  <div className="flex ">
                  <ParagraphText text="&nbsp; -&nbsp;" />
                  <ParagraphText text="$" />
                  <ParagraphText text={collectionPrice} />
                  </div>
                )}
              </div>
              <div className="space-under-category-titles" />
              {!bundleIsNotCompletelyPartOfSubscription && (
                <ParagraphText text='Included In Subscription' />
              )}
            </div>



            {!userIsCurrentlySubscribed &&
              <div>
                {!bundleIsNotCompletelyPartOfSubscription && !userPurchasedBundle && !userPurchasedAllCoursesInBundle && (
                  <div className="py-2">
                    <Button>                      <Link href={"/subscribe"} className="px-3">
                      Subscribe for Full Access
                    </Link>
                    </Button>
                  </div>
                )}
                {!bundleIsNotCompletelyPartOfSubscription && !userPurchasedBundle && !userPurchasedAllCoursesInBundle && collectionPrice !== "" && (
                  <div className="py-2">
                    <Button>                    <Link href={!userDataDatabaseId ? `/signup?pid=${courseBundleData.databaseId}&type=bundle` : `/checkout?pid=${courseBundleData.databaseId}&type=bundle`} className="px-3">
                      Or Buy Collection for ${collectionPrice}
                    </Link>
                    </Button>
                  </div>
                )}
                {bundleIsNotCompletelyPartOfSubscription && !userPurchasedBundle && !userPurchasedAllCoursesInBundle && collectionPrice !== "" && (
                  <div className="py-2">
                    <Button>
                      <Link href={!userDataDatabaseId ? `/signup?pid=${courseBundleData.databaseId}&type=bundle` : `/checkout?pid=${courseBundleData.databaseId}&type=bundle`} className="px-3">
                        Buy Collection for ${collectionPrice}
                      </Link>
                    </Button>
                  </div>
                )}
              </div>
            }

            {userIsCurrentlySubscribed &&
              <div>
                {bundleIsNotCompletelyPartOfSubscription && !userPurchasedBundle && !userPurchasedAllCoursesInBundle && (
                  <div className="py-2">
                    <Button>                        <Link href={!userDataDatabaseId ? `/signup?pid=${courseBundleData.databaseId}&type=bundle` : `/checkout?pid=${courseBundleData.databaseId}&type=bundle`} className="px-3">
                      Buy Collection for ${collectionPrice}
                    </Link>
                    </Button>
                  </div>
                )}
                {bundleIsNotCompletelyPartOfSubscription && userPurchasedBundle && !userPurchasedAllCoursesInBundle && (
                  <div className="py-2">
                    You have already purchased this collection.
                  </div>
                )}
                {bundleIsNotCompletelyPartOfSubscription && !userPurchasedBundle && userPurchasedAllCoursesInBundle && (
                  <div className="py-2">
                    You have already purchased all courses in this collection.
                  </div>
                )}
              </div>
            }

            <div className="py-2 flex items-center">
   
            </div>

            {educatorsOfIncludedCourses.length > 0 && (
              <div>

                <H4Text text='Educators' />
                <div className="small-space" />
                <div className='space-y-4'>
                  <EducatorTeamName
                    courseEducatorsAndTheirCourses={
                      educatorsOfIncludedCoursesAndTheirCourses
                    }

                  />
                  </div>
               
            
              </div>
            )}


          </div>
        </div>


          <div className='md:-ml-[80px]'>
          <Section title="Included Courses" cards={includedCoursesCards} />
          </div>

          <div className=''>
          {downloadableCards.length > 0 && (
            <div className="downloadables">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="container md:px-0 flex items-center">
                    <H3Text text="Collection Resources" />
                  </div>
                </div>
                <div className="md:flex slider-container md:px-0">
                  {downloadableCards}
                </div>
              </div>
              <div className="w-full h-[1px] bg-white my-8"></div>
              <div className="space-between-categories" />
            </div>
          )}
        </div>

      </div>
      
      {!userIsCurrentlySubscribed && <div>
        <CourseSubCallOut />
      </div>}

    </main>
  );
}

export default CollectionsMainClientComponent;