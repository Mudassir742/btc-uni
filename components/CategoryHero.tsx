import React from 'react';
import SH1Text from './text/SH1Text';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './ui/Button';
import { getRequestCookie } from './auth/getAuthCookie';
import { cookies } from 'next/headers';
import { getCurrentUserDataPurchasedSubscriptions } from '@/app/helper';
import { checkSubIsValidSubscriptionObject } from '@/utils/subValidation';
import { cn } from '@/utils/shadcn';

interface CategoryHeroProps {
  heroTitle: string;
  mobileImage: string;
  desktopImage: string;
  externalLink: string;
  button?: boolean;
  // description: string;
  // heroVideo: string;
}


const CategoryHero: React.FC<CategoryHeroProps> = async ({
  // heroVideo,  description,
  mobileImage, desktopImage, heroTitle,

  externalLink,

}) => {

  console.log("desktopImage in CategoryHero is: ", desktopImage);
  const userProm = getRequestCookie(cookies());
  const user = await userProm;
  const userDataId = user?.userDataId || 0;
  const isLoggedIn = userDataId > 0;
  console.log(`is user logged in: ${isLoggedIn}`)

  const userDataPromise = getCurrentUserDataPurchasedSubscriptions(user?.userDataId || 0);
  const currentUserData = await userDataPromise
  const purchasedSubscriptions = currentUserData?.userDataMetadata?.purchasedsubscriptions || [];

  purchasedSubscriptions.sort((a, b) => {
    const dateA = new Date(a.subscriptionMetadata.subscriptionstartson).getTime();
    const dateB = new Date(b.subscriptionMetadata.subscriptionstartson).getTime();
    return dateA - dateB;
  });

  const lastSubscription = purchasedSubscriptions[purchasedSubscriptions.length - 1] || {};
  const userIsCurrentlySubscribed = await checkSubIsValidSubscriptionObject(lastSubscription);

  return (
    <div>
      {(desktopImage !== "" || mobileImage !== "") && (
        <div>

          <Link href={externalLink}>



            <div className={cn([`bg-[#ADA59C] ` ,{
              "pb-6": userIsCurrentlySubscribed
            }])}>


              <div className='md:container md:mx-auto'>

                {/* <Herotext text={heroTitle} /> */}
                {/* {heroTitle !== "" && (
          <SH1Text text={description} />
          )} */}

                {/* Mobile */}
                {mobileImage !== "" && (
                  <div className='md:hidden '>
                    <Image
                      src={mobileImage}
                      alt={heroTitle}
                      width="10000"  // Set width to 100% to take up full width
                      height="10000" // Set height to auto to maintain aspect ratio
                      className="object-cover"
                      style={{ maxHeight: '100%' }}
                    />
                  </div>
                )}


                {/* Desktop */}
                {desktopImage !== "" && (
                  <div className='hidden md:block'>
                    <Image
                      src={desktopImage}
                      alt={heroTitle}
                      width="10000"  // Set width to 100% to take up full width
                      height="10000" // Set height to auto to maintain aspect ratio
                      className="object-cover"
                      style={{ maxHeight: '100%' }}
                    />
                  </div>
                )}

                <div className='flex justify-center '>

                </div>


              </div>
            </div>
            {/* <div className='space-between-categories' /> */}

          </Link>

          {(!isLoggedIn || !userIsCurrentlySubscribed) &&
            <div className='bg-[#ADA59C]'>
              <div className='md:container md:mx-auto'>
                <div className='flex justify-center'>
                  <Link href={'/subscribe'}>
                    <Button className='upgrade-button-click-header'>Subscribe To Unlock</Button>
                  </Link>
                </div>
              </div>
              <div className='space-between-categories' />
            </div>
          }
        </div>
      )}
    </div>
  );
}

export default CategoryHero;





