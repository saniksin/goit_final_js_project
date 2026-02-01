/**
 * Exercise details modal
 * Shared between home and favorites pages
 */

import spriteUrl from '../../img/sprite.svg';
import { $ } from '../utils/dom.js';
import { openPopup, closePopup } from './modal.js';
import { showRatingPopup, setupRatingModal } from './rating-modal.js';
import { isFavorite, addFavorite, removeFavorite } from '../services/favorites-store.js';
import { getExerciseById } from '../api/exercises.js';

/**
 * Cleanup exercise modal listeners
 */
function cleanupExerciseModal() {
  const closeBtn = $('modal-close-btn');
  const giveRatingBtn = $('give-rating-btn');
  const addToFavoritesBtn = $('add-to-favorites-btn');

  if (closeBtn) closeBtn.onclick = null;
  if (giveRatingBtn) giveRatingBtn.onclick = null;
  if (addToFavoritesBtn) addToFavoritesBtn.onclick = null;
}

/**
 * Render workout details in popup
 * @param {Object} workout
 */
export function renderWorkoutPopup(workout) {
  if (!workout) return;

  // Update GIF
  const gifElement = $('modal-workout-gif');
  if (gifElement) {
    gifElement.src = workout.gifUrl || '';
    gifElement.alt = workout.name || 'Workout';
  }

  // Update title
  const titleElement = $('modal-workout-title');
  if (titleElement) {
    titleElement.textContent = workout.name || 'Workout';
  }

  // Update rating
  const ratingElement = $('modal-workout-rating');
  if (ratingElement) {
    const rating = workout.rating || 0;
    const fullStars = Math.floor(rating);

    ratingElement.innerHTML = `
      <span class="rating-value">${rating.toFixed(1)}</span>
      <div class="rating-stars">
        ${Array.from({ length: 5 }, (_, i) => {
          const filled = i < fullStars ? 'filled' : '';
          return `<svg class="star ${filled}" width="18" height="18" aria-hidden="true">
            <use href="${spriteUrl}#icon-star"></use>
          </svg>`;
        }).join('')}
      </div>
    `;
  }

  // Update details
  const targetElement = $('modal-target');
  if (targetElement) targetElement.textContent = workout.target || 'N/A';

  const bodyPartElement = $('modal-bodypart');
  if (bodyPartElement) bodyPartElement.textContent = workout.bodyPart || 'N/A';

  const equipmentElement = $('modal-equipment');
  if (equipmentElement) equipmentElement.textContent = workout.equipment || 'N/A';

  const popularElement = $('modal-popular');
  if (popularElement) popularElement.textContent = workout.popularity || '0';

  const caloriesElement = $('modal-calories');
  if (caloriesElement) {
    caloriesElement.textContent = `${workout.burnedCalories || 0}/${workout.time || 0} min`;
  }

  // Update description
  const descriptionElement = $('modal-description');
  if (descriptionElement) {
    descriptionElement.textContent = workout.description || 'No description available.';
  }

  // Store workout ID
  const popup = $('workout-popup');
  if (popup) {
    popup.dataset.workoutId = workout._id;
  }
}

/**
 * Update favorite button appearance
 * @param {string} exerciseId
 */
function updateFavoriteButton(exerciseId) {
  const btn = $('add-to-favorites-btn');
  if (!btn) return;

  if (isFavorite(exerciseId)) {
    btn.innerHTML = `
      <span class="btn-text">Remove from favorites</span>
      <svg width="20" height="20" aria-hidden="true">
        <use href="${spriteUrl}#icon-trash"></use>
      </svg>
    `;
  } else {
    btn.innerHTML = `
      <span class="btn-text">Add to favorites</span>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path d="M10 3.5C10 3.5 6.5 1 3.5 3.5C0.5 6 2 10 10 16.5C18 10 19.5 6 16.5 3.5C13.5 1 10 3.5 10 3.5Z" stroke="currentColor" stroke-width="1.5"/>
      </svg>
    `;
  }
}

/**
 * Setup exercise modal for a specific exercise
 * @param {string} exerciseId
 * @param {Object} options
 * @param {Function} options.onFavoriteChange - Callback when favorite status changes
 */
export function setupExerciseModal(exerciseId, options = {}) {
  // Cleanup previous listeners
  cleanupExerciseModal();

  const { onFavoriteChange } = options;

  // Close button
  const closeBtn = $('modal-close-btn');
  if (closeBtn) {
    closeBtn.onclick = () => {
      cleanupExerciseModal();
      closePopup('workout-modal');
    };
  }

  // Rating button
  const giveRatingBtn = $('give-rating-btn');
  if (giveRatingBtn) {
    giveRatingBtn.onclick = () => {
      showRatingPopup();
      setupRatingModal(exerciseId);
    };
  }

  // Favorites button
  const addToFavoritesBtn = $('add-to-favorites-btn');
  if (addToFavoritesBtn) {
    updateFavoriteButton(exerciseId);

    addToFavoritesBtn.onclick = async () => {
      if (isFavorite(exerciseId)) {
        removeFavorite(exerciseId);
      } else {
        const exercise = await getExerciseById(exerciseId);
        addFavorite(exercise);
      }
      updateFavoriteButton(exerciseId);

      if (onFavoriteChange) {
        onFavoriteChange(exerciseId, isFavorite(exerciseId));
      }
    };
  }
}

/**
 * Open exercise modal with workout data
 * @param {string} exerciseId
 * @param {Object} options
 */
export async function openExerciseModal(exerciseId, options = {}) {
  try {
    const exercise = await getExerciseById(exerciseId);
    renderWorkoutPopup(exercise);
    openPopup('workout-modal');
    setupExerciseModal(exerciseId, options);
  } catch (err) {
    console.error(`Failed to fetch exercise details for ${exerciseId}:`, err);
  }
}
