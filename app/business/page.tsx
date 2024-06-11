import CategoryHero from "@/components/CategoryHero";
import SpecialtiesButton from "@/components/buttons/SpecialtiesButton";
import ExploreMoreCategories from "@/components/ExploreMoreCategories";
import Herotext from "@/components/text/Hero";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import NewBusinessCourses from "./components/NewBusinessCourses";
import SeriesSocialMediaCourses from "./components/SeriesSocialMediaCourses";
import BusinessDownloadables from "./components/BusinessDownloadables";
import SocialMediaBusinessCourses from "./components/SocialMediaBusinessCourses";
import RecessionCourses from "./components/RecessionCourses";
import BusinessEducators from "./components/BusinessEducators";
import ManagementBusinessCourses from "./components/ManagementBusinessCourses";
import ConsultationBusinessCourses from "./components/ConsultationBusinessCourses";
import InterviewBusinessCourses from "./components/InterviewBusinessCourses";
import BusinessTips from "./components/BusinessTips";
import BusinessSubCallout from "./components/BusinessSubCallout";
import BusinessSpotlight from "./components/BusinessSpotlight";
import { ChevronRight } from 'lucide-react';
import SocialClimbingBusinessCourses from "./components/SocialClimbingBusinessCourses";
import SocialMediaPhotographyBusinessCourses from "./components/SocialMediaPhotographyBusinessCourses";
import BusinessCategoryHero from "./components/BusinessCategoryHero";
import ParagraphText from "@/components/text/Paragraph";
import H3Text from "@/components/text/H3Text";
import SH1Text from "@/components/text/SH1Text";
import { IsFreeProvider } from "@/features/context/IsFreeContext";
import { getCurrentUserDataPurchasedSubscriptions } from "../helper";
import { checkSubIsValidSubscriptionObject } from "@/utils/subValidation";

import { Metadata, ResolvingMetadata } from "next/types";
import { getCategoryPageMetadata } from "./helper";

// mihai may 24 2024: below deprecated and changed to dynamic metadata (based on what editors enter in wp) -- in this case these were already in the business wordpress page just not being fetched
// export const metadata = {
//   title: 'BUSINESS',
//   description: 'Learn how to grow on social media, have successful consultations, lead your business through a recession and so much more.',
// }

export default async function Business() {

  const heroTitle = "Business ";

  // Get user cookie
  const userProm = getRequestCookie(cookies());

  // Fetching all data in parallel
  const user = await userProm;
  const isLoggedIn = (user?.userDataId || 0) > 0; // check if the user is login

  const userDataPromise = getCurrentUserDataPurchasedSubscriptions(user?.userDataId || 0);
  const currentUserData = await userDataPromise
  const purchasedSubscriptions = currentUserData?.userDataMetadata?.purchasedsubscriptions || [];
  const lastSubscription = purchasedSubscriptions[purchasedSubscriptions.length - 1] || {};
  // check if the user has free account
  const userIsCurrentlySubscribed = await checkSubIsValidSubscriptionObject(lastSubscription);

  return (
    <IsFreeProvider value={{ isLoggedIn, userIsCurrentlySubscribed }}>
      <main >
        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <BusinessCategoryHero
          />
        </Suspense>


        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <NewBusinessCourses user={user} heroTitle={heroTitle} />
        </Suspense>

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <BusinessTips user={user} heroTitle='Business Quick Tips' />
        </Suspense>

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <BusinessDownloadables user={user} heroTitle={heroTitle} />
        </Suspense>


        <div className="flex container">
          {/* <Herotext text={heroTitle}  /> <Herotext text='&nbsp;Courses'  /> */}
          <SH1Text text={`Learn These ${heroTitle} Skills`} />



        </div>
        <div className="flex container">
          <ParagraphText text={`Full-length tutorials with chapters`} className="text-gray-400" />
        </div>
        <div className="flex items-center pt-2 pb-10 ">
          {/* <div className="h-full flex items-center">
          <ChevronRight size={18} />
        </div> */}
          <div className="flex slider-container overflow-x-auto items-center">
            <SpecialtiesButton
              text="Series: Social Media for Hairdressers" scrollToId={"Series-section"}
              number="4" />
            <SpecialtiesButton
              text="Social Media Photography" scrollToId={"social-photography-section"}
              number="4" />
            <SpecialtiesButton
              text="Social Media" scrollToId={"Social-section"}
              number="4" />
            <SpecialtiesButton
              text="Series: Social Climbing" scrollToId={"social-climbing-section"}
              number="4" />

            <SpecialtiesButton
              text="Recession"
              scrollToId={"Recession-section"}
              number="4"
            />


            <SpecialtiesButton
              text="Management & Culture " scrollToId={"Management-section"}
              number="4" />

            <SpecialtiesButton
              text="Consultations" scrollToId={"Consultations-section"}
              number="4" />
            <SpecialtiesButton
              text="Interviews" scrollToId={"Interviews-section"}
              number="4" />





          </div>

        </div>


        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <BusinessEducators />
        </Suspense>



        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <SeriesSocialMediaCourses />
        </Suspense>

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <SocialMediaPhotographyBusinessCourses />
        </Suspense>
        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <SocialMediaBusinessCourses />
        </Suspense>
        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <SocialClimbingBusinessCourses />
        </Suspense>







        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <RecessionCourses />
        </Suspense>

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <ManagementBusinessCourses />
        </Suspense>





        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <ConsultationBusinessCourses />
        </Suspense>

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <InterviewBusinessCourses />
        </Suspense>




        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <BusinessSpotlight />
        </Suspense>


        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <BusinessSubCallout user={user} />
        </Suspense>

        {/* <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <ExploreMoreCategories activeCategory="business" />
      </Suspense> */}

      </main >
    </IsFreeProvider>

  );
}

// mihai may 24: added dynamic title description and feature image to business page (same as any category page: metatitle, metadescription, and featured image)
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