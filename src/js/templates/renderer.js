/**
 * Template rendering utilities
 */

import exerciseCardTemplate from '../../partials/workout-tile.html?raw';
import categoryCardTemplate from '../../partials/section-tile.html?raw';
import favoritesEmptyTemplate from '../../partials/favorites-empty.html?raw';
import paginationTemplate from '../../partials/pager.html?raw';
import spriteUrl from '../../img/sprite.svg';

// Map of template names to raw HTML
const templates = {
  'workout-tile': exerciseCardTemplate,
  'section-tile': categoryCardTemplate,
  'favorites-empty': favoritesEmptyTemplate,
  'pagination': paginationTemplate,
};

/**
 * Load template by name
 * @param {string} templateName
 * @returns {Promise<string>}
 */
export async function loadTemplate(templateName) {
  const template = templates[templateName];

  if (template) {
    // Inject the correct sprite URL
    return template.replace(/\/img\/sprite\.svg/g, spriteUrl);
  }

  console.warn(`Template not found: ${templateName}`);
  return '';
}

/**
 * Replace placeholders in template with data
 * @param {string} template
 * @param {Object} data
 * @returns {string}
 */
export function replacePlaceholders(template, data) {
  return template.replace(/\{\{(\w+)\}\}/g, (_match, key) => {
    return data[key] !== undefined ? data[key] : '';
  });
}

/**
 * Render quote in motivation section
 * @param {Object} quoteData
 */
export function renderQuote(quoteData) {
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');

  if (quoteText && quoteData.quote) {
    quoteText.textContent = quoteData.quote;
  }
  if (quoteAuthor && quoteData.author) {
    quoteAuthor.textContent = quoteData.author;
  }
}

/**
 * Render exercises grid
 * @param {Array} exercises
 * @param {string} containerId
 */
export async function renderExercises(exercises, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (exercises.length === 0) {
    container.innerHTML = '<p class="no-results">No exercises found. Try another filter.</p>';
    return;
  }

  const template = await loadTemplate('workout-tile');

  const html = exercises
    .map(exercise => {
      return replacePlaceholders(template, {
        id: exercise._id,
        rating: exercise.rating || 0,
        ratingFormatted: exercise.rating ? exercise.rating.toFixed(1) : '0.0',
        cardClass: '',
        name: exercise.name,
        burnedCalories: exercise.burnedCalories || 0,
        time: exercise.time || 0,
        bodyPart: exercise.bodyPart || 'N/A',
        target: exercise.target || 'N/A',
      });
    })
    .join('');

  container.className = 'workouts-grid';
  container.innerHTML = html;
}

/**
 * Render categories grid
 * @param {Array} categories
 * @param {string} containerId
 */
export async function renderCategories(categories, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (categories.length === 0) {
    container.innerHTML = '<p class="no-results">No categories found.</p>';
    return;
  }

  const template = await loadTemplate('section-tile');

  const html = categories
    .map(cat => {
      return replacePlaceholders(template, {
        filter: cat.filter,
        name: cat.name,
        imgURL: cat.imgURL || '',
      });
    })
    .join('');

  container.className = 'sections-grid';
  container.innerHTML = html;
}

/**
 * Render favorites grid
 * @param {Array} favorites
 * @param {string} containerId
 */
export async function renderFavoritesList(favorites, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (favorites.length === 0) {
    const template = await loadTemplate('favorites-empty');
    container.innerHTML = template;
    return;
  }

  const template = await loadTemplate('workout-tile');

  const html = favorites
    .map(workout => {
      return replacePlaceholders(template, {
        id: workout._id,
        name: workout.name,
        burnedCalories: workout.burnedCalories || 0,
        time: workout.time || 0,
        bodyPart: workout.bodyPart || 'N/A',
        target: workout.target || 'N/A',
        rating: workout.rating || 0,
        ratingFormatted: workout.rating ? workout.rating.toFixed(1) : '0.0',
        cardClass: 'is-favorite',
      });
    })
    .join('');

  container.className = 'favorites-grid';
  container.innerHTML = html;
}
