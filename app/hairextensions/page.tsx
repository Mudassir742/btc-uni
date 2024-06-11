
import ExploreMoreCategories from "@/components/ExploreMoreCategories";
import Herotext from "@/components/text/Hero";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import ExtensionCategoryHero from "./components/ExtensionCategoryHero";
import NewExtensionCourses from "./components/NewExtensionCourses";
import ExtensionTips from "./components/ExtensionTips";
import AllExtensionCourses from "./components/AllExtensionCourses";
import ExtensionDownloadables from "./components/ExtensionDownloadables";
import ExtensionEducators from "./components/ExtensionEducators";
import ExtensionSpotlight from "./components/ExtensionSpotlight";
import ExtensionSubCallout from "./components/ExtensionSubCallOut";
import H3Text from "@/components/text/H3Text";

import { Metadata, ResolvingMetadata } from "next/types";
import { getCategoryPageMetadata } from "./helper";

// mihai may 24 2024: below deprecated and changed to dynamic metadata (based on what editors enter in wp) -- in this case these were already in the hair extensions wordpress page just not being fetched
// export const metadata = {
//   title: 'EXTENSIONS',
//   description: 'Learn how to apply a variety of different extension types, cut and style them and build your business with them.',
// }

export default async function HairExtensionsPage() {
  
  const heroTitle = "Extension";

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
        <ExtensionCategoryHero
        />
      </Suspense>
      {/* <div className="flex container">
        <SH1Text text={`Learn These ${heroTitle} Techniques`}  />
   
      </div> */}

     

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <NewExtensionCourses user={user} heroTitle={`${heroTitle}s`} />

      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <ExtensionTips
          user={user}
          heroTitle='Extension Quick Tips'
        />
      </Suspense>
      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <ExtensionDownloadables
          user={user}
          heroTitle={heroTitle}
        />
      </Suspense>
      <div >

        {/* <Section title="All Haircuts" cards={allCutCards} /> */}
        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <ExtensionEducators
          />
        </Suspense>
        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <AllExtensionCourses
          />
        </Suspense>

     

        

   

      </div>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <ExtensionSpotlight
        />
      </Suspense>



      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <ExtensionSubCallout user={user}
        />
      </Suspense>
{/* 
      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <ExploreMoreCategories activeCategory="hairextensions" />
      </Suspense> */}


    </main>
  );
}

// mihai may 24: added dynamic title description and feature image to extensions page (same as any category page: metatitle, metadescription, and featured image)
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



