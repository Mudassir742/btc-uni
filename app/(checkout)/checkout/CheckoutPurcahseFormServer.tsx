import { FC, HTMLAttributes, Suspense } from 'react'
// Utils
import { cn } from '@/utils/shadcn'
import { PurchasedBundle, PurchasedCourse, UserSession } from '@/interfaces'
import { getCustomerCardInfo } from './[sub_id]/CheckoutFormServerComp'
import StripeWrapper from '@/components/forms/StripeWrapper'
import ProductsCheckoutForm from '@/components/forms/ProductsCheckout'
import { getCouponData } from '@/lib/services/stripe/handleCouponCode'
import { getUserInfo } from '@/app/(auth)/basics/BasicsFormSuspense'
import { GET_PURCHASED_BUNDLE, GET_PURCHASED_COURSE } from '@/graphql/queries'
import { IUserBundleData, IUserCourseData } from './helper'
import { generateWpPageError } from '@/utils/wpErrorHandling'
import { transformDataForWpUrl } from '@/utils/url'
import { redirect } from 'next/navigation'

interface IProps extends HTMLAttributes<HTMLDivElement> {
    user: UserSession
    searchParams: { couponId?: string, type: "bundle" | "course" }
    pData: PurchasedCourse | PurchasedBundle
}

const CheckoutPurcahseFormServer: FC<IProps> = async ({
    className,
    user,
    pData,
    searchParams,
    ...props
}) => {

    const [cardInfo, couponData, userAddressData, purchasedCourse] = await Promise.all([
        getCustomerCardInfo(user.stripe.cus_id),
        getCouponData(
            searchParams.couponId
        ),
        getUserInfo(user),
        isProductPurchased(user.userDataId!, pData, searchParams.type)
    ]);
    if (typeof userAddressData === "string") {
        throw new Error("Somthing went wrong!");
    }
    console.log(purchasedCourse)
    if (purchasedCourse) {
        redirect(`/${purchasedCourse}`)
    }

    console.log(purchasedCourse)

    return (
        <div className={cn("", className)}
            {...props}>

            <Suspense>
                <ProductsCheckoutForm
                    userAddressData={userAddressData}
                    user={user}
                    cusCardData={cardInfo.data}
                    // productData={}
                    pData={pData}
                    couponData={couponData}
                />
            </Suspense>

        </div>
    )
}

export default CheckoutPurcahseFormServer


export async function isProductPurchased(databaseId: number, pData: PurchasedCourse | PurchasedBundle, type: "course" | "bundle"): Promise<boolean | string> {
    let response: Response;
    if (type === "course") {

        response = await fetch(process.env.NEXT_PUBLIC_WORDPRESS_API_URL!, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            cache: "no-store",
            body: JSON.stringify({
                query: GET_PURCHASED_COURSE.loc?.source.body,
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
                query: GET_PURCHASED_BUNDLE.loc?.source.body,
                variables: {
                    id: `${databaseId}`,
                },
                cache: "no-store",
            }),
        });
    }

    const { data, errors } = await response.json();

    if (errors) {
        throw generateWpPageError(errors)
    }

    const courseData: IUserCourseData | IUserBundleData = data as IUserCourseData | IUserBundleData;
    
    if (type === "bundle") {
        const bundle = pData as PurchasedBundle;
        const purchasedBundle = courseData as IUserBundleData;
        
        const purchasedBundleList = purchasedBundle.userData.userDataMetadata.purchasedbundless?.map((bundle) => bundle.databaseId);
        return purchasedBundleList?.includes(Number(bundle?.courseBundle.databaseId)) ? `collections/${bundle.courseBundle.slug}` : false;
    }
    else if (type === "course") {
        const course = pData as PurchasedCourse;
        const purchasedCourse = courseData as IUserCourseData
        const purchasedCourseList = purchasedCourse.userData.userDataMetadata.purchasedcourses?.map((course) => course.databaseId);
        console.log(purchasedCourse)
        return purchasedCourseList?.includes(Number(course?.course.databaseId)) ? `courses/${course.course.slug}` : false;


    } else {
        return false
    }

}