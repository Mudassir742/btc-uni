import React from 'react';

interface StarsProps {
  fill: string;
  stroke: string;
  width: string;
  height: string;
}

const Stars: React.FC<StarsProps> = ({ fill, stroke, width, height }) => (
  <svg width={width} height={height} viewBox="0 0 38 37" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.1499 26.8649L18.6846 26.6202L18.2192 26.8649L9.13867 31.6388L10.8729 21.5275L10.9618 21.0093L10.5853 20.6423L3.23899 13.4814L13.3914 12.0062L13.9116 11.9306L14.1443 11.4592L18.6846 2.25955L23.2248 11.4592L23.4575 11.9306L23.9778 12.0062L34.1302 13.4814L26.7838 20.6423L26.4074 21.0093L26.4962 21.5275L28.2305 31.6388L19.1499 26.8649Z" fill={fill} stroke={stroke} strokeWidth="2" />
  </svg>
);

export default Stars;


