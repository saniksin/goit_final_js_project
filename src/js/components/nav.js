/**
 * Navigation component
 * Burger menu and active link handling
 */

import { $ } from '../utils/dom.js';

/**
 * Open mobile menu
 */
function openMobileMenu() {
  const mobileMenu = $('mobile-menu');
  const burgerBtn = $('burger-btn');

  if (mobileMenu) {
    mobileMenu.showModal();
    document.body.style.overflow = 'hidden';
  }

  if (burgerBtn) {
    burgerBtn.setAttribute('aria-expanded', 'true');
  }
}

/**
 * Close mobile menu
 */
function closeMobileMenu() {
  const mobileMenu = $('mobile-menu');

  if (mobileMenu) {
    mobileMenu.close();
  }
}

/**
 * Setup burger menu functionality
 */
function setupBurgerMenu() {
  const burgerBtn = $('burger-btn');
  const mobileMenu = $('mobile-menu');
  const mobileCloseBtn = $('mobile-close-btn');

  if (!burgerBtn || !mobileMenu || !mobileCloseBtn) return;

  burgerBtn.addEventListener('click', openMobileMenu);
  mobileCloseBtn.addEventListener('click', closeMobileMenu);

  // Close on backdrop click
  mobileMenu.addEventListener('click', e => {
    if (e.target === mobileMenu) {
      closeMobileMenu();
    }
  });

  // Close on navigation link click
  const mobileNavLinks = mobileMenu.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Native dialog handles Escape key automatically
  mobileMenu.addEventListener('close', () => {
    burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
}

/**
 * Set active navigation link based on current page
 */
function setActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const isActive =
      currentPath.endsWith(href.replace('./', '/')) ||
      (currentPath.endsWith('/') && href.includes('index.html')) ||
      (currentPath.endsWith('/index.html') && href.includes('index.html')) ||
      (currentPath.includes('favorites') && href.includes('favorites'));

    if (isActive) {
      link.setAttribute('aria-current', 'page');
      link.classList.add('active');
    } else {
      link.removeAttribute('aria-current');
      link.classList.remove('active');
    }
  });
}

/**
 * Initialize navigation
 */
export function initNav() {
  setupBurgerMenu();
  setActiveNavLink();
}

// Auto-initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initNav);
