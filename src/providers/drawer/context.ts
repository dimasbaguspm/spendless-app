import { createContext, useContext } from 'react';

import type { DrawerContextType } from './types';

const DrawerContext = createContext<DrawerContextType | null>(null);

export const DrawerContextProvider = DrawerContext.Provider;

export const useDrawerProvider = () => {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error('useDrawerProvider must be used within a DrawerProvider');
  }
  return context;
};
