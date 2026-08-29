document.querySelectorAll('.layer, .project-card').forEach(el => el.classList.add('reveal'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ---------- scroll progress ---------- */
const progressBar = document.querySelector('.scroll-progress__bar');

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = pct + '%';
}

if (progressBar) {
  updateScrollProgress();
  window.addEventListener('scroll', updateScrollProgress, { passive: true });
  window.addEventListener('resize', updateScrollProgress);
}

/* ---------- animated stat counters ----------
   The HTML already holds the real value (e.g. "14+"), so a browser with
   JS disabled or a failed observer just shows the correct static number.
   The animation only replaces that text once it is actually running. */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function animateCount(el) {
  const target = parseInt(el.dataset.countTo, 10);
  const suffix = el.dataset.suffix || '';

  if (reduceMotion || Number.isNaN(target)) return;

  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
    else el.textContent = target + suffix;
  }

  requestAnimationFrame(tick);
}

const countTargets = document.querySelectorAll('.fact__num[data-count-to]');

if ('IntersectionObserver' in window) {
  const countIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        countIo.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3, rootMargin: '0px 0px -10% 0px' });

  countTargets.forEach(el => countIo.observe(el));
}

/* ---------- sticky nav + scrollspy ---------- */
const stickyNav = document.getElementById('stickynav');
const heroEl = document.querySelector('.hero');

if (stickyNav && heroEl && 'IntersectionObserver' in window) {
  const navToggleIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      stickyNav.classList.toggle('is-visible', !entry.isIntersecting);
    });
  }, { threshold: 0 });
  navToggleIo.observe(heroEl);

  const navLinks = [...stickyNav.querySelectorAll('[data-nav]')];
  const spySections = navLinks
    .map(link => document.getElementById(link.dataset.nav))
    .filter(Boolean);

  const spyIo = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => link.classList.toggle('is-active', link.dataset.nav === id));
      }
    });
  }, { threshold: 0, rootMargin: '-45% 0px -45% 0px' });

  spySections.forEach(section => spyIo.observe(section));
}

/* ---------- cursor-tracking glow on project cards ---------- */
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    card.style.setProperty('--my', `${e.clientY - rect.top}px`);
  });
});

/* ---------- gallery lightbox ---------- */
const lightbox = document.getElementById('lightbox');

if (lightbox) {
  const lightboxImg = lightbox.querySelector('.lightbox__img');
  const lightboxCaption = lightbox.querySelector('.lightbox__caption');
  const lightboxClose = lightbox.querySelector('.lightbox__close');
  let lastFocused = null;

  function openLightbox(img) {
    lastFocused = document.activeElement;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = img.closest('figure')?.querySelector('figcaption')?.textContent || '';
    lightbox.hidden = false;
    lightboxClose.focus();
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = '';
    document.body.style.overflow = '';
    lastFocused?.focus();
  }

  document.querySelectorAll('.project-card__gallery img').forEach(img => {
    img.addEventListener('click', () => openLightbox(img));
    img.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(img);
      }
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.hidden) closeLightbox();
  });
}
