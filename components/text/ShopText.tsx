import React from 'react';

interface ShopProps {
  text: string; 
}

const Shop: React.FC<ShopProps> = ({ text }) => {
  return (
    <div
      style={{
         color: 'black',
         fontStyle: 'normal',
         fontWeight: '600',
         fontSize: '12px',
         display: 'flex',
         alignItems: 'center',
      }}
    >
      {text}
    </div>
  );
};

export default Shop;
