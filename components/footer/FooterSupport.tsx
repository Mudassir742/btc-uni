"use client"
import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import Down from '../icons/Down';
import SH4Text from '../text/SH4Text';
import Link from "next/link";

const FooterSupport = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-black text-white mb-3">
      <div className="flex items-center pr-2 cursor-pointer" onClick={handleToggle}>
        <SH4Text text={'CONTACT US'} />
        <span className="ml-1 ">{isOpen ? <Down fill={'white'} /> : <ChevronRight color='white'/>}</span>
      </div>
      {isOpen && (
        <div className="text-themeColor p-3">
          Contact Us
          <br>
          </br>
          Email: <Link href="mailto:membership@btcuniversity.com">membership@btcuniversity.com</Link>
          <br>
          </br>
          Phone: (800) 760-3010
        </div>
      )}
    </div>
  );
};

export default FooterSupport;