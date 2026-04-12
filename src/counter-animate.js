/**
 * Animated Counters
 * Animates numerical values when they come into view
 */
(function () {
  const counterElements = document.querySelectorAll('.stat-card, .pro-stat__number, [data-counter]');
  
  if (!counterElements.length) return;

  const animationDuration = 2000; // 2 seconds

  function animateCounter(element, targetValue) {
    if (element.dataset.animated === 'true') return; // Already animated

    const startValue = 0;
    const startTime = Date.now();
    const originalText = element.textContent;

    function updateCounter() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      // Easing function for smooth animation
      const easeOutQuad = 1 - (1 - progress) * (1 - progress);
      const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuad);

      // Extract number and suffix from original text
      const numberMatch = originalText.match(/[\d.]+/);
      if (numberMatch) {
        const suffix = originalText.replace(numberMatch[0], '');
        element.textContent = currentValue + suffix;
      } else {
        element.textContent = currentValue;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = originalText;
        element.dataset.animated = 'true';
      }
    }

    updateCounter();
  }

  function extractNumber(text) {
    const match = text.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  function animateStatCard(statCard) {
    // For regular stat cards
    const detailElement = statCard.querySelector('.stat-detail');
    if (detailElement && !detailElement.dataset.animated) {
      const numberText = detailElement.textContent;
      const targetValue = extractNumber(numberText);
      if (targetValue > 0) {
        animateCounter(detailElement, targetValue);
      }
    }
  }

  // Use Intersection Observer to detect when elements are visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const targetValue = extractNumber(entry.target.textContent);
        if (targetValue > 0) {
          animateCounter(entry.target, targetValue);
        }
      }
    });
  }, {
    threshold: 0.5 // Trigger when 50% of element is visible
  });

  // Mark all elements and observe
  counterElements.forEach(element => {
    element.dataset.animated = 'false';
    observer.observe(element);
  });
})();
