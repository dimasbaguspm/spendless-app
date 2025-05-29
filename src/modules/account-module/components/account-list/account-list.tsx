import { CreditCard, Loader } from 'lucide-react';
import { useState } from 'react';

import { Button } from '../../../../components';
import { useApiDeleteAccountMutation } from '../../../../hooks/use-api/built-in/use-accounts';
import { useDrawerRouterProvider } from '../../../../providers/drawer-router';
import { useSnack } from '../../../../providers/snack';
import type { Account } from '../../../../types/api';

import { AccountItem } from './account-item';
import type { AccountListProps } from './types';

export function AccountList({ accounts, isLoading }: AccountListProps) {
  const [deleteAccount] = useApiDeleteAccountMutation();
  const [deletingAccountId, setDeletingAccountId] = useState<string | null>(null);

  const { openDrawer } = useDrawerRouterProvider();
  const { success, error } = useSnack();

  const handleRemove = async (account: Account) => {
    if (!account.id) return;

    if (window.confirm(`Are you sure you want to remove "${account.name}"? This action cannot be undone.`)) {
      setDeletingAccountId(account.id.toString());
      try {
        await deleteAccount({ accountId: account.id });
        success(`Account "${account.name}" removed successfully`);
      } catch {
        error(`Failed to remove account "${account.name}"`);
      } finally {
        setDeletingAccountId(null);
      }
    }
  };

  const handleAddAccount = () => {
    openDrawer('add-account');
  };

  const handleEditAccount = (_account: Account) => {
    // TODO: Implement edit functionality when edit drawer is available
    // console.log('Edit account:', account);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader className="w-8 h-8 animate-spin text-coral-600" />
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-100">
      {accounts.map((account) => (
        <AccountItem
          key={account.id}
          account={account}
          isDeleting={deletingAccountId === account.id?.toString()}
          onEdit={handleEditAccount}
          onDelete={handleRemove}
        />
      ))}

      {accounts.length === 0 && (
        <div className="p-8 text-center">
          <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 mb-4">No accounts added yet</p>
          <Button variant="coral" onClick={handleAddAccount}>
            Add Your First Account
          </Button>
        </div>
      )}
    </div>
  );
}
