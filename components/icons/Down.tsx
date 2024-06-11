import React from 'react';

interface DownProps {
  fill: string;
}

const Down: React.FC<DownProps> = ({ fill }) => (
<main>


  {/* // <!-- Mobile --> */}
  <div className='md:hidden'>
  <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.7137 9.5865L11.9994 15.3008L6.28516 9.5865L7.29944 8.57221L11.9994 13.2722L16.6994 8.57221L17.7137 9.5865Z" fill={fill} />
  </svg>
    </div>
  
  {/* //  <!-- Desktop --> */}
  
  <div className='hidden md:block'>
   <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.7137 9.5865L11.9994 15.3008L6.28516 9.5865L7.29944 8.57221L11.9994 13.2722L16.6994 8.57221L17.7137 9.5865Z" fill={fill} />
  </svg>
    </div>
    </main>
  
);


export default Down;
