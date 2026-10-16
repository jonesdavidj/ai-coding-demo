const menu = document.querySelector('.menu');
const nav = document.querySelector('nav');
if (menu && nav) {
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  });
  nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  }));
}

const content = new Map([
  ['tab-nature', ['Let curiosity wander.', 'From coastal walks to country park trails, the surrounding landscape gives families opportunities for outdoor discovery and time together beyond the school day.']],
  ['tab-neighbourhood', ['Feel part of the neighbourhood.', 'Sai Kung’s waterfront, local shops and places to eat offer everyday opportunities to meet, spend time together and build a connection with the wider community.']],
]);
const tabs = Array.from(document.querySelectorAll('[role=tab]'));
tabs.forEach((tab, index) => {
  const select = () => {
    tabs.forEach(button => {
      button.setAttribute('aria-selected', String(button === tab));
      button.setAttribute('tabindex', button === tab ? '0' : '-1');
    });
    const copy = content.get(tab.id);
    const panel = document.querySelector('.panel');
    if (!copy || !panel) return;
    panel.setAttribute('aria-labelledby', tab.id);
    const heading = document.createElement('h3');
    const paragraph = document.createElement('p');
    heading.textContent = copy[0];
    paragraph.textContent = copy[1];
    panel.replaceChildren(heading, paragraph);
  };
  tab.addEventListener('click', select);
  tab.addEventListener('keydown', event => {
    if (!(event instanceof KeyboardEvent)) return;
    const destinations = new Map([
      ['ArrowRight', (index + 1) % tabs.length],
      ['ArrowLeft', (index + tabs.length - 1) % tabs.length],
      ['Home', 0],
      ['End', tabs.length - 1],
    ]);
    const destination = destinations.get(event.key);
    if (destination === undefined) return;
    event.preventDefault();
    const next = tabs[destination];
    if (next instanceof HTMLElement) {
      next.click();
      next.focus();
    }
  });
});

// Keep the credit and source link available when an external photo cannot load.
document.querySelectorAll('figure.photo img').forEach(image => {
  const showFallback = () => {
    const placeholder = image.parentElement?.querySelector('.photo-unavailable');
    image.setAttribute('hidden', '');
    placeholder?.removeAttribute('hidden');
  };
  image.addEventListener('error', showFallback);
  if (image instanceof HTMLImageElement && image.complete && image.naturalWidth === 0) {
    showFallback();
  }
});

const sources = document.querySelector('#sources');
const revealSources = () => {
  if (sources instanceof HTMLDetailsElement && window.location.hash === '#sources') {
    sources.open = true;
  }
};
window.addEventListener('hashchange', revealSources);
revealSources();
