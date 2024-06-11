import React from 'react';
import T1Text from './T1Text';
import SH4Text from './SH4Text';



interface CollectionPriceProps {
  price: string;
}

const CollectionPrice: React.FC<CollectionPriceProps> = ({ price }) => {

  return (
    <div
    style={{
      position: 'absolute',
      top: '8px',
      right: '10px',
      backgroundColor: '#333',
      opacity:'0.75',
      padding: '4px 8px',
      color: 'white',
      borderRadius: '6px',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '12px',
      display: 'flex',
      alignItems: 'center',
      letterSpacing: '0.04em',
    }}
    >
     {price}
    </div>
  );
};

export default CollectionPrice;


