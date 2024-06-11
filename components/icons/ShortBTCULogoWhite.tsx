


import Link from 'next/link';
import React from 'react';

interface ShortBTCULogoWhiteProps {

  height: string; 
}

const ShortBTCULogoWhite: React.FC<ShortBTCULogoWhiteProps> = ({ height }) => (
<Link href={`/`}>
<div className='flex justify-center items-center'>


<svg xmlns="http://www.w3.org/2000/svg" width="97" height={height} viewBox="0 0 97 24" fill="none">
  <g clipPath="url(#clip0_170_4194)">
    <path d="M73.6524 3.71156L73.9115 4.00763L73.9041 3.99036L73.6426 3.69922L73.6524 3.71156Z" fill="#F5F3F2"/>
    <path d="M74.0049 4.22C74.0962 4.30883 74.2738 4.48647 74.2738 4.48647C74.5576 4.97747 75.0634 5.3377 75.3298 5.87064L75.241 5.61651C75.0634 5.32783 74.9968 5.32536 75.1621 5.5795C74.787 5.00461 74.3454 4.51361 73.9111 4.00781C73.921 4.05716 73.8939 4.0695 74.0074 4.22247" fill="#F5F3F2"/>
    <path d="M73.4129 19.885L73.6572 19.6729L72.6357 20.4649C72.8405 20.3612 73.1292 20.1219 73.4129 19.885Z" fill="#F5F3F2"/>
    <path d="M65.2758 2.82568C64.1852 2.82568 63.144 3.00333 62.1645 3.31175C62.1793 3.31175 62.1941 3.31175 62.2089 3.31175C63.6202 3.31175 64.6368 4.43685 64.4221 5.77907L63.7189 10.731C64.8243 8.97919 66.4157 8.13783 67.6173 8.13783C70.2252 8.13783 71.7895 11.1134 71.301 14.7404C70.8371 17.7999 68.9867 20.4029 66.8722 21.1456C71.5009 20.4202 75.0341 16.6304 75.0341 12.0535C75.0341 6.95599 70.6644 2.82815 65.2733 2.82815M62.5445 18.7523L62.3323 20.1636C62.3076 20.3289 62.162 20.6151 62.0831 20.7631C63.0083 21.0666 63.9953 21.2393 65.0266 21.2665C63.9385 20.9803 62.9318 20.0279 62.5445 18.7498M61.0123 4.88096C60.5188 4.88096 59.9661 5.25847 59.9044 5.77907L59.7539 6.85482H59.0779L59.2308 5.77907C59.3221 5.22639 59.6059 4.71319 60.0007 4.29621C57.3088 5.93945 55.5225 8.79414 55.5225 12.0535C55.5225 15.3128 57.2299 18.0466 59.8255 19.7047L61.8413 5.78154C61.9301 5.26093 61.5329 4.88343 61.0123 4.88343" fill="#F5F3F2"/>
    <path d="M68.611 14.533C68.2483 17.0127 66.8296 19.0063 65.5293 19.0063C64.3919 19.0063 63.4173 17.0127 63.8071 14.533C64.1328 12.0534 65.7021 10.0869 66.8666 10.0869C68.1348 10.0869 68.9688 12.0558 68.611 14.533Z" fill="#F5F3F2"/>
    <path d="M76.8273 14.0718C76.4078 15.7003 75.7367 17.1683 74.7695 18.3724C74.7103 18.476 74.6659 18.55 74.5573 18.6635L74.2958 18.9201L73.8542 19.4284L73.7061 19.6159L73.7012 19.6233C73.6272 19.7269 73.6592 19.7072 73.7209 19.6603L73.4298 19.8799L73.7061 19.6184L73.7727 19.5296C73.4273 19.9095 72.9733 20.1711 72.581 20.5017L72.3318 20.704C72.0407 20.9359 71.7717 21.2049 71.5299 21.2443L71.2832 21.3652L71.3326 21.348L71.2413 21.3875L70.1951 21.8982C69.9731 22.0092 69.7707 22.1967 69.5141 22.2535C69.5141 22.2535 69.334 22.2757 69.2452 22.2806C69.1514 22.3324 69.0108 22.3843 68.8455 22.441C68.4927 22.5545 68.0263 22.6729 67.6538 22.7297C68.1004 22.5644 68.4927 22.4953 68.8455 22.441C69.0108 22.3843 69.1514 22.3324 69.2452 22.2806C69.334 22.2757 69.5141 22.2535 69.5141 22.2535C69.7707 22.1943 69.9731 22.0092 70.1951 21.8982C69.5413 22.2979 68.7443 22.3522 68.0115 22.6014C63.1213 23.6771 57.9276 21.7798 55.1963 17.3238C53.7356 14.9354 53.331 12.0955 53.9058 9.54923C55.137 4.51588 59.7016 0.832167 64.9422 0.93086C66.9531 0.832167 70.5479 1.88571 72.0407 3.13912C74.1552 4.59977 73.3878 3.51662 73.2817 3.41052C72.1714 2.1966 71.0883 1.25655 67.7747 0.304159C70.0101 1.01968 66.092 -0.132557 63.8418 0.148718C60.5281 -0.0215276 56.1116 2.66292 54.2784 6.30716C53.6887 7.14852 53.4642 8.21194 53.0916 9.36171C51.5619 15.6312 56.0919 21.9303 62.4946 23.2552C64.1971 23.6031 65.7391 23.5242 67.1628 23.2774C68.1941 23.1072 69.3019 22.7963 70.1014 22.5076C71.335 21.9327 72.3466 21.3554 73.1534 20.5732C72.2208 21.4097 71.4288 21.8439 70.1729 22.4533C69.3488 22.8703 70.7059 22.061 71.2314 21.7674C71.4461 21.6243 71.8828 21.5577 72.0752 21.3776L73.373 20.2846C73.563 20.1094 73.6 20.1957 73.6963 20.1094C74.2859 19.5222 74.5697 18.9177 74.9422 18.55C75.2285 18.2638 75.4579 17.985 75.6183 17.6692L75.9514 17.0746L76.1488 16.6675C76.0674 16.7637 76.0155 16.7859 75.9662 16.8032C76.0155 16.7859 76.0649 16.7637 76.1488 16.6675C76.6225 15.7052 76.9309 14.4567 77.0641 13.3267L77.0543 13.344C77.0567 14.0274 76.736 14.6344 76.5139 15.2858C76.62 15.0045 76.6348 15.0489 76.5361 15.377L76.4177 15.6164C76.5707 15.0341 76.7187 14.4666 76.9507 13.9386C76.9679 13.9386 76.9655 13.6795 76.9704 13.5537C77 13.3686 77.0271 13.3834 77.0567 13.344L77.0888 12.9492C77.0173 13.2255 76.8865 14.0866 76.8347 14.0768" fill="#F5F3F2"/>
    <path d="M15.6602 4.42675V3.3584H31.0267V4.42675H23.9479V23.4178H22.7118V4.42675H15.6602Z" fill="#F5F3F2"/>
    <path d="M47.1183 9.34175C46.5854 5.97139 43.6345 3.94818 40.2913 3.94818C35.0383 3.94818 31.9764 8.24626 31.9764 13.3882C31.9764 18.5301 35.0383 22.8282 40.2913 22.8282C44.197 22.8282 47.2294 19.3443 47.4539 15.6088H48.69C48.241 20.3855 44.7004 23.8965 40.2913 23.8965C34.2784 23.8965 30.7402 19.2604 30.7402 13.3906C30.7402 7.52087 34.2808 2.88477 40.2913 2.88477C47.3996 2.88477 48.3249 9.06541 48.3545 9.34669H47.1183V9.34175Z" fill="#F5F3F2"/>
    <path d="M0 3.3584H8.03361C12.8104 3.3584 14.3549 5.9713 14.3549 8.55458C14.3549 10.7184 12.7807 12.5442 10.4491 12.8255L10.5059 12.8823C11.0388 12.7984 15.0285 13.7532 15.0285 17.7972C15.0285 21.4488 12.2182 23.4153 8.03361 23.4153H0V3.3584ZM1.23613 12.4604H8.03361C11.3768 12.4604 13.1188 10.7752 13.1188 8.33006C13.1188 5.43589 10.7033 4.42428 8.03361 4.42428H1.23613V12.4579V12.4604ZM1.23613 22.3494H8.03361C11.5742 22.3494 13.7923 20.7752 13.7923 17.7997C13.7923 14.3725 10.6736 13.5287 8.03361 13.5287H1.23613V22.3494Z" fill="#F5F3F2"/>
    <path d="M82.8846 3.3584V15.3817C82.8846 17.7972 83.3904 22.8256 89.1762 22.8256C94.0912 22.8256 95.7492 19.9314 95.7492 15.3817V3.3584H96.9853V15.3817C96.9853 20.1584 95.1866 23.8939 89.1762 23.8939C82.0407 23.8939 81.6484 18.0513 81.6484 15.3817V3.3584H82.8846Z" fill="#F5F3F2"/>
  </g>
  <defs>
    <clipPath id="clip0_170_4194">
      <rect width="96.9853" height={height} fill="white" transform="translate(0 0.103516)"/>
    </clipPath>
  </defs>
</svg>
</div>
</Link>
);

export default ShortBTCULogoWhite;
