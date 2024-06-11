import SpecialtiesButton from "@/components/buttons/SpecialtiesButton";
import ExploreMoreCategories from "@/components/ExploreMoreCategories";
import Herotext from "@/components/text/Hero";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";
import { ChevronRight } from "lucide-react";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import NewStylingCourses from "./components/NewStylingCourses";
import StylingTips from "./components/StylingTips";
import UpstylesStylingCourses from "./components/UpstylesStylingCourses";
import HeatStylingCourses from "./components/HeatStylesStylingCourses";
import TextureStylingCourses from "./components/TextureStylingCourses";
import BraidsStylingCourses from "./components/BraidsStylingCourses";
import StylingSpotlight from "./components/StylingSpotlight";
import StylingSubCallout from "./components/StylingSubCallOut";
import SpecialStylingCourses from "./components/SpecialOccasionStylingCourses";
import StylingCategoryHero from "./components/StylingCategoryHero";
import H3Text from "@/components/text/H3Text";
import SH1Text from "@/components/text/SH1Text";
import StylingDownloadables from "./components/StylingDownloadables";
import StylingEducators from "./components/StylingEducators";

import { Metadata, ResolvingMetadata } from "next/types";
import { getCategoryPageMetadata } from "./helper";

// mihai may 24 2024: below deprecated and changed to dynamic metadata (based on what editors enter in wp) -- in this case these were already in the styling wordpress page just not being fetched
// export const metadata = {
//   title: 'STYLING',
//   description: 'Master bridal styling, heat styling, blowouts, the silk press, twists, braids and so much more!',
// }

export default async function Styling() {

  const heroTitle = "Styling";

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
        <StylingCategoryHero
        />
      </Suspense>


      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <NewStylingCourses user={user} heroTitle={heroTitle}
        />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <StylingTips
          user={user}
          heroTitle='Styling Quick Tips'
        />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <StylingDownloadables
          user={user}
          heroTitle={heroTitle}
        />
      </Suspense>


      <div className="flex container">
        {/* <Herotext text={heroTitle}  /> <Herotext text='&nbsp;Courses'  /> */}
        <SH1Text text={`Learn These Upstyles`}  />

      </div>

      <div className="flex  items-center pt-2 pb-10 ">
        {/* <div className="h-full">
          <ChevronRight size={18} />
        </div> */}
        <div className="flex slider-container overflow-x-auto ">
          <SpecialtiesButton
            text="Upstyles & Bridal Hair" scrollToId={"Upstyles-section"} number="4" />
          <SpecialtiesButton
            text="Heat Styles" scrollToId={"Heat-section"} number="4" />
          <SpecialtiesButton
            text="Special Occasion" scrollToId={"Special-section"} number="4" />

          <SpecialtiesButton
            text="Texture " scrollToId={"Texture-section"} number="4" />

          <SpecialtiesButton
            text="Braids" scrollToId={"Braids-section"} number="4" />

        </div>
      </div>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <StylingEducators
        />
      </Suspense>


      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <UpstylesStylingCourses
        />
      </Suspense>
      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <HeatStylingCourses
        />
      </Suspense>
      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <SpecialStylingCourses
        />
      </Suspense>



      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <TextureStylingCourses
        />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <BraidsStylingCourses
        />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <StylingSpotlight
        />
      </Suspense>

      <div className="space-under-category-titles" />

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <StylingSubCallout user={user}
        />
      </Suspense>

      {/* <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <ExploreMoreCategories activeCategory="styling" />
      </Suspense> */}

    </main>

  );
}

// mihai may 24: added dynamic title description and feature image to stying page (same as any category page: metatitle, metadescription, and featured image)
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







