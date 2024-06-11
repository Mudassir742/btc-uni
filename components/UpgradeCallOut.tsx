import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CourseSubInfo from './text/CourseSubInfo';
import SH2Text from './text/SH2Text';
import ParagraphText from './text/Paragraph';
import ActionButton from './buttons/ActionButton';
import { Button } from './ui/Button';
import T1Text from './text/T1Text';
import { getCustomerSubs } from '@/features/stripe/subscriptions';
import { UserSession } from '@/interfaces';
import { checkSubIsValid } from '@/utils/subValidation';
import { ChevronRight } from 'lucide-react';

interface UpgradeCallOutProps {
  color: string;
  user: UserSession
}

const UpgradeCallOut: React.FC<UpgradeCallOutProps> = async ({ color, user }) => {


  const userSub = await getCustomerSubs(user?.userData?.databaseId!)

  const validSub = await checkSubIsValid(userSub)

  if (validSub) return null

  return (
    <div className='px-[6%] md:px-0'>
      <Link href={'/profile?q=update-subscription'}>


        <div className={`bg-themecolor rounded-xl p-4 flex items-center`}>
          <div className='px-2'>
            <SH2Text text='Subscribe to unlock more!' />
            <div className='text-sm'>
              Get access to the industry’s best educators all in one place. 
            </div>
          </div>

          <div className="bg-white rounded-full w-6 h-6 flex justify-center items-center ">
            <div className='flex flex-grow justify-end'>
              <ChevronRight color={color} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default UpgradeCallOut;




