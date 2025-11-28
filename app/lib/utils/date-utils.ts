/**
 * Date utility functions for formatting and parsing dates
 */

/**
 * Format date to YYYY-MM-DD string (local time)
 */
export function formatDateToString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Parse date from YYYY-MM-DD string (local time)
 */
export function parseDateFromString(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * Format date for display in Russian locale
 */
export function formatDateForDisplay(date: Date): string {
  return date.toLocaleDateString('ru-RU', { 
    day: 'numeric', 
    month: 'short', 
    weekday: 'short' 
  });
}

