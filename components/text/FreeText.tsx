import React from 'react';
import T1Text from './T1Text';

interface CollectionPriceProps {
  price: string;
}

const FreeText: React.FC<CollectionPriceProps> = ({ price }) => {
  return (
    <div
      style={{
     
        top: '4px', // Adjust top position as needed
        right: '8px', // Adjust right position as needed
        backgroundColor: 'white',
        opacity: '0.75',
        padding: '4px 8px',
        color: 'black',
        borderRadius: '4px', // Rounded corners with a 4px radius
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '14px',
        lineHeight: '100%',
        margin: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      
      }}
    >
      {price}
    </div>
  );
};

export default FreeText;
