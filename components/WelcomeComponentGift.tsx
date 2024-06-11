"use client"
import React, { useState, CSSProperties, useEffect } from 'react';
import CoursePageTitles from './text/CoursePageTitles';
import { Button } from './ui/Button';
import BackButton from './buttons/BackButton';
import SH1Text from './text/SH1Text';
import Link from 'next/link';
import ParagraphText from './text/Paragraph';
import InputTextBold from './text/InputTextBold';
import H3Text from './text/H3Text';
import H4Text from './text/H4Text';
import H5Text from './text/H5Text';
import CourseTitle from './text/CourseTitle';
import { useSearchParams } from 'next/navigation';
import { PurchaseTypes } from '@/app/complete/page';


interface WelcomeComponentGiftProps {
  email: string;
  customerName: string;
  type: PurchaseTypes;
  userDataId: string;
}

// may 31 - mihai added useEffect for both gift subs and bulk subscriptions -- marked as gifted subscription
// event would still be named purchase, asad will differentiate based on type

const WelcomeComponentGift: React.FC<WelcomeComponentGiftProps> = ({ 
    customerName, 
    email,
    type,
    userDataId
  }) => {
  const [expanded, setExpanded] = useState(false); // Start with content collapsed

  const searchParams = useSearchParams();
  
  const stripeSubscriptionId = searchParams?.get("stripeSubscriptionId");
  const finalValue = searchParams?.get("subscriptionFinalValue");
  const qty = searchParams?.get("qty");

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const getMinuteTimestamp = () => {
      const now = new Date();
      now.setSeconds(0, 0); // Ignore seconds and milliseconds
      return now.getTime();
    };

    const currentTimestamp = getMinuteTimestamp();
    const storedTimestamps = JSON.parse(window.localStorage.getItem("timestamps") || "[]");

    if (storedTimestamps.includes(currentTimestamp)) {
        console.log('Current timestamp already exists in the array. useEffect will not run.');
        return;
    }

    // if (stripeSubscriptionId === null) {
    //     console.log('StripeSubscriptionId is null'); // Debugging
    // } else {
    //     console.log('StripeSubscriptionId is not null'); // Debugging
    //         (window as any).dataLayer.push({
    //             event: "purchase",
    //             itemName: "subscription",
    //             userDataId: userDataId,
    //             purchaseType: type,
    //             quantity: qty,
    //             stripeProductId: stripeSubscriptionId,
    //             finalValue: Number(finalValue),
    //             currency: "USD",
    //         });
    // }
    (window as any).dataLayer.push({
      event: "purchase",
      itemName: "subscription",
      userDataId: userDataId,
      purchaseType: type,
      quantity: qty,
      stripeProductId: stripeSubscriptionId,
      finalValue: Number(finalValue),
      currency: "USD",
  });

    // Add the current timestamp to the array and store it back in localStorage
    storedTimestamps.push(currentTimestamp);
    window.localStorage.setItem("timestamps", JSON.stringify(storedTimestamps));
}, [stripeSubscriptionId, finalValue, type, qty, userDataId]);


  return (
    <div >


      <div className='container'>
        <H3Text
          text={`Thank you for spreading the gift of growth with BTC University Subscription, ${customerName}!`}
          className="!text-themeColor"
        />
      </div>
      
      <div className="space-under-category-titles" /> 

      <div className="relative">
        <div className="!w-full relative pb-[56.25%] h-0 overflow-hidden md:mt-3 xl:mt-0">
          <iframe
            src={`https://player.vimeo.com/video/843945473?autoplay=1`}
            className="!w-full !h-full !absolute !top-0 !left-0 rounded-xl"
          />
        </div>


        <div className='container md:px-0'>



          {/* <div className="max-w-[700px] mx-auto md:justify-center"> */}
          <div>

            <div className="space-under-category-titles" />

          </div>

          <div className=''>

            {/* <div className="text-center">
                
                <p className="text-16 mt-3 text-center">{`Your ultimate destination for unlocking the secrets to outstanding hair cutting skills! We're delighted to have you join our community, and we're excited to help you embark on a journey of creativity, precision, and style.`}</p>
            </div> */}
            <H4Text text={`Your purchase is complete, and you'll soon receive an email to ${email} containing the gift code(s) to share with the lucky recipient(s).`} />





          </div>

          <div>
            <div className="med-space" />
            <div>
              <H5Text text={`Didn't receive an email?`} />



            </div>
            <ParagraphText text=' If email above is correct, check spam!' />

          
            <div className="space-under-category-titles" />

            <ParagraphText text='If the wrong email address is shown above, reach out to our customer service team and we will fix it for you!' />


            <div className='text-sm py-1'>


            </div>
          </div>

          <div className="text-themeColor text-sm p-3">
            <div className="font-bold">
              Contact Us
            </div>

         
            <br>
            </br>
            Email: <Link href="mailto:membership@btcuniversity.com">membership@btcuniversity.com</Link>
            <br>
            </br>
            Phone: (800) 760-3010
          </div>


{/* 
          <H5Text text={`Explore Further:`} /> */}



          {/* <div className='flex'>


            <Link href="/support" className='underline'>
              <ParagraphText text={` Support Page`} className='text-secondarythemecolor' />

            </Link>
            <ParagraphText text={`&nbsp;- Answers to common questions about BTC University.`} />

          </div> */}

          

          <div className='py-4'>
            <ParagraphText text=' Thank you for choosing BTC University!' />
      </div>
   
         




        </div>
        <div className="space-under-category-titles" />
        {/* </div> */}
      </div>


      <div className='space-between-categories' />
    </div>

  );
};

export default WelcomeComponentGift;
