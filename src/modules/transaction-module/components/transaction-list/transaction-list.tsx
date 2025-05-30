import { useMemo } from 'react';

import { cn } from '../../../../libs/utils';
import { TransactionGroup, type Transaction } from '../transaction-card';

export interface TransactionListProps {
  startDate: Date;
  endDate: Date;
  transactions: Transaction[]; // Pre-fetched and processed transactions
  className?: string;
  showBalance?: boolean;
}

export function TransactionList({
  startDate,
  endDate,
  transactions,
  className,
  showBalance = true,
}: TransactionListProps) {
  // Group transactions by date
  const transactionsByDate = useMemo(() => {
    const grouped = new Map<string, Transaction[]>();

    transactions.forEach((transaction) => {
      const dateKey = transaction.date.toDateString();

      if (!grouped.has(dateKey)) {
        grouped.set(dateKey, []);
      }
      grouped.get(dateKey)!.push(transaction);
    });

    // Sort transactions within each day by time (newest first)
    grouped.forEach((dayTransactions) => {
      dayTransactions.sort((a, b) => b.date.getTime() - a.date.getTime());
    });

    return grouped;
  }, [transactions]);

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
