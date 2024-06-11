
import { CategoryBlock } from "@/interfaces";
import '@/tailwind.config';
import CategoryHero from "@/components/CategoryHero";
import SpecialtiesButton from "@/components/buttons/SpecialtiesButton";
import ExploreMoreCategories from "@/components/ExploreMoreCategories";
import Herotext from "@/components/text/Hero";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import NewHaircolorCourses from "./components/NewHaircolorCourses";
import HaircolorTips from "./components/HaircolorTips";
import BalayageHaircolorCourses from "./components/BalayageHaircolorCourses";
import FoilingHaircolorCourses from "./components/FoilingHaircolorCourses";
import PlatinumBlondesHaircolorCourses from "./components/PlatinumBlondesHaircolorCourses";
import BrunettesHaircolorCourses from "./components/BrunettesHaircolorCourses";
import CurlsTextureHaircolorCourses from "./components/CurlsTextureHaircolorCourses";
import HaircolorEducators from "./components/HaircolorEducators";
import RedsCoppersHaircolorCourses from "./components/RedsCoppersHaircolorCourses";
import TonningTechniquesHaircolorCourses from "./components/TonningTechniquesHaircolorCourses";
import GrayCoverageHaircolorCourses from "./components/GrayCoverageHaircolorCourses";
import HaircolorDownloadables from "./components/HaircolorDownloadables";
import RootSmudgeHaircolorCourses from "./components/RootSmudgeHaircolorCourses";
import CreativeColorHaircolorCourses from "./components/CreativeColorHaircolorCourses";
import HaircolorSpotlight from "./components/HaircolorSpotlight";
import HaircolorSubCallout from "./components/HaircolorSubCallOut";
import HaircolorCategoryHero from "./components/HaircolorCategoryHero";
import LowlightsHaircolorCourses from "./components/LowlightsHaircolorCourses";
import H3Text from "@/components/text/H3Text";
import SH1Text from "@/components/text/SH1Text";

import { Metadata, ResolvingMetadata } from "next/types";
import { getCategoryPageMetadata } from "./helper";

// mihai may 23 2024: below deprecated and changed to dynamic metadata (based on what editors enter in wp)
// export const metadata = {
//   title: 'HAIRCOLOR',
//   description: 'Learn every trending hair color technique from the experts who perfected them.',
// }

const haircolorPageDBId = "433285";

export default async function Haircolor() {

  const heroTitle = "Hair Color";

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
        <HaircolorCategoryHero
        />
      </Suspense>
   


      <Suspense fallback={<div className="w-full flex flex-col ">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <NewHaircolorCourses user={user} heroTitle={heroTitle}
        />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <HaircolorTips
          user={user}
          heroTitle='Hair Color Quick Tips'
        />
      </Suspense>

      
      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <HaircolorDownloadables user={user} heroTitle={heroTitle}        />
      </Suspense>
      
    

    
      <div className="flex container">


        <SH1Text text={`Learn These Techniques`}  />

      </div>



      <div >


        <div className="flex items-center pt-2 pb-10 ">
          {/* <div className="h-full">
            <ChevronRight size={18} />
          </div> */}
          <div className="flex slider-container  overflow-x-auto ">


            <SpecialtiesButton
              text="Balayage" scrollToId={"Balayage-section"} number="4" />
            <SpecialtiesButton
              text="Foiling" scrollToId={"Foiling-section"} number="4" />
            <SpecialtiesButton
              text="Lowlights" scrollToId={"Lowlights-section"} number="4" />
            <SpecialtiesButton
              text="Platinum Blondes" scrollToId={"Platinum-section"} number="4" />

            <SpecialtiesButton
              text="Brunettes" scrollToId={"Brunettes-section"} number="4" />

            <SpecialtiesButton
              text="Curls & Texture" scrollToId={"Curls-section"} number="4" />
            <SpecialtiesButton
              text="Reds & Coppers" scrollToId={"Reds-section"} number="4" />
            <SpecialtiesButton
              text="Gray Coverage" scrollToId={"Gray-coverage-section"} number="4" />
            <SpecialtiesButton
              text="Toning Techniques" scrollToId={"Toning-section"} number="4" />
            <SpecialtiesButton
              text="Root Smudges, Shadows & Melts" scrollToId={"Root-section"} number="4" />
            <SpecialtiesButton
              text="Creative Color" scrollToId={"Creative-section"} number="4" />
       
            

          </div>
        </div>
      </div>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <HaircolorEducators
        />
      </Suspense>

      
      
      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <BalayageHaircolorCourses
        />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <FoilingHaircolorCourses
        />
      </Suspense>
      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <LowlightsHaircolorCourses
        />
      </Suspense>
 
      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <PlatinumBlondesHaircolorCourses
        />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <BrunettesHaircolorCourses
        />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <CurlsTextureHaircolorCourses
        />
      </Suspense>

  


      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <RedsCoppersHaircolorCourses
        />
      </Suspense>
      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <GrayCoverageHaircolorCourses
        />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <TonningTechniquesHaircolorCourses
        />
      </Suspense>

     

     

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <RootSmudgeHaircolorCourses
        />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <CreativeColorHaircolorCourses
        />
      </Suspense>

    



      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <HaircolorSpotlight
        />
      </Suspense>



      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <HaircolorSubCallout user={user} />
      </Suspense>

      {/* <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <ExploreMoreCategories activeCategory="haircolor" />
      </Suspense> */}

    </main>

  );
}

// mihai may 23: added dynamic title description and feature image to each category page
export async function generateMetadata(
  { params }: { params: { databaseId: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {

  params.databaseId = haircolorPageDBId;
  const metadata = await getCategoryPageMetadata(params);

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




