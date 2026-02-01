/**
 * Pagination UI component
 */

import { loadTemplate } from '../templates/renderer.js';
import { attachOnce, $, scrollToElement } from '../utils/dom.js';

/**
 * Update link state (disabled/enabled)
 * @param {HTMLElement} link
 * @param {boolean} isDisabled
 * @param {number} page
 */
function updateLinkState(link, isDisabled, page) {
  if (isDisabled) {
    link.classList.add('disabled');
    link.setAttribute('aria-disabled', 'true');
    link.removeAttribute('data-page');
  } else {
    link.classList.remove('disabled');
    link.removeAttribute('aria-disabled');
    link.dataset.page = page;
  }
}

/**
 * Generate array of page numbers with ellipsis
 * Shows only 3 numbers: previous, current, next
 * @param {number} currentPage
 * @param {number} totalPages
 * @returns {Array}
 */
function generatePageNumbers(currentPage, totalPages) {
  const pages = [];

  if (totalPages <= 3) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  let start, end;

  if (currentPage === 1) {
    start = 1;
    end = 3;
  } else if (currentPage === totalPages) {
    start = totalPages - 2;
    end = totalPages;
  } else {
    start = currentPage - 1;
    end = currentPage + 1;
  }

  if (start > 1) {
    pages.push('...');
  }

  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  if (end < totalPages) {
    pages.push('...');
  }

  return pages;
}

/**
 * Render pagination controls
 * @param {number} currentPage
 * @param {number} totalPages
 * @param {string} containerId
 */
export async function renderPager(currentPage, totalPages, containerId = 'pager-container') {
  const container = $(containerId);
  if (!container) return;

  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  // Load template if not exists
  if (!container.querySelector('.pager-list')) {
    const template = await loadTemplate('pagination');
    container.innerHTML = template;
  }

  // Get navigation links
  const firstLink = container.querySelector('.pager-first');
  const prevLink = container.querySelector('.pager-prev');
  const nextLink = container.querySelector('.pager-next');
  const lastLink = container.querySelector('.pager-last');
  const pagesContainer = container.querySelector('.pager-numbers');

  // Update navigation links state
  updateLinkState(firstLink, currentPage === 1, 1);
  updateLinkState(prevLink, currentPage === 1, currentPage - 1);
  updateLinkState(nextLink, currentPage === totalPages, currentPage + 1);
  updateLinkState(lastLink, currentPage === totalPages, totalPages);

  // Generate pages
  const pages = generatePageNumbers(currentPage, totalPages);

  const pagesHtml = pages
    .map(page => {
      if (page === '...') {
        return `<li aria-hidden="true"><span class="pager-dots">...</span></li>`;
      }
      const isActive = page === currentPage;
      if (isActive) {
        return `<li><a href="#" class="pager-number current" aria-current="page">${page}</a></li>`;
      }
      return `<li><a href="#" class="pager-number" data-page="${page}">${page}</a></li>`;
    })
    .join('');

  pagesContainer.innerHTML = pagesHtml;
}

/**
 * Setup pagination event listeners
 * @param {Function} onPageChange - Callback when page changes
 * @param {string} containerId
 */
export function setupPager(onPageChange, containerId = 'pager-container') {
  const container = $(containerId);
  if (!container) return;

  const attached = attachOnce(container, 'click', e => {
    const link = e.target.closest('.pager-number, .pager-btn');

    if (!link) return;
    if (link.classList.contains('disabled') || link.classList.contains('current')) return;

    e.preventDefault();

    const newPage = Number(link.dataset.page);
    if (newPage && !isNaN(newPage)) {
      onPageChange(newPage);
    }
  }, 'pager');

  return attached;
}

/**
 * Scroll to top of workouts section
 * @param {string} targetId
 */
export function scrollToTop(targetId = 'workouts-header') {
  scrollToElement(targetId, '.workouts-section');
}
