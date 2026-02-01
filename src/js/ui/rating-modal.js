/**
 * Rating modal functionality
 * Shared between home and favorites pages
 */

import { $ } from '../utils/dom.js';
import { notify } from './notifications.js';
import { closePopup, openPopup } from './modal.js';
import { updateRating } from '../api/exercises.js';

// Current exercise ID for rating
let currentExerciseId = null;

// Form submit handler reference for cleanup
let formSubmitHandler = null;

/**
 * Get current rating value
 */
export function getCurrentRating() {
  const checkedRadio = document.querySelector('#rating-stars .rating-radio:checked');
  return checkedRadio ? parseFloat(checkedRadio.value) : 0;
}

/**
 * Reset rating form
 */
function resetRatingForm() {
  const ratingForm = $('rating-form');
  const ratingValue = $('rating-display-value');

  if (ratingForm) ratingForm.reset();
  if (ratingValue) ratingValue.textContent = '0.0';
}

/**
 * Initialize rating stars interaction (once)
 */
function initRatingStars() {
  const starsContainer = $('rating-stars');
  const ratingValue = $('rating-display-value');

  if (!starsContainer) return;
  if (starsContainer.dataset.listenerRating === 'true') return;
  starsContainer.dataset.listenerRating = 'true';

  starsContainer.addEventListener('change', e => {
    if (e.target.classList.contains('rating-radio')) {
      const rating = parseFloat(e.target.value);
      if (ratingValue) {
        ratingValue.textContent = rating.toFixed(1);
      }
    }
  });
}

/**
 * Cleanup rating modal listeners
 */
function cleanupRatingModal() {
  const ratingForm = $('rating-form');
  if (ratingForm && formSubmitHandler) {
    ratingForm.removeEventListener('submit', formSubmitHandler);
    formSubmitHandler = null;
  }
  currentExerciseId = null;
}

/**
 * Show rating popup
 */
export function showRatingPopup() {
  closePopup('workout-modal');
  openPopup('rating-modal');
  resetRatingForm();
  initRatingStars();
}

/**
 * Hide rating popup
 */
export function hideRatingPopup() {
  cleanupRatingModal();
  closePopup('rating-modal');
  resetRatingForm();
}

/**
 * Setup rating modal for a specific exercise
 * @param {string} exerciseId
 */
export function setupRatingModal(exerciseId) {
  // Cleanup previous listeners
  cleanupRatingModal();

  currentExerciseId = exerciseId;

  const closeBtn = $('rating-popup-close-btn');
  if (closeBtn) {
    closeBtn.onclick = () => {
      hideRatingPopup();
    };
  }

  const ratingForm = $('rating-form');
  if (ratingForm) {
    formSubmitHandler = async e => {
      e.preventDefault();

      // Native validation
      if (!ratingForm.checkValidity()) {
        ratingForm.reportValidity();
        return;
      }

      const rating = getCurrentRating();
      const emailInput = $('rating-email');
      const reviewInput = $('rating-review');
      const email = emailInput?.value.trim();
      const review = reviewInput?.value.trim() || '';

      try {
        await updateRating(currentExerciseId, rating, email, review);
        notify.success('Rating submitted successfully!');
        hideRatingPopup();
      } catch (err) {
        console.error('Failed to submit rating:', err);
      }
    };

    ratingForm.addEventListener('submit', formSubmitHandler);
  }
}
