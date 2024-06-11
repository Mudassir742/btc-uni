import React from 'react';
import Link from 'next/link';
import SH4Text from '../text/SH4Text';

const HeadSheet = () => {
  return (
    <Link href="/cancel">
      <button style={{ color: 'black', border: '1px solid black', outline: 'none' }}>
           <SH4Text text='HeadSheet'/>
   
      </button>
    </Link>
  );
};

export default HeadSheet;
