// ===== UNIVERSITY PAGE JS =====

// Burger
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => { navLinks.classList.toggle('open'); });
navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    e.preventDefault();
    const t = document.querySelector(this.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Tabs
const tabs = document.querySelectorAll('.u-tab');
const panels = document.querySelectorAll('.u-panel');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const level = tab.getAttribute('data-level');
    panels.forEach(p => {
      p.classList.remove('active');
      if (p.id === 'level-' + level) p.classList.add('active');
    });
    // Close all accordions when switching
    document.querySelectorAll('.u-module').forEach(m => m.classList.remove('open'));
  });
});

// Accordion
document.querySelectorAll('.u-module-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const mod = btn.parentElement;
    const wasOpen = mod.classList.contains('open');
    mod.closest('.u-modules').querySelectorAll('.u-module').forEach(m => m.classList.remove('open'));
    if (!wasOpen) mod.classList.add('open');
  });
});

// Fade in
const fadeEls = document.querySelectorAll('.how-card, .fmt-card, .u-panel-head, .u-cta-inner');
fadeEls.forEach(el => el.classList.add('fade-in'));
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
fadeEls.forEach(el => obs.observe(el));
