// contexts/PageNameContext.tsx
import { createContext, useContext } from 'react';

const PageNameContext = createContext<string | null>(null);

export const usePageName = () => {
  return useContext(PageNameContext);
};

export const PageNameProvider = PageNameContext.Provider;
