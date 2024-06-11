import React from 'react';
import { extractEducatorAll, getAllTips, getCurrentUserDataPurchasedSubscriptions, getEducatorAll, today } from '../helper';
import TipParent from '@/components/TipParent';
import { Tip, UserSession } from '@/interfaces';
import { checkSubIsValidSubscriptionObject } from '@/utils/subValidation';


interface EducatorSlugTipsProps {
    user: UserSession | null;
    params: { slug: string }; // Educator
}

const EducatorSlugTips: React.FC<EducatorSlugTipsProps> = async ({ user, params }) => {

    // check if user is logged in
    const isLoggedIn = (user?.userDataId || 0) > 0;

    // get educator first name
    const educatorAllProm = getEducatorAll(params);

    // 1. get all tips including educator and educator slug
    const allTipsProm = getAllTips();
    const userDataPromise = getCurrentUserDataPurchasedSubscriptions(user?.userDataId || 0);
    // fetch data parellel
    const [educatorAll, allTips, currentUserData] = await Promise.all([educatorAllProm, allTipsProm, userDataPromise]);
    const checkedTips = allTips ? allTips : [];
    const { educatorFirstName } = extractEducatorAll(educatorAll)

    // console.log("allTips is: ", allTips);

    // 2. filter only tips of this educator by educator slug

    const filteredTips: Tip[] = checkedTips
    .filter((tip: Tip) => {
        // Check if any educator in the tipEducator array has a slug that matches params.slug
        return tip?.tipmetadata?.tipEducator?.some(educator => educator.slug === params.slug);
      })

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
            {filteredTips.length > 0 && (
                <TipParent heroTitle={`${educatorFirstName}'s`}

                    iseducatorspage={true} tipVideos={filteredTips} isSubscribed={userIsCurrentlySubscribed} userDataId={`${user?.userDataId || 0}`} />
            )}
        </div>
    );
}

export default EducatorSlugTips;