import React, { FC } from 'react';

interface RatingStarProps {
  fill: string;
  size?: number;
  stroke?: string; // Add the stroke prop
}

const RatingStar: FC<RatingStarProps> = ({ fill, size = 24, stroke = "none" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke} // Use the stroke prop
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
      />
    </svg>
  );
};

export default RatingStar;