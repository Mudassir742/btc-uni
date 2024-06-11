import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ProfileNonSub from './ProfileNonSub';
import ProfileSub from './ProfileSub';
// import AuthContentNoPush from '../AuthContentNoPush';
import UnAuthContent from '../UnAuthContent';
import FullBTCULogoSVG from '../icons/FullBTCULogoSVG';
// import { AuthProvider } from "../hooks/useAuth";

function AccountComponent() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex items-center">
      {/* Account icon */}
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          onClick={toggleMenu} // add onClick handler to the SVG
          className="cursor-pointer" // add cursor pointer to the SVG
        >
          <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3"/>
          <circle cx="12" cy="10" r="3"/>
          <circle cx="12" cy="12" r="10"/>
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
     
        
{/* <AuthContentNoPush> */}
<ProfileSub /> 
{/* </AuthContentNoPush> */}
{/* deprecated AuthContentNoPush following Hamzahs updates on Oct 3 */}
{/* to do: implement alternative */}


{/* <UnAuthContent> */}
 <ProfileNonSub />
 {/* </UnAuthContent> */}

{/* above deprecated following Hamzahs updates on Oct 2-3 */}
{/* to do: different conditional rendering */}


            {/* <button
              className="mt-8 px-4 py-2 text-white bg-black rounded-xl"
              onClick={toggleMenu}
            >
              Logout
            </button> */}
          </div>
          </div>
      
 
  );
}

export default AccountComponent;
