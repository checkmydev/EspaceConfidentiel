/* =========================================================
   MÉRIDIENNE — Espace Confidentiel
   Interactions : header au scroll, menu plein écran,
   apparitions au scroll, formulaire de démonstration,
   bannière démo.
   ========================================================= */
(() => {
  'use strict';

  const header  = document.getElementById('siteHeader');
  const toggle  = document.getElementById('menuToggle');
  const overlay = document.getElementById('overlayNav');
  const hero    = document.querySelector('.hero');

  /* ---- Header : passe en "solid" une fois le hero dépassé ---- */
  const onScroll = () => {
    const threshold = hero ? hero.offsetHeight - 90 : 120;
    header.classList.toggle('solid', window.scrollY > threshold);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

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

  /* ---- Apparitions au scroll ---- */
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('in'));
  }

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
