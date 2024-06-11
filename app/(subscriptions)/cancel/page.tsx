
import CancelFlow from "@/components/CancelFlow";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { getCustomerInfo, getCustomerSubs } from "@/features/stripe/subscriptions";
import { checkSubIsCancelled, checkSubIsValid, checkSubIsValidSubscriptionObject } from "@/utils/subValidation";
import { getProfile } from "@/features/wp/user";

import { cookies } from "next/headers";
// Components
import H1Text from "@/components/text/H1Text";
import { redirect } from "next/navigation";
import { BlackWhiteGridLeftContent, BlackWhiteGridRightContent, BlackWhiteGridWrapper } from "@/components/wrapper/BlackWhiteGridWrapper";
import Skeleton from "@mui/material/Skeleton";
import { Suspense } from "react";
import Link from "next/link";

import { Subscription } from "@/interfaces";
import { getCertificates } from "@/app/completed/helper";

export const dynamic = "force-dynamic"

const Cancel = async ({
  searchParams,
}: {
  searchParams: {
    q: string;
  };
}) => {

  const user = await getRequestCookie(cookies());
  if (!user) {
    redirect("/log-in")
  }

  const userSubProm = getCustomerSubs(user?.userData?.databaseId!)
  // Fetching user certificates and liked courses explicitly because I will make a separate server component for it later
  const getUserEduInfoProm = getCustomerInfo(user?.userDataId!)

  const [userSub, UserEduInfo, profile] = await Promise.all([userSubProm, getUserEduInfoProm, getProfile(user.userData?.databaseId!)])

  const validSub = await checkSubIsValidSubscriptionObject(userSub as unknown as Subscription)
  const isCancelled = !!userSub.subscriptionMetadata.subscriptioncanceledon
  // if (!validSub) {
  //   return <h2>No renewable subscription</h2>
  // }
  const certificatesProm = getCertificates(user.userDataId!);
  const [certificates] = await Promise.all([certificatesProm]);
  const numberOfCertificates = certificates?.filter(item => item.isCompleted === true).length ?? 0
  return (
    <main className="container">

      <div className="">
        <div>
          {(validSub && !isCancelled) || searchParams.q === "CancelStep3" ? (
            <Suspense fallback={<div className="w-full flex flex-col gap-y-6">
              <Skeleton className="h-14" />
              <Skeleton className="h-14" />
              <Skeleton className="h-14" />
            </div>}>
              {/* <CancelFlow
                    numberOfPinnedCourses={UserEduInfo.likedCourses?.length ?? 0}
                    numberOfCertificates={UserEduInfo.certificates?.length ?? 0}
                  /> */}
              <div >
                <CancelFlow
                  numberOfPinnedCourses={UserEduInfo.likedCourses?.length ?? 0}
                  profile={profile}
                  numberOfCertificates={numberOfCertificates}
                  sub={userSub} user={user!}
                  searchParams={searchParams}
                />
              </div>

            </Suspense>
          ) : (
            <div>

              <h2>No renewable subscription available to cancel</h2>
              If you feel you have recieved this message in error, please contact support.
              <div className="text-themeColor text-sm p-3">
                <br>
                </br>
                Phone: (800) 760-3010
                <br>
                </br>
                Email: <Link href="mailto:membership@btcuniversity.com">membership@btcuniversity.com</Link>

              </div>

              <div className="med-space" />
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default Cancel

