import { useMemo, useEffect } from 'react';

import { useApiTransactionsQuery, useApiAccountsQuery, useApiCategoriesQuery } from '../../../../hooks';
import { cn } from '../../../../libs/utils';
import type { Transaction as ApiTransaction, Account, Category } from '../../../../types/api';
import { TransactionGroup, type Transaction } from '../transaction-card';

export interface TransactionListProps {
  startDate: Date;
  endDate: Date;
  className?: string;
  showBalance?: boolean;
  groupId?: number;
  accountId?: number;
  categoryId?: number;
  mode?: 'replace' | 'append' | 'prepend'; // New prop to control how data is integrated
  existingDateRanges?: Array<{ startDate: Date; endDate: Date }>; // Track existing loaded ranges
  onDataLoad?: (newRange: { startDate: Date; endDate: Date }) => void; // Callback when new data is loaded
}

// Helper function to convert API Transaction to component Transaction
const convertApiTransactionToComponent = (
  apiTransaction: ApiTransaction,
  accountsMap: Map<number, Account>,
  categoriesMap: Map<number, Category>
): Transaction => {
  const account = apiTransaction.accountId ? accountsMap.get(apiTransaction.accountId) : null;
  const category = apiTransaction.categoryId ? categoriesMap.get(apiTransaction.categoryId) : null;

  // Determine transaction type based on amount (negative is expense, positive is income)
  const isIncome = (apiTransaction.amount ?? 0) > 0;

  // Get proper title from note or create a default based on category
  const title = apiTransaction.note ?? category?.name ?? 'Transaction';

  // Choose appropriate icon based on category or transaction type
  const getTransactionIcon = () => {
    if (category?.name) {
      const categoryName = category.name.toLowerCase();
      if (categoryName.includes('food') || categoryName.includes('dining')) return '🍽️';
      if (categoryName.includes('transport') || categoryName.includes('car')) return '🚗';
      if (categoryName.includes('shopping')) return '🛍️';
      if (categoryName.includes('entertainment')) return '🎬';
      if (categoryName.includes('bill') || categoryName.includes('utility')) return '📄';
      if (categoryName.includes('health')) return '🏥';
      if (categoryName.includes('education')) return '📚';
      if (categoryName.includes('travel')) return '✈️';
    }
    return isIncome ? '💰' : '💳';
  };

  return {
    id: apiTransaction.id?.toString() ?? '',
    title,
    amount: Math.abs(apiTransaction.amount ?? 0),
    type: isIncome ? 'income' : 'expense',
    category: category?.name ?? 'General',
    paymentMethod: account?.name ?? 'Unknown Account',
    icon: getTransactionIcon(),
    iconBgColor: isIncome ? 'bg-green-100' : 'bg-red-100',
    iconTextColor: isIncome ? 'text-green-600' : 'text-red-600',
    date: new Date(apiTransaction.date ?? new Date()),
    balance: undefined, // This would need to be calculated or provided by the API
  };
};

export function TransactionList({
  startDate,
  endDate,
  className,
  showBalance = true,
  groupId,
  accountId,
  categoryId,
  mode = 'replace',
  existingDateRanges = [],
  onDataLoad,
}: TransactionListProps) {
  // Check if we need to fetch data for this range
  const shouldFetchData = useMemo(() => {
    if (mode === 'replace') return true;

    // Check if the current range overlaps with any existing ranges
    return !existingDateRanges.some((existingRange) => {
      return startDate >= existingRange.startDate && endDate <= existingRange.endDate;
    });
  }, [startDate, endDate, mode, existingDateRanges]);

  // Format dates for API query
  const formatDateForApi = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  // Only fetch if we need new data
  const transactionQueryParams = {
    startDate: formatDateForApi(startDate),
    endDate: formatDateForApi(endDate),
    groupId,
    accountId,
    categoryId,
    sortBy: 'date' as const,
    sortOrder: 'desc' as const,
    pageSize: 100,
  };

  const [transactionsData, transactionsError, transactionsState] = useApiTransactionsQuery(
    shouldFetchData ? transactionQueryParams : undefined
  );

  // Notify parent when data is loaded
  useEffect(() => {
    if (transactionsData && onDataLoad && shouldFetchData) {
      onDataLoad({ startDate, endDate });
    }
  }, [transactionsData, onDataLoad, startDate, endDate, shouldFetchData]);

  // Fetch accounts and categories for proper data mapping
  const [accountsData] = useApiAccountsQuery();
  const [categoriesData] = useApiCategoriesQuery();

  // Create lookup maps for accounts and categories
  const accountsMap = useMemo(() => {
    const map = new Map<number, Account>();
    accountsData?.items?.forEach((account) => {
      if (account.id) {
        map.set(account.id, account);
      }
    });
    return map;
  }, [accountsData?.items]);

  const categoriesMap = useMemo(() => {
    const map = new Map<number, Category>();
    categoriesData?.items?.forEach((category) => {
      if (category.id) {
        map.set(category.id, category);
      }
    });
    return map;
  }, [categoriesData?.items]);

  // Group transactions by date
  const transactionsByDate = useMemo(() => {
    if (!transactionsData?.items) return new Map<string, Transaction[]>();

    const grouped = new Map<string, Transaction[]>();

    transactionsData.items.forEach((apiTransaction) => {
      const transaction = convertApiTransactionToComponent(apiTransaction, accountsMap, categoriesMap);
      const dateKey = transaction.date.toDateString();

      if (!grouped.has(dateKey)) {
        grouped.set(dateKey, []);
      }
      grouped.get(dateKey)!.push(transaction);
    });

    // Sort transactions within each day by time (newest first)
    grouped.forEach((transactions) => {
      transactions.sort((a, b) => b.date.getTime() - a.date.getTime());
    });

    return grouped;
  }, [transactionsData?.items, accountsMap, categoriesMap]);

  // Generate all dates in the range to ensure we show empty days
  const datesInRange = useMemo(() => {
    const dates: Date[] = [];
    const currentDate = new Date(startDate);

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates.reverse(); // Show newest dates first
  }, [startDate, endDate]);

  if (transactionsState.isLoading) {
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

  if (transactionsState.isError || transactionsError) {
    return (
      <div className={cn('bg-red-50 border border-red-200 rounded-lg p-4', className)}>
        <p className="text-red-600 text-sm">Failed to load transactions. Please try again.</p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-4', className)}>
      {datesInRange.map((date) => {
        const dateKey = date.toDateString();
        const dayTransactions = transactionsByDate.get(dateKey) ?? [];

        // Always show the date group, even if there are no transactions
        return <TransactionGroup key={dateKey} date={date} transactions={dayTransactions} showBalance={showBalance} />;
      })}
    </div>
  );
}
