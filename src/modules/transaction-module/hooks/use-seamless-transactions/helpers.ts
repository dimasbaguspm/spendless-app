import type { Transaction as ApiTransaction, Account, Category } from '../../../../types/api';
import { type Transaction } from '../../components/transaction-card';

/**
 * Formats a Date object to API-compatible date string (YYYY-MM-DD)
 */
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

/**
 * Generates an array of date strings between start and end dates (inclusive)
 */
export function generateDateRange(start: Date, end: Date): string[] {
  const dates: string[] = [];
  const currentDate = new Date(start);

  while (currentDate <= end) {
    dates.push(formatDate(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
}

/**
 * Expands a date range by adding buffer days on each side for caching purposes
 */
export function expandDateRange(start: Date, end: Date, bufferDays: number = 30) {
  const expandedStart = new Date(start);
  expandedStart.setDate(expandedStart.getDate() - bufferDays);

  const expandedEnd = new Date(end);
  expandedEnd.setDate(expandedEnd.getDate() + bufferDays);

  return { expandedStart, expandedEnd };
}

/**
 * Gets an appropriate icon for a transaction based on category or transaction type
 */
export function getTransactionIcon(category: Category | null | undefined, isIncome: boolean): string {
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
}

/**
 * Converts an API Transaction to a component Transaction format
 */
export function convertApiTransactionToComponent(
  apiTransaction: ApiTransaction,
  accountsMap: Map<number, Account>,
  categoriesMap: Map<number, Category>
): Transaction {
  const account = apiTransaction.accountId ? accountsMap.get(apiTransaction.accountId) : null;
  const category = apiTransaction.categoryId ? categoriesMap.get(apiTransaction.categoryId) : null;

  // Determine transaction type based on amount (negative is expense, positive is income)
  const isIncome = (apiTransaction.amount ?? 0) > 0;

  // Get proper title from note or create a default based on category
  const title = apiTransaction.note ?? category?.name ?? 'Transaction';

  return {
    id: apiTransaction.id?.toString() ?? '',
    title,
    amount: Math.abs(apiTransaction.amount ?? 0),
    type: isIncome ? 'income' : 'expense',
    category: category?.name ?? 'General',
    paymentMethod: account?.name ?? 'Unknown Account',
    icon: getTransactionIcon(category, isIncome),
    iconBgColor: isIncome ? 'bg-green-100' : 'bg-red-100',
    iconTextColor: isIncome ? 'text-green-600' : 'text-red-600',
    date: new Date(apiTransaction.date ?? new Date()),
    balance: undefined, // This would need to be calculated or provided by the API
  };
}

/**
 * Creates a Map from an array of accounts for quick lookup by ID
 */
export function createAccountsMap(accounts: Account[] | undefined): Map<number, Account> {
  const map = new Map<number, Account>();
  accounts?.forEach((account) => {
    if (account.id) {
      map.set(account.id, account);
    }
  });
  return map;
}

/**
 * Creates a Map from an array of categories for quick lookup by ID
 */
export function createCategoriesMap(categories: Category[] | undefined): Map<number, Category> {
  const map = new Map<number, Category>();
  categories?.forEach((category) => {
    if (category.id) {
      map.set(category.id, category);
    }
  });
  return map;
}

/**
 * Groups transactions by date, ensuring all dates in the range are present
 * Returns an array of tuples in the format [date, transactions[]]
 */
export function groupTransactionsByDate(transactions: Transaction[], dateRange: string[]): [string, Transaction[]][] {
  const transactionsByDate: Record<string, Transaction[]> = {};

  // Initialize all dates with empty arrays
  dateRange.forEach((date) => {
    transactionsByDate[date] = [];
  });

  // Group transactions by their date
  transactions.forEach((transaction) => {
    const transactionDate = formatDate(transaction.date);
    if (transactionsByDate[transactionDate]) {
      transactionsByDate[transactionDate].push(transaction);
    }
  });

  // Convert to array of tuples and sort by date (future dates first, then today, then past)
  return Object.entries(transactionsByDate).sort((a, b) => new Date(b[0]).getTime() - new Date(a[0]).getTime());
}
