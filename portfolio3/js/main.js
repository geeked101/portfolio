/* ============================================================
   Jeff Wachira Portfolio JS v3 — clean, modern, and robust
   ============================================================ */

(() => {
  'use strict';

  /* ---- NAV STUCK STATE ---- */
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('stuck', window.scrollY > 48);
    }, { passive: true });
  }

  /* ---- MOBILE MENU ---- */
  const burger = document.getElementById('burger');
  const mobNav = document.getElementById('mob-nav');

  if (burger && mobNav) {
    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('open');
      mobNav.classList.toggle('open', open);
    });

    mobNav.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        burger.classList.remove('open');
        mobNav.classList.remove('open');
      });
    });
  }

  /* ---- INTERSECTION OBSERVER — FADE UP ---- */
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.fade-up').forEach((el) => {
    fadeObserver.observe(el);
  });

  /* ---- HERO NAME CLIP REVEAL ---- */
  const clipObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        clipObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.05 });

  document.querySelectorAll('.clip-line').forEach((el) => {
    clipObserver.observe(el);
  });

  /* ---- COUNT-UP FOR HERO STATS ---- */
  /**
   * Animates numbers from 0 to target
   * @param {HTMLElement} el
   * @param {number} target
   */
  const countUp = (el, target) => {
    let start = null;
    const duration = 1200;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.hstat-n').forEach((el) => {
        const t = parseInt(el.dataset.target || '0', 10);
        countUp(el, t);
      });
      statsObserver.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) statsObserver.observe(statsEl);

  /* ---- STACK BLOCK HOVER — subtle lift ---- */
  document.querySelectorAll('.stack-block').forEach((block) => {
    block.addEventListener('mouseenter', () => {
      block.style.transition = 'background .22s';
    });
  });

  /* ---- PROJECT ITEM HOVER BORDER ACCENT ---- */
  document.querySelectorAll('.proj-item').forEach((item) => {
    item.addEventListener('mouseenter', () => {
      item.style.transition = 'background .22s';
    });
  });

  /* ---- INITIAL PASS — show already-visible elements ---- */
  requestAnimationFrame(() => {
    const vh = window.innerHeight;

    document.querySelectorAll('.fade-up').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.92) el.classList.add('show');
    });

    document.querySelectorAll('.clip-line').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.top < vh * 0.92) el.classList.add('show');
    });
  });
})();
