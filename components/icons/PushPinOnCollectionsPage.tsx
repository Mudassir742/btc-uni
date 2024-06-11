"use client"
import React, { useState } from 'react';
import { Bookmark } from 'lucide-react';

interface PushPinOnCollectionsPageProps {
  fill: string;
  userDataId: number;
  bundleId: number;
}

const PushPinOnCollectionsPage: React.FC<PushPinOnCollectionsPageProps> = ({ fill, userDataId, bundleId }) => {
  const [pinFill, setPinFill] = useState(fill);

  const handleClick = () => {
    const newFill = pinFill === 'grey' ? '#C4A18D' : 'grey';
    setPinFill(newFill);
  };
 
  return (
    <Bookmark color='#523D34' />
      
  );
};

export default PushPinOnCollectionsPage;
