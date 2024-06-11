"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import SH1Text from "./text/SH1Text";
import EducatorHeadShot from "./EducatorHeadShot";
import { transformDataForWpUrl, transformWpUrl } from "@/utils/url";
import { Page } from "@/interfaces";
import InputTextBold from "./text/InputTextBold";
import { ChevronUp, ChevronDown } from 'lucide-react';
import BackButton from "./buttons/BackButton";
import H1Text from "./text/H1Text";

interface TheEducatorsProps {
  educatorPage: Page;
}

const TheEducators: React.FC<TheEducatorsProps> = ({ educatorPage }) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleCategoryExpansion = (categoryName: string) => {
    setExpandedCategories((prevCategories) => {
      if (prevCategories.includes(categoryName)) {
        return prevCategories.filter((category) => category !== categoryName);
      } else {
        return [...prevCategories, categoryName];
      }
    });
  };

  return (
    <div className="md:container md:mx-auto">
      <div className="container">


        <div className="flex items-center">
          <H1Text text="Meet Our Educators" />
        </div>

      </div>

      {/* mihai: add in banner here, from all-educators wordpress page  */}




      {educatorPage?.educatorsPage?.tagBlockNew?.map((block, index) => (
        <div key={index} id={block.educatorCategory.name === "Mens" ? "Men's" : block.educatorCategory.name}>


          <div>
            <div className="small-space" />


            <div className="flex">

              <div className="flex items-center whitespace-nowrap container ">

                <SH1Text
                  text={
                    block.educatorCategory?.name === "Hair-Color" ? "Hair Color" : (block.educatorCategory?.name === "Mens" ? "Men's" : block.educatorCategory?.name)
                  }
                  className="container md:pl-[0%] text-themeColor"
                />
              </div>
              {/* show more */}
              <div className="flex flex-grow justify-end mr-[6px]">
                {block.educatorGroup.length > 6 && (
                  <button
                    onClick={() =>
                      toggleCategoryExpansion(block.educatorCategory.name)
                    }

                  >
                    {expandedCategories.includes(
                      block.educatorCategory?.name
                    ) ? (
                      <div className="flex items-center">
                        <InputTextBold text="See Less" />{" "}
                        <ChevronUp />
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <InputTextBold text="See More" />{" "}
                        <ChevronDown />
                      </div>
                    )}
                  </button>
                )}
              </div>
            </div>

            <div className="space-under-category-titles" />
            <div className="flex flex-wrap justify-center grid-rows-3 ">
              {block.educatorGroup
                ?.slice(
                  0,
                  expandedCategories.includes(block.educatorCategory?.name)
                    ? undefined
                    : 6
                )
                .map((educatorGroup, groupIndex) => (
                  <div key={groupIndex} className="w-1/3 md:p-5">
                    <Link
                      href={`/educator/${educatorGroup?.educator?.slug || ""}`}

                    >
                      <div className="justify-center pb-4 ">
                        <div className="px-2 py-1">
                          <div
                            className="w-full h-full rounded-full overflow-hidden"
                            style={{
                              aspectRatio: "1 / 1",
                              position: "relative",
                            }}
                          >
                            <div
                              style={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                overflow: "hidden",
                              }}
                            >
                              {/* <Image
          src={imageUrl}
          alt="Educator Headshot"
          layout="fill"
          objectFit="cover"
        /> */}
                              <EducatorHeadShot
                                imageUrl={
                                  educatorGroup?.educator?.educatorMetaData
                                    ?.educatorpicture?.mediaItemUrl ||
                                  // transformWpUrl(
                                  //   "https://cms.btcuniversity.com/wp-content/uploads/2023/07/placeholder-profile-sq.jpg"
                                  // )!

                                  "https://cms.btcuniversity.com/wp-content/uploads/2023/07/placeholder-profile-sq.jpg"!
                                }
                              />
                            </div>
                          </div>
                          {/* <div className="rounded-full overflow-hidden">
                                                <EducatorHeadShot
                                                    imageUrl={
                                                        educatorGroup?.educator?.educatorMetaData?.educatorpicture?.mediaItemUrl ||
                                                        transformWpUrl("https://cms.btcuniversity.com/wp-content/uploads/2023/07/placeholder-profile-sq.jpg")!
                                                    }
                                                />
                                            </div> */}
                        </div>

                        <div className={`px-0.5 md:p-1`}>
                          <div className="flex pt-0 justify-center text-[12px] md:text-[20px]">
                            <p className={`truncate text-secondarythemecolor`}>
                              {educatorGroup?.educator?.educatorMetaData
                                ?.instahandle || ""}
                            </p>
                          </div>

                          <div className="flex text-center justify-center ">
                            <div className="flex pt-0 justify-center text-[12px] md:text-[20px] text-themeColor truncate">
                              <p className={``}>
                                {educatorGroup?.educator?.educatorMetaData
                                  ?.firstname || ""}
                              </p>
                              <p className={` `}>&nbsp;</p>

                              <p className={`truncate `}>
                                {educatorGroup?.educator?.educatorMetaData
                                  ?.lastname || ""}
                              </p>
                            </div>

                            {/* <T1Text text={educatorGroup?.educator?.educatorMetaData?.firstname || ""} />
                                                    <T1Text text='&nbsp;' />

                                                    <T1Text text={educatorGroup?.educator?.educatorMetaData?.lastname || ""} /> */}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TheEducators;
