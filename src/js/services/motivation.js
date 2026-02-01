/**
 * Motivation of the Day service
 * Fetches and caches daily quotes
 */

import { getQuote } from '../api/exercises.js';
import { renderQuote } from '../templates/renderer.js';

const STORAGE_KEY = 'motivation-of-the-day';

/**
 * Get today's date in YYYY-MM-DD format
 */
function getTodayDate() {
  return new Date().toISOString().split('T')[0];
}

/**
 * Get cached motivation from localStorage
 * @returns {Object|null}
 */
function getCachedMotivation() {
  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (!cached) return null;

    const { quote, author, date } = JSON.parse(cached);

    if (date === getTodayDate()) {
      return { quote, author };
    }

    localStorage.removeItem(STORAGE_KEY);
    return null;
  } catch (error) {
    console.error('Error reading cached motivation:', error);
    return null;
  }
}

/**
 * Save motivation to localStorage
 * @param {string} quote
 * @param {string} author
 */
function cacheMotivation(quote, author) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      quote,
      author,
      date: getTodayDate(),
    }));
  } catch (error) {
    console.error('Error caching motivation:', error);
  }
}

/**
 * Initialize Motivation of the Day
 * Checks cache first, otherwise fetches from API
 */
export async function initMotivation() {
  try {
    let motivationData = getCachedMotivation();

    if (!motivationData) {
      motivationData = await getQuote();
      cacheMotivation(motivationData.quote, motivationData.author);
    }

    renderQuote(motivationData);
  } catch (err) {
    console.error('Failed to initialize motivation:', err);
  }
}
