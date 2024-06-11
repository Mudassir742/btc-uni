import React from 'react';

interface HeadSheetProps {
  fill: string;
}

const HeadSheet: React.FC<HeadSheetProps> = ({ fill }) => (
  <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.0525 0C6.00953 0 2.81773 3.06111 2.60495 7.07222L0.583477 9.71111C0.370691 10.0278 0.583477 10.5556 1.00905 10.5556H2.60495V13.7222C2.60495 14.8833 3.56249 15.8333 4.73281 15.8333H5.79675V19H13.2443V14.0389C15.7977 12.8778 17.5 10.3444 17.5 7.38889C17.5 3.27222 14.2018 0 10.0525 0Z" fill="black" />
  </svg>
);

export default HeadSheet;