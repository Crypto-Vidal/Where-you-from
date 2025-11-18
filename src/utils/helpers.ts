// Utility helper functions for Where You From

/**
 * Format price to USD currency
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

/**
 * Calculate discount percentage
 */
export const calculateDiscount = (price: number, compareAtPrice: number): number => {
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
};

/**
 * Generate star rating array for display
 */
export const getStarRating = (rating: number): { full: number; half: boolean; empty: number } => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  const empty = 5 - full - (half ? 1 : 0);
  return { full, half, empty };
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

/**
 * Format date to readable string
 */
export const formatDate = (date: string | Date): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
};

/**
 * Calculate time remaining for countdown
 */
export const getTimeRemaining = (endDate: Date): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
} => {
  const total = endDate.getTime() - new Date().getTime();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds };
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate product URL
 */
export const getProductUrl = (slug: string): string => {
  return `/products/${slug}`;
};

/**
 * Generate collection URL
 */
export const getCollectionUrl = (slug: string): string => {
  return `/collections/${slug}`;
};

/**
 * Shuffle array (for random product suggestions)
 */
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Check if product is on sale
 */
export const isOnSale = (price: number, compareAtPrice?: number): boolean => {
  return !!compareAtPrice && compareAtPrice > price;
};

/**
 * Get availability status text
 */
export const getAvailabilityText = (inStock: boolean, quantity?: number): string => {
  if (!inStock) return 'Out of Stock';
  if (quantity && quantity < 10) return `Only ${quantity} left!`;
  return 'In Stock';
};

/**
 * Class name utility (similar to clsx)
 */
export const cn = (...classes: (string | boolean | undefined | null)[]): string => {
  return classes.filter(Boolean).join(' ');
};
