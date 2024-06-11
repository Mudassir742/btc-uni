import React from "react";

import SH1Text from "./text/SH1Text";
import RecommendedEducatorIconCard from "./RecommendedEducatorIconCard";
import InputTextBold from "./text/InputTextBold";
import Link from "next/link";
import { Educator } from "@/interfaces";
import { ChevronRight } from "lucide-react";

interface RecommendedEducatorProps {
  educators: Educator[];
  heroTitle: string;
}

const RecommendedEducator: React.FC<RecommendedEducatorProps> = ({ heroTitle, educators }) => {
  return (
    <div >
        <div className="bg-themecolor-50 ">
 


        <div className='med-space' />
        <div className='flex slider-container'>
      
            <div className='med-space' />
            
            <SH1Text text={`Our ${heroTitle} Educators`} className="text-themeColor whitespace-nowrap" />
      <div className='flex flex-grow justify-end'>
      <Link href={`/all-educators#${heroTitle}`} className='flex flex-grow justify-end items-center container'> 
      <InputTextBold text='See All'/>
                <ChevronRight />
              </Link>
            </div>
          </div>
          <div className="med-space" />
       

        <div className="space-under-category-titles" />

        <div className="flex overflow-x-scroll custom-scrollbar overflow-y-hidden space-x-4 slider slider-container">
          {educators?.map((educator: Educator, index) => (
            <RecommendedEducatorIconCard key={index} educatorData={educator} />
          ))}
        </div>
        <div className="flex justify-center"></div>
        <div className="med-space" />
      </div>
      <div className="space-between-categories" />
    </div>
  );
};

export default RecommendedEducator;
