import { useState, useCallback, useMemo, useEffect } from 'react';

import { cn } from '../../../../libs/utils';
import { TransactionList } from '../transaction-list';

export interface SeamlessTransactionListProps {
  selectedDate: Date;
  className?: string;
  showBalance?: boolean;
  groupId?: number;
  accountId?: number;
  categoryId?: number;
  maxDaysBefore?: number; // Number of days to show before selected date on initial load (default: 4)
  loadMoreTrigger?: number; // Increment this to trigger loading 4 more days back
  onCanLoadMoreChange?: (canLoadMore: boolean) => void; // Notify parent about load more availability
}

interface DateRange {
  startDate: Date;
  endDate: Date;
}

export function SeamlessTransactionList({
  selectedDate,
  className,
  showBalance = true,
  groupId,
  accountId,
  categoryId,
  maxDaysBefore = 4, // Number of days before selected date to load initially
  loadMoreTrigger = 0,
  onCanLoadMoreChange,
}: SeamlessTransactionListProps) {
  // Track all loaded date ranges
  const [loadedRanges, setLoadedRanges] = useState<DateRange[]>([]);
  // Track how many additional days have been loaded
  const [additionalDaysLoaded, setAdditionalDaysLoaded] = useState(0);

  // Calculate a single day range
  const getDayRange = useCallback((date: Date): DateRange => {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return { startDate: startOfDay, endDate: endOfDay };
  }, []);

  // Generate day ranges to display (start with selected day + 4 days before, then add more days as requested)
  const dayRanges = useMemo(() => {
    const ranges: DateRange[] = [];

    // Calculate total days to show: selected date + initial maxDaysBefore + any additional days loaded
    const totalDaysToShow = 1 + maxDaysBefore + additionalDaysLoaded;

    // Add all days starting from selected date going backward
    for (let i = 0; i < totalDaysToShow; i++) {
      const dayDate = new Date(selectedDate);
      dayDate.setDate(dayDate.getDate() - i); // Go back i days (0 = selected date)
      ranges.push(getDayRange(dayDate));
    }

    return ranges.sort((a, b) => b.startDate.getTime() - a.startDate.getTime()); // Newest first
  }, [selectedDate, additionalDaysLoaded, maxDaysBefore, getDayRange]);

  // Function to load more days (beyond the initial maxDaysBefore)
  const loadMoreDays = useCallback(() => {
    // We can load more days beyond the initial load
    setAdditionalDaysLoaded((prev: number) => prev + 4); // Load 4 more days at a time
  }, []);

  // Effect to handle load more trigger
  useEffect(() => {
    if (loadMoreTrigger > 0) {
      loadMoreDays();
    }
  }, [loadMoreTrigger, loadMoreDays]);

  // Check if more days can be loaded (we can always load more, but let's set a reasonable limit)
  const maxTotalDays = 30; // Allow loading up to 30 days total
  const currentTotalDays = 1 + maxDaysBefore + additionalDaysLoaded;
  const canLoadMore = currentTotalDays < maxTotalDays;

  // Notify parent about load more availability changes
  useEffect(() => {
    onCanLoadMoreChange?.(canLoadMore);
  }, [canLoadMore, onCanLoadMoreChange]);

  // Handle data loading callback
  const handleDataLoad = useCallback((newRange: DateRange) => {
    setLoadedRanges((prev) => {
      // Check if this range is already loaded
      const isAlreadyLoaded = prev.some(
        (range) =>
          range.startDate.getTime() === newRange.startDate.getTime() &&
          range.endDate.getTime() === newRange.endDate.getTime()
      );

      if (isAlreadyLoaded) return prev;

      // Add the new range and sort by start date (newest first)
      return [...prev, newRange].sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
    });
  }, []);

  // Reset loaded ranges and additional days when major filters change
  useEffect(() => {
    setLoadedRanges([]);
    setAdditionalDaysLoaded(0);
  }, [groupId, accountId, categoryId, selectedDate]);

  // Check if a range should be fetched or is already loaded
  const getRangeMode = useCallback(
    (range: DateRange): 'replace' | 'append' | 'prepend' => {
      // If no ranges are loaded yet, use replace mode
      if (loadedRanges.length === 0) return 'replace';

      // Check if this range is adjacent to existing loaded ranges
      const isAdjacent = loadedRanges.some((loadedRange) => {
        const dayAfterLoaded = new Date(loadedRange.endDate);
        dayAfterLoaded.setDate(dayAfterLoaded.getDate() + 1);

        const dayBeforeLoaded = new Date(loadedRange.startDate);
        dayBeforeLoaded.setDate(dayBeforeLoaded.getDate() - 1);

        // Check if the new range is immediately before or after a loaded range
        return (
          range.startDate.getTime() === dayAfterLoaded.getTime() ||
          range.endDate.getTime() === dayBeforeLoaded.getTime()
        );
      });

      if (isAdjacent) {
        // Determine if we should append or prepend based on date
        const latestLoadedEnd = Math.max(...loadedRanges.map((r) => r.endDate.getTime()));
        return range.startDate.getTime() > latestLoadedEnd ? 'append' : 'prepend';
      }

      return 'replace';
    },
    [loadedRanges]
  );

  return (
    <div className={cn('space-y-4', className)}>
      {dayRanges.map((range, index) => {
        const mode = getRangeMode(range);
        const key = `${range.startDate.toISOString()}-${range.endDate.toISOString()}`;

        return (
          <TransactionList
            key={key}
            startDate={range.startDate}
            endDate={range.endDate}
            showBalance={showBalance}
            groupId={groupId}
            accountId={accountId}
            categoryId={categoryId}
            mode={mode}
            existingDateRanges={loadedRanges}
            onDataLoad={handleDataLoad}
            className={index > 0 ? 'border-t border-slate-200 pt-4' : undefined}
          />
        );
      })}
    </div>
  );
}
