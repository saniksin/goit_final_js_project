/**
 * Home Page Controller
 * Manages categories, exercises, search, and modals
 */

import { getFilters, getExercises } from '../api/exercises.js';
import { renderCategories, renderExercises } from '../templates/renderer.js';
import { renderPager, setupPager, scrollToTop } from '../ui/pagination.js';
import { openExerciseModal } from '../ui/exercise-modal.js';
import { initMotivation } from '../services/motivation.js';
import { attachOnce, $ } from '../utils/dom.js';
import { getCategoriesLimit, getExercisesLimit, onResize } from '../utils/responsive.js';

// Page state
const state = {
  view: 'categories', // 'categories' or 'exercises'
  filter: 'Muscles',  // Active tab
  category: null,     // Selected category name
  categoryFilter: null, // Filter type of selected category
  keyword: '',
  page: 1,
};

/**
 * Get items limit based on current view
 */
function getLimit() {
  return state.view === 'categories' ? getCategoriesLimit() : getExercisesLimit();
}

/**
 * Fetch and render based on current state
 */
async function fetchAndRender() {
  const container = $('workouts-container');

  try {
    const limit = getLimit();

    if (state.view === 'categories') {
      const filters = await getFilters({
        filter: state.filter,
        page: state.page,
        limit,
      });
      renderCategories(filters.results, 'workouts-container');
      renderPager(filters.page ? Number(filters.page) : 1, filters.totalPages || 1);
    } else {
      const params = {
        limit,
        page: state.page,
      };

      if (state.categoryFilter === 'Muscles') params.muscles = state.category.toLowerCase();
      else if (state.categoryFilter === 'Body parts') params.bodypart = state.category.toLowerCase();
      else if (state.categoryFilter === 'Equipment') params.equipment = state.category.toLowerCase();

      if (state.keyword) params.keyword = state.keyword;

      const exercises = await getExercises(params);
      renderExercises(exercises.results, 'workouts-container');
      renderPager(exercises.page ? Number(exercises.page) : 1, exercises.totalPages || 1);
    }
  } catch (err) {
    console.error('Fetch error:', err);
    if (container) {
      container.innerHTML = '<p class="error-message">Failed to load data. Please try again.</p>';
    }
  }
}

/**
 * Handle page change from pagination
 */
function handlePageChange(newPage) {
  if (newPage && newPage !== state.page) {
    state.page = newPage;
    fetchAndRender();
    scrollToTop();
  }
}

/**
 * Show exercises header with breadcrumb
 */
function showExercisesHeader(categoryName) {
  const sectionTitle = $('section-title');
  const searchForm = $('exercise-search-form');

  if (sectionTitle) {
    sectionTitle.innerHTML = `Exercises / <span class="section-name">${categoryName}</span>`;
  }

  if (searchForm) {
    searchForm.classList.remove('hidden');
  }
}

/**
 * Hide exercises header
 */
function hideExercisesHeader() {
  const sectionTitle = $('section-title');
  const searchForm = $('exercise-search-form');
  const searchInput = $('exercise-search-input');
  const clearBtn = $('exercise-clear-btn');

  if (sectionTitle) {
    sectionTitle.textContent = 'Exercises';
  }

  if (searchForm) {
    searchForm.classList.add('hidden');
  }

  if (searchInput) {
    searchInput.value = '';
  }

  if (clearBtn) {
    clearBtn.classList.add('hidden');
  }
}

/**
 * Setup filter tabs
 */
function setupFilterTabs() {
  const filterTabs = $('filter-tabs');
  if (!filterTabs) return;

  attachOnce(filterTabs, 'click', async e => {
    const btn = e.target.closest('.filter-tab');
    if (!btn) return;

    document.querySelectorAll('.filter-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');

    state.filter = btn.dataset.filter;
    state.view = 'categories';
    state.page = 1;
    state.keyword = '';
    state.category = null;

    hideExercisesHeader();

    try {
      await fetchAndRender();
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  }, 'filter-tabs');
}

/**
 * Setup exercise search
 */
function setupExerciseSearch() {
  const searchForm = $('exercise-search-form');
  const searchInput = $('exercise-search-input');
  const clearBtn = $('exercise-clear-btn');

  if (!searchForm || !searchInput) return;

  attachOnce(searchInput, 'input', () => {
    if (searchInput.value.trim()) {
      clearBtn.classList.remove('hidden');
    } else {
      clearBtn.classList.add('hidden');
    }
  }, 'search-input');

  attachOnce(clearBtn, 'click', async () => {
    searchInput.value = '';
    clearBtn.classList.add('hidden');
    searchInput.focus();

    state.keyword = '';
    state.page = 1;

    try {
      await fetchAndRender();
    } catch (err) {
      console.error('Failed to fetch exercises:', err);
    }
  }, 'search-clear');

  attachOnce(searchForm, 'submit', async e => {
    e.preventDefault();

    state.keyword = searchInput.value.trim();
    state.page = 1;

    try {
      await fetchAndRender();
    } catch (err) {
      console.error('Failed to search exercises:', err);
    }
  }, 'search-submit');
}

/**
 * Setup workout container event delegation
 */
function setupWorkoutContainer() {
  const container = $('workouts-container');
  if (!container) return;

  attachOnce(container, 'click', async e => {
    // Handle category card clicks
    const categoryCard = e.target.closest('.section-tile');
    if (categoryCard) {
      e.preventDefault();
      const categoryName = categoryCard.dataset.name;
      const categoryFilter = categoryCard.dataset.filter;

      if (!categoryName) return;

      state.view = 'exercises';
      state.category = categoryName;
      state.categoryFilter = categoryFilter;
      state.page = 1;
      state.keyword = '';

      showExercisesHeader(categoryName);
      setupExerciseSearch();

      try {
        await fetchAndRender();
      } catch (err) {
        console.error('Failed to fetch exercises:', err);
      }
      return;
    }

    // Handle Start button clicks
    const startBtn = e.target.closest('.workout-start-btn');
    if (startBtn) {
      const exerciseId = startBtn.dataset.id;
      if (exerciseId) {
        openExerciseModal(exerciseId);
      }
    }
  }, 'workouts');
}

/**
 * Setup resize listener
 */
function setupResizeListener() {
  let currentLimit = getLimit();

  onResize(() => {
    const newLimit = getLimit();
    if (newLimit !== currentLimit) {
      currentLimit = newLimit;
      state.page = 1;
      fetchAndRender();
    }
  });
}

/**
 * Initialize home page
 */
export async function initHomePage() {
  const mainContent = document.querySelector('.main-content');

  try {
    await initMotivation();
    await fetchAndRender();
  } catch (err) {
    console.error('Error initializing home page:', err);
  } finally {
    if (mainContent) {
      mainContent.classList.add('loaded');
    }
  }

  setupFilterTabs();
  setupWorkoutContainer();
  setupPager(handlePageChange);
  setupResizeListener();
}
