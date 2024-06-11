"use client"
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ActiveCategoryContextType {
  activeCategory: string;
  setActiveCategory: React.Dispatch<React.SetStateAction<string>>;
}

const ActiveCategoryContext = createContext<ActiveCategoryContextType | undefined>(undefined);

interface ActiveCategoryProviderProps {
  children: ReactNode;
}

export const ActiveCategoryProvider: React.FC<ActiveCategoryProviderProps> = ({ children }) => {
  const [activeCategory, setActiveCategory] = useState('');
  useEffect(() => {
    const allowedRoutes = [
      '/all-educators',
      '/celeb-stylists',
      '/social-media',
      '/social-climbing',
      '/haircolor',
      '/haircutting',
      '/styling',
      '/texture',
      '/business',
      '/mens',
      '/hairextensions',
      '/events',
      '/masterclasses',
      '/languages'
    ];
  
    const currentPath = window.location.pathname;
  
    // Check if the current path is in the allowedRoutes list
    if (allowedRoutes.includes(currentPath)) {
      setActiveCategory(currentPath);
    } else {
      setActiveCategory('');
    }
  }, []);
  

  return (
  
  <ActiveCategoryContext.Provider value={{ activeCategory, setActiveCategory }}>
     {children}
  </ActiveCategoryContext.Provider>
);
};

export const useActiveCategoryContext = (): ActiveCategoryContextType => {
const context = useContext(ActiveCategoryContext);
if (!context) {
  throw new Error('useActiveCategoryContext must be used within an ActiveCategoryProvider');
}
return context;
};


