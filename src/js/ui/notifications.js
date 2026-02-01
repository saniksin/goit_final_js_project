/**
 * Notification system
 */

import spriteUrl from '../../img/sprite.svg';

const ICONS = {
  success: 'icon-info',
  error: 'icon-close',
  warning: 'icon-star',
  info: 'icon-info',
};

const AUTO_CLOSE_DELAY = 3000;
const FADE_DURATION = 500;

/**
 * Get or create notification container
 */
function getContainer() {
  let container = document.getElementById('notification-container');

  if (!container) {
    container = document.createElement('div');
    container.id = 'notification-container';
    document.body.appendChild(container);
  }

  return container;
}

/**
 * Create and show notification
 * @param {string} type - success | error | warning | info
 * @param {string} message
 */
function createNotification(type, message) {
  const container = getContainer();
  const iconName = ICONS[type] || ICONS.info;

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <svg class="notification-icon" width="20" height="20">
      <use href="${spriteUrl}#${iconName}"></use>
    </svg>
    <p class="notification-message">${message}</p>
  `;

  container.appendChild(notification);

  setTimeout(() => {
    notification.classList.add('fade-out');
    setTimeout(() => notification.remove(), FADE_DURATION);
  }, AUTO_CLOSE_DELAY);
}

export const notify = {
  success: message => createNotification('success', message),
  error: message => createNotification('error', message),
  warning: message => createNotification('warning', message),
  info: message => createNotification('info', message),
};
