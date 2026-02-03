/**
 * Favorites data store (localStorage)
 * Pure data layer - no UI logic
 */

const STORAGE_KEY = 'favoriteWorkouts';

/**
 * Normalize stored favorites to an array of ids.
 * @param {Array} favorites
 * @returns {Array<string>}
 */
function normalizeFavorites(favorites) {
  if (!Array.isArray(favorites)) return [];

  const ids = [];
  const seen = new Set();

  favorites.forEach(item => {
    const id = typeof item === 'string' ? item : item?._id;
    if (id && !seen.has(id)) {
      seen.add(id);
      ids.push(id);
    }
  });

  return ids;
}

/**
 * Get all favorite ids from localStorage
 * @returns {Array<string>}
 */
export function getFavorites() {
  try {
    const favorites = localStorage.getItem(STORAGE_KEY);
    const parsed = favorites ? JSON.parse(favorites) : [];
    const normalized = normalizeFavorites(parsed);

    if (JSON.stringify(parsed) !== JSON.stringify(normalized)) {
      saveFavorites(normalized);
    }

    return normalized;
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
 * Get workout id from object or string
 * @param {Object|string} workout
 * @returns {string|null}
 */
function getWorkoutId(workout) {
  if (!workout) return null;
  if (typeof workout === 'string') return workout;
  return workout._id || null;
}

/**
 * Add workout id to favorites
 * @param {Object|string} workout
 * @returns {boolean} success
 */
export function addFavorite(workout) {
  try {
    const workoutId = getWorkoutId(workout);
    if (!workoutId) return false;

    const favorites = getFavorites();

    if (favorites.includes(workoutId)) {
      return false;
    }

    favorites.push(workoutId);
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
    const filtered = favorites.filter(favId => favId !== workoutId);
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
  return getFavorites().includes(workoutId);
}

/**
 * Toggle favorite status
 * @param {Object} workout
 * @returns {boolean} new favorite status
 */
export function toggleFavorite(workout) {
  const workoutId = getWorkoutId(workout);
  if (!workoutId) return false;

  if (isFavorite(workoutId)) {
    removeFavorite(workoutId);
    return false;
  }
  addFavorite(workout);
  return true;
}
