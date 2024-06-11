import React from 'react';
import Image from 'next/image';
import SH4Text from '../text/SH4Text';
import T1Text from '../text/T1Text';

const NavDashHeartEducatorCard = () => {
  return (
    <div className="flex items-center">
  
      <div className="justify-center">
        <SH4Text text="Artist Name" />
        <T1Text text="@handle" />
      </div>
    </div>
  );
}

export default NavDashHeartEducatorCard;






// TO DO: dynamically pull in image, body, name and handle. also add a heart button here.