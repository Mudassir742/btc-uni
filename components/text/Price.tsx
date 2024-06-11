import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for prop type validation

interface PriceTextProps {
  price?: string; // Make the 'price' prop optional and specify its type
}

const PriceText: React.FC<PriceTextProps> = ({ price }) => {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '8px',
        right: '12px',
        backgroundColor: 'white',
        opacity: '0.75',
        padding: '4px 8px',
        color: 'black',
        borderRadius: '4px', // Rounded corners with a 4px radius
     
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '10px',
        lineHeight: '100%',
        margin: '0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {price || '$19.99'} {/* Use the price prop or '$19.99' as the default */}
    </div>
  );
};

// Define propTypes to validate the 'price' prop
PriceText.propTypes = {
  price: PropTypes.string,
};

export default PriceText;
