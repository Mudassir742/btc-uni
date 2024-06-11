"use client"
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface NavDashboardContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: string; // Add activeTab to the context type
  setActiveTab: React.Dispatch<React.SetStateAction<string>>; // Add setActiveTab to the context type
}

const NavDashboardContext = createContext<NavDashboardContextType | undefined>(undefined);

interface NavDashboardProviderProps {
  children: ReactNode;
}

export const NavDashboardProvider: React.FC<NavDashboardProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('inProgress'); // Initialize activeTab

  const contextValue: NavDashboardContextType = {
    isOpen,
    setIsOpen,
    activeTab, // Add activeTab to contextValue
    setActiveTab, // Add setActiveTab to contextValue
  };

  return (
    <NavDashboardContext.Provider value={contextValue}>
      {children}
    </NavDashboardContext.Provider>
  );
};

export const useNavDashboardContext = (): NavDashboardContextType => {
  const context = useContext(NavDashboardContext);
  if (!context) {
    throw new Error('useNavDashboardContext must be used within a NavDashboardProvider');
  }
  return context;
};
