import { StrictMode, type FC, type PropsWithChildren } from 'react';

import { DrawerProvider } from '../providers/drawer';
import { ModalProvider } from '../providers/modal';
import { TanstackQueryProvider } from '../providers/tanstack-query';

export const App: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StrictMode>
      <TanstackQueryProvider>
        <DrawerProvider>
          <ModalProvider>{children}</ModalProvider>
        </DrawerProvider>
      </TanstackQueryProvider>
    </StrictMode>
  );
};
