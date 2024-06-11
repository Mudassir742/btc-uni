import React from 'react';

interface CheckmarkProps {
  fill: string;
  width: number;
  height: number;
}

const Checkmark: React.FC<CheckmarkProps> = ({ fill, width, height }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 98 81" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M82.8304 0.799805L36.75 49.6017L15.1655 28.46L0 44.138L36.75 80.9619L98 16.4736L82.8304 0.799805Z" fill={fill} />
  </svg>
);

export default Checkmark;
