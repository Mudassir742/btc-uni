import React from 'react';

interface HeartDashProps {
  fill: string;
}

const HeartDash: React.FC<HeartDashProps> = ({ fill }) => (
<svg xmlns="http://www.w3.org/2000/svg" width="21" height="19" viewBox="0 0 21 19" fill={fill}>
  <path d="M14.94 0.599976C13.13 0.599976 11.51 1.47998 10.5 2.82998C9.49 1.47998 7.87 0.599976 6.06 0.599976C2.99 0.599976 0.5 3.09998 0.5 6.18998C0.5 7.37998 0.69 8.47998 1.02 9.49998C2.6 14.5 7.47 17.49 9.88 18.31C10.22 18.43 10.78 18.43 11.12 18.31C13.53 17.49 18.4 14.5 19.98 9.49998C20.31 8.47998 20.5 7.37998 20.5 6.18998C20.5 3.09998 18.01 0.599976 14.94 0.599976Z" fill={fill}/>
</svg>
);

export default HeartDash;