
/**
 * Formats numbers with K, M, B suffixes
 * Example: 1500 -> 1.5K, 1500000 -> 1.5M
 */
export const formatNumber = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

/**
 * Formats a percentage with + or - sign
 * Example: 0.15 -> +15%, -0.05 -> -5%
 */
export const formatPercentage = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${(value * 100).toFixed(1)}%`;
};

/**
 * Shortens a URL for display
 * Example: https://www.example.com/very/long/path -> example.com/very/lon...
 */
export const shortenUrl = (url: string, maxLength: number = 30): string => {
  try {
    const urlObj = new URL(url);
    const domain = urlObj.hostname.replace('www.', '');
    const path = urlObj.pathname;
    
    const base = `${domain}${path}`;
    
    if (base.length <= maxLength) {
      return base;
    }
    
    return base.substring(0, maxLength - 3) + '...';
  } catch (e) {
    // If URL parsing fails, just truncate the string
    return url.length > maxLength ? url.substring(0, maxLength - 3) + '...' : url;
  }
};
