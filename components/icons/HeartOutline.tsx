"use client"
import React, { useState } from 'react';

interface HeartOutlineProps {
  fill: string;
}

const HeartOutline: React.FC<HeartOutlineProps> = ({ fill }) => {
  const [heartFill, setHeartFill] = useState(fill);

  const handleClick = () => {
    const newFill = heartFill === 'none' ? fill : 'none';
    setHeartFill(newFill);
  };

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill={heartFill}
      xmlns="http://www.w3.org/2000/svg"
      onClick={handleClick}
      style={{ cursor: 'pointer' }}
    >
      <path
        d="M11.136 4.75141L12 6.23397L12.864 4.75145C14.1785 2.49588 16.7141 1.65983 18.963 2.14012C21.1717 2.61179 23 4.32709 23 7.19192C23 9.13761 21.8265 11.2538 19.6508 13.8015C18.0431 15.684 16.003 17.6776 13.7239 19.9046C13.1628 20.4529 12.5872 21.0153 12.0001 21.5937C11.4114 21.0138 10.8344 20.4499 10.2719 19.9003C7.99481 17.675 5.95629 15.6828 4.34955 13.8015C2.1737 11.2538 1 9.13757 1 7.19192C1 4.3366 2.82508 2.61144 5.03139 2.13309C7.27447 1.64676 9.80953 2.47517 11.136 4.75141Z"
        stroke="black"
        strokeWidth="2"
      />
    </svg>
  );
};

export default HeartOutline;

// to do: when clicked, this should also add course to their favorites