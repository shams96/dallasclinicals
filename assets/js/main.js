// Mobile nav toggle, language toggle, lucide icons, and scroll-reveal —
// replaces the interactive bits framer-motion/React used to own.
document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();

  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const menuIconOpen = document.getElementById('icon-menu-open');
  const menuIconClose = document.getElementById('icon-menu-close');

  if (menuBtn && mobileNav) {
    menuBtn.addEventListener('click', () => {
      const isOpen = !mobileNav.classList.contains('hidden');
      mobileNav.classList.toggle('hidden', isOpen);
      menuIconOpen.classList.toggle('hidden', !isOpen);
      menuIconClose.classList.toggle('hidden', isOpen);
    });
    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      });
    });
  }

  const langBtn = document.getElementById('lang-toggle');
  const langLabel = document.getElementById('lang-label');
  if (langBtn && langLabel) {
    langBtn.addEventListener('click', () => {
      langLabel.textContent = langLabel.textContent === 'EN' ? 'ES' : 'EN';
    });
  }

  // Scroll-reveal: CSS handles this natively via animation-timeline: view()
  // (see assets/css/animations.css) wherever supported. Only fall back to
  // an IntersectionObserver on browsers without that feature, so we never
  // run both animation paths on the same element.
  const nativeScrollReveal =
    'CSS' in window && CSS.supports && CSS.supports('animation-timeline', 'view()');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');

  if (!nativeScrollReveal) {
    revealEls.forEach((el) => el.classList.add('reveal-js-fallback'));
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );
      revealEls.forEach((el) => observer.observe(el));
    }
  }
});
