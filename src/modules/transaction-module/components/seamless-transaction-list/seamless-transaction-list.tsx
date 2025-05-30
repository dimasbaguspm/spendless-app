import { useEffect } from 'react';

import { Button } from '../../../../components';
import { cn } from '../../../../libs/utils';
import { useSeamlessTransactions, useDateIntersectionObserver } from '../../hooks';
import { TransactionList } from '../transaction-list';

export interface SeamlessTransactionListProps {
  selectedDate: string;
  className?: string;
  showBalance?: boolean;
  groupId?: number;
  accountId?: number;
  categoryId?: number;
  onTopDateChange?: (dateKey: string) => void;
  ribbonElement: HTMLElement | null;
}

export function SeamlessTransactionList({
  selectedDate,
  className,
  showBalance = true,
  groupId,
  accountId,
  categoryId,
  onTopDateChange,
  ribbonElement,
}: SeamlessTransactionListProps) {
  const { transactionsByDate, isLoading, isError, error, fetchMore } = useSeamlessTransactions({
    selectedDate,
    groupId,
    accountId,
    categoryId,
  });

  const { setDateGroupRef, initializeObserver } = useDateIntersectionObserver({
    ribbonElement,
    onTopDateChange,
  });

  // Set up observer when transactions data changes
  useEffect(() => {
    const cleanup = initializeObserver();
    return cleanup;
  }, [transactionsByDate, initializeObserver]);

  if (isLoading) {
    return (
      <div className={cn('space-y-4', className)}>
        {[...Array(7)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow-sm border border-slate-200 p-4">
            <div className="animate-pulse">
              <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
              <div className="space-y-3">
                <div className="h-16 bg-slate-100 rounded"></div>
                <div className="h-16 bg-slate-100 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Error state
  if (isError || error) {
    return (
      <div className={cn('bg-red-50 border border-red-200 rounded-lg p-4', className)}>
        <p className="text-red-600 text-sm">Failed to load transactions. Please try again.</p>
      </div>
    );
  }

  return (
    <>
      <div className={cn('space-y-4', className)}>
        {transactionsByDate.map(([dateKey, transactions], index: number) => {
          const date = new Date(dateKey + 'T00:00:00'); // Parse YYYY-MM-DD format
          const rangeStartDate = new Date(date);
          rangeStartDate.setHours(0, 0, 0, 0);
          const rangeEndDate = new Date(date);
          rangeEndDate.setHours(23, 59, 59, 999);

          return (
            <div
              key={dateKey}
              ref={setDateGroupRef(dateKey)}
              data-date-key={dateKey}
              className={index > 0 ? 'border-t border-slate-200 pt-4' : undefined}
            >
              <TransactionList
                startDate={rangeStartDate}
                endDate={rangeEndDate}
                transactions={transactions}
                showBalance={showBalance}
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        <Button variant="outline" onClick={fetchMore}>
          Load More Transactions
        </Button>
      </div>
    </>
  );
}
