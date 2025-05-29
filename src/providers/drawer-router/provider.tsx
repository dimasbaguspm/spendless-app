import { useState, type FC, type PropsWithChildren } from 'react';

import { DRAWER_IDS, type DrawerId } from '../../constants/drawer-id';
import { AddAccountDrawer } from '../../modules/account-module';

import { AddTransactionDrawer } from './contents/add-transaction';
import { DrawerRouterContextProvider } from './context';

export const DrawerRouterProvider: FC<PropsWithChildren> = ({ children }) => {
  const [drawerId, setDrawerId] = useState<string | null>(null);

  const openDrawer = (id: DrawerId) => setDrawerId(id);
  const closeDrawer = () => setDrawerId(null);
  const is = (id: DrawerId) => drawerId === id;

  return (
    <DrawerRouterContextProvider
      value={{
        drawerId,
        openDrawer,
        closeDrawer,
      }}
    >
      {children}

      {is(DRAWER_IDS.CREATE_TRANSACTION) && <AddTransactionDrawer />}
      {is(DRAWER_IDS.ADD_ACCOUNT) && <AddAccountDrawer />}
    </DrawerRouterContextProvider>
  );
};
