/**
 * Run tasks after the load event, then during idle time if possible.
 * Helps move non-critical requests off the critical request chain.
 */
export function runAfterLoad(task, { timeout = 2000 } = {}) {
  const start = () => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(() => task(), { timeout });
    } else {
      setTimeout(task, 1);
    }
  };

  if (document.readyState === 'complete') {
    start();
  } else {
    window.addEventListener('load', start, { once: true });
  }
}
