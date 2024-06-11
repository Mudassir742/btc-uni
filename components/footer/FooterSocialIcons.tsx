"use client"
import { Facebook } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Instagram } from 'lucide-react';

function FooterSocialIcons() {
  return (
    <div className='gap-x-4'>


      <div className='text-themeColor flex space-x-2 pb-4'>
        {/* instagram */}
        <div className='p-2  bg-white rounded-full'>
          <Link href='https://www.instagram.com/btcuniversity/' target="_blank">
            <Instagram />


          </Link>
        </div>
        {/* facebook */}
        <div className='p-2  bg-white rounded-full'>


          <Link href='https://www.facebook.com/behindthechairuniversity/' target="_blank">
            <Facebook />


          </Link>




        </div>
        {/* youtube */}
        <div className='p-2  bg-white rounded-full'>

          <Link href='https://www.youtube.com/@behindthechair_com' target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#523D34"><path d="M12.04 3.5c.59 0 7.54.02 9.34.5a3.02 3.02 0 0 1 2.12 2.15C24 8.05 24 12 24 12v.04c0 .43-.03 4.03-.5 5.8A3.02 3.02 0 0 1 21.38 20c-1.76.48-8.45.5-9.3.51h-.17c-.85 0-7.54-.03-9.29-.5A3.02 3.02 0 0 1 .5 17.84c-.42-1.61-.49-4.7-.5-5.6v-.5c.01-.9.08-3.99.5-5.6a3.02 3.02 0 0 1 2.12-2.14c1.8-.49 8.75-.51 9.34-.51zM9.54 8.4v7.18L15.82 12 9.54 8.41z" /></svg>
          </Link>



        </div>
        {/* tiktok */}
        <div className='p-2  bg-white rounded-full'>

          <Link href='https://www.tiktok.com/@btcuniversity.com' target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#523D34"><path d="M22.5 9.84202C20.4357 9.84696 18.4221 9.20321 16.7435 8.00171V16.3813C16.7429 17.9333 16.2685 19.4482 15.3838 20.7233C14.499 21.9984 13.246 22.973 11.7923 23.5168C10.3387 24.0606 8.75362 24.1477 7.24914 23.7664C5.74466 23.3851 4.39245 22.5536 3.37333 21.383C2.3542 20.2125 1.71674 18.7587 1.54617 17.2161C1.3756 15.6735 1.68007 14.1156 2.41884 12.7507C3.15762 11.3858 4.2955 10.279 5.68034 9.57823C7.06517 8.87746 8.63095 8.61616 10.1683 8.82927V13.0439C9.4648 12.8227 8.70938 12.8293 8.0099 13.063C7.31041 13.2966 6.70265 13.7453 6.2734 14.345C5.84415 14.9446 5.61536 15.6646 5.6197 16.402C5.62404 17.1395 5.8613 17.8567 6.29759 18.4512C6.73387 19.0458 7.34688 19.4873 8.04906 19.7127C8.75125 19.9381 9.5067 19.9359 10.2075 19.7063C10.9084 19.4768 11.5188 19.0316 11.9515 18.4345C12.3843 17.8374 12.6173 17.1188 12.6173 16.3813V0H16.7435C16.7406 0.348435 16.7698 0.696395 16.8307 1.03948V1.03948C16.9741 1.80537 17.2722 2.53396 17.7068 3.18068C18.1415 3.8274 18.7035 4.37867 19.3585 4.80075C20.2903 5.41688 21.3829 5.74528 22.5 5.74505V9.84202Z" /></svg>



          </Link>



        </div>
      </div>
    </div>
  );
}

export default FooterSocialIcons;



