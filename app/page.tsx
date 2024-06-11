import HomePageNotSignedIn from '@/components/homepagenotsignedin/HomePageNotSignedIn';

import { getRequestCookie } from '@/components/auth/getAuthCookie';
import { cookies } from 'next/headers';
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/Skeleton";

export const metadata = {
  title: 'BTC University',
  description: 'The industry&apos;s best educators all in one place. 250+ pro tutorials. 75+ industry influencers, educators & icons. All from the comfort of your home or salon.',
}

export default async function Home() {

  const themeColor = "#523D34";

  // User Data
  // fetch user cookie
  const userProm = getRequestCookie(cookies());
  const user = await userProm;

  // check if user is logged in
  const isLoggedIn = (user?.userDataId || 0) > 0;

  return (
    <main className=''>
 

      
      {/* <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <HomePageSubscriber
          user={user}
          themeColor={themeColor}
        />
      </Suspense> */}

      <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
        <Skeleton className="h-14" />
      </div>}>
        <HomePageNotSignedIn
          user={user}
          themeColor={themeColor}
        />
      </Suspense>

      {/* {!isLoggedIn && (
        <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
          <Skeleton className="h-14" />
        </div>}>
          <HomePageNotSignedIn
            user={user}
            themeColor={themeColor}
          />
        </Suspense>
      )} */}

    </main>
  );
}
