import CategoryHero from "@/components/CategoryHero";
import SpecialtiesButton from "@/components/buttons/SpecialtiesButton";
import ExploreMoreCategories from "@/components/ExploreMoreCategories";
import Herotext from "@/components/text/Hero";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import BusinessDownloadables from "./components/BusinessDownloadables";
import DownloadablesSubCallout from "./components/DownloadablesSubCallout";
import EventsDownloadables from "./components/EventsDownloadables";
import ExtensionDownloadables from "./components/ExtensionDownloadables";
import HaircolorDownloadables from "./components/HaircolorDownloadables";
import HaircuttingDownloadables from "./components/HaircuttingDownloadables";
import LanguagesDownloadables from "./components/LanguagesDownloadables";
import MensDownloadables from "./components/MensDownloadables";
import StylingDownloadables from "./components/StylingDownloadables";
import TextureDownloadables from "./components/TextureDownloadables";
import DownloadsCategoryHero from "./components/DownloadsCategoryHero";
import H1Text from "@/components/text/H1Text";
import ClientLetters from "./components/ClientLetters";
import TenTips from "./components/TenTips";
import DownloadablesTenTips from "./components/DownloadablesTenTips";
import ClientLettersDownloadables from "./components/ClientLettersDownloadables";

import SocialClimbingSocialMediaComboDownloadables from "./components/SocialClimbingSocialMediaComboDownloadables";

import { Metadata, ResolvingMetadata } from "next/types";
import { getCategoryPageMetadata } from "./helper";

// mihai may 27 2024: below deprecated and changed to dynamic metadata (based on what editors enter in wp) -- in this case this was empty so i added the below data in the downloadables wordpress page
// export const metadata = {
//   title: 'Essential Resources for Hairdressers',
//   description: 'Access must-have resources to enhance your expertise behind the chair! Download our curated collective of valuable assets including head diagrams, social media and business success workbooks and more.',

// }

export default async function Downloadables() {

  // const heroTitle = "Downloadables";

  // Get user cookie
  const userProm = getRequestCookie(cookies());

  // Fetching all data in parallel
  const user = await userProm;


  return (
    <main >
      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <DownloadsCategoryHero />
      </Suspense>
      <div className="space-under-category-titles" />
      <div className="flex container">
        <H1Text text={"Downloadable Resources"} />
      </div>
      <div className='space-between-categories' />



      {/* <div className="flex slider-container items-center pt-2 pb-3 ">
        <div className="h-full">
          <ChevronRight size={18} />
        </div>        <div className="flex overflow-x-auto ">
          <SpecialtiesButton
            text="Series: Social Media for Hairdressers" scrollToId={"Series-section"}
            number="4" />
          <SpecialtiesButton
            text="Social Media" scrollToId={"Social-section"}
            number="4" />

          <SpecialtiesButton
            text="Recession"
            scrollToId={"Recession-section"}
            number="4"
          />


          <SpecialtiesButton
            text="Management & Culture " scrollToId={"Management-section"}
            number="4" />

          <SpecialtiesButton
            text="Consultations" scrollToId={"Consultations-section"}
            number="4" />
          <SpecialtiesButton
            text="Interviews" scrollToId={"Interviews-section"}
            number="4" />
          <SpecialtiesButton
            text="Social Climbing" scrollToId={"social-climbing-section"}
            number="4" />
          <SpecialtiesButton
            text="Social Media Photography" scrollToId={"social-photography-section"}
            number="4" />



        </div>

      </div> */}

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <ClientLetters user={user} heroTitle={"Client Letters"} />
      </Suspense>

      {/* <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <SocialClimbingSocialMediaComboDownloadables user={user} heroTitle={"Social Media For Hairdressers"} />
      </Suspense> */}

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <BusinessDownloadables user={user} heroTitle={"Social Media"} />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <DownloadablesTenTips user={user} heroTitle={"Ten Tips Guides"} />
      </Suspense>


      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <HaircuttingDownloadables user={user} heroTitle={"Haircutting"} />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <EventsDownloadables user={user} heroTitle={"BTC Events"} />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <HaircolorDownloadables user={user} heroTitle={"Hair Color"} />
      </Suspense>

      
      

      {/* <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <ExtensionDownloadables user={user} heroTitle={"Extensions"} />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <HaircolorDownloadables user={user} heroTitle={"Hair Color"} />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <LanguagesDownloadables user={user} heroTitle={"Languages"} />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <MensDownloadables user={user} heroTitle={"Men's"} />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <StylingDownloadables user={user} heroTitle={"Styling"} />
      </Suspense>

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <TextureDownloadables user={user} heroTitle={"Texture"} />
      </Suspense> */}



      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <DownloadablesSubCallout user={user} />
      </Suspense>

      {/* <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <ExploreMoreCategories activeCategory="" />
      </Suspense> */}

    </main >

  );
}

// mihai may 27: added dynamic title description and feature image to downloadables page (same as any category page: metatitle, metadescription, and featured image)
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