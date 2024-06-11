import Herotext from "@/components/text/Hero";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import LanguagesCategoryHero from "./components/LanguagesCategoryHero";
import NewLanguagesCourses from "./components/NewLanguagesCourses";
import LanguagesTips from "./components/LanguagesTips";
import AllLanguagesCourses from "./components/AllLanguagesCourses";
import LanguagesEducators from "./components/LanguagesEducators";
import LanguagesSpotlight from "./components/LanguagesSpotlight";
import LanguagesSubCallout from "./components/LanguagesSubCallOut";
import H3Text from "@/components/text/H3Text";
import ExploreMoreCategories from "@/components/ExploreMoreCategories";

import { Metadata, ResolvingMetadata } from "next/types";
import { getCategoryPageMetadata } from "./helper";

// mihai may 24 2024: below deprecated and changed to dynamic metadata (based on what editors enter in wp) -- in this case these were not in the languages wordpress page so i added them there
// export const metadata = {
//   title: 'LANGUAGES',
//   description: 'BTC University offers subtitles in 6 languages! English, Spanish, Italian, French, Portuguese & Russian.',
// }

export default async function LanguagesPage() {

  const heroTitle = "Languages";

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
        <LanguagesCategoryHero
        />
      </Suspense>
      {/* <div className="flex container">
        <H3Text text={heroTitle}  />
      </div> */}
      <div >

      

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <NewLanguagesCourses user={user} heroTitle={heroTitle}
          />
        </Suspense>

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <LanguagesTips
            user={user}
            heroTitle={heroTitle}
          />
        </Suspense>

        {/* <Section title="All Haircuts" cards={allCutCards} /> */}

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <AllLanguagesCourses
          />
        </Suspense>

    

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <LanguagesEducators
          />
        </Suspense>

   

  

        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <LanguagesSpotlight
          />
        </Suspense>



        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <LanguagesSubCallout user={user}
          />
        </Suspense>
        {/* <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <ExploreMoreCategories activeCategory="" />
        </Suspense> */}
      </div>
    </main>
  );
}

// mihai may 24: added dynamic title description and feature image to languages page (same as any category page: metatitle, metadescription, and featured image)
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