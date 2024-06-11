import { client } from "../../lib/apolloClient";
import { GET_CATEGORY_PAGE_GENERAL_DATA_METADATA, GET_EDUCATOR_PAGE } from "@/graphql/queries";
import { CategoryPageMetadata, MediaItem, Page } from "@/interfaces";
import SH4Text from "@/components/text/SH4Text";
import T1Text from "@/components/text/T1Text";
import Link from "next/link";
import SH1Text from "@/components/text/SH1Text";
import EducatorHeadShot from "@/components/EducatorHeadShot";
import { transformDataForWpUrl, transformWpUrl } from "@/utils/url";
import CourseCard from "@/components/CourseCard";
import TheEducators from "@/components/TheEducators";
import { generateWpPageError } from "@/utils/wpErrorHandling";
import AllEducatorsCategoryHero from "./components/AllEducatorsCategoryHero";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";

import { Metadata, ResolvingMetadata } from "next/types";
import { getCategoryPageMetadata } from "./helper";

// export const dynamic = "force-dynamic"
// mihai may 24 2024: below deprecated and changed to dynamic metadata (based on what editors enter in wp) -- in this case this was empty so i added the below data in the educators wordpress page
// export const metadata = {
//   title: 'Educators',
//   description: 'The industry&apos;s best educators all in one place. Learn from over 75 industry influencers, educators and icons.',
// }

export default async function AllEducators() {

  let imageWidth = 98; // Default for mobile
  let imageHeight = 98; // Default for mobile
  let screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  if (screenWidth < 700) {
    imageHeight = 98;
    imageWidth = 98;
  } else {
    imageHeight = 200;
    imageWidth = 200;
  }

  //fetch the data
  const pageData = await getEducatorsPage();

  if (!pageData) {
    return <div>Loading...</div>;
  }

  return (
    <main >
      <div >
        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
         <AllEducatorsCategoryHero />
        </Suspense>

        <TheEducators educatorPage={pageData}/>
      </div>
    </main>
  );
}
// async function getEducatorsPage(): Promise<Page> {
//   const response = await client.query({
//     query: GET_EDUCATOR_PAGE,
//   });

//   const pages: Page[] = [response.data.page];

//   return transformDataForWpUrl(pages[0]);
// }

async function getEducatorsPage(): Promise<Page> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
      },
      next:{
        revalidate: 600
      },
      // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
      // or we could do:
      // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
      body: JSON.stringify({
          query: GET_EDUCATOR_PAGE.loc?.source.body,
      }),
  });

  const { data, errors } = await response.json();
  
  if (errors && !data) {
      throw generateWpPageError(errors)
  }
  const pages: Page[] = [data.page];

  return transformDataForWpUrl(pages[0]);
}

// mihai may 24: added dynamic title description and feature image to each category page
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



