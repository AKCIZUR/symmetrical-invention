document.documentElement.classList.add('js-ready');

window.addEventListener('DOMContentLoaded', () => {
  const banner = document.querySelector('.md-banner--soft');
  if (banner) {
    banner.setAttribute('role', 'status');
  }
});
