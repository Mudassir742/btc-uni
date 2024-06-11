import SpecialtiesButton from "@/components/buttons/SpecialtiesButton";
import ExploreMoreCategories from "@/components/ExploreMoreCategories";
import Herotext from "@/components/text/Hero";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";
import { ChevronRight } from "lucide-react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import NewEventsCourses from "./components/NewEventsCourses";
import OnTourEventsCourses from "./components/OnTourEventsCourses";
import OneshotEventsCourses from "./components/OneshotEventsCourses";
import ShowEventsCourses from "./components/ShowEventsCourses";
import EventsTips from "./components/EventsTips";
import EventsDownloadables from "./components/EventsDownloadables";
import EventsEducators from "./components/EventsEducators";
import EventsSpotlight from "./components/EventsSpotlight";
import EventsSubCallout from "./components/EventsSubCallOut";
import EventsCategoryHero from "./components/EventsCategoryHero";
import H3Text from "@/components/text/H3Text";

import { Metadata, ResolvingMetadata } from "next/types";
import { getCategoryPageMetadata } from "./helper";

// mihai may 24 2024: below deprecated and changed to dynamic metadata (based on what editors enter in wp) -- in this case these were already in the btc events wordpress page just not being fetched
// export const metadata = {
//   title: 'BTC EVENTS',
//   description: 'Catch up on all of the BTC action and watch playbacks of The BTC Show, BTC "On Tour" and #ONESHOT Hair Awards.',
// }

export default async function Events() {
  
  const heroTitle = "BTC Events";

  // User Data
  // fetch user cookie
  const userProm = getRequestCookie(cookies());

  // Fetching data in parallel
  const user = await userProm;

  return (
    <main >
      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <EventsCategoryHero
        />
      </Suspense>
      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <EventsTips user={user} heroTitle={heroTitle} />
      </Suspense>
      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <EventsDownloadables user={user} heroTitle={heroTitle} />
      </Suspense>


      <div className="flex container">
        <H3Text text={`Watch These ${heroTitle}`}  />

      </div> 
      <div className="flex items-center pt-2 pb-10 ">
        {/* <div className="h-full">
            <ChevronRight size={18} />
          </div> */}
        <div className="flex slider-container overflow-x-auto ">

          <SpecialtiesButton
            text="The BTC Show" scrollToId={"Show-section"}
            number="4" />
          <SpecialtiesButton
            text="#ONESHOT Hair Awards" scrollToId={"Oneshot-section"} number="4" />
          <SpecialtiesButton
            text="BTC “On Tour“" scrollToId={"On-Tour-section"} number="4" />

        </div>
      </div>


      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <EventsEducators />
      </Suspense>
      <div >

       

       


        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <NewEventsCourses user={user} heroTitle={heroTitle} />
        </Suspense>

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <ShowEventsCourses />
        </Suspense>
      

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <OneshotEventsCourses />
        </Suspense>

     

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <OnTourEventsCourses />
        </Suspense>

      

        {/* <div id="Social-section">
          <Section title="Social Climbing" cards={btcEventsSocialClimbingCards} />
        </div> */}

        {/* <div id="Stage-section">
          <Section title="On-Stage Co-Labs" cards={btcEventsOnStageCoLabsCards} />
        </div> */}

      

        {/* <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <EventsSpotlight />
        </Suspense> */}

        <div className="space-under-category-titles" />

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <EventsSubCallout user={user} />
        </Suspense>

        {/* <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <ExploreMoreCategories activeCategory="business" />
        </Suspense> */}


      </div>
    </main>

  );
}

// mihai may 24: added dynamic title description and feature image to events page (same as any category page: metatitle, metadescription, and featured image)
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