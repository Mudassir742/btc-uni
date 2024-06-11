
import {
  // GET_ALL_COURSE_BUNDLES_SLUGS,
  // GET_COURSE_BUNDLE_BY_SLUG,
  GET_COURSE_BUNDLE_BY_SLUG_METADATA,
} from "@/graphql/queries";
import { Course, CourseBundle, Educator } from "@/interfaces";

import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";
import { generateWpPageError } from "@/utils/wpErrorHandling";
// import SaveCourse from "@/components/SaveCourse";
import { getCurrentUserDataPurchasedBundles, getCurrentUserDataPurchasedCourses, getCurrentUserDataPurchasedSubscriptions } from "@/app/courses/helper";
import { Metadata, ResolvingMetadata } from "next/types";
import { transformDataForWpUrl } from "@/utils/url";
import MainServerComponent from "./components/MainServerComponent";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";


export default async function Collections({
  params,
}: {
  params: { slug: string };
}) {

  // User Data
  // fetch user cookie
  const userProm = getRequestCookie(cookies());
  const user = await userProm;


  return (
    <Suspense fallback={<div className="flex flex-col ">
      <Skeleton className="h-14" />
      <Skeleton className="h-14" />
      <Skeleton className="h-14" />
    </div>}>
      <MainServerComponent
        params={params}
              user={user} />
    </Suspense>
  );
}



async function getCourseBundleMetadata(params: {
  slug: string;
}): Promise<CourseBundle> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    // cache: "force-cache", // if we want to cache the data and if we remove the const const dynamic = "force-dynamic"; it will automatically cache
    // or we could do:
    // cache: "no-store", // we have other options, like "no-store" / no-cache will revalidate the data, with no-store it's checking with each request if there are any changes
    // cache: "no-cache", // changed from no-store on jan 2
    cache: "no-store", // brough back on jan 3 as no-cache was causing weird issues
    body: JSON.stringify({
      query: GET_COURSE_BUNDLE_BY_SLUG_METADATA.loc?.source.body,
      variables: {
        id: `${params.slug}`,
      },
    }),
  });

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors);
  }
  const courseBundle: CourseBundle = data?.courseBundle;
  return transformDataForWpUrl(courseBundle);
}

// we don't need this for dynamic pages, deprecated
// export async function generateStaticParams() {
//   // const client = getClient();
//   const response = await client.query({
//     query: GET_ALL_COURSE_BUNDLES_SLUGS,
//   });

//   const courseBundles = response.data.courseBundles.nodes;

//   return courseBundles.map((courseBundle: { slug: string }) => ({
//     slug: courseBundle.slug,
//   }));
// }


// add dynamic title and description to each course slug page
// export async function generateMetadata(
//   { params }: { params: { slug: string } },
//   parent: ResolvingMetadata
// ): Promise<Metadata> {

//   const metadata = await getCourseBundleMetadata(params);

//   return {
//     title: metadata.title,
//     description: metadata.content
//   }
// }
// mihai added featured images on may 28
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {

  const metadata = await getCourseBundleMetadata(params);

  return {
    title: metadata?.title,
    description: metadata?.content,
    openGraph: {
      title: metadata?.title,
      description: metadata?.content,
      images: [
        {
          url: metadata?.coursebundlemetadata?.bundleimage?.mediaItemUrl || '/btc-u_social-brown.png', // Provide a default image URL in case the featured image is not available
          width: 1200,
          height: 630,
          alt: metadata?.title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata?.title,
      description: metadata?.content,
      images: [
        metadata?.coursebundlemetadata?.bundleimage?.mediaItemUrl || '/btc-u_social-brown.png',
      ],
    },
  }
}
