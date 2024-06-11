import ExploreMoreCategories from "@/components/ExploreMoreCategories";
import Herotext from "@/components/text/Hero";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import BusinessTips from "./components/BusinessTips";
import TipsSubCallout from "./components/TipsSubCallout";
import EventsTips from "./components/EventsTips";
import ExtensionTips from "./components/ExtensionTips";
import HaircolorTips from "./components/HaircolorTips";
import HaircuttingTips from "./components/HaircuttingTips";
import LanguagesTips from "./components/LanguagesTips";
import MensTips from "./components/MensTips";
import StylingTips from "./components/StylingTips";
import TextureTips from "./components/TextureTips";
import TipsCategoryHero from "./components/TipsCategoryHero";
import H1Text from "@/components/text/H1Text";

import { Metadata, ResolvingMetadata } from "next/types";
import { getCategoryPageMetadata } from "./helper";

// mihai may 27 2024: below deprecated and changed to dynamic metadata (based on what editors enter in wp) -- in this case this was empty so i added the below data in the tips wordpress page
// export const metadata = {
//   title: 'Quick Hair Tips & Tricks',
//   description: 'Our Quick Tips videos offer bite-sized wisdom to elevate your techniques and business strategy. Perfect for busy stylists looking to learn on the go.',

// }

export default async function Tips() {
	// const heroTitle = "Tips";

	// Get user cookie
	const userProm = getRequestCookie(cookies());

	// Fetching all data in parallel
	const user = await userProm;

	return (
		<main>
			<Suspense
				fallback={
					<div className="w-full flex flex-col gap-y-6">
						<Skeleton className="h-14" />
						<Skeleton className="h-14" />
						<Skeleton className="h-14" />
					</div>
				}
			>
				{/* <TipsCategoryHero /> */}
			</Suspense>
			<div className="flex container">
				<H1Text text={"Quick Tips"} />
			</div>
			<div className="space-between-categories" />

			<Suspense
				fallback={
					<div className="w-full flex flex-col gap-y-0">
						<Skeleton className="h-14" />
						<Skeleton className="h-14" />
						<Skeleton className="h-14" />
					</div>
				}
			>
				<BusinessTips user={user} heroTitle={"Business"} />
			</Suspense>

			<Suspense
				fallback={
					<div className="w-full flex flex-col gap-y-6">
						<Skeleton className="h-14" />
						<Skeleton className="h-14" />
						<Skeleton className="h-14" />
					</div>
				}
			>
				<HaircolorTips user={user} heroTitle={"Hair Color"} />
			</Suspense>

			<Suspense
				fallback={
					<div className="w-full flex flex-col gap-y-6">
						<Skeleton className="h-14" />
						<Skeleton className="h-14" />
						<Skeleton className="h-14" />
					</div>
				}
			>
				<HaircuttingTips user={user} heroTitle={"Haircutting"} />
			</Suspense>

			<Suspense
				fallback={
					<div className="w-full flex flex-col gap-y-6">
						<Skeleton className="h-14" />
						<Skeleton className="h-14" />
						<Skeleton className="h-14" />
					</div>
				}
			>
				<StylingTips user={user} heroTitle={"Styling"} />
			</Suspense>

			<Suspense
				fallback={
					<div className="w-full flex flex-col gap-y-6">
						<Skeleton className="h-14" />
						<Skeleton className="h-14" />
						<Skeleton className="h-14" />
					</div>
				}
			>
				<TextureTips user={user} heroTitle={"Texture"} />
			</Suspense>

			<Suspense
				fallback={
					<div className="w-full flex flex-col gap-y-6">
						<Skeleton className="h-14" />
						<Skeleton className="h-14" />
						<Skeleton className="h-14" />
					</div>
				}
			>
				<ExtensionTips user={user} heroTitle={"Extensions"} />
			</Suspense>

			<Suspense
				fallback={
					<div className="w-full flex flex-col gap-y-6">
						<Skeleton className="h-14" />
						<Skeleton className="h-14" />
						<Skeleton className="h-14" />
					</div>
				}
			>
				<MensTips user={user} heroTitle={"Men's"} />
			</Suspense>

			<Suspense
				fallback={
					<div className="w-full flex flex-col gap-y-0">
						<Skeleton className="h-14" />
						<Skeleton className="h-14" />
						<Skeleton className="h-14" />
					</div>
				}
			>
				<EventsTips user={user} heroTitle={"BTC Events"} />
			</Suspense>

			<Suspense
				fallback={
					<div className="w-full flex flex-col gap-y-6">
						<Skeleton className="h-14" />
						<Skeleton className="h-14" />
						<Skeleton className="h-14" />
					</div>
				}
			>
				<LanguagesTips user={user} heroTitle={"Languages"} />
			</Suspense>

			<Suspense
				fallback={
					<div className="w-full flex flex-col gap-y-6">
						<Skeleton className="h-14" />
						<Skeleton className="h-14" />
						<Skeleton className="h-14" />
					</div>
				}
			>
				<TipsSubCallout user={user} />
			</Suspense>
			{/* 
      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <ExploreMoreCategories activeCategory="" />
      </Suspense> */}

    </main >

  );
}

// mihai may 27: added dynamic title description and feature image to tips page (same as any category page: metatitle, metadescription, and featured image)
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
