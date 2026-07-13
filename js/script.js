/* =========================================================
   MÉRIDIENNE — Espace Confidentiel
   Interactions : header au scroll, menu plein écran,
   apparitions au scroll, parallaxe, formulaire, bannière démo.
   ========================================================= */
(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const header  = document.getElementById('siteHeader');
  const toggle  = document.getElementById('menuToggle');
  const overlay = document.getElementById('overlayNav');
  const hero    = document.querySelector('.hero');

  /* ---- Header : passe en "solid" une fois le hero dépassé ---- */
  const onHeaderScroll = () => {
    const threshold = hero ? hero.offsetHeight - 90 : 120;
    header.classList.toggle('solid', window.scrollY > threshold);
  };

  /* ---- Menu plein écran ---- */
  const setMenu = (open) => {
    toggle.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    document.body.style.overflow = open ? 'hidden' : '';
  };
  toggle.addEventListener('click', () => setMenu(!overlay.classList.contains('open')));
  overlay.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ---- Apparitions au scroll (reveal / t-img / t-curtain) ---- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    // On bascule l'état à chaque entrée/sortie : l'animation se rejoue
    // quand on remonte puis redescend sur la section.
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { en.target.classList.toggle('in', en.isIntersecting); });
    }, { threshold: 0.18, rootMargin: '0px 0px -10% 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

  /* ---- Carrousels en fondu (images encadrées des blocs) ---- */
  if (!reduceMotion) {
    document.querySelectorAll('[data-carousel]').forEach((car, ci) => {
      const slides = car.querySelectorAll('.cslide');
      if (slides.length < 2) return;
      let idx = 0;
      setInterval(() => {
        slides[idx].classList.remove('is-active');
        idx = (idx + 1) % slides.length;
        slides[idx].classList.add('is-active');
      }, 5000 + ci * 700);   // léger décalage pour ne pas tout changer en même temps
    });
  }

  /* ---- Parallaxe au scroll : translation verticale des images ---- */
  const layers = Array.from(document.querySelectorAll('[data-parallax]'));
  const SPEED = 0.10;
  let ticking = false;

  const updateParallax = () => {
    const vh = window.innerHeight;
    for (const el of layers) {
      const box = el.parentElement.getBoundingClientRect();
      if (box.bottom < -200 || box.top > vh + 200) continue;   // hors écran : on saute
      const offset = (box.top + box.height / 2) - vh / 2;       // distance au centre du viewport
      el.style.transform = 'translate3d(0,' + (offset * -SPEED).toFixed(1) + 'px,0)';
    }
    ticking = false;
  };
  const requestParallax = () => {
    if (!ticking) { ticking = true; requestAnimationFrame(updateParallax); }
  };

  /* ---- Un seul écouteur scroll pour header + parallaxe ---- */
  const onScroll = () => { onHeaderScroll(); if (!reduceMotion) requestParallax(); };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onHeaderScroll();
  if (!reduceMotion) updateParallax();

  /* ---- Formulaire de démonstration (sans backend) ---- */
  const form = document.getElementById('rdvForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nom = form.nom.value.trim();
      const email = form.email.value.trim();
      if (!nom || !email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        status.textContent = 'Merci d\'indiquer votre nom et une adresse e-mail valide.';
        status.style.color = '#5a2b00';
        return;
      }
      status.textContent = 'Merci ' + nom.split(' ')[0] + '. Votre demande a bien été reçue — nous vous recontactons sous 48 h. (Démonstration : aucune donnée n\'est envoyée.)';
      status.style.color = '#211a04';
      form.reset();
    });
  }

  /* ---- Bannière démo ---- */
  const banner = document.getElementById('demoBanner');
  const dismiss = document.getElementById('demoDismiss');
  if (banner && dismiss) {
    dismiss.addEventListener('click', () => banner.classList.add('hide'));
  }
})();
