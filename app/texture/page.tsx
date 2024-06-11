
import SpecialtiesButton from "@/components/buttons/SpecialtiesButton";
import ExploreMoreCategories from "@/components/ExploreMoreCategories";
import Herotext from "@/components/text/Hero";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";
import { ChevronRight } from "lucide-react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import NewTextureCourses from "./components/NewTextureCourses";
import TextureTips from "./components/TextureTips";
import CuttingTextureCourses from "./components/CuttingTextureCourses";
import TextureDownloadables from "./components/TextureDownloadables";
import HaircolorTextureCourses from "./components/HaircolorTextureCourses";
import TextureEducators from "./components/TextureEducators";
import BusinessTextureCourses from "./components/BusinessTextureCourses";
import TextureSpotlight from "./components/TextureSpotlight";
import TextureSubCallout from "./components/TextureSubCallOut";
import TextureCategoryHero from "./components/TextureCategoryHero";
import H3Text from "@/components/text/H3Text";
import SH1Text from "@/components/text/SH1Text";

import { Metadata, ResolvingMetadata } from "next/types";
import { getCategoryPageMetadata } from "./helper";

// export const dynamic = "force-dynamic"

// mihai may 24 2024: below deprecated and changed to dynamic metadata (based on what editors enter in wp) -- in this case these were already in the texture wordpress page just not being fetched
// export const metadata = {
//   title: 'TEXTURE: CUT & COLOR',
//   description: 'Learn how to cut, color and style textured hair from the artists who have perfected it.',
// }
 
export default async function TexturePage() {
  
  const heroTitle = "Texture";

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
        <TextureCategoryHero />
      </Suspense>
  

   
      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <NewTextureCourses user={user} heroTitle={heroTitle}
        />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <TextureTips
          user={user}
          heroTitle='Texture Quick Tips'
        />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <TextureDownloadables heroTitle={heroTitle} user={user}
        />
      </Suspense>

      

      <div className="flex container">
        <SH1Text text={`Learn These ${heroTitle} Techniques`}  />

      </div>


      <div className="flex  items-center pt-2 pb-10 ">
        {/* <div className="h-full">
          <ChevronRight size={18} />
        </div> */}
        <div className="flex slider-container overflow-x-auto ">
          <SpecialtiesButton
            text="Hair Color" scrollToId={"Haircolor-section"} number="4" />
          <SpecialtiesButton
            text="Cutting & Styling" scrollToId={"Cutting-section"} number="4" />

          <SpecialtiesButton
            text="Business" scrollToId={"Business-section"} number="4" />
        </div>
      </div>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <TextureEducators
        />
      </Suspense>


      <div >
        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <HaircolorTextureCourses
          />
        </Suspense>

        
        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <CuttingTextureCourses
          />
        </Suspense>

       
   
   

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <BusinessTextureCourses
          />
        </Suspense>


      </div>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <TextureSpotlight
        />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <TextureSubCallout user={user}
        />
      </Suspense>

      {/* <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <ExploreMoreCategories activeCategory="texture" />
      </Suspense> */}

    </main>
  );
}

// mihai may 24: added dynamic title description and feature image to texture page (same as any category page: metatitle, metadescription, and featured image)
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