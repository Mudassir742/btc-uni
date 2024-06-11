import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function ShortBTCULogo() {
  return (
    <Link href="/">
      <Image
        className="h-4 object-contain"
        src="/btcuniveristy-logotype-shortened-01.svg"
        alt="btcu Logo"
        width={800}
        height={10}
      />
    </Link>
  );
}

export default ShortBTCULogo;
