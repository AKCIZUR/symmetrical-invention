document.documentElement.classList.add('js-ready');
document.documentElement.classList.add('is-loading');

window.addEventListener('DOMContentLoaded', () => {
  const banner = document.querySelector('.mx-banner');
  if (banner) banner.setAttribute('role', 'status');

  requestAnimationFrame(() => {
    document.documentElement.classList.remove('is-loading');
  });

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href]');
    if (!link) return;
    if (link.target || link.hasAttribute('download')) return;

    const url = new URL(link.href, window.location.href);
    const sameOrigin = url.origin === window.location.origin;
    const isInternalPage = sameOrigin && !url.href.startsWith('mailto:') && !url.href.startsWith('tel:');
    if (!isInternalPage) return;
    if (url.hash && url.pathname === window.location.pathname) return;

    event.preventDefault();
    document.documentElement.classList.add('is-leaving');
    document.querySelectorAll('.mx-menu details[open]').forEach((item) => item.removeAttribute('open'));
    window.setTimeout(() => {
      window.location.href = url.href;
    }, 170);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      document.querySelectorAll('.mx-menu details[open]').forEach((item) => item.removeAttribute('open'));
    }
  });
});
