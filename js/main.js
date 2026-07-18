/* ============================================================
   Jeff Wachira Portfolio JS v3 — enhanced with new features
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

  /* ---- DARK MODE TOGGLE ---- */
  const darkModeBtn = document.getElementById('dark-mode-toggle');
  if (darkModeBtn) {
    darkModeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
    });
    // Restore preference
    if (localStorage.getItem('darkMode') === 'enabled') {
      document.body.classList.add('dark-mode');
    }
  }



  /* ---- CLICKABLE PROJECT CARDS ---- */
  document.querySelectorAll('.proj-item[data-url]').forEach((card) => {
    card.addEventListener('click', (e) => {
      // Don't override clicks on inner links (e.g. the ↗ arrow)
      if (e.target.closest('a')) return;
      window.open(card.dataset.url, '_blank', 'noopener,noreferrer');
    });
  });

  /* ---- KEYBOARD ACCESSIBILITY ---- */
  document.addEventListener('keydown', (e) => {
    // Spacebar to scroll (only when not typing in a field)
    if (e.code === 'Space' && !['INPUT','TEXTAREA','SELECT'].includes(e.target.tagName)) {
      e.preventDefault();
      window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
    }
    // Escape to go to top
    if (e.code === 'Escape') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
})();