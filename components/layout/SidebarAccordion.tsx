import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";
import { sideBarItems, sidebarCourses } from "./helper";
import EducatorsName from "../text/EducatorsName";
import ButtonText from "../text/ButtonText";
import ParagraphSmall from "../text/ParagraphSmall";
import H4Text from "../text/H4Text";
import NavText from "../text/NavText";

interface SidebarAccordionProps {
  onClick: () => void;
}

export const SidebarAccordion: React.FC<SidebarAccordionProps> = ({
  onClick,
}) => {
  return (
    <div className="space-y-4 md:space-y-4">
      {/* <Accordion type="single" collapsible className="w-full">
        {sideBarItems.map((item) => (
          <AccordionItem className="" value={item.slug} key={item.slug}>
            {item.slug !== "course" ? (
              // <AccordionTrigger asChild>
              //     <Link href={`/${item.slug}`}>
              //         {item.name}
              //         <ChevronDown className="w-6 h-6 transition-transform duration-200 -rotate-90  text-themeColor shrink-0" />
              //     </Link>
              // </AccordionTrigger>
              <div></div>
            ) : (
                <AccordionTrigger>
                
                  <NavigationText text="Explore Courses" /> 
                  <ChevronDown className="w-6 h-6 transition-transform duration-200 -rotate-90 expend text-themeColor shrink-0" />
                  <ChevronDown className="w-6 h-6 transition-transform duration-200   collapsee text-themeColor shrink-0" />
              </AccordionTrigger>
            )}
           
              
            {sidebarCourses.map((course, i) => (
              <Link key={i} href={`/${course.slug}`} onClick={onClick}>
                <AccordionContent className="pl-4" key={course.slug}>
                  <SubNavigationText text={course.name} />
                    
                </AccordionContent>
              </Link>
            ))}
          </AccordionItem>
        ))}
      </Accordion> */}
      {/*   */}

      <div className="space-y-4">

        <Link
          href={`/tips`}
          className="w-full  flex flex-1 text-left items-center justify-between py-0 transition-all hover:underline"
          onClick={onClick}
        >
          <ButtonText
            text="New! Quick Tips"
            className="text-themecolor-500"
          />

          <ChevronDown className="w-6 h-6 transition-transform duration-200 -rotate-90  text-themeColor shrink-0" />
        </Link>

        <Link
          href={`/downloadables`}
          className="w-full  flex flex-1 text-left items-center justify-between py-0 transition-all hover:underline"
          onClick={onClick}
        >
          <ButtonText
            text="New! Downloadable Resources"
            className="text-themecolor-500"
          />

          <ChevronDown className="w-6 h-6 transition-transform duration-200 -rotate-90   text-themeColor shrink-0" />
        </Link>
      </div>

      <div>
        <div className="bg-themecolor-50 rounded-xl text-themeColor flex">
          <H4Text text="Courses" className="p-4" />
          <div className="flex flex-grow justify-end items-center">
            <div className="pr-1 items-center">
              <Link
                href={`/all-educators`}
                className="w-fit h-fit  bg-white rounded-xl flex flex-1 text-left items-center justify-between py-0 transition-all "
                onClick={onClick}
              >
                <div className="items-center">
                  <ParagraphSmall
                    text="All Educators"
                    className="text-themecolor-500 px-2 pb-2 items-center hover:underline"
                  />
                </div>

              </Link>



            </div>
            <div className="pl-1 pr-3">
              <Link
                href={`/languages`}
                className="w-fit h-fit bg-white rounded-xl  flex flex-1 text-left items-center justify-between py-0 transition-all "
                onClick={onClick}
              >
                <ParagraphSmall
                  text="Languages"
                  className="text-themecolor-500 px-2  pb-2 items-center hover:underline"
                />
              </Link>
            </div>
          </div>
        </div>


        <div className="pl-3 pt-3 space-y-4">



          <Link
            href={`/business`}
            className="w-full  flex flex-1 text-left items-center justify-between py-0 transition-all hover:underline"
            onClick={onClick}
          >
            <NavText text="Business" className="text-themecolor-500" />

            <ChevronDown className="w-6 h-6 transition-transform duration-200 -rotate-90  text-themeColor shrink-0" />
          </Link>

          <Link
            href={`/haircolor`}
            className="w-full  flex flex-1 text-left items-center justify-between py-0 transition-all hover:underline"
            onClick={onClick}
          >
            <NavText text="Hair Color" className="text-themecolor-500" />

            <ChevronDown className="w-6 h-6 transition-transform duration-200 -rotate-90  text-themeColor shrink-0" />
          </Link>

          <Link
            href={`/haircutting`}
            className="w-full  flex flex-1 text-left items-center justify-between py-0 transition-all hover:underline"
            onClick={onClick}
          >
            <NavText text="Haircutting" className="text-themecolor-500" />

            <ChevronDown className="w-6 h-6 transition-transform duration-200 -rotate-90  text-themeColor shrink-0" />
          </Link>

          <Link
            href={`/styling`}
            className="w-full  flex flex-1 text-left items-center justify-between py-0 transition-all hover:underline"
            onClick={onClick}
          >
            <NavText text="Styling" className="text-themecolor-500" />

            <ChevronDown className="w-6 h-6 transition-transform duration-200 -rotate-90  text-themeColor shrink-0" />
          </Link>

          <Link
            href={`/texture`}
            className="w-full  flex flex-1 text-left items-center justify-between py-0 transition-all hover:underline"
            onClick={onClick}
          >
            <NavText text="Texture" className="text-themecolor-500" />

            <ChevronDown className="w-6 h-6 transition-transform duration-200 -rotate-90  text-themeColor shrink-0" />
          </Link>

          <Link
            href={`/mens`}
            className="w-full  flex flex-1 text-left items-center justify-between py-0 transition-all hover:underline"
            onClick={onClick}
          >
            <NavText text="Men's" className="text-themecolor-500" />

            <ChevronDown className="w-6 h-6 transition-transform duration-200 -rotate-90  text-themeColor shrink-0" />
          </Link>

          <Link
            href={`/hairextensions`}
            className="w-full  flex flex-1 text-left items-center justify-between py-0 transition-all hover:underline"
            onClick={onClick}
          >
            <NavText
              text="Hair Extensions"
              className="text-themecolor-500"
            />

            <ChevronDown className="w-6 h-6 transition-transform duration-200 -rotate-90  text-themeColor shrink-0" />
          </Link>
        </div>
      </div>


      <div>
        <div className="bg-themecolor-50 rounded-xl text-themeColor">
          <H4Text text="Collections" className="p-4" />
        </div>

        <div className="pl-3 pt-3 space-y-4">

          <Link
            href={`/masterclasses#Social-Media-section`}
            className="w-full flex flex-1 text-left items-center justify-between py-0 transition-all hover:underline"
            onClick={onClick}
          >
            <NavText text="Social Media" className="text-themecolor-500" />
            <ChevronDown className="w-6 h-6 transition-transform duration-200 -rotate-90 text-themeColor shrink-0" />
          </Link>




          <Link
            href={`/masterclasses#schorem-section`}
            className="w-full flex flex-1 text-left items-center justify-between py-0 transition-all hover:underline"
            onClick={onClick}
          >
            <NavText text="Schorem" className="text-themecolor-500" />
            <ChevronDown className="w-6 h-6 transition-transform duration-200 -rotate-90 text-themeColor shrink-0" />
          </Link>


          <Link
            href={`/masterclasses#Collections-section`}
            className="w-full flex flex-1 text-left items-center justify-between py-0 transition-all hover:underline"
            onClick={onClick}
          >
            <NavText text="Cutting Collections" className="text-themecolor-500" />
            <ChevronDown className="w-6 h-6 transition-transform duration-200 -rotate-90 text-themeColor shrink-0" />
          </Link>

          <Link
            href={`/masterclasses#ToniAndGuy-section`}
            className="w-full flex flex-1 text-left items-center justify-between py-0 transition-all hover:underline"
            onClick={onClick}
          >
            <NavText text="TONI&GUY" className="text-themecolor-500" />
            <ChevronDown className="w-6 h-6 transition-transform duration-200 -rotate-90 text-themeColor shrink-0" />
          </Link>

        </div>

      </div>

      <div>
        <div className="bg-themecolor-50 rounded-xl text-themeColor">
          <H4Text text="BTC Events" className="p-4" />
        </div>
        <div className="pl-3 pt-3 space-y-4">
          <Link
            href={`/events#Show-section`}
            className="w-full  flex flex-1 text-left items-center justify-between py-0 transition-all hover:underline"
            onClick={onClick}
          >
            <NavText text="The BTC Show" className="text-themecolor-500" />

            <ChevronDown className="w-6 h-6 transition-transform duration-200 -rotate-90   text-themeColor shrink-0" />
          </Link>

          <Link
            href={`/events#Oneshot-section`}
            className="w-full  flex flex-1 text-left items-center justify-between py-0 transition-all hover:underline"
            onClick={onClick}
          >
            <NavText text="#ONESHOT Hair Awards" className="text-themecolor-500" />

            <ChevronDown className="w-6 h-6 transition-transform duration-200 -rotate-90   text-themeColor shrink-0" />
          </Link>
          <Link
            href={`/events#On-Tour-section`}
            className="w-full  flex flex-1 text-left items-center justify-between py-0 transition-all hover:underline"
            onClick={onClick}
          >
            <NavText text="BTC “On Tour“" className="text-themecolor-500" />

            <ChevronDown className="w-6 h-6 transition-transform duration-200 -rotate-90   text-themeColor shrink-0" />
          </Link>
        </div>

      </div>

      <div>
        <div className="bg-themecolor-50 rounded-xl text-themeColor">
          {/* <H4Text text="Gift A Subscription" className="p-4" /> */}
          <div className="pl-4 py-4">
            <Link
              href={`/bulk-subscription`}
              className="w-full flex flex-1 text-left items-center justify-between py-0 transition-all hover:underline"
              onClick={onClick}
            >
              <H4Text
                text="Gift A Subscription"
                className="text-themecolor-500"
              />

              <ChevronDown className="w-6 h-6 transition-transform duration-200 -rotate-90   text-themeColor shrink-0" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};
