import { GET_ALL_BRANDS_PAGE_DATA, GET_EDUCATOR_PAGE } from "@/graphql/queries";
import { Page } from "@/interfaces";
import { transformDataForWpUrl } from "@/utils/url";
import TheBrands from "@/components/TheBrands";
import { generateWpPageError } from "@/utils/wpErrorHandling";
import AllEducatorsCategoryHero from "./components/AllBrandsCategoryHero";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export const metadata = {
  title: 'Brands',
  description: 'The industry&apos;s best educators all in one place. Learn from over 75 industry influencers, educators and icons.',
}

export interface AllBrandsType {
  title: string,
  slug: string,
  brandmetadata: {
    logo: {
      sourceUrl: string,
    }
  }
}

export default async function AllBrands() {

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
  const AllBrandData = await getBrandPage();
  console.log('AllBrandData')
  console.log(AllBrandData)
  if (!AllBrandData) {
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

        <TheBrands brandPage={AllBrandData} />
      </div>
    </main>
  );
}

async function getBrandPage(): Promise<AllBrandsType[]> {
  const response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    next: {
      revalidate: 600
    },
    body: JSON.stringify({
      query: GET_ALL_BRANDS_PAGE_DATA.loc?.source.body,
    }),
  });

  const { data, errors } = await response.json();

  if (errors && !data) {
    throw generateWpPageError(errors)
  }

  return data.brands.nodes
}



