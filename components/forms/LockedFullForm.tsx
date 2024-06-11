"use client"
import React, { ReactNode, useState } from 'react';

interface LockedFullFormProps {
  placeholder: string;
  fill?: string;
  icon?: ReactNode;
}

const LockedFullForm = ({ placeholder, fill, icon }: LockedFullFormProps) => {
  const [locked, setLocked] = useState(true); // Add state variable for "locked" with initial value true

  return (
    <form
      className={`bg-white border border-border rounded-xl flex items-center px-10 py-2 ${locked ? 'opacity-50 pointer-events-none' : ''}`}
      id="locked-full-form"
      style={{
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px',
        // position: 'absolute',
        width: '400px',
        height: '60px',
        left: '20px',
        top: '20px',
        background: '#D9D9D9',
        border: '1px solid #000000',
        fill,
      }}
    >
      {icon && <div className="mr-1">{icon}</div>}
      <input className="w-full bg-transparent focus:outline-none" type="text" placeholder={placeholder} disabled={locked} />
 
    </form>
  );
};

export default LockedFullForm;
