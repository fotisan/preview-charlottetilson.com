(function () {
  "use strict";

  const ready = (fn) => {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn, { once: true });
    } else {
      fn();
    }
  };

  ready(() => {
    // 1. Current year update
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // 2. Mobile navigation toggle
    const navToggle = document.getElementById("navToggle");
    const navPanel = document.getElementById("navPanel");

    if (navToggle && navPanel) {
      const closeNav = () => {
        navPanel.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      };

      navToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = navPanel.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      });

      document.addEventListener("click", (e) => {
        if (!navPanel.contains(e.target) && !navToggle.contains(e.target)) closeNav();
      });

      navPanel.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeNav);
      });
    }

    // 3. Accordion (FAQs)
    document.querySelectorAll("[data-accordion]").forEach((accordion) => {
      const buttons = Array.from(accordion.querySelectorAll(".acc-item"));
      buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
          const isExpanded = btn.getAttribute("aria-expanded") === "true";
          const panel = btn.nextElementSibling;

          // Toggle current
          btn.setAttribute("aria-expanded", isExpanded ? "false" : "true");
          if (panel) panel.hidden = isExpanded;
        });
      });
    });

    // 4. Scroll to top button
    const toTop = document.getElementById("toTop");
    if (toTop) {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 450) toTop.classList.add("show");
        else toTop.classList.remove("show");
      }, { passive: true });

      toTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    // 5. Scroll Reveal Animation
    const revealEls = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach((el) => observer.observe(el));
  });
})();
