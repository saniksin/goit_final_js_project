/**
 * Base modal functionality
 * Handles open/close, keyboard, and backdrop events
 */

import { attachOnce } from '../utils/dom.js';

// Track active popups for stacking
let activePopupIds = [];

/**
 * Handle Escape key to close topmost popup
 */
function handleEscKey(e) {
  if (e.key === 'Escape' && activePopupIds.length > 0) {
    const lastPopupId = activePopupIds[activePopupIds.length - 1];
    closePopup(lastPopupId);
  }
}

/**
 * Open a popup modal
 * @param {string} popupId - ID of the modal element
 */
export function openPopup(popupId) {
  const modal = document.getElementById(popupId);
  if (!modal) return;

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  if (!activePopupIds.includes(popupId)) {
    activePopupIds.push(popupId);
  }

  // Add Esc listener if this is the first popup
  if (activePopupIds.length === 1) {
    document.addEventListener('keydown', handleEscKey);
  }

  // Setup backdrop click
  const backdrop = modal.querySelector('.modal-backdrop');
  if (backdrop) {
    attachOnce(backdrop, 'click', () => closePopup(popupId), `backdrop-${popupId}`);
  }
}

/**
 * Close a popup modal
 * @param {string} popupId - ID of the modal element
 */
export function closePopup(popupId) {
  const modal = document.getElementById(popupId);
  if (!modal) return;

  modal.classList.add('hidden');
  activePopupIds = activePopupIds.filter(id => id !== popupId);

  if (activePopupIds.length === 0) {
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', handleEscKey);
  }
}

/**
 * Check if any popup is currently open
 */
export function hasOpenPopup() {
  return activePopupIds.length > 0;
}

/**
 * Get currently active popup ID
 */
export function getActivePopupId() {
  return activePopupIds[activePopupIds.length - 1] || null;
}
