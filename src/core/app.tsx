import { StrictMode, type FC, type PropsWithChildren } from 'react';

import { DrawerProvider } from '../providers/drawer';
import { ModalProvider } from '../providers/modal';
import { SnackProvider } from '../providers/snack';
import { TanstackQueryProvider } from '../providers/tanstack-query';

export const App: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StrictMode>
      <TanstackQueryProvider>
        <SnackProvider>
          <DrawerProvider>
            <ModalProvider>{children}</ModalProvider>
          </DrawerProvider>
        </SnackProvider>
      </TanstackQueryProvider>
    </StrictMode>
  );
};
