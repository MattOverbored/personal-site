(function () {
  const nav = document.querySelector('.nav');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.querySelector('.nav-links');

  if (nav && navToggle && navLinks) {
    const setNavState = (open) => {
      document.body.classList.toggle('nav-open', open);
      navToggle.setAttribute('aria-expanded', String(open));
    };

    navToggle.addEventListener('click', () => {
      const isOpen = document.body.classList.contains('nav-open');
      setNavState(!isOpen);
    });

    navLinks.addEventListener('click', (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.tagName === 'A') {
        setNavState(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        setNavState(false);
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        setNavState(false);
      }
    });
  }

  const shouldReduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (shouldReduceMotion) {
    return;
  }

  const revealTargets = [
    ...document.querySelectorAll('.hero-content'),
    ...document.querySelectorAll('.section > .container'),
    ...document.querySelectorAll('.work-card-link'),
    ...document.querySelectorAll('.interest-card'),
    ...document.querySelectorAll('.stat-card'),
    ...document.querySelectorAll('.pro-item'),
    ...document.querySelectorAll('.pro-cert-item'),
    ...document.querySelectorAll('.pro-ach-card'),
    ...document.querySelectorAll('.contact-actions a')
  ];

  if (!revealTargets.length) {
    return;
  }

  revealTargets.forEach((el, index) => {
    el.classList.add('reveal-item');
    el.style.setProperty('--reveal-delay', String((index % 6) * 45) + 'ms');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: '0px 0px -8% 0px' }
  );

  revealTargets.forEach((el) => observer.observe(el));
})();
