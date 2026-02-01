/**
 * DOM utility functions
 */

/**
 * Convert string to camelCase for dataset keys
 * @param {string} str
 * @returns {string}
 */
function toCamelCase(str) {
  return str.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
}

/**
 * Attach event listener only once (prevents duplicates)
 * @param {HTMLElement} element
 * @param {string} event
 * @param {Function} handler
 * @param {string} key - unique key for this listener
 */
export function attachOnce(element, event, handler, key = event) {
  if (!element) return false;

  const dataKey = toCamelCase(`listener-${key}`);
  if (element.dataset[dataKey] === 'true') return false;

  element.dataset[dataKey] = 'true';
  element.addEventListener(event, handler);
  return true;
}

/**
 * Get element by ID with type safety
 * @param {string} id
 * @returns {HTMLElement|null}
 */
export function $(id) {
  return document.getElementById(id);
}

/**
 * Query selector shorthand
 * @param {string} selector
 * @param {HTMLElement} parent
 * @returns {HTMLElement|null}
 */
export function $$(selector, parent = document) {
  return parent.querySelector(selector);
}

/**
 * Query selector all shorthand
 * @param {string} selector
 * @param {HTMLElement} parent
 * @returns {NodeListOf<HTMLElement>}
 */
export function $$$(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

/**
 * Scroll element into view smoothly
 * @param {string} targetId
 * @param {string} fallbackSelector
 */
export function scrollToElement(targetId, fallbackSelector) {
  const target = $(targetId) || $$(fallbackSelector);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
  }
}
