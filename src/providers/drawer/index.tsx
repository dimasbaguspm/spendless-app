import { createContext, useContext, useState, type FC, type PropsWithChildren } from 'react';

import { Drawer } from '../../components';

interface DrawerContextType {
  isOpen: boolean;
  openDrawer: (drawerId: string) => void;
  closeDrawer: () => void;
}

const DrawerContext = createContext<DrawerContextType | undefined>(undefined);

export function useDrawer() {
  const context = useContext(DrawerContext);
  if (!context) throw new Error('useDrawer must be used within a DrawerProvider');
  return context;
}

export const DrawerProvider: FC<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openDrawer = (_: string) => {
    setIsOpen(true);
  };

  const closeDrawer = () => setIsOpen(false);

  return (
    <DrawerContext.Provider
      value={{
        isOpen,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}
      {isOpen && (
        <Drawer onClose={closeDrawer} size="md" position="left">
          <Drawer.Header>
            <Drawer.Title>Drawer Title</Drawer.Title>
            <Drawer.Description>This is a description of what this drawer contains.</Drawer.Description>
            <Drawer.CloseButton />
          </Drawer.Header>
          <Drawer.Content>
            <p>a</p>
          </Drawer.Content>
          <Drawer.Footer>
            <button onClick={closeDrawer} className="btn btn-secondary">
              Close
            </button>
          </Drawer.Footer>
        </Drawer>
      )}
    </DrawerContext.Provider>
  );
};

// Export types
export type { DrawerContextType };
