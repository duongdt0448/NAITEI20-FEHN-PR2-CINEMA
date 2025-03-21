/**
 * Format a number as Vietnamese currency (VND)
 * @param {number} amount - The amount to format
 * @param {boolean} showCurrency - Whether to include the currency symbol
 * @param {boolean} compact - Whether to display in compact form for large numbers
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount, showCurrency = true, compact = false) {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return "0 ₫";
  }

  // For large numbers, use compact notation if requested
  if (compact && amount >= 1000000) {
    const millions = amount / 1000000;
    return `${millions.toFixed(1).replace(/\.0$/, "")}M${
      showCurrency ? " ₫" : ""
    }`;
  }

  // Format with thousand separators
  const formattedAmount = amount.toLocaleString("vi-VN");

  // Add currency symbol if requested
  return showCurrency ? `${formattedAmount} ₫` : formattedAmount;
}

/**
 * Format a date string to Vietnamese format
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
  if (!date) return "";

  const d = new Date(date);
  if (isNaN(d.getTime())) return "";

  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Format a time string to 24-hour format
 * @param {string} time - Time string (e.g., "13:45")
 * @returns {string} Formatted time string (e.g., "13h45")
 */
export function formatTime(time) {
  if (!time) return "";

  const [hours, minutes] = time.split(":");
  return `${hours}h${minutes || "00"}`;
}
