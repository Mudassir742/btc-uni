import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";
import Skeleton from "@mui/material/Skeleton";
import { Suspense } from "react";
import DownloadableHero from "../components/DownloadableHero";
import SuggestedDownloads from "../components/SuggestedDownloads";
import H3Text from "@/components/text/H3Text";
import MoreFromSameSet from "../components/MoreFromSameSet";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import UnlockPopup from "@/components/molecules/UnlockPopup";
import { Metadata, ResolvingMetadata } from "next/types";
import { getDownloadableMetadata } from "../helper";

export default async function ResourceSlugPage({
  params,
  searchParams
}: {
  params: { slug: string },
  searchParams: { courseSlug?: string, redirectType?: string };
}) {
  // User Data
  // fetch user cookie
  const userProm = getRequestCookie(cookies());

  // Fetching data in parallel
  const user = await userProm;

  // Checking if we have received course data
  if (!params) {
    return (
      <main>
        <div>Loading...</div>
      </main>
    );
  }
  return (
    <main className="md:container md:mx-auto">
      {/* Resource Unlock popup */}
      {
        searchParams.courseSlug && searchParams.redirectType && (
          <UnlockPopup />
        )
      }
      {/* Left Column - Container 1 */}

      <div className="">
        <Suspense
          fallback={
            <div className="w-full flex flex-col gap-y-6 order-1 ">
              <Skeleton className="h-14" />
              <Skeleton className="h-14" />
              <Skeleton className="h-14" />
            </div>
          }
        >
          <DownloadableHero params={params} user={user} />
        </Suspense>

        <div className="space-between-categories" />

        <Suspense
          fallback={
            <div className="w-full flex flex-col gap-y-6 order-1 ">
              <Skeleton className="h-14" />
              <Skeleton className="h-14" />
              <Skeleton className="h-14" />
            </div>
          }
        >
          <MoreFromSameSet params={params} />
        </Suspense>

        <div className="space-between-categories" />

        {/* <Suspense
          fallback={
            <div className="w-full flex flex-col gap-y-6 order-1 ">
              <Skeleton className="h-14" />
              <Skeleton className="h-14" />
              <Skeleton className="h-14" />
            </div>
          }
        >
          <div className="slider-container md:pl-0 ">
            <H3Text text="Suggested Downloads" />
            <div className="space-under-category-titles" />

            <SuggestedDownloads params={params} />
          </div>
        </Suspense> */}
        {/* above commented out by Mihai on March 13 2024 following slack conversation with Emily on Emily Mihai Briana channel */}

        {/* <Suspense
              fallback={
                <div className="w-full flex flex-col gap-y-6 order-1 ">
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                </div>
              }
            >
              <DownloadYouWillLearn
                params={params}
              />
            </Suspense> */}

        <div className="med-space" />
      </div>
      {/* Right Column - Container 2 */}
      {/* <div className="container md:pt-[32px] place-items-end items-center w-full  lg:w-4/12 min-w-[370px] mr-auto lg:pl-[24px] ">
            <H3Text text="Suggested Downloads" />
            <div className="space-under-category-titles" />

            <Suspense
              fallback={
                <div className="w-full flex flex-col gap-y-6 order-1 ">
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                </div>
              }
            >
              <SuggestedDownloads
                params={params}
              />
            </Suspense>
          </div> */}
    </main>
  );
}

// Mihai may 29: Helper function to strip HTML tags
// function stripHtmlTags(str: string) {
//   if (!str) return '';
//   return str.replace(/<[^>]*>?/gm, '');
// }

function removeTags(str: string) {
  if ((str === null) || (str === ''))
      return "";
  else
      str = str.toString();

  // Regular expression to identify HTML tags in
  // the input string. Replacing the identified
  // HTML tag with a null string.
  return str.replace(/(<([^>]+)>)/ig, '');
}

// add dynamic title and description to each educator slug page
// mihai added featured images on may 24
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {

  const metadata = await getDownloadableMetadata(params);

  // Clean the metadata content
  const cleanContent = removeTags(metadata.content);

  return {
    // mihai note may 27: since no downloadables have metatitle and metadescription we are using title and content for now
    // to do: switch to metaTitle and metaDescription after Emily adds metaTitle and metaDescription to each downloadable (not sure what the priority is on that)
    title: metadata.title,
    description: cleanContent,
    openGraph: {
      title: metadata.title,
      description: cleanContent,
      images: [
        {
          url: metadata?.downloadablemetadata?.downloadableImage?.mediaItemUrl || '/btc-u_social-brown.png', // Provide a default image URL in case the featured image is not available
          width: 1200,
          height: 630,
          alt: metadata.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title,
      description: cleanContent,
      images: [
        metadata?.downloadablemetadata?.downloadableImage?.mediaItemUrl || '/btc-u_social-brown.png',
      ],
    },
  }
}
