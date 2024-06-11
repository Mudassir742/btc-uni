"use client";
import React from "react";
import Image from "next/image";
import H3Text from "@/components/text/H3Text";
import ParagraphText from "@/components/text/Paragraph";
import { Button } from "@/components/ui/Button";
import { Download, XCircle } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import H4Text from "./text/H4Text";
import he from "he";
import { usePathname } from "next/navigation";
import { replaceDomain } from "@/utils/url";
import SubscribePopup from "./SubscribePopup";

interface DownloadableHeroInnerProps {
  isPurchasableALaCarte: boolean;
  isPurchasableOnlyALaCarte: boolean;
  isLoggedIn: boolean;
  downloadableAccessLevel: string;
  userDownloadableAccessLevel: string;
  downloadableFile: string;
  title: string;
  content: string;
  downloadableHorizontalPicture: string;
  downloadableVerticalPicture: string;
  userId: string;
  userDataId: string;
  userState: string;
  userCity: string;
  userCountry: string;
  userZip: string;
  downloadableId: string,
  youWillLearn: string;
}

interface Window {
  dataLayer: any[];
}

const DownloadableHeroInner: React.FC<DownloadableHeroInnerProps> = ({
  isPurchasableALaCarte,
  isPurchasableOnlyALaCarte,
  downloadableAccessLevel,
  userDownloadableAccessLevel,
  downloadableFile,
  title,
  content,
  downloadableHorizontalPicture,
  downloadableVerticalPicture,
  userId,
  userDataId,
  userState,
  userCity,
  userCountry,
  userZip,
  downloadableId,
  youWillLearn,
}) => {
  const path = usePathname();
  const slug = path?.split("/")[2]
  const canDownload =
    downloadableAccessLevel === userDownloadableAccessLevel ||
    (downloadableAccessLevel === "free" &&
      (userDownloadableAccessLevel === "monthly" ||
        userDownloadableAccessLevel === "biannualy" ||
        userDownloadableAccessLevel === "annualy")) ||
    (downloadableAccessLevel === "monthly" &&
      (userDownloadableAccessLevel === "biannualy" ||
        userDownloadableAccessLevel === "annualy")) ||
    (downloadableAccessLevel === "biannualy" &&
      userDownloadableAccessLevel === "annualy");

  const initiateDownload = () => {
    if (canDownload && downloadableFile) {
      // Triggering the file download
      const anchor = document.createElement("a");
      anchor.href = replaceDomain(downloadableFile, "https://cms.btcuniversity.com/wp-content", `${process.env.NEXT_PUBLIC_SITE_URL}/pdf`);
      anchor.download = title; // Setting the file name for download
      anchor.target = "_blank"; // Open in a new page
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    }
  };

  const now = new Date().toISOString();
  // if (!youWillLearn.trim()) {
  //   return null;
  // }



  // const toggleExpansion = () => {
  //   setExpanded(!expanded);
  // };

  const contentWithLineBreaks = he
    .decode(youWillLearn)
    .replace(/<\/?p>/g, '') // Remove <p> tags
    .replace(/<br\s*\/?>/g, '\n') // Replace <br> and <br /> with \n for line breaks
    .split('\n') // Split the content into paragraphs

  const paragraphs = contentWithLineBreaks.filter((paragraph) => paragraph.trim() !== ''); // Remove empty paragraphs

  // Add bullets to each paragraph

  const formattedContent = paragraphs.map((paragraph, index) => (


    <p
      key={index}
      className="flex "

    >
      <span className="mr-1 text-xl md:text-xxl items-center mt-1 ">✓</span>
      <ParagraphText text={paragraph.trim()} className='py-2' />
    </p>
  ));



  const handleButtonClick = () => {
    // console.log("downloadableAccessLevel is: ", downloadableAccessLevel);
    // console.log(
    //   "userDownloadableAccessLevel is: ",
    //   userDownloadableAccessLevel
    // );
    // console.log("Button clicked. Can download:", canDownload);

    // Pushing data to the dataLayer using type assertion // temporary solution
    (window as any).dataLayer.push({
      event: 'downloadableContentInteraction',

      userId: userId,
      userDataId: userDataId,
      userState: userState,
      userCity: userCity,
      userCountry: userCountry,
      userZip: userZip,
      userDownloadableAccessLevel: userDownloadableAccessLevel,

      downloadableName: title,
      downloadableId: downloadableId,
      downloadableAccessLevel: downloadableAccessLevel,

      couldBeDownloaded: canDownload,
      downloadedAt: now
    });



    if (!canDownload) {
      // setShowCustomAlert(true);
      // toast.custom((t) => (
      //   <div
      //     className={`${t.visible ? "animate-enter" : "animate-leave"
      //       }   bg-white w-full  border-[1px]  border-border shadow-lg justify-center items-center m-auto  rounded-xl pointer-events-auto   `}
      //   >
      //     <div className="flex px-4">
      //       <button
      //         onClick={() => toast.dismiss(t.id)}
      //         className="absolute top-2 right-2 flex  text-themeColor"
      //       >
      //         <XCircle />
      //       </button>
      //     </div>
      //     <div>
      //       <div>
      //         <div>
      //           {isPurchasableALaCarte && !isPurchasableOnlyALaCarte && (
      //             <div className="p-4">
      //               <div className="flex justify-center">
      //                 <div>
      //                   <p className="mt-1 text-[22px] text-themeColor bold flex justify-center uppercase">
      //                     <b>Purchase course to unlock </b>
      //                   </p>
      //                 </div>
      //               </div>
      //             </div>
      //           )}
      //           {!isPurchasableALaCarte &&
      //             downloadableAccessLevel === "annualy" && (
      //               <div className="p-4">
      //                 <div className="flex justify-center">
      //                   <div className=" justify-center">
      //                     <p className="mt-1  text-[22px] text-themeColor bold flex justify-center">
      //                       <b>SUBSCRIBE TO UNLOCK </b>
      //                     </p>
      //                     <p className="flex justify-center text-center mt-1 text-[18px] text-themeColor ">
      //                       AVAILABLE WITH ANNUAL SUBSCRIPTION
      //                     </p>
      //                     <div className="flex items-center justify-center">
      //                       <p className="mt-1 text-[12px] text-themeColor flex justify-center">
      //                         JUST
      //                       </p>
      //                       <p className="mt-1 items-center text-[18px] text-themeColor flex justify-center">
      //                         &nbsp;<b>$179</b>&nbsp;
      //                       </p>
      //                       <p className="mt-1 text-[12px] text-themeColor flex justify-center">
      //                         ANNUALLY
      //                       </p>
      //                     </div>
      //                   </div>
      //                 </div>
      //               </div>
      //             )}
      //           {!isPurchasableALaCarte &&
      //             downloadableAccessLevel === "biannualy" && (
      //               <div className="p-4">
      //                 <div className="flex justify-center">
      //                   <div>
      //                     <p className="mt-1 text-[22px]  text-themeColor bold flex justify-center">
      //                       <b>SUBSCRIBE TO UNLOCK </b>
      //                     </p>
      //                     <p className="mt-1 text-[18px]  text-themeColor flex justify-center uppercase">
      //                       AVAILABLE WITH 6-MONTH & ANNUAL SUBSCRIPTIONs ONLY
      //                     </p>
      //                   </div>
      //                 </div>
      //               </div>
      //             )}
      //           {!isPurchasableALaCarte &&
      //             downloadableAccessLevel === "monthly" && (
      //               <div className="p-4">
      //                 <div className="flex justify-center">
      //                   <div>
      //                     <p className="mt-1 text-[22px] text-themeColor bold flex justify-center">
      //                       <b>SUBSCRIBE TO UNLOCK </b>
      //                     </p>
      //                     {/* <p className="mt-1 text-[18px] text-themeColor flex justify-center uppercase">
      //                     Starting at just $10/month
      //                   </p> */}
      //                   </div>
      //                 </div>
      //               </div>
      //             )}

      //           {downloadableAccessLevel === "free" && (
      //             <div className="p-4 flex justify-center">
      //               <div className="mt-1 text-[22px] text-themeColor font-bold text-center">
      //                 CREATE A FREE ACCOUNT TO UNLOCK
      //               </div>
      //             </div>
      //           )}

      //           {isPurchasableOnlyALaCarte && (
      //             <div className="p-2">
      //               <div className="flex justify-center">
      //                 <div>
      //                   <p className="mt-1 text-[22px] text-themeColor bold flex justify-center">
      //                     <b>PURCHASE COURSE TO UNLOCK </b>
      //                   </p>
      //                 </div>
      //               </div>
      //             </div>
      //           )}
      //         </div>
      //       </div>
      //     </div>
      //     <div className="flex justify-center pb-4">
      //       {!(downloadableAccessLevel === "free") &&
      //         isPurchasableALaCarte &&
      //         !isPurchasableOnlyALaCarte && (
      //           <div className="flex ">
      //             <Link href={"/subscribe"}>
      //               <Button className="subscribe-button-click-download">
      //                 SUBSCRIBE
      //               </Button>
      //             </Link>
      //           </div>
      //         )}
      //       {!(downloadableAccessLevel === "free") &&
      //         !isPurchasableALaCarte && (
      //           <div className="flex ">
      //             <Link href={"/subscribe"}>
      //               <Button className="subscribe-button-click-download">
      //                 SUBSCRIBE
      //               </Button>
      //             </Link>
      //           </div>
      //         )}
      //       {!(downloadableAccessLevel === "free") &&
      //         isPurchasableOnlyALaCarte && (
      //           <div className="flex ">
      //             <Link href={"/subscribe"}>
      //               <Button className="subscribe-button-click-download">
      //                 SUBSCRIBE
      //               </Button>
      //             </Link>
      //           </div>
      //         )}

      //       {downloadableAccessLevel === "free" && (
      //         <div className="flex ">
      //           <Link href={"/free"}>
      //             <Button className="free-signup-button-click-download">
      //               SIGN UP
      //             </Button>
      //           </Link>
      //         </div>
      //       )}
      //     </div>
      //   </div>
      // ));
    } else {
      initiateDownload();
    }
  };

  return (
    <div>
      <div className="">
        {downloadableHorizontalPicture === "" && (
          <Image
            alt="subscribe"
            src={downloadableVerticalPicture}
            width={1700}
            height={1000}
            className="md:mx-auto rounded-xl"
          />
        )}
        {downloadableHorizontalPicture !== "" && (
          <Image
            alt="subscribe"
            src={downloadableHorizontalPicture}
            width={17000}
            height={1000}
            className="md:mx-auto rounded-xl"
          />
        )}
        <div className="med-space" />
      </div>

      <div className="md:flex items-center">
        <div className="container md:px-0 flex items-center">
          <div className="items-center">
            <H3Text text={title} />
          </div>
          <div className="med-space" />
          {canDownload ? (

            <div className="flex flex-grow justify-end items-center">
              <div className="">
                <Button id="downloadable-page-download-button " onClick={handleButtonClick}>
                  <Download /> Download
                </Button>
              </div>
            </div>
          ) : (
            <div>
            </div>
          )}








        </div>

        {canDownload ? (

          <div className="flex flex-grow justify-end items-center">

          </div>
        ) : (
          <div className="container md:px-0  items-center">
            <div className="pt-4 md:pt-0 mb-[-6px] md:mb-0">


              {/* available for a la carte   */}
              {isPurchasableALaCarte && !isPurchasableOnlyALaCarte && (
                <div className="flex flex-grow justify-end items-center">
                  <div className="">
                    {/* <Link href={'/subscribe'}> */}
                    <Button size='downloadbutton' id="downloadable-page-download-button w-full ">
                      <div className="px-3 flex items-center">
                        <div className="pr-2">
                          <Download />
                        </div>
                        Purchase course to download

                      </div>
                    </Button>

                    {/* </Link> */}

                  </div>



                </div>
              )}





              {/* available with the annual plan only */}
              {!isPurchasableALaCarte &&
                downloadableAccessLevel === "annualy" && (
                  <div className="flex 
           
                  items-center">
                    <div className="">
                      <SubscribePopup slug={slug} V2={true}>
                        <Button size='downloadbutton' id="downloadable-page-download-button w-full ">
                          <div className="px-3 flex items-center">
                            <div className="pr-2">
                              <Download />
                            </div>
                            Annual Subscription Required
                          </div>
                        </Button>
                      </SubscribePopup>

                      {/* <Link href={{
                        href: "/subscribe",
                        pathname: "/subscribe",
                        query: {
                          "courseSlug": slug,
                          redirectType: "resources"
                        }
                      }}>

                      </Link> */}
                    </div>
                  </div>

                )}






              {/* available with the 6 month & annual plan only */}

              {!isPurchasableALaCarte &&
                downloadableAccessLevel === "biannualy" && (
                  <div className="flex 
           
                  items-center">
                    <div className="">
                      <SubscribePopup slug={slug} V2={true}>
                        <Button size='downloadbutton' id="downloadable-page-download-button w-full ">
                          <div className="px-3 flex items-center">
                            <div className="pr-2">
                              <Download />
                            </div>
                            Annual or 6-Month Subscription Required
                          </div>
                        </Button>
                      </SubscribePopup>

                      {/* <Link href={'/subscribe'}>
                        <Button size='downloadbutton' id="downloadable-page-download-button w-full ">
                          <div className="px-3 flex items-center">
                            <div className="pr-2">
                              <Download />
                            </div>
                            Annual or 6-Month Subscription Required

                          </div>
                        </Button>
                      </Link> */}
                    </div>



                  </div>
                )}







              {/* available with monthly, 6 month & annual */}
              {!isPurchasableALaCarte &&
                downloadableAccessLevel === "monthly" && (
                  <div className="flex 
                 
                  items-center">
                    <div className="">
                      <SubscribePopup slug={slug} V2={true}>
                        <Button size='downloadbutton' id="downloadable-page-download-button w-full ">
                          <div className="px-3 flex items-center">
                            <div className="pr-2">
                              <Download />
                            </div>
                            Subscription Required

                          </div>
                        </Button>
                      </SubscribePopup>

                      {/* <Link href={'/subscribe'}>
                        <Button size='downloadbutton' id="downloadable-page-download-button w-full ">
                          <div className="px-3 flex items-center">
                            <div className="pr-2">
                              <Download />
                            </div>
                            Subscription Required

                          </div>
                        </Button>


                      </Link> */}
                    </div>



                  </div>
                )}







              {/* available with free account and up */}
              {downloadableAccessLevel === "free" && (
                <div className="flex flex-grow justify-start items-center">
                  <div className="">
                    <Link href={{
                      href: "/signup",
                      pathname: "/signup",
                      query: {
                        "courseSlug": slug,
                        "subscription": "free",
                        redirectType: "resources"
                      }
                    }}>
                      <Button id="downloadable-page-download-button " >
                        <Download /> FREE Download
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              {!(downloadableAccessLevel === "free") &&
                isPurchasableALaCarte &&
                !isPurchasableOnlyALaCarte && (
                  <div className="flex flex-grow justify-end items-center">
                    <div className="">
                      <Link
                        href={{
                          href: "/signup",
                          pathname: "/signup",
                          query: {
                            "courseSlug": slug,
                            "subscription": "free",
                            redirectType: "resources"
                          }
                        }}
                      >
                        <Button id="downloadable-page-download-button " >
                          <Download /> FREE Download
                        </Button>
                      </Link>
                    </div>
                  </div>
                )}



            </div>
          </div>
        )}
      </div>





      <div className="med-space" />
      <div className="container md:px-0 download-content ">
        <div>{content !== "" && <ParagraphText text={content} />}</div>

        <div>{youWillLearn !== "" &&


          <div>


            <H4Text text='You Will Learn' />

            <div className="space-under-category-titles" />
            {formattedContent}
            {/* <ParagraphText text={formattedYouWillLearn} />
          <ParagraphText text={youwilllearn} /> */}
          </div>}
        </div>
      </div>


    </div>
  );
};

export default DownloadableHeroInner;

