/* =========================================================
   Wood Interiors by John Flavin — main.js
   johnflavin.ie
   ========================================================= */

(function () {
  'use strict';

  /* ---- Nav ---- */
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');

  function updateNav() {
    if (!nav) return;
    const isDark = nav.dataset.theme === 'dark';
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
      if (isDark) {
        nav.classList.remove('light');
      }
    } else {
      nav.classList.remove('scrolled');
      if (isDark) {
        nav.classList.add('light');
      }
    }
  }

  // Light-theme nav (inner pages)
  if (nav && nav.dataset.theme !== 'dark') {
    nav.classList.add('light');
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.nav__mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      if (hamburger) hamburger.classList.remove('open');
      if (mobileMenu) mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ---- Active nav link ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ---- Hero animation ---- */
  function initHero() {
    const bg = document.querySelector('.hero__bg');
    if (bg) {
      // Small delay to allow browser to composite
      setTimeout(() => bg.classList.add('loaded'), 80);
    }

    // Reveal elements in sequence
    const eyebrow = document.querySelector('.hero__eyebrow');
    const lines = document.querySelectorAll('.hero__title .line-inner');
    const sub = document.querySelector('.hero__sub');
    const actions = document.querySelector('.hero__actions');

    if (eyebrow) setTimeout(() => eyebrow.classList.add('visible'), 200);
    lines.forEach((line, i) => {
      setTimeout(() => line.classList.add('visible'), 280 + i * 90);
    });
    if (sub) setTimeout(() => sub.classList.add('visible'), 550);
    if (actions) setTimeout(() => actions.classList.add('visible'), 700);
  }

  initHero();

  /* ---- Scroll Reveal ---- */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

  /* ---- Work Page: Filter ---- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const workItems = document.querySelectorAll('.work-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      workItems.forEach(item => {
        const room = item.dataset.room;
        if (filter === 'all' || room === filter) {
          item.style.display = '';
          requestAnimationFrame(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'translateY(8px)';
          setTimeout(() => { item.style.display = 'none'; }, 250);
        }
      });
    });
  });

  /* ---- Lightbox ---- */
  const lightbox = document.getElementById('lightbox');

  if (lightbox) {
    const lbTitle = lightbox.querySelector('.lightbox__title');
    const lbRoom = lightbox.querySelector('.lightbox__room');
    const lbDesc = lightbox.querySelector('.lightbox__desc');
    const lbImages = lightbox.querySelector('.lightbox__images');
    const lbSpecs = lightbox.querySelector('.lightbox__specs');
    const lbClose = lightbox.querySelector('.lightbox__close');

    function openLightbox(item) {
      const data = item.dataset;
      if (lbTitle) lbTitle.textContent = data.title || '';
      if (lbRoom) lbRoom.textContent = data.room || '';
      if (lbDesc) lbDesc.textContent = data.description || '';

      // Images
      if (lbImages) {
        const imgs = JSON.parse(data.images || '[]');
        lbImages.innerHTML = imgs.map(src =>
          `<img class="lightbox__img" src="${src}" alt="${data.title || ''}" loading="lazy">`
        ).join('');
      }

      // Specs
      if (lbSpecs) {
        const specs = JSON.parse(data.specs || '{}');
        const entries = Object.entries(specs);
        if (entries.length) {
          lbSpecs.innerHTML = `
            <p class="lightbox__specs-heading">Specification</p>
            ${entries.map(([k, v]) =>
              v && v !== '—' ? `
                <div class="lightbox__spec">
                  <span class="lightbox__spec-key">${formatKey(k)}</span>
                  <span class="lightbox__spec-val">${v}</span>
                </div>` : ''
            ).join('')}
          `;
        }
      }

      lightbox.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('open');
      document.body.style.overflow = '';
    }

    function formatKey(key) {
      return key.replace(/_/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
    }

    document.querySelectorAll('.work-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        openLightbox(item);
      });
    });

    if (lbClose) lbClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* ---- Options Page Tabs ---- */
  const optionNavBtns = document.querySelectorAll('.options-nav__btn');
  const optionSections = document.querySelectorAll('.options-section');

  optionNavBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.section;

      optionNavBtns.forEach(b => b.classList.remove('active'));
      optionSections.forEach(s => s.classList.remove('active'));

      btn.classList.add('active');
      const targetSection = document.getElementById(`section-${target}`);
      if (targetSection) targetSection.classList.add('active');
    });
  });

  /* ---- Smooth anchor scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
