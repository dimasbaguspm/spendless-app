import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import weekday from 'dayjs/plugin/weekday';

// Configure dayjs plugins
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(weekday);

// Date utility functions for weekly date ribbon using dayjs
export function getStartOfWeek(date: Date | Dayjs): Date {
  return dayjs(date).weekday(0).startOf('day').toDate(); // Monday = 0
}

export function getEndOfWeek(date: Date | Dayjs): Date {
  return dayjs(date).weekday(6).endOf('day').toDate(); // Sunday = 6
}

export function addDays(date: Date | Dayjs, days: number): Date {
  return dayjs(date).add(days, 'day').toDate();
}

export function addWeeks(date: Date | Dayjs, weeks: number): Date {
  return dayjs(date).add(weeks, 'week').toDate();
}

export function formatDate(date: Date | Dayjs, format: 'short' | 'long' | 'day' | 'dayNum' = 'short'): string {
  const dayjsDate = dayjs(date);

  if (format === 'day') {
    return dayjsDate.format('ddd'); // Mon, Tue, Wed, etc.
  }
  if (format === 'dayNum') {
    return dayjsDate.format('D'); // 1, 2, 3, etc.
  }
  if (format === 'long') {
    return dayjsDate.format('MMM D, YYYY'); // Jan 1, 2023
  }
  return dayjsDate.format('MMM D'); // Jan 1
}

export function isSameDay(date1: Date | Dayjs, date2: Date | Dayjs): boolean {
  return dayjs(date1).isSame(dayjs(date2), 'day');
}

export function isToday(date: Date | Dayjs): boolean {
  return dayjs(date).isSame(dayjs(), 'day');
}

export function generateWeekDays(startDate: Date | Dayjs): Date[] {
  const weekStart = getStartOfWeek(startDate);
  return Array.from({ length: 7 }, (_, index) => addDays(weekStart, index));
}

export function generateCenteredSixMonthsWeeks(centerDate: Date | Dayjs = new Date()): Date[] {
  const today = dayjs(centerDate);
  const threeMonthsBefore = today.subtract(3, 'month');
  const threeMonthsAfter = today.add(3, 'month');

  // Start from the beginning of the week 3 months before
  let currentWeekStart = getStartOfWeek(threeMonthsBefore);
  const endWeekStart = getStartOfWeek(threeMonthsAfter);

  const allDays: Date[] = [];

  // Generate all weeks from 3 months before to 3 months after
  while (dayjs(currentWeekStart).isSameOrBefore(endWeekStart, 'week')) {
    allDays.push(...generateWeekDays(currentWeekStart));
    currentWeekStart = addWeeks(currentWeekStart, 1);
  }

  return allDays;
}
