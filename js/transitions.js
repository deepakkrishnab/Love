/* ===========================================================
   transitions.js — smooth fade/slide transition between pages
   =========================================================== */

(function () {
  const LEAVE_DURATION = 360;

  document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('a.btn, a.home-icon-btn, a.skip-link');

    links.forEach((link) => {
      link.addEventListener('click', function (evt) {
        const href = this.getAttribute('href');
        if (!href || this.target === '_blank' || href.startsWith('#')) {
          return;
        }
        evt.preventDefault();
        document.body.classList.add('page-leaving');
        setTimeout(() => {
          window.location.href = href;
        }, LEAVE_DURATION);
      });
    });
  });
})();
