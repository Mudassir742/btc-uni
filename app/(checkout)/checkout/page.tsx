

// Components
import CheckoutSubForm from "@/components/forms/CheckoutSubForm";
import StripeWrapper from "@/components/forms/StripeWrapper";
// Lib
import { client } from "@/lib/apolloClient";
// GQL

import Stripe from "stripe";
// stripe
import { stripe } from "@/lib/stripe-server";
// Utils
import { handleError } from "@/utils/stripeErrorHandling";
import ProductsCheckoutForm from "@/components/forms/ProductsCheckout";

import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { getRequestCookie } from "@/components/auth/getAuthCookie";
import { generateWpPageError } from "@/utils/wpErrorHandling";
import { GET_CART_BUNDLE_DATA, GET_CART_COURSE_DATA } from "@/graphql/queries";
// Components
import {
  BlackWhiteGridLeftContent,
  BlackWhiteGridRightContent,
  BlackWhiteGridWrapper,
} from "@/components/wrapper/BlackWhiteGridWrapper";

import { Suspense } from "react";
import SH1Text from "@/components/text/SH1Text";
import { PurchasedBundle, PurchasedCourse } from "@/interfaces";
import CheckoutPurcahseFormServer from "./CheckoutPurcahseFormServer";
import { transformDataForWpUrl } from "@/utils/url";


export const dynamic = "force-dynamic";

export default async function Home({
  searchParams,
}: {
  searchParams: { pid: string; type: "bundle" | "course", couponId?: string };
}) {

  if (!searchParams.pid || !searchParams.type) {
    redirect("/")
  }

  const pDataPromise = getProductData(Number(searchParams.pid), searchParams.type);


  // const cusDataPromise: Promise<Stripe.Customer> = getCustomerInfo(customerId);


  const user = await getRequestCookie(cookies());

  if (!user?.userData?.name) {
    redirect("/basics/");
  }


  const [pData] = await Promise.all([
    pDataPromise,

  ]);
  if ("course" in pData) {
    if (!pData.course || !pData.course.isPurchasableALaCarte) {
      redirect('/')
    } else if (pData.course.courseMetadata.price === 0) {
      redirect(`/courses/${pData.course.slug}`)
    }

  } else {
    if (!pData.courseBundle) {
      redirect('/')
    } else if (pData.courseBundle.coursebundlemetadata.actualprice === 0) {
      redirect(`/collections/${pData.courseBundle.slug}`)
    }
  }
  return (
    <main>
      <BlackWhiteGridWrapper variant="v3">
        <BlackWhiteGridLeftContent>
          <div className="w-full h-full mx-auto bg-themecolor-500 relative">
            {/* <BackWithOnClick onClick={????} fill='black' />  */}
            {/* <Image
              alt="background"
              src={card}
              width={1000}
              height={1000}
              className="z-0 hidden md:block object-bottom w-full"
            /> */}
            {/* <div className="flex flex-col gap-y-4 py-20 px-10 text-justify text-white">
              <h2 className="text-24 font-semibold">
                Thank You for Trusting Us!
              </h2>
              <h3 className="text-18 font-medium">
                Your journey with us is just beginning, and we&apos;re grateful to
                have you on board.
              </h3>
              <p className="text-14 font-light">
                Thank you for choosing us for your needs. Your trust in our
                services means the world to us. We&apos;re committed to providing a
                seamless experience as you proceed to checkout. Should you have
                any questions or need assistance, our team is here to help.
                Welcome to a hassle-free shopping experience with us!
              </p>
            </div> */}
            {/* <Image
              alt="background"
              src={welcomeImg}
              quality={100}
              fill
              className="object-cover absolute z-0 hidden md:block object-bottom w-full"
              placeholder={`data:image/svg+xml;base64,${toBase64(
                shimmer("100%", "auto")
              )}`}
            /> */}
          </div>
        </BlackWhiteGridLeftContent>
        <BlackWhiteGridRightContent className="container mx-auto justify-center">
          <div className="flex items-center">


            <SH1Text text="Your Order" className="!text-themeColor" />
       </div>
    
           
          <div className="mt-3 lg:max-w-md">
            <StripeWrapper className="w-full">
              <Suspense fallback={""}>
                <StripeWrapper className="w-full">
                  {pData && (
                    <CheckoutPurcahseFormServer
                      user={user}
                      searchParams={searchParams}
                      pData={pData}
                    />
                  )}
                </StripeWrapper>
              </Suspense>
            </StripeWrapper>
          </div>
        </BlackWhiteGridRightContent>
      </BlackWhiteGridWrapper>
    </main>

  );
}

async function getProductData(databaseId: number, type: "course" | "bundle"): Promise<PurchasedCourse | PurchasedBundle> {
  let response: Response;
  if (type === "course") {

    response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      next: {
        revalidate: 100
      },
      // cache: "force-cache",
      body: JSON.stringify({
        query: GET_CART_COURSE_DATA.loc?.source.body,
        variables: {
          id: `${databaseId}`,
        },
      }),
    });
  } else {
    response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      // cache: "force-cache",
      body: JSON.stringify({
        query: GET_CART_BUNDLE_DATA.loc?.source.body,
        variables: {
          id: `${databaseId}`,
        },
      }),
    });
  }

  const { data, errors } = await response.json();

  if (errors) {
    throw generateWpPageError(errors)
  }

  const courseData: PurchasedCourse | PurchasedBundle = data;
  return transformDataForWpUrl(courseData);
}