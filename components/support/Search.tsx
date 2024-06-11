"use client";
import HeaderSearch from "@/components/layout/Search";
import { cn } from "@/utils/shadcn";
import { createUrl } from "@/utils/url";
import { useSearchParams, useRouter } from "next/navigation";
import { FC, HTMLAttributes, useState, useTransition } from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> { }

const Search: FC<IProps> = ({ className }) => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const { replace } = useRouter();
  const [pending, startTransition] = useTransition()

  const toggleMenu = () => setIsOpen(!isOpen);

  const newSp = new URLSearchParams(searchParams?.toString());
  return (
    <>
      <div className={cn("", className)}>
        <HeaderSearch
          val={searchParams?.get("search") || ""}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            newSp.set("search", e.target.value);
            startTransition(() => {
              replace(createUrl(location.pathname, newSp), {
                scroll: false,
              })
            })
          }} />
      </div>
      {/* <div className="flex-none items-center w-full">
        <div className="flex h-10 bg-white">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 border border-border rounded rounded-r-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            className="focus:outline-none w-full flex"
            onClick={toggleMenu}
          >
            <div className="flex flex-col items-center justify-center h-full cursor-pointer min-w-[42px] bg-black rounded-md rounded-l-none	">
              <Search />
            </div>
          </button>
        </div>
      </div> */}
    </>
  );
};

export default Search;
