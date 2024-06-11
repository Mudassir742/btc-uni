"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ButtonText from '../text/ButtonText';
import { cn } from '@/utils/shadcn';
import CourseAccessToast from '../CourseAccessToast';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { Download, XCircle } from 'lucide-react';
import CourseTitle from '../text/CourseTitle';
import ParagraphSmall from '../text/ParagraphSmall';
import { Button } from '../ui/Button';

type ActionButtonPDFsProps = {
  text: string;
  textColor?: string;
  borderColor?: string;
  backgroundColor?: string;
  className?: string,
  icon?: React.ReactNode;
  link: string;
  // canDownload: boolean; deprecated jan 11 as we are checking individual downloadable access level
  isPurchasableALaCarte: boolean;
  isPurchasableOnlyALaCarte: boolean;
  downloadImage: string;
  themecolor: string;
  description: string;
  downloadableAccessLevel: string;
  userDownloadableAccessLevel: string;

};

const ActionButtonPDFs = ({
  text,
  downloadImage,
  textColor = 'themeColor',
  borderColor = 'border',
  backgroundColor = 'transparent',
  className,
  icon,
  link,
  // canDownload,
  isPurchasableALaCarte,
  isPurchasableOnlyALaCarte,
  themecolor,
  description,
  downloadableAccessLevel,
  userDownloadableAccessLevel,

}: ActionButtonPDFsProps) => {

  const [showCustomAlert, setShowCustomAlert] = useState(false);
  let imageWidth = 200; // Default for mobile
  let screenWidth = typeof window !== 'undefined' ? window.innerWidth : 0;
  if (screenWidth < 700) {
    imageWidth = 160;
  } else {
    imageWidth = 270;
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      screenWidth = window.innerWidth;
    }

    const handleResize = () => {
      screenWidth = window.innerWidth;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);



  const canDownload =
    (downloadableAccessLevel === userDownloadableAccessLevel) ||
    ((downloadableAccessLevel === "free") && ((userDownloadableAccessLevel === "monthly") || (userDownloadableAccessLevel === "biannualy") || (userDownloadableAccessLevel === "annualy"))) ||
    ((downloadableAccessLevel === "monthly") && ((userDownloadableAccessLevel === "biannualy") || (userDownloadableAccessLevel === "annualy"))) ||
    ((downloadableAccessLevel === "biannualy") && (userDownloadableAccessLevel === "annualy"));



  const initiateDownload = () => {
    if (canDownload && link) {
      // Triggering the file download
      const anchor = document.createElement('a');
      anchor.href = link;
      anchor.download = text; // Setting the file name for download
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }
  };

  const handleButtonClick = () => {
    console.log("downloadableAccessLevel is: ", downloadableAccessLevel);
    console.log("userDownloadableAccessLevel is: ", userDownloadableAccessLevel);
  console.log("Button clicked. Can download:", canDownload);
    if (!canDownload) {
      // setShowCustomAlert(true);
      toast.custom((t) => (
        <div
          className={`${t.visible ? 'animate-enter' : 'animate-leave'
            }   bg-white w-full  border-[1px]  border-border shadow-lg justify-center items-center m-auto  rounded-xl pointer-events-auto   `}
        >
          <div className="flex px-4">
            <button
              onClick={() => toast.dismiss(t.id)}
              className="absolute top-2 right-2 flex  text-themeColor"
          
            >
              <XCircle />
            </button>
          </div>
          <div >
           
            <div >
              <div >
       
                {isPurchasableALaCarte && !isPurchasableOnlyALaCarte && (
                  <div className="p-4">
                    <div className="flex justify-center">
                      <div >

                        <p className="mt-1 text-[22px] text-themeColor bold flex justify-center uppercase">
                          <b>Purchase course to unlock </b>
                        </p>

                      </div>
                    </div>
                  </div>
                )}
                {!isPurchasableALaCarte && downloadableAccessLevel === "annualy" && (
                  <div className="p-4">
                    <div className="flex justify-center">
                      <div className=" justify-center">

                        <p className="mt-1  text-[22px] text-themeColor bold flex justify-center">
                          <b>SUBSCRIBE TO UNLOCK </b>
                        </p>
                        <p className="flex justify-center text-center mt-1 text-[18px] text-themeColor ">
                          ANNUAL ALL-ACCESS PLAN REQUIRED
                        </p>
                        <div className='flex items-center justify-center'>
                          <p className="mt-1 text-[12px] text-themeColor flex justify-center">
                            JUST
                          </p>
                          <p className="mt-1 items-center text-[18px] text-themeColor flex justify-center">
                            &nbsp;<b>$179</b>&nbsp;
                          </p>
                          <p className="mt-1 text-[12px] text-themeColor flex justify-center">
                            ANNUALLY
                          </p>

                        </div>

                      </div>
                    </div>
                  </div>
                )}
                {!isPurchasableALaCarte && downloadableAccessLevel === "biannualy" && (
                  <div className="p-4">
                    <div className="flex justify-center">
                      <div >

                        <p className="mt-1 text-[22px]  text-themeColor bold flex justify-center">
                          <b>SUBSCRIBE TO UNLOCK </b>
                        </p>
                        <p className="mt-1 text-[18px]  text-themeColor flex justify-center uppercase">
                          6-MONTH OR ANNUAL ALL-ACCESS PLAN REQUIRED
                        </p>
                      </div>
                    </div>
                  </div>
                )}
                {!isPurchasableALaCarte && downloadableAccessLevel === "monthly" && (
                  <div className="p-4">
                    <div className="flex justify-center">
                      <div >

                        <p className="mt-1 text-[22px] text-themeColor bold flex justify-center">
                          <b>SUBSCRIBE TO UNLOCK </b>
                        </p>
                        {/* <p className="mt-1 text-[18px] text-themeColor flex justify-center uppercase">
                          Starting at just $10/month
                        </p> */}
                      </div>
                    </div>
                  </div>
                )}

                {downloadableAccessLevel === "free" && (
                  <div className="p-4 flex justify-center">
                    <div className="mt-1 text-[22px] text-themeColor font-bold text-center">
                     CREATE A FREE ACCOUNT TO UNLOCK
                    </div>
                  </div>

                )}


                {isPurchasableOnlyALaCarte && (
                  <div className="p-2">
                    <div className="flex justify-center">
                      <div >

                        <p className="mt-1 text-[22px] text-themeColor bold flex justify-center">
                          <b>PURCHASE COURSE TO UNLOCK </b>
                        </p>

                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>
          <div className='flex justify-center pb-4'>


            {!(downloadableAccessLevel === "free") && isPurchasableALaCarte && !isPurchasableOnlyALaCarte && (
              <div className="flex ">
                <Link href={'/subscribe'}>

                  <Button className='subscribe-button-click-download'>
                    SUBSCRIBE
                  </Button>
                </Link>
              </div>
            )}
            {!(downloadableAccessLevel === "free") && !isPurchasableALaCarte && (
              <div className="flex ">
                <Link href={'/subscribe'}>

                  <Button className='subscribe-button-click-download'>
                    SUBSCRIBE
                  </Button>
                </Link>
              </div>
            )}
            {!(downloadableAccessLevel === "free") && isPurchasableOnlyALaCarte && (
              <div className="flex ">
                <Link href={'/subscribe'}>
              
                  <Button className='subscribe-button-click-download'>
                  SUBSCRIBE
                  </Button>
                </Link>
              
              </div>
            )}

            {downloadableAccessLevel === "free" && (
             
              <div className="flex ">
                <Link href={'/signup?subscription=free'}>

                  <Button className='free-signup-button-click-download'>
                    SIGN UP
                  </Button>
                </Link>
              </div>
            )}


          
          </div>
        </div>
      ));

    } else {
      initiateDownload();
    }
  };
  

  const handleCustomAlertCancel = () => {
    // Handle the Cancel button click (close the custom alert)
    setShowCustomAlert(false);
  };

  const handleCustomAlertOk = () => {
    // Handle the OK button click (redirect to /subscribe page)
    window.location.href = '/subscribe';
  };

  // const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
  //   if (!canDownload || !link || link === "") {
  //     e.preventDefault(); // Prevent default action if not downloadable
  //   } else {
  //     // Logic for manual download (only if necessary)
  //     // This part depends on how you want to handle the download
  //   }
  // };

  const handleDownload = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!canDownload || !link || link === "") {
      event.preventDefault(); // Prevent default action if not downloadable
    } else {
      // You can also implement additional logic here if needed
      if (link) {
        window.open(link, '_blank');
      }
    }
  };




  return (

    <>


      <div id="action-button-pdfs" className={` h-auto bg-white w-fit  border-[1px] border-border bg-${backgroundColor} rounded-xl`}>
        <div className='' style={{ minWidth: '100px', minHeight: '100px', flexShrink: 0 }}>
        <button onClick={handleButtonClick}>
            <div >

              {downloadImage && (
                <div className={`w-${imageWidth} relative pb-[130%] rounded-xl border border-border shadow-lg`}>
                  <Image
                    src={downloadImage}
                    alt="download course resources for btc university"
                    layout="fill"
                    objectFit="cover"
                    className="absolute top-0 left-0 w-full h-full rounded-t-xl"
                  />
                </div>

              )}

              <div className='w-[160px] md:w-[270px] bg-white rounded-b-xl p-2 flex items-center'>
          
                <CourseTitle text={text} className='text-themeColor text-left' />

               
                {/* <ParagraphSmall text={text} className={textColor}  /> */}
                <div className={`flex flex-grow justify-end  items-center pl-1`}>
                  <div className={`bg-themeColor rounded-full p-[4px] flex items-center`}>


                    <Download size='16' color='white' />
                  </div>
                </div>
              </div>


            </div>




          </button>
        </div>
      </div>

    </>
  );
};

export default ActionButtonPDFs;