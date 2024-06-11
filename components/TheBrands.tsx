"use client";
import React from "react";
import Link from "next/link";
import EducatorHeadShot from "./EducatorHeadShot";
import { Page } from "@/interfaces";
import H1Text from "./text/H1Text";
import { AllBrandsType } from "@/app/all-brands/page";

interface TheEducatorsProps {
  brandPage: AllBrandsType[];
}

const TheBrands: React.FC<TheEducatorsProps> = ({ brandPage }) => {
  return (
    <div className="md:container md:mx-auto">
      <div className="container">
        <div className="flex -ml-2 md:ml-2 lg:-ml-7 2xl:-ml-12 mb-2 items-center">
          <H1Text text="Brands"  />
        </div>
      </div>

      <div className="flex flex-wrap grid-rows-3 ">
        {brandPage.map((block, index) => (
          <div key={index}  className="w-1/3 md:p-5">
            <Link
              href={`/brand/${block.slug || ""}`}

            >
              <div className="justify-center pb-4 ">
                <div className="px-2 py-1">
                  <div
                    className="w-full h-full overflow-hidden"
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
                        overflow: "hidden",
                      }}
                    >

                      <EducatorHeadShot
                        imageUrl={
                          block.brandmetadata.logo.sourceUrl ||
                          "https://cms.btcuniversity.com/wp-content/uploads/2023/07/placeholder-profile-sq.jpg"!
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className={`px-0.5 md:p-1`}>
                  <div className="flex text-center justify-center ">
                    <div className="flex pt-0 justify-center text-[12px] md:text-[20px] text-themeColor truncate">
                      <p className={``}>
                        {block.title || ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TheBrands;
