const search = document.getElementById('faq-search');
const count = document.getElementById('faq-count');
const empty = document.getElementById('faq-empty');
const printButton = document.getElementById('print');
const rows = [...document.querySelectorAll('#faq-list details')];

if (!(search instanceof HTMLInputElement) || !count || !empty || !printButton) {
  throw new Error('USM page controls are missing.');
}

function filterFaqs() {
  if (!(search instanceof HTMLInputElement) || !count || !empty) return;
  const query = search.value.trim().toLowerCase();
  let matches = 0;
  for (const row of rows) {
    if (!(row instanceof HTMLDetailsElement)) continue;
    const match = (row.textContent || '').toLowerCase().includes(query);
    row.hidden = !match;
    if (match) matches += 1;
  }
  count.textContent = `${matches} of ${rows.length} questions`;
  empty.hidden = matches > 0;
}

search.addEventListener('input', filterFaqs);
printButton.addEventListener('click', () => window.print());
filterFaqs();

const menuToggle = document.getElementById('menu-toggle');
const corporateNav = document.getElementById('corporate-nav');
menuToggle?.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close corporate navigation' : 'Open corporate navigation');
  corporateNav?.classList.toggle('is-open', isOpen);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menuToggle?.getAttribute('aria-expanded') === 'true') {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open corporate navigation');
    corporateNav?.classList.remove('is-open');
    menuToggle.focus();
  }
});

const informationBar = document.getElementById('information-bar');
document.getElementById('dismiss-information')?.addEventListener('click', () => {
  if (informationBar) informationBar.hidden = true;
  document.body.style.paddingBottom = '0';
});

const carousel = document.querySelector('.hero');
const slides = [...document.querySelectorAll('.hero-slide')];
const thumbs = [...document.querySelectorAll('.hero-thumb')];
const pauseButton = document.getElementById('carousel-pause');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let activeSlide = 0;
let paused = reducedMotion.matches;
let timer = 0;

function showSlide(index = 0) {
  activeSlide = index;
  slides.forEach((slide, i) => {
    if (slide instanceof HTMLElement) slide.hidden = i !== index;
  });
  thumbs.forEach((thumb, i) => thumb.setAttribute('aria-pressed', String(i === index)));
}
function updatePlayback() {
  window.clearInterval(timer);
  if (pauseButton) {
    pauseButton.setAttribute('aria-label', paused ? 'Play highlights' : 'Pause highlights');
    pauseButton.setAttribute('aria-pressed', String(paused));
    pauseButton.innerHTML = `<span aria-hidden="true">${paused ? '▷' : 'Ⅱ'}</span>`;
  }
  if (!paused && !document.hidden) {
    timer = window.setInterval(() => showSlide((activeSlide + 1) % slides.length), 8000);
  }
}
thumbs.forEach((thumb, i) => thumb.addEventListener('click', () => {
  showSlide(i);
  paused = true;
  updatePlayback();
}));
pauseButton?.addEventListener('click', () => {
  paused = !paused;
  updatePlayback();
});
carousel?.addEventListener('focusin', () => {
  // Do not hide a slide containing the keyboard user's focused link.
  paused = true;
  updatePlayback();
});
carousel?.addEventListener('mouseenter', () => window.clearInterval(timer));
carousel?.addEventListener('mouseleave', updatePlayback);
document.addEventListener('visibilitychange', updatePlayback);
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) {
    paused = true;
    updatePlayback();
  }
});
updatePlayback();
