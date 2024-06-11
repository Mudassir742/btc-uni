import ExploreMoreCategories from "@/components/ExploreMoreCategories";
import Herotext from "@/components/text/Hero";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { cookies } from "next/headers";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";


export const metadata = {
  title: 'BTC University',
  description: 'BTC Class Pass',

}
// TO DO: description field above, see comment in haircutting/page.tsx -- This should be dinamically pulled from every category page
// or entered here until launch

export default async function BTCClassPass() {



  // Get user cookie
  const userProm = getRequestCookie(cookies());

  // Fetching all data in parallel
  const user = await userProm;


  return (
    <main >
      <div className="flex container">
        <Herotext text={"BTC Class Pass"}  />
      </div>

   

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
       ...
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