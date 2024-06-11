"use client"
import { IAccordionData, accordionData } from "@/app/support/helper";
import { searchInAccordion } from "@/utils/search";
import { cn } from "@/utils/shadcn";
import { FC } from "react";
// Components
import { Minus, Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import DOMPurify from "dompurify";

interface MyComponentProps {
  className?: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}

const FAQ2: FC<MyComponentProps> = ({
  className,
  searchParams,
}: MyComponentProps) => {

  const searchVal = searchParams?.search;
  const isSearching = searchVal ? true : false;
  

  let filteredData: IAccordionData[];
  if (!isSearching) {
    filteredData = accordionData.filter(
      (data) => data.category === searchParams?.q
    );
  } else {
    filteredData = searchInAccordion(searchVal! as string, accordionData)
  }

  return (
    <div className={cn(`px-7 py-1.5 border rounded-2xl  border-solid border-lightgreyV2`, className)}>
      {(filteredData.length !== 0)
        ?
        <Accordion type="single" collapsible className="" >
          {filteredData.map((data, i) => (
            <AccordionItem
              key={data.id}
              value={`item-${data.id}`}
              className={cn(["decoration-none underline-none border-b ", className], {
                "border-none": i === filteredData.length - 1,
              })}
            >
              <AccordionTrigger className={cn([`text-left hover:no-underline py-5 `], {
                'border-b-0': i === filteredData.length - 1
              })}>
                <span className="text-16 font-semibold"dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.title)}} />
                <span className="bg-themecolor-500  rounded-full p-1 expend ">
                  <Plus className="w-4 h-4 transition-transform duration-200  text-white shrink-0" />
                </span>
                <span className="bg-themecolor-500 rounded-full p-1 collapsee ">
                  <Minus className="w-4 h-4 transition-transform duration-200  text-white shrink-0" />
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <p className="w-full leading-150  text-themecolor-350 !text-16 whitespace-pre-line" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(data.content1) as string }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        : <p className="p-4">No Data Found!</p>}

    </div>
  );
};

export default FAQ2;

