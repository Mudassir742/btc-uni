import React from "react";
import SH1Text from "../text/SH1Text";
import SH4Text from "../text/SH4Text";
import { cn } from "@/utils/shadcn";
import { ChevronLeft } from 'lucide-react';
interface BackWithOnClickProps {
  
  size?: number;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const BackWithOnClick: React.FC<BackWithOnClickProps> = ({
  onClick,
  className,
  
  size = 24, 
}) => (
  <main className={cn(" pt-1", className)}>
    <div className="z-8 bg-white w-[40px] h-[40px] rounded-xl flex items-center justify-center">
      <button onClick={onClick}>
        <ChevronLeft size='24' />
      </button>
    </div>
  </main>
);

export default BackWithOnClick;
