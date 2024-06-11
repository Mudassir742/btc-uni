"use client";
import { FC, HTMLAttributes, useState } from "react";
// Utils
import { cn } from "@/utils/shadcn";
// Icons
import { EmptyStar, FullStar } from "@/components/icons";
import React from "react";

interface IProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
  value: number;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  size?: number;
  edit?: boolean;
  isHalf?: boolean;
  ratingOnChange?: (value: number) => void;
  emptyIcon?: React.ReactElement;
  halfIcon?: React.ReactElement;
  fullIcon?: React.ReactElement;
}

const Rating: FC<IProps> = ({
  className,
  count = 5,
  value,
  color = "#ffd700",
  edit = false,
  isHalf = true,
  ratingOnChange,
  emptyIcon = <EmptyStar className="w-5 h-5 lg:w-6 lg:h-6" />,
  fullIcon = <FullStar className="w-5 h-5 lg:w-6 lg:h-6" />,
  ...props
}) => {
  const stars = [];

  for (let i = 0; i < count; i++) {
    let star: React.ReactElement;
    if (i < value) {
      star = fullIcon;
    } else {
      star = emptyIcon;
    }

    stars.push(
      <div key={i} {...props}>
        {React.cloneElement(star)}
      </div>
    );
  }
  return <div className={cn("flex gap-x-1", className)}>{stars}</div>;
};

export default Rating;
