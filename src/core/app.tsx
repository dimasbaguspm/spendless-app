import { StrictMode, type FC, type PropsWithChildren } from 'react';

import { DrawerProvider } from '../providers/drawer';
import { TanstackQueryProvider } from '../providers/tanstack-query';

export const App: FC<PropsWithChildren> = ({ children }) => {
  return (
    <StrictMode>
      <TanstackQueryProvider>
        <DrawerProvider>{children}</DrawerProvider>
      </TanstackQueryProvider>
    </StrictMode>
  );
};
