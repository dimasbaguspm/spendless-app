import { createFileRoute } from '@tanstack/react-router';
import { Loader } from 'lucide-react';

import { PageLayout, Button, Tile } from '../../../components';
import { useApiAccountsQuery } from '../../../hooks/use-api/built-in/use-accounts';
import { AccountList, AccountListHeader } from '../../../modules/account-module';

export const Route = createFileRoute('/_protected/settings/accounts')({
  component: AccountsComponent,
});

function AccountsComponent() {
  const [accountsData, accountsError, accountsStates] = useApiAccountsQuery();

  const accounts = accountsData?.items ?? [];

  if (accountsStates.isLoading) {
    return (
      <PageLayout background="cream" title="Accounts" showBackButton={true}>
        <div className="flex items-center justify-center py-12">
          <Loader className="w-8 h-8 animate-spin text-coral-600" />
        </div>
      </PageLayout>
    );
  }

  if (accountsError) {
    return (
      <PageLayout background="cream" title="Accounts" showBackButton={true}>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Failed to load accounts</p>
          <Button variant="coral" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout background="cream" title="Accounts" showBackButton={true}>
      <div className="space-y-6">
        {/* Accounts */}
        <Tile>
          <AccountListHeader />
          <AccountList accounts={accounts} />
        </Tile>
      </div>
    </PageLayout>
  );
}
