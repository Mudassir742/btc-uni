import LogoutButton from "@/app/profile/components/Logout";
import { category } from "../helper";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils/shadcn";
import { ChevronDown, ChevronUp } from "lucide-react";
import Link from "next/link";

interface MyComponentProps {
  className?: string;
  searchParams?: { [key: string]: string | string[] | undefined };
}

const TabSection = ({ className, searchParams }: MyComponentProps) => {
  const searchVal = searchParams?.q;
  return (
    <div
      className={`px-6 pt-2 border rounded-2xl min-w-[300px] border-solid border-border ${className}`}
    >
      <Accordion defaultValue="item-1" type="single" collapsible className="">
        <AccordionItem value="item-1" className="border-none">
          <AccordionContent className="flex flex-col  gap-2 no-underline outline-none mt-4">
            {category.map((val, i) => (
              <Link
                replace
                scroll={false}
                href={`?${new URLSearchParams({
                  q: val.link,
                })}`}
                className={cn(
                  [
                    `w-full leading-150 p-3 lg:p-4 rounded-lg text-left text-16 text-themeColor`,
                  ],
                  {
                    "bg-themecolor-500 font-semibold  text-white ":
                      searchParams?.q === val.link,
                  }
                )}
                key={i}
              >
                {val.name}
              </Link>
            ))}
            <LogoutButton />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default TabSection;
