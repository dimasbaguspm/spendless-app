import { cn } from '../../../../libs/utils';

import { TransactionCard, type Transaction } from './transaction-card';

export interface TransactionGroupProps {
  date: Date;
  transactions: Transaction[];
  className?: string;
  showBalance?: boolean;
}

export function TransactionGroup({ date, transactions, className, showBalance = true }: TransactionGroupProps) {
  const formatDate = (date: Date) => {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    // Check if it's today
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    }

    // Check if it's yesterday
    if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    }

    // Format as regular date
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTotalAmount = () => {
    return transactions.reduce((total, transaction) => {
      return total + (transaction.type === 'income' ? transaction.amount : -transaction.amount);
    }, 0);
  };

  const formatTotalAmount = (amount: number) => {
    const prefix = amount >= 0 ? '+' : '';
    return `${prefix}$${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  const totalAmount = getTotalAmount();

  if (transactions.length === 0) {
    return null;
  }

  return (
    <div className={cn('bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden', className)}>
      <div className="p-4 border-b border-slate-200 bg-slate-50">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-slate-900">{formatDate(date)}</h3>
          <div className="text-right">
            <p className={cn('font-semibold text-sm', totalAmount >= 0 ? 'text-green-600' : 'text-red-600')}>
              {formatTotalAmount(totalAmount)}
            </p>
            <p className="text-xs text-slate-500">
              {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-200">
        {transactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} showBalance={showBalance} />
        ))}
      </div>
    </div>
  );
}
