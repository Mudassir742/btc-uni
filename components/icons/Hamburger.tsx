import React from 'react';

interface HamburgerProps {
  fill: string;
}

const Hamburger: React.FC<HamburgerProps> = ({ fill }) => (
  <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M34 13.8367H8V9H34V13.8367ZM34 18.6734H8V23.5101H34V18.6734ZM34 28.3468H8V33.1835H34V28.3468Z" fill="black" />
  </svg>
);

export default Hamburger;