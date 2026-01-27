document.addEventListener('DOMContentLoaded', () => {
  
  /* --- 1. Λειτουργία Mobile Menu --- */
  const navToggle = document.getElementById('navToggle');
  const navPanel = document.getElementById('navPanel');

  if (navToggle && navPanel) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !isExpanded);
      navPanel.classList.toggle('open');
    });
  }

  /* --- 2. Scroll Reveal Animation --- */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        // Προαιρετικά: σταματάμε να παρακολουθούμε το στοιχείο αφού εμφανιστεί
        observer.unobserve(entry.target); 
      }
    });
  }, {
    root: null,
    threshold: 0.15, // Εμφάνιση όταν φανεί το 15% του στοιχείου
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* --- 3. Scroll to Top Button --- */
  const toTopBtn = document.getElementById('toTop');
  
  if (toTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        toTopBtn.classList.add('show');
      } else {
        toTopBtn.classList.remove('show');
      }
    });

    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  
  /* --- 4. Copyright Year Update --- */
  const yearSpan = document.getElementById('year');
  if(yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
