import React from 'react';
import { extractEducatorAll, getAllBrand, getAllTips, getCurrentUserDataPurchasedSubscriptions, getEducatorAll, today } from '../helper';
import TipParent from '@/components/TipParent';
import { Brand, Tip, UserSession } from '@/interfaces';
import { checkSubIsValidSubscriptionObject } from '@/utils/subValidation';


interface BrandSlugTipsProps {
    user: UserSession | null;
    params: { slug: string }; // Educator
}

const BrandSlugTips: React.FC<BrandSlugTipsProps> = async ({ user, params }) => {

    // get educator first name


    // 1. get all tips including educator and educator slug
    const allBrandProm = getAllBrand();
    const userDataPromise = getCurrentUserDataPurchasedSubscriptions(user?.userDataId || 0);
    // fetch data parellel
    const [allBrand, currentUserData] = await Promise.all([allBrandProm, userDataPromise]);
    const filteredBrand = allBrand.find(brand => (brand.slug === params.slug) )
    const filteredTips = filteredBrand ? filteredBrand?.brandmetadata.brandTips : [];
    // 2. filter only tips of this educator by educator slug

    // const filteredTips = filteredBrand?.brandmetadata.brandTips
    //     .filter((tip: Tip) => {
    //         // Check if any educator in the tipEducator array has a slug that matches params.slug
    //         return tip?.tipmetadata.tipBrands.slug === params.slug;
    //     })

    // Convert subscription start and expiration dates to Date objects
    const purchasedSubscriptions = currentUserData?.userDataMetadata?.purchasedsubscriptions || [];
    // Sorting the array in descending order based on the subscription start date
    purchasedSubscriptions.sort((a, b) => {
        const dateA = new Date(a.subscriptionMetadata.subscriptionstartson).getTime();
        const dateB = new Date(b.subscriptionMetadata.subscriptionstartson).getTime();
        return dateA - dateB;  // Ascending order
    });
    // Now the last element in the sorted array is the most recent subscription
    const lastSubscription = purchasedSubscriptions[purchasedSubscriptions.length - 1] || {};
    const userIsCurrentlySubscribed = await checkSubIsValidSubscriptionObject(lastSubscription);

    return (
        <div>
            {filteredTips?.length > 0 && (
                <TipParent heroTitle={``}
                    className={'text-[32px] font-semibold text-themeColor'}
                    iseducatorspage={true} tipVideos={filteredTips} isSubscribed={userIsCurrentlySubscribed} userDataId={`${user?.userDataId || 0}`} />
            )}
        </div>
    );
}

export default BrandSlugTips;