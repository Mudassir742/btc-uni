import React, { useState } from 'react';

type Button = {
  name: string;
  href: string;
};

type ButtonScrollProps = {
  buttons: Button[];
  activeButton: string;
  onClick: (button: Button) => void;
};

const ButtonScroll = ({ buttons, activeButton, onClick }: ButtonScrollProps) => {
  const handleClick = (button: Button) => {
    onClick(button);
  };

  return (
    <div className="flex overflow-x-auto">
      {buttons.map((button) => (
        <button
          key={button.name}
          className={`px-4 py-2 mr-2 whitespace-nowrap cursor-pointer ${
            activeButton === button.name ? 'bg-black text-white' : 'bg-white text-themeColor'
          }`}
          onClick={() => handleClick(button)}
        >
          {button.name}
        </button>
      ))}
    </div>
  );
};

export default ButtonScroll;
