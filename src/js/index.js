/**
 * Main entry point
 * Auto-detects page and initializes appropriate controller
 */

import './components/nav.js';

// Detect page and initialize
document.addEventListener('DOMContentLoaded', async () => {
  const isFavoritesPage = document.querySelector('.favorites-page');
  const isHomePage = document.querySelector('.main-content');

  if (isFavoritesPage) {
    const { initFavoritesPage } = await import('./pages/favorites.js');
    initFavoritesPage();
  } else if (isHomePage) {
    const { initHomePage } = await import('./pages/home.js');
    initHomePage();
  }
});
