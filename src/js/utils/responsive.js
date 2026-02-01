/**
 * Responsive breakpoints and utilities
 */

export const BREAKPOINTS = {
  mobile: 767,
  tablet: 1439,
  desktop: 1440,
};

/**
 * Check if current viewport is mobile
 */
export function isMobile() {
  return window.innerWidth <= BREAKPOINTS.mobile;
}

/**
 * Check if current viewport is tablet
 */
export function isTablet() {
  return window.innerWidth > BREAKPOINTS.mobile && window.innerWidth < BREAKPOINTS.desktop;
}

/**
 * Check if current viewport is desktop
 */
export function isDesktop() {
  return window.innerWidth >= BREAKPOINTS.desktop;
}

/**
 * Get items limit for categories grid
 */
export function getCategoriesLimit() {
  return isMobile() ? 9 : 12;
}

/**
 * Get items limit for exercises grid
 */
export function getExercisesLimit() {
  return isMobile() ? 8 : 10;
}

/**
 * Get items per page for favorites
 */
export function getFavoritesPerPage() {
  if (isDesktop()) return Infinity;
  if (isTablet()) return 10;
  return 8;
}

/**
 * Check if favorites should use pagination
 */
export function shouldPaginateFavorites() {
  return !isDesktop();
}

/**
 * Create debounced resize handler
 * @param {Function} callback
 * @param {number} delay
 * @returns {Function} cleanup function
 */
export function onResize(callback, delay = 300) {
  let timeoutId;

  const handler = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };

  window.addEventListener('resize', handler);

  return () => {
    clearTimeout(timeoutId);
    window.removeEventListener('resize', handler);
  };
}
