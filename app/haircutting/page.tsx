import SpecialtiesButton from "@/components/buttons/SpecialtiesButton";
import ExploreMoreCategories from "@/components/ExploreMoreCategories";
import Herotext from "@/components/text/Hero";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";
import { ChevronRight } from "lucide-react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import NewHaircuttingCourses from "./components/NewHaircuttingCourses";
import HaircuttingTips from "./components/HaircuttingTips";
import BobsLobsHaircuttingCourses from "./components/BobsLobsHaircuttingCourses";
import HaircuttingDownloadables from "./components/HaircuttingDownloadables";
import ShagsHaircuttingCourses from "./components/ShagsHaircuttingCourses";
import LayersHaircuttingCourses from "./components/LayersHaircuttingCourses";
import DryCuttingHaircuttingCourses from "./components/DryCuttingHaircuttingCourses";
import RazorCuttingHaircuttingCourses from "./components/RazorCuttingHaircuttingCourses";
import HaircuttingEducators from "./components/HaircuttingEducators";
import PixieHaircuttingCourses from "./components/PixieHaircuttingCourses";
import ExtensionsHaircuttingCourses from "./components/ExtensionsHaircuttingCourses";
import CurlsTextureHaircolorCourses from "../haircolor/components/CurlsTextureHaircolorCourses";
import HaircuttingSpotlight from "./components/HaircuttingSpotlight";
import HaircuttingSubCallout from "./components/HaircuttingSubCallOut";
import HaircuttingCategoryHero from "./components/HaircuttingCategoryHero";
import CurlyTextureHaircuttingCourses from "./components/CurlyTextureHaircuttingCourses";
import H3Text from "@/components/text/H3Text";
import SH1Text from "@/components/text/SH1Text";

import { Metadata, ResolvingMetadata } from "next/types";
import { getCategoryPageMetadata } from "./helper";

// export const dynamic = "force-dynamic";
// mihai may 24 2024: below deprecated and changed to dynamic metadata (based on what editors enter in wp) -- in this case these were already in the haricutting wordpress page just not being fetched
// export const metadata = {
//   title: 'HAIRCUTTING',
//   description: 'Master a variety of cutting techniques and learn how to achieve the most requested cuts.',
// }

export default async function HaircuttingPage() {
  
  const heroTitle = "Haircutting";

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
        <HaircuttingCategoryHero
        />
      </Suspense>
  



      <div >


    


        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <NewHaircuttingCourses user={user} heroTitle={heroTitle}
          />
        </Suspense>

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <HaircuttingTips
            user={user}
            heroTitle='Haircutting Quick Tips'
          />
        </Suspense>

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <HaircuttingDownloadables user={user} heroTitle={heroTitle} />
        </Suspense>


        <div className="flex container">
          <SH1Text text={`Learn These Haircuts`}  />
        </div>
        <div className="flex  items-center pt-2 pb-10 ">
          {/* <div className="h-full">
            <ChevronRight size={18} />
          </div> */}
          <div className="flex slider-container overflow-x-auto ">
            <SpecialtiesButton
              text="Layers" scrollToId={"Layers-section"} number="4" />

            <SpecialtiesButton
              text="Bobs + Lobs" scrollToId={"Bobs-section"} number="4" />
            <SpecialtiesButton
              text="Shags" scrollToId={"Shags-section"} number="4" />
            <SpecialtiesButton
              text="Pixie" scrollToId={"Pixie-section"} number="4" />
            
            <SpecialtiesButton
              text="Curly & Texture Cuts" scrollToId={"Curly-Texture-section"} number="4" />
            <SpecialtiesButton
              text="Dry Cutting" scrollToId={"Dry-cutting-section"} number="4" />
            <SpecialtiesButton
              text="Razor Cutting" scrollToId={"razor-section"} number="4" />
       
            <SpecialtiesButton
              text="Extensions" scrollToId={"Extensions-section"} number="4" />
          


          </div>
        </div>

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <HaircuttingEducators
          />
        </Suspense>

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <LayersHaircuttingCourses
          />
        </Suspense>
        
        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <BobsLobsHaircuttingCourses
          />
        </Suspense>

      

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <ShagsHaircuttingCourses
          />
        </Suspense>

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <PixieHaircuttingCourses
          />
        </Suspense>

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <CurlyTextureHaircuttingCourses
          />
        </Suspense>


        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <DryCuttingHaircuttingCourses
          />
        </Suspense>

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <RazorCuttingHaircuttingCourses
          />
        </Suspense>

               <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <ExtensionsHaircuttingCourses
          />
        </Suspense>

 
      </div>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <HaircuttingSpotlight
        />
      </Suspense>

      <div className="space-under-category-titles" />

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <HaircuttingSubCallout user={user} />
      </Suspense>

      {/* <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <ExploreMoreCategories activeCategory="haircutting" />
      </Suspense> */}
    </main>
  );
}

// mihai may 24: added dynamic title description and feature image to haircutting page (same as any category page: metatitle, metadescription, and featured image)
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