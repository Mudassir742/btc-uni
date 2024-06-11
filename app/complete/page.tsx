import React from "react";
// Utils
import { getRequestCookie } from "@/components/auth/getAuthCookie";
// Services
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
//  Components
import { BlackWhiteGridLeftContent, BlackWhiteGridRightContent, BlackWhiteGridWrapper } from "@/components/wrapper/BlackWhiteGridWrapper";
import BulkSubscription from "./BatchSubscription";
import SingleSubscription from "./SingleSubscription";
import { getProfile } from "@/features/wp/user";
import GiftedSubscription from "./GiftedSubscription";
import WelcomeComponent from "@/components/WelcomeComponent";
import WelcomeComponentFree from "@/components/WelcomeComponentFree";


export type PurchaseTypes = "single-subscription" | "gift-subscription" | "bulk-subscription"

interface SearchParams {
  qty?: string,
  type: PurchaseTypes
}


const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
  const user = await getRequestCookie(cookies());
  if (!user) {
    redirect("/login");
  }
  const userAdditionalData = await getProfile(user.userData?.databaseId!);

  //   const client =  createClient(user.authToken!);

  return (
    <main className="max-w-[1170px] mx-auto">
      <div>
        <GiftedSubscription type={searchParams.type} user={user} email={user.userData?.email!} customerName={userAdditionalData?.user.firstName!} />
        <BulkSubscription type={searchParams.type} email={user.userData?.email!} customerName={userAdditionalData?.user.firstName!} user={user} />
        {searchParams?.type === "single-subscription" && ( 
          <SingleSubscription type={searchParams.type} user={user} customerEmail={user.userData?.email!} customerName={userAdditionalData?.user.firstName!} 
          userEmail={user.userData?.email!} userPhone={userAdditionalData?.user?.phone || ""} userFirstName={userAdditionalData?.user?.firstName || ""} userLastName={userAdditionalData?.user?.lastName || ""} userStreet={userAdditionalData?.user?.address.address1 || ""} />
        )}
        
        {/* // HAMZAH: the component below, that should show once someone completes the process to sign up for a FREE ACCOUNT-please create a component like the above that clearly states sub-free  */}
        
        <WelcomeComponent 
          email={user.userData?.email!}
          type={searchParams.type}
          user={user}
          customerName={`
            ${userAdditionalData?.user.firstName!.at(0)?.toUpperCase()}${userAdditionalData?.user.firstName!.slice(1)}`
} />
        <WelcomeComponentFree
          email={user.userData?.email!}
          user={user}
          type={searchParams.type}
          customerName={`
            ${userAdditionalData?.user.firstName!.at(0)?.toUpperCase()}${userAdditionalData?.user.firstName!.slice(1)}`
          } />
      </div>
    
    </main>
  )
};

export default Page;
