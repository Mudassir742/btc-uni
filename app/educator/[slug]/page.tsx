import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";
import EducatorSlugMyCoursesDesktop from "../components/EducatorSlugMyCoursesDesktop";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import EducatorSlugLongBio from "../components/EducatorSlugLongBio";
import EducatorSlugShareButton from "../components/EducatorSlugShareButton";
import EducatorSlugPushPin from "../components/EducatorSlugPushPin";
import EducatorSlugInstaHandle from "../components/EducatorSlugInstaHandle";
import EducatorSlugName from "../components/EducatorSlugName";
import EducatorSlugRatingDesktop from "../components/EducatorSlugRatingDesktop";
import EducatorSlugHeadshot from "../components/EducatorSlugHeadshot";
import { Metadata, ResolvingMetadata } from "next/types";
import { getEducatorMetadata } from "../helper";
import EducatorSlugTips from "../components/EducatorSlugTips";
import EducatorSlugDownloads from "../components/EducatorSlugDownloads";

const themeColor = "#523D34";
// note: share url is in the sharebutton component

export default async function EducatorSlugPage({
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
    <main className="mx-auto md:container">
    

      <div className="">
        <div className="px-4 md:px-0 mx-auto md:mx-0 md:flex ">
          {/* Left Column - Container 1 */}
          <div className="items-center md:min-w-[370px] md:w-2/6 ">
            {/* <div className="min-w-[370px] max-w-[390px]"> */}

            <Suspense
              fallback={
                <div className="w-full ">
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                  <Skeleton className="h-14" />
                </div>
              }
            >
              <EducatorSlugHeadshot params={params} />
            </Suspense>

            <div>
              <div className="space-under-category-titles" />
              <div className="relative ">
                <div className="items-center flex">
                  <Suspense
                    fallback={
                      <div className="w-full flex flex-col gap-y-6">
                        <Skeleton className="h-14" />
                        <Skeleton className="h-14" />
                        <Skeleton className="h-14" />
                      </div>
                    }
                  >
                    <EducatorSlugRatingDesktop
                      params={params}
                      themeColor={themeColor}
                    />
                  </Suspense>

                  <div className="flex flex-grow justify-end">
                    <div className="pr-3 items-center">
                      <Suspense
                        fallback={
                          <div className="w-full flex flex-col gap-y-6">
                            <Skeleton className="h-14" />
                            <Skeleton className="h-14" />
                            <Skeleton className="h-14" />
                          </div>
                        }
                      >
                        <EducatorSlugPushPin params={params} user={user} />
                      </Suspense>
                    </div>

                    <div className="items-center">
                      <Suspense
                        fallback={
                          <div className="w-full flex flex-col gap-y-6">
                            <Skeleton className="h-14" />
                            <Skeleton className="h-14" />
                            <Skeleton className="h-14" />
                          </div>
                        }
                      >
                        <EducatorSlugShareButton params={params} />
                      </Suspense>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="flex ">
                    <Suspense
                      fallback={
                        <div className="w-full flex flex-col gap-y-6">
                          <Skeleton className="h-14" />
                          <Skeleton className="h-14" />
                          <Skeleton className="h-14" />
                        </div>
                      }
                    >
                      <EducatorSlugName params={params} />
                    </Suspense>
                  </div>

                  <Suspense
                    fallback={
                      <div className="w-full flex flex-col gap-y-6">
                        <Skeleton className="h-14" />
                        <Skeleton className="h-14" />
                        <Skeleton className="h-14" />
                      </div>
                    }
                  >
                    <EducatorSlugInstaHandle params={params} />
                  </Suspense>

                  <div className="space-under-category-titles" />

                  {/* <div className="flex items-center pl-4 pt-4 md:pt-0 md:pl-2">

                    <BookTime
                      available={available}
                      educatorName={`${educatorData.educatorMetaData?.firstname || ""} ${educatorData.educatorMetaData?.lastname || ""}`}
                    />

                  </div> */}
                </div>
              </div>
            </div>

            {/* </div> */}
          </div>

          {/* middle Column - Container 2 */}
          <div className="md:pl-[24px] ">
            {/* <div className='space-between-categories' /> */}

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
                <EducatorSlugLongBio params={params} themeColor={themeColor} />
              </Suspense>
            </div>

            {/* <div className=" md:pl-0">
                <div className="flex md:pt-[64px]">


                  <SH1Text text="In-person Courses" />
                  <div className="px-2 flex">
                    <SH1Text text="(" /> <SH1Text text="3" /> <SH1Text text=")" />
                  </div>
                </div>
                <div >
                  <InPersonCourses inPersonPrice={inPersonPrice} inPersonCourseTitle={inPersonCourseTitle} inPersonCity={inPersonCity} inPersonImageSrc={inPersonImageSrc} inPersonLink={inPersonLink} inPersonDate={inPersonDate} inPersonState={inPersonState} themeColor={themeColor} />

                </div>
              </div> */}
          </div>
          {/* Right Column - Container 3 */}
          <div className="md:pl-[24px] ">
            {/* <div className='space-between-categories' /> */}

            {/* Desktop only */}
            <div className='hidden md:block'>
           {/* column 3 here... */}
            </div>

       
          </div>

        </div>
        <div className="md:pt-[72px]">
       
          <Suspense
            fallback={
              <div className="w-full flex flex-col ">
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
              </div>
            }
          >
           
            <EducatorSlugDownloads params={params} />
           
          </Suspense>

          <Suspense
            fallback={
              <div className="w-full flex flex-col ">
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
              </div>
            }
          >

            <EducatorSlugTips user={user} params={params} />

          </Suspense>


          <div className="md:container mx-auto">
          <Suspense
            fallback={
              <div className="w-full flex flex-col ">
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
                <Skeleton className="h-14" />
              </div>
            }
          >
        
     
              <EducatorSlugMyCoursesDesktop
                params={params}
                user={user}
                themeColor={themeColor}
              />
          
         
          </Suspense>
          </div>
      

          {/* <Testimonials testimonials={educatorData.educatorMetaData.educatortestimonials || []} /> */}
        </div>
      </div>
    </main>
  );
}

// add dynamic title and description to each educator slug page
// mihai added featured images on may 24
export async function generateMetadata(
  { params }: { params: { slug: string } },
  parent: ResolvingMetadata
): Promise<Metadata> {

  const metadata = await getEducatorMetadata(params);

  return {
    title: metadata.title + " (" + metadata.educatorMetaData.instahandle + ")",
    description: metadata.educatorMetaData.shortBio,
    openGraph: {
      title: metadata.title + " (" + metadata.educatorMetaData.instahandle + ")",
      description: metadata.educatorMetaData.shortBio,
      images: [
        {
          url: metadata?.educatorMetaData?.educatorpicture?.mediaItemUrl || '/btc-u_social-brown.png', // Provide a default image URL in case the featured image is not available
          width: 1200,
          height: 630,
          alt: metadata.title + " (" + metadata.educatorMetaData.instahandle + ")",
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: metadata.title + " (" + metadata.educatorMetaData.instahandle + ")",
      description: metadata.educatorMetaData.shortBio,
      images: [
        metadata?.educatorMetaData?.educatorpicture?.mediaItemUrl || '/btc-u_social-brown.png',
      ],
    },
  }
}
