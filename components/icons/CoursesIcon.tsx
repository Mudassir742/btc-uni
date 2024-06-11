import React from 'react';

interface CoursesIconProps {
  fill: string;
}

const CoursesIcon: React.FC<CoursesIconProps> = ({ fill }) => (
<svg width="44" height="38" viewBox="0 0 44 38" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16.6417 10.9877V26.8706C16.6417 27.7813 17.6203 28.3386 18.381 27.8651L30.0203 20.6085C30.3026 20.4329 30.5359 20.1862 30.6977 19.8921C30.8596 19.598 30.9446 19.2664 30.9446 18.9291C30.9446 18.5919 30.8596 18.2603 30.6977 17.9662C30.5359 17.6721 30.3026 17.4254 30.0203 17.2498L18.3775 9.99684C18.2043 9.88967 18.0063 9.83136 17.8038 9.82789C17.6013 9.82442 17.4015 9.87592 17.2249 9.9771C17.0483 10.0783 16.9012 10.2255 16.7988 10.4037C16.6963 10.582 16.6421 10.7811 16.6417 10.9877ZM9.49889 0.714844C7.13088 0.714844 4.85986 1.67434 3.18543 3.38226C1.511 5.09018 0.570313 7.40662 0.570312 9.82199V28.0363C0.570312 30.4516 1.511 32.7681 3.18543 34.476C4.85986 36.1839 7.13088 37.1434 9.49889 37.1434H34.4989C36.8669 37.1434 39.1379 36.1839 40.8123 34.476C42.4868 32.7681 43.4275 30.4516 43.4275 28.0363V9.82199C43.4275 7.40662 42.4868 5.09018 40.8123 3.38226C39.1379 1.67434 36.8669 0.714844 34.4989 0.714844H9.49889ZM4.14174 9.82199C4.14174 8.37277 4.70615 6.98291 5.71081 5.95815C6.71547 4.9334 8.07808 4.3577 9.49889 4.3577H34.4989C35.9197 4.3577 37.2823 4.9334 38.287 5.95815C39.2916 6.98291 39.856 8.37277 39.856 9.82199V28.0363C39.856 29.4855 39.2916 30.8754 38.287 31.9001C37.2823 32.9249 35.9197 33.5006 34.4989 33.5006H9.49889C8.07808 33.5006 6.71547 32.9249 5.71081 31.9001C4.70615 30.8754 4.14174 29.4855 4.14174 28.0363V9.82199Z" fill="black"/>
</svg>
);

export default CoursesIcon;
