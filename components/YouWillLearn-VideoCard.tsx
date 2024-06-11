"use client"
import React, { useState } from 'react';
import SH2Text from './text/SH2Text';
import B1Text from './text/B1Text';
import B1TextWhite from './text/B1TextWhite';

const YouWillLearnVideoCard = () => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const text = 
  "Triangle Sectioning: Why you should use it and how to determine the size. Application: Learn the difference between point work and dry brushing. Saturation: What are the 3 zones of saturation and why they matter. Tools: How to choose the right brushes and tools for your balayage technique. Application: Learn the difference between point work and dry brushing. Saturation: What are the 3 zones of saturation and why they matter. Tools: How to choose the right brushes and tools for your balayage technique";


  


  return (
    <div >
     <B1TextWhite text={text} color={'white'}/>
    </div>
  );
};

export default YouWillLearnVideoCard;




