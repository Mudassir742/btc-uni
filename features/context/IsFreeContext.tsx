'use client'

import React, { FC, createContext, useContext, } from 'react';
interface IProps {
  value: {
    isLoggedIn: boolean,
    userIsCurrentlySubscribed: boolean
  },
  children: React.ReactNode,
}

const IsFreeContext = createContext<any>(false);


export const IsFreeProvider = ({ value, children }: IProps) => {
  return (
    <IsFreeContext.Provider value={value}>
      {children}
    </IsFreeContext.Provider>
  );
};

export const useIsFree = () => {
  const context = useContext(IsFreeContext);
  if (context === null) {
    throw new Error('useIsFree must be used within an IsFreeProvider');
  }
  return context;
};
