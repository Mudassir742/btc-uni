import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProfileNonSub from './ProfileNonSub';
import ProfileSub from './ProfileSub';
// import AuthContentNoPush from '../AuthContentNoPush';
// import UnAuthContent from '../UnAuthContent';
import FullBTCULogoSVG from '../icons/FullBTCULogoSVG';

function CartComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center">
      {/* Cart icon */}
      <div>
      <svg width="42" height="41" viewBox="0 0 42 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M31 11H27.1687L25.8354 24.3077C25.7799 24.6745 25.5943 25.0089 25.3127 25.2492C25.0311 25.4895 24.6724 25.6196 24.3028 25.6154H14.6479C14.3137 25.6329 13.983 25.5401 13.7062 25.3512C13.4295 25.1623 13.222 24.8877 13.1154 24.5692L11.0771 18.4154C11.0011 18.184 10.9809 17.9379 11.0182 17.6971C11.0555 17.4564 11.1492 17.228 11.2916 17.0308C11.44 16.821 11.6384 16.652 11.8686 16.5391C12.0989 16.4262 12.3536 16.3731 12.6096 16.3846H26.6323" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M14.9084 30.9999C15.3316 30.9999 15.6746 30.6555 15.6746 30.2307C15.6746 29.8058 15.3316 29.4614 14.9084 29.4614C14.4852 29.4614 14.1421 29.8058 14.1421 30.2307C14.1421 30.6555 14.4852 30.9999 14.9084 30.9999Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
<path d="M24.8698 30.9999C25.293 30.9999 25.636 30.6555 25.636 30.2307C25.636 29.8058 25.293 29.4614 24.8698 29.4614C24.4466 29.4614 24.1035 29.8058 24.1035 30.2307C24.1035 30.6555 24.4466 30.9999 24.8698 30.9999Z" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
</svg>

      </div>

      {/* Menu */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-white z-50 transition duration-500 ease-in-out transform ${
          isOpen ? '' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-end mt-4 mr-4 items-start">
        <FullBTCULogoSVG height={'100'} /> 

          <button className="focus:outline-none" onClick={toggleMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-themeColor hover:text-gray-200 focus:text-gray-200"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 5.293a1 1 0 011.414 0L10 8.586l3.293-3.293a1 1 0 111.414 1.414L11.414 10l3.293 3.293a1 1 0 01-1.414 1.414L10 11.414l-3.293 3.293a1 1 0 01-1.414-1.414L8.586 10 5.293 6.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
     
        

hi, i am a cart page
          </div>
          </div>
      
 
  );
}

export default CartComponent;
