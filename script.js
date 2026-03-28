// ===== GOLDEN LASHES — Scripts =====

// Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50));

// Burger
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  burger.classList.toggle('active');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    burger.classList.remove('active');
  });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// Fade-in on scroll
const fadeEls = document.querySelectorAll(
  '.service-card, .portfolio-item, .review-card, .format-card, ' +
  '.journey-step, .graduate-card, .about-text, .about-img, ' +
  '.contact-info, .contact-form, .free-course, .community, ' +
  '.enrollment-timer, .course-tabs, .compare-table-wrap, .graduates'
);
fadeEls.forEach(el => el.classList.add('fade-in'));
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
fadeEls.forEach(el => observer.observe(el));

// Counter animation (for about + uni stats)
const allCounters = document.querySelectorAll('.stat-num, .uni-stat-num');
const counterObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'));
      let current = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) { el.textContent = target; clearInterval(timer); }
        else el.textContent = Math.floor(current);
      }, 25);
      counterObs.unobserve(el);
    }
  });
}, { threshold: 0.5 });
allCounters.forEach(c => counterObs.observe(c));

// Portfolio filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    portfolioItems.forEach(item => {
      if (filter === 'all' || item.getAttribute('data-category') === filter) {
        item.style.display = 'block';
        setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
      } else {
        item.style.opacity = '0'; item.style.transform = 'scale(0.8)';
        setTimeout(() => { item.style.display = 'none'; }, 400);
      }
    });
  });
});

// Course tabs
const courseTabs = document.querySelectorAll('.course-tab');
const coursePanels = document.querySelectorAll('.course-panel');
courseTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    courseTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const course = tab.getAttribute('data-course');
    coursePanels.forEach(panel => {
      panel.classList.remove('active');
      if (panel.id === 'panel-' + course) panel.classList.add('active');
    });
  });
});

// Accordion
document.querySelectorAll('.accordion-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const wasOpen = item.classList.contains('open');
    // Close siblings
    item.closest('.accordion').querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});

// Enrollment timer (7 days from now, auto-resets)
function startTimer() {
  const now = new Date();
  // Set deadline to 7 days from page load
  const deadline = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

  function update() {
    const diff = deadline - new Date();
    if (diff <= 0) return;
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    document.getElementById('timerDays').textContent = String(d).padStart(2, '0');
    document.getElementById('timerHours').textContent = String(h).padStart(2, '0');
    document.getElementById('timerMins').textContent = String(m).padStart(2, '0');
    document.getElementById('timerSecs').textContent = String(s).padStart(2, '0');
  }
  update();
  setInterval(update, 1000);
}
startTimer();

// Form submit
const form = document.getElementById('contactForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button');
  btn.textContent = 'Отправлено ✓';
  btn.style.background = '#7CB07E';
  setTimeout(() => { btn.textContent = 'Отправить заявку'; btn.style.background = ''; form.reset(); }, 3000);
});
