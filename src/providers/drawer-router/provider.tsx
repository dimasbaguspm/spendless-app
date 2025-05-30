import { useNavigate, useSearch } from '@tanstack/react-router';
import { type FC, type PropsWithChildren } from 'react';

import { DRAWER_IDS, type DrawerId } from '../../constants/drawer-id';
import { useApiAccountQuery, useApiCategoryQuery, useApiTransactionQuery } from '../../hooks';
import { AddAccountDrawer } from '../../modules/account-module';
import { EditAccountDrawer } from '../../modules/account-module/components';
import { AddCategoryDrawer, EditCategoryDrawer } from '../../modules/category-module';
import { AddTransactionDrawer, EditTransactionDrawer } from '../../modules/transaction-module';

import { DrawerRouterContextProvider } from './context';

export const DrawerRouterProvider: FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const { drawerId, accountId, categoryId, transactionId } = useSearch({ strict: false });

  const openDrawer = async (id: DrawerId, obj: object = {}) => {
    await navigate({
      // @ts-expect-error is a bug from tanstack/react-router
      search: (prev) => ({
        ...prev,
        ...obj,
        drawerId: id,
      }),
      replace: true,
      resetScroll: false,
    });
  };
  const closeDrawer = async () => {
    await navigate({
      // @ts-expect-error is a bug from tanstack/react-router
      search: (prev) => ({
        ...prev,
        drawerId: undefined,
        accountId: undefined,
        categoryId: undefined,
        transactionId: undefined,
      }),
      replace: true,
      resetScroll: false,
    });
  };

  const is = (id: DrawerId) => drawerId === id;

  const [account] = useApiAccountQuery(accountId);
  const [category] = useApiCategoryQuery(categoryId);
  const [transaction] = useApiTransactionQuery(transactionId);

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
      {is(DRAWER_IDS.EDIT_TRANSACTION) && transaction && <EditTransactionDrawer transaction={transaction} />}
      {is(DRAWER_IDS.ADD_ACCOUNT) && <AddAccountDrawer />}
      {is(DRAWER_IDS.EDIT_ACCOUNT) && account && <EditAccountDrawer account={account} />}
      {is(DRAWER_IDS.ADD_CATEGORY) && <AddCategoryDrawer />}
      {is(DRAWER_IDS.EDIT_CATEGORY) && category && <EditCategoryDrawer category={category} />}
    </DrawerRouterContextProvider>
  );
};
