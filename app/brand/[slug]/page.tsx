import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";
import BrandSlugMyCoursesDesktop from "../components/BrandSlugMyCoursesDesktop";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import BrandSlugLongBio from "../components/BrandSlugLongBio";
import BrandSlugShareButton from "../components/BrandSlugShareButton";
import BrandSlugPushPin from "../components/BrandSlugPushPin";
import BrandSlugInstaHandle from "../components/BrandSlugInstaHandle";
import BrandSlugName from "../components/BrandSlugName";
import BrandSlugRatingDesktop from "../components/BrandSlugRatingDesktop";
import BrandSlugHeadshot from "../components/BrandSlugHeadshot";
import { Metadata, ResolvingMetadata } from "next/types";
import { getEducatorMetadata } from "../helper";
import BrandSlugTips from "../components/BrandSlugTips";
import BrandSlugDownloads from "../components/BrandSlugDownloads";
import Image from "next/image";
import BrandHero from "../components/BrandHero";
import ProductsUsed from "@/components/ProductsUsed";
import BrandSlugProductUsed from "../components/BrandSlugProductUsed";

const themeColor = "#523D34";
// note: share url is in the sharebutton component

export default async function BrandSlugPage({
  params,
}: {
  params: { slug: string };
}) {
  let imageWidth = 200;
  let imageHeight = 200;

  let screenWidth = typeof window !== "undefined" ? window.innerWidth : 0;
  if (screenWidth < 768) {
    imageHeight = 200;
    imageWidth = 200;
  } else {
    imageHeight = 380;
    imageWidth = 380;
  }

  // User Data
  // fetch user cookie
  const userProm = getRequestCookie(cookies());

  // Fetching data in parallel
  const user = await userProm;
  return (

    <main className="mx-auto container 6xl:!p-0">
      {/* hero */}
      <div>
        <BrandHero params={params} />
      </div>

      <div className="px-4 md:px-0 mx-auto md:mx-0 md:flex ">
        {/* about */}
        <div className="">
          <Suspense
            fallback={
              <div className="w-full flex flex-col gap-y-6">
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
              </div>
            }
          >
            <BrandSlugLongBio params={params} themeColor={themeColor} />
          </Suspense>
        </div>

      </div>

      <div className="md:pt-[72px]">
        {/* quick tips */}
        <Suspense
          fallback={
            <div className="w-full flex flex-col ">
              <Skeleton className="h-14" />
              <Skeleton className="h-14" />
              <Skeleton className="h-14" />
            </div>
          }
        >
          <BrandSlugTips user={user} params={params} />
        </Suspense>

        {/* Downloads */}
        <Suspense
          fallback={
            <div className="w-full flex flex-col ">
              <Skeleton className="h-14" />
              <Skeleton className="h-14" />
              <Skeleton className="h-14" />
            </div>
          }
        >
          <BrandSlugDownloads params={params} />
        </Suspense>

        {/* courses */}
        <div className="mb-16">
          <Suspense
            fallback={
              <div className="w-full flex flex-col ">
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
              </div>
            }
          >
            <BrandSlugMyCoursesDesktop
              params={params}
              user={user}
              themeColor={themeColor}
            />
          </Suspense>
        </div>

        {/* our product */}
        <div className="mb-16">
          <Suspense
            fallback={
              <div className="w-full flex flex-col ">
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
              </div>
            }
          >
            <BrandSlugProductUsed
              params={params}
              themeColor={themeColor}
              user={user}
            />
          </Suspense>
        </div>

      </div>
    </main>
  );
}

// add dynamic title and description to each educator slug page
// export async function generateMetadata(
//   { params }: { params: { slug: string } },
//   parent: ResolvingMetadata
// ): Promise<Metadata> {
//   const metadata = await getEducatorMetadata(params);

//   return {
//     title: metadata.title + " (" + metadata.educatorMetaData.instahandle + ")",
//     description: metadata.educatorMetaData.shortBio,
//   };
// }
