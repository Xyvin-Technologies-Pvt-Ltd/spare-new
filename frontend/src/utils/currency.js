/**
 * Format price in Omani Rial (OMR)
 * @param {number} amount - The amount to format
 * @param {string} locale - The locale to use for formatting
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount, locale = 'en-OM') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'OMR',
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(amount);
};

/**
 * Format date for order display
 * @param {Date|string} date - The date to format
 * @param {string} locale - The locale to use for formatting
 * @returns {string} Formatted date string
 */
export const formatDate = (date, locale = 'en-OM') => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date));
};

/**
 * Format date and time for order display
 * @param {Date|string} date - The date to format
 * @param {string} locale - The locale to use for formatting
 * @returns {string} Formatted date and time string
 */
export const formatDateTime = (date, locale = 'en-OM') => {
  return new Intl.DateTimeFormat(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
};

