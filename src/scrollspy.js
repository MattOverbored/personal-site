/**
 * Scroll Spy Navigation
 * Highlights the active navigation link as the user scrolls through sections
 */
(function () {
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  const heroHeader = document.querySelector('header');
  const onHomePage = window.location.pathname === '/';

  function clearActiveState() {
    navLinks.forEach((link) => {
      link.classList.remove('is-active');
      link.removeAttribute('aria-current');
    });
  }

  function updateActiveLink() {
    if (!onHomePage || !sections.length) {
      clearActiveState();
      return;
    }

    let currentSection = '';

    // Check which section is in view
    for (let section of sections) {
      const rect = section.getBoundingClientRect();
      const isVisible = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      
      if (isVisible) {
        currentSection = section.getAttribute('id');
        break;
      }
    }

    // Check if hero is visible
    if (!currentSection && heroHeader) {
      const heroRect = heroHeader.getBoundingClientRect();
      if (heroRect.bottom > 0) {
        currentSection = '';
      }
    }

    // Update nav link styling
    navLinks.forEach((link) => {
      const href = link.getAttribute('href') || '';
      const targetId = href.includes('#') ? href.split('#')[1] : '';

      link.classList.remove('is-active');
      link.removeAttribute('aria-current');

      if (targetId && targetId === currentSection) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'location');
      }
    });
  }

  // Update on scroll with throttling
  let scrollTimeout;
  window.addEventListener('scroll', () => {
    if (scrollTimeout) {
      window.cancelAnimationFrame(scrollTimeout);
    }
    
    scrollTimeout = window.requestAnimationFrame(() => {
      updateActiveLink();
    });
  }, { passive: true });

  window.addEventListener('hashchange', updateActiveLink);

  // Initial call
  updateActiveLink();
})();
