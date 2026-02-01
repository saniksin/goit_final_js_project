/**
 * Favorites Page Controller
 */

import { getFavorites, removeFavorite } from '../services/favorites-store.js';
import { renderFavoritesList } from '../templates/renderer.js';
import { renderPager, setupPager } from '../ui/pagination.js';
import { openExerciseModal } from '../ui/exercise-modal.js';
import { closePopup } from '../ui/modal.js';
import { initMotivation } from '../services/motivation.js';
import { attachOnce, $ } from '../utils/dom.js';
import { getFavoritesPerPage, shouldPaginateFavorites, onResize } from '../utils/responsive.js';
import { runAfterLoad } from '../utils/scheduler.js';

// Page state
const state = {
  page: 1,
};

/**
 * Render favorites with pagination
 */
async function renderFavorites() {
  const container = $('favorites-container');
  if (!container) return;

  const allFavorites = getFavorites();

  if (allFavorites.length === 0) {
    await renderFavoritesList([], 'favorites-container');
    renderPager(1, 1, 'favorites-pager');
    return;
  }

  const perPage = getFavoritesPerPage();
  const shouldPaginate = shouldPaginateFavorites();
  const totalPages = shouldPaginate ? Math.ceil(allFavorites.length / perPage) : 1;

  // Ensure current page is valid
  if (state.page > totalPages) {
    state.page = totalPages;
  }

  // Get items for current page
  const startIndex = shouldPaginate ? (state.page - 1) * perPage : 0;
  const endIndex = shouldPaginate ? startIndex + perPage : allFavorites.length;
  const favorites = allFavorites.slice(startIndex, endIndex);

  await renderFavoritesList(favorites, 'favorites-container');

  if (shouldPaginate) {
    renderPager(state.page, totalPages, 'favorites-pager');
  }
}

/**
 * Handle page change
 */
function handlePageChange(newPage) {
  if (newPage && newPage !== state.page) {
    state.page = newPage;
    renderFavorites();
  }
}

/**
 * Handle favorite removal from modal
 */
async function handleFavoriteRemoved(workoutId) {
  closePopup('workout-popup');
  closePopup('workout-modal');
  await renderFavorites();
}

/**
 * Setup favorites container event delegation
 */
function setupFavoritesContainer() {
  const container = $('favorites-container');
  if (!container) return;

  attachOnce(container, 'click', async e => {
    // Handle delete button clicks
    const deleteBtn = e.target.closest('.bookmark-delete-btn');
    if (deleteBtn) {
      e.stopPropagation();
      const workoutId = deleteBtn.dataset.id;
      if (workoutId) {
        removeFavorite(workoutId);
        try {
          await renderFavorites();
        } catch (err) {
          console.error('Failed to render favorites:', err);
        }
      }
      return;
    }

    // Handle start button clicks
    const startBtn = e.target.closest('.workout-start-btn');
    if (startBtn) {
      e.stopPropagation();
      const workoutId = startBtn.dataset.id;
      if (workoutId) {
        openExerciseModal(workoutId, {
          onFavoriteChange: (id, isFavorite) => {
            if (!isFavorite) {
              handleFavoriteRemoved(id);
            }
          },
        });
      }
    }
  }, 'favorites');
}

/**
 * Setup resize listener
 */
function setupResizeListener() {
  let currentPerPage = getFavoritesPerPage();

  onResize(() => {
    const newPerPage = getFavoritesPerPage();
    if (newPerPage !== currentPerPage) {
      currentPerPage = newPerPage;
      state.page = 1;
      renderFavorites();
    }
  });
}

/**
 * Initialize favorites page
 */
export function initFavoritesPage() {
  const favoritesPage = document.querySelector('.favorites-page');

  if (favoritesPage) {
    favoritesPage.classList.add('loaded');
  }

  runAfterLoad(async () => {
    try {
      await initMotivation();
      await renderFavorites();
    } catch (err) {
      console.error('Error initializing favorites page:', err);
    }
  });

  setupFavoritesContainer();
  setupPager(handlePageChange, 'favorites-pager');
  setupResizeListener();
}
