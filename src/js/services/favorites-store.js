/**
 * Favorites data store (localStorage)
 * Pure data layer - no UI logic
 */

const STORAGE_KEY = 'favoriteWorkouts';

/**
 * Get all favorites from localStorage
 * @returns {Array}
 */
export function getFavorites() {
  try {
    const favorites = localStorage.getItem(STORAGE_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (err) {
    console.error('Failed to get favorites:', err);
    return [];
  }
}

/**
 * Save favorites to localStorage
 * @param {Array} favorites
 */
function saveFavorites(favorites) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
}

/**
 * Add workout to favorites
 * @param {Object} workout
 * @returns {boolean} success
 */
export function addFavorite(workout) {
  try {
    const favorites = getFavorites();

    if (favorites.some(fav => fav._id === workout._id)) {
      return false;
    }

    favorites.push(workout);
    saveFavorites(favorites);
    return true;
  } catch (err) {
    console.error('Failed to add favorite:', err);
    return false;
  }
}

/**
 * Remove workout from favorites
 * @param {string} workoutId
 * @returns {boolean} success
 */
export function removeFavorite(workoutId) {
  try {
    const favorites = getFavorites();
    const filtered = favorites.filter(fav => fav._id !== workoutId);
    saveFavorites(filtered);
    return true;
  } catch (err) {
    console.error('Failed to remove favorite:', err);
    return false;
  }
}

/**
 * Check if workout is in favorites
 * @param {string} workoutId
 * @returns {boolean}
 */
export function isFavorite(workoutId) {
  return getFavorites().some(fav => fav._id === workoutId);
}

/**
 * Toggle favorite status
 * @param {Object} workout
 * @returns {boolean} new favorite status
 */
export function toggleFavorite(workout) {
  if (isFavorite(workout._id)) {
    removeFavorite(workout._id);
    return false;
  }
  addFavorite(workout);
  return true;
}
