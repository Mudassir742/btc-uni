import SpecialtiesButton from "@/components/buttons/SpecialtiesButton";
import ExploreMoreCategories from "@/components/ExploreMoreCategories";
import Herotext from "@/components/text/Hero";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";
import { ChevronRight } from "lucide-react";
import CuttingMensCourses from "./components/CuttingMensCourses";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import MensCategoryHero from "./components/MensCategoryHero";
import NewMensCourses from "./components/NewMensCourses";
import MensTips from "./components/MensTips";
import MensDownloadables from "./components/MensDownloadables";
import FadesMensCourses from "./components/FadesMensCourses";
import MensEducators from "./components/MensEducators";
import SchoremMensCourses from "./components/SchoremMensCourses";
import MensSpotlight from "./components/MensSpotlight";
import MensSubCallOut from "./components/MensSubCallOut";
import H3Text from "@/components/text/H3Text";
import SH1Text from "@/components/text/SH1Text";

import { Metadata, ResolvingMetadata } from "next/types";
import { getCategoryPageMetadata } from "./helper";

// export const dynamic = "force-dynamic"

// mihai may 24 2024: below deprecated and changed to dynamic metadata (based on what editors enter in wp) -- in this case these were already in the mens wordpress page just not being fetched
// export const metadata = {
//   title: 'MENS',
//   description: 'Become a master of men&apos;s grooming with these barbering, fade, cutting and styling courses.',
// }

export default async function Mens() {
  
  const heroTitle = "Men's";

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
        <MensCategoryHero
        />
      </Suspense>
   

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <NewMensCourses user={user} heroTitle={heroTitle}
        />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <MensTips
          user={user}
          heroTitle='Men&#39;s Quick Tips'
        />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <MensDownloadables
          user={user}
          heroTitle={heroTitle}
        />
      </Suspense>


      <div className="flex container">

        <SH1Text text={`Learn These ${heroTitle} Cuts & Styles`}  />

      </div>


      <div className="flex  items-center pt-2 pb-10 ">
        {/* <div className="h-full">
          <ChevronRight size={18} />
        </div> */}

        <div className="flex slider-container overflow-x-auto ">
          <SpecialtiesButton
            text="Cutting & Styling" scrollToId={"Cutting-section"} number="4" />
          <SpecialtiesButton
            text="Fades & Barbering" scrollToId={"Fades-section"} number="4" />
          <SpecialtiesButton
            text="Schorem" scrollToId={"Schorem-section"} number="4" />

        </div>
      </div>
      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <MensEducators
        />
      </Suspense>
     
      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <CuttingMensCourses
        />
      </Suspense>

 

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <FadesMensCourses
        />
      </Suspense>

  

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <SchoremMensCourses
        />
      </Suspense>



      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <MensSpotlight
        />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <MensSubCallOut user={user}
        />
      </Suspense>

      {/* <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <ExploreMoreCategories activeCategory="mens" />
      </Suspense> */}

    </main>

  );
}

// mihai may 24: added dynamic title description and feature image to mens page (same as any category page: metatitle, metadescription, and featured image)
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



