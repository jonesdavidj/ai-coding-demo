import { ageLabel, filterWatches, formatPrice, isAntique, regionFor } from './catalogue.mjs';

const $ = selector => document.querySelector(selector);
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const arrow = '<span aria-hidden="true">↗</span>';
const keys = ['brand', 'age', 'colour', 'genre', 'country', 'vendor', 'currency'];
const PAGE_SIZE = 12;
const STORAGE_KEY = 'augustus-watch-shortlist-v1';
const currentYear = new Date().getFullYear();
let saved = new Set();
let page = 1;
let catalogue;
let toastTimer;
let shownWatch = null;
let focusBeforeDialog = null;
let state = { q: '', brand: '', age: '', colour: '', genre: '', country: '', vendor: '', currency: '', sort: 'curated', archives: false, saved: false };

function toast(message) {
  $('#toast').textContent = message;
  $('#toast').classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => $('#toast').classList.remove('show'), 3000);
}

function safeURL(url) {
  try { const parsed = new URL(url); return parsed.protocol === 'https:' ? parsed.href : ''; } catch { return ''; }
}

function photo(watch, mode = '') {
  const image = safeURL(watch.image);
  const fallback = `<div class="photo-unavailable"><span class="mini-crest" aria-hidden="true">A</span><span>Photograph at the vendor</span><small>View the original listing</small></div>`;
  return `<div class="watch-photo ${mode}">${image ? `<img src="${escapeHTML(image)}" alt="${escapeHTML(`${watch.brand} ${watch.model}, vendor photograph`)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" />` : ''}${fallback}</div>`;
}

function bindImageFallbacks(container) {
  container.querySelectorAll('.watch-photo img').forEach(img => {
    img.addEventListener('load', () => img.parentElement.classList.add('photo-loaded'));
    img.addEventListener('error', () => { img.hidden = true; img.parentElement.classList.add('photo-failed'); });
    if (img.complete && img.naturalWidth > 0) img.parentElement.classList.add('photo-loaded');
  });
}

function syncURL() {
  const params = new URLSearchParams();
  for (const key of ['q', ...keys, 'sort']) if (state[key] && !(key === 'sort' && state[key] === 'curated')) params.set(key, state[key]);
  if (state.archives) params.set('archives', '1');
  if (state.saved) params.set('saved', '1');
  const query = params.toString();
  history.replaceState(null, '', `${location.pathname}${query ? '?' + query : ''}${location.hash}`);
}

function syncControls() {
  $('#search').value = state.q;
  for (const key of keys.filter(key => key !== 'colour')) $(`#${key}`).value = state[key];
  $('#archives').checked = state.archives;
  $('#sort').value = state.sort;
  document.querySelectorAll('[data-colour]').forEach(button => {
    const selected = button.dataset.colour === state.colour;
    button.classList.toggle('selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  document.querySelectorAll('[data-preset]').forEach(button => {
    const active = button.dataset.preset === 'all' ? !state.age && !state.genre
      : button.dataset.preset === 'antique' ? state.age === 'antique'
      : button.dataset.preset === 'dress' ? state.genre === 'Dress'
      : button.dataset.preset === 'chrono' ? state.genre === 'Chronograph'
      : state.genre === 'Pocket';
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  const count = keys.filter(key => state[key]).length + Number(state.archives);
  $('#filter-count').textContent = count;
  $('#saved-count').textContent = saved.size;
  $('#saved-nav').setAttribute('aria-pressed', String(state.saved));
  $('#saved-nav').classList.toggle('selected', state.saved);
  const nativePriceEnabled = !!state.currency;
  for (const option of $('#sort').options) {
    if (option.value.startsWith('price-')) {
      option.disabled = !nativePriceEnabled;
      option.textContent = option.value === 'price-low'
        ? nativePriceEnabled ? `Price: low to high (${state.currency})` : 'Price ↑ · choose a currency'
        : nativePriceEnabled ? `Price: high to low (${state.currency})` : 'Price ↓ · choose a currency';
    }
  }
}

function card(watch) {
  const vendor = catalogue.vendors.find(v => v.id === watch.vendorId);
  const antique = isAntique(watch, currentYear);
  const isSaved = saved.has(watch.id);
  return `<article class="watch-card" data-watch="${watch.id}"><div class="card-photo"><button class="photo-button" data-details="${watch.id}" aria-label="View details for ${escapeHTML(watch.brand + ' ' + watch.model)}">${photo(watch)}</button><span class="watch-badge ${antique ? 'antique-badge' : ''}">${watch.status === 'archive' ? 'SOLD ARCHIVE' : antique ? 'ANTIQUE · 100+ YEARS' : watch.era.toUpperCase()}</span><button class="save-button ${isSaved ? 'is-saved' : ''}" data-save="${watch.id}" aria-label="${isSaved ? 'Remove' : 'Save'} ${escapeHTML(watch.brand + ' ' + watch.model)}${isSaved ? ' from' : ' to'} shortlist" aria-pressed="${isSaved}">${isSaved ? '♥' : '♡'}</button></div><div class="card-copy"><div class="card-meta"><span>${escapeHTML(watch.genre)}</span><span>${escapeHTML(watch.era)}</span></div><button class="card-title" data-details="${watch.id}"><span>${escapeHTML(watch.brand)}</span><h3>${escapeHTML(watch.model)}</h3></button><p class="card-vendor">${escapeHTML(vendor.name)} <span>· ${escapeHTML(vendor.country)}</span></p><div class="card-bottom"><p class="watch-price">${formatPrice(watch)}<small>${watch.price === null ? watch.vendorId === 'pool' ? 'Vendor login required' : 'Contact the vendor' : watch.currency + ' · vendor price'}</small></p><a href="${escapeHTML(safeURL(watch.url))}" target="_blank" rel="noopener noreferrer" aria-label="${watch.status === 'archive' ? 'View archived' : 'View'} ${escapeHTML(watch.brand + ' ' + watch.model)} at ${escapeHTML(vendor.name)}">${watch.status === 'archive' ? 'View archive' : 'View at vendor'} ${arrow}</a></div></div></article>`;
}

function render() {
  const matches = filterWatches(catalogue.watches, catalogue.vendors, { ...state, savedIds: saved }, currentYear);
  const totalPages = Math.max(1, Math.ceil(matches.length / PAGE_SIZE));
  page = Math.min(page, totalPages);
  const start = (page - 1) * PAGE_SIZE;
  $('#result-count').innerHTML = state.saved ? `<strong>Your shortlist</strong> · ${matches.length} ${matches.length === 1 ? 'timepiece' : 'timepieces'}` : `<strong>${matches.length}</strong> ${matches.length === 1 ? 'timepiece' : 'timepieces'}${matches.length ? ` · showing ${start + 1}–${Math.min(start + PAGE_SIZE, matches.length)}` : ''}`;
  $('#watch-grid').innerHTML = matches.length ? matches.slice(start, start + PAGE_SIZE).map(card).join('')
    : `<div class="empty-state"><span aria-hidden="true">✧</span><h3>${state.saved ? saved.size ? 'Nothing here matches your filters.' : 'Your collection starts with a little curiosity.' : 'A rare combination. Try a wider search.'}</h3><p>${state.saved && !saved.size ? 'Tap the heart on any timepiece to keep it in your shortlist.' : 'Remove a filter or try another brand, colour or era.'}</p><button class="button button-purple" data-empty-reset>${state.saved && !saved.size ? 'Explore the collection' : 'Reset filters'}</button></div>`;
  bindImageFallbacks($('#watch-grid'));
  $('#pagination').innerHTML = matches.length > PAGE_SIZE ? `<button data-page="${page - 1}" ${page === 1 ? 'disabled' : ''} aria-label="Previous page">←</button>${Array.from({ length: totalPages }, (_, i) => `<button data-page="${i + 1}" class="${page === i + 1 ? 'current' : ''}" aria-label="Page ${i + 1}" ${page === i + 1 ? 'aria-current="page"' : ''}>${i + 1}</button>`).join('')}<button data-page="${page + 1}" ${page === totalPages ? 'disabled' : ''} aria-label="Next page">→</button>` : '';
  const labels = { brand: 'Brand', age: 'Age', colour: 'Colour', genre: 'Style', country: 'Location', vendor: 'Vendor', currency: 'Currency' };
  $('#active-filters').innerHTML = keys.filter(key => state[key]).map(key => {
    const label = key === 'age' ? $('#age').selectedOptions[0]?.textContent : key === 'vendor' ? catalogue.vendors.find(v => v.id === state.vendor)?.name : state[key];
    return `<button data-clear="${key}" aria-label="Remove ${labels[key]} filter">${escapeHTML(label || state[key])}<span aria-hidden="true">×</span></button>`;
  }).join('') + (state.saved ? '<button data-clear="saved">My shortlist <span aria-hidden="true">×</span></button>' : '');
  syncControls();
  syncURL();
}

function change(patch) {
  state = { ...state, ...patch };
  if (!state.currency && state.sort.startsWith('price-')) state.sort = 'curated';
  page = 1;
  syncControls();
  render();
}

function reset(leaveSaved = false) {
  change({ q: '', brand: '', age: '', colour: '', genre: '', country: '', vendor: '', currency: '', sort: 'curated', archives: false, saved: leaveSaved && state.saved });
}

function saveWatch(id) {
  const watch = catalogue.watches.find(w => w.id === id);
  if (!watch) return;
  const wasSaved = saved.has(id);
  if (wasSaved) saved.delete(id); else saved.add(id);
  let persisted = true;
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...saved])); } catch { persisted = false; }
  const focusedSaveId = document.activeElement?.dataset.save;
  render();
  if (focusedSaveId) document.querySelector(`[data-save="${focusedSaveId}"]`)?.focus();
  if (shownWatch === id) {
    const button = $('#dialog-content [data-save]');
    if (button) { button.textContent = saved.has(id) ? '♥ Saved to shortlist' : '♡ Save to shortlist'; button.setAttribute('aria-pressed', String(saved.has(id))); }
  }
  toast(`${watch.brand} ${wasSaved ? 'removed from' : 'added to'} your shortlist.${persisted ? '' : ' Saved for this visit only.'}`);
}

function showDetails(id) {
  const watch = catalogue.watches.find(w => w.id === id);
  if (!watch) return;
  const vendor = catalogue.vendors.find(v => v.id === watch.vendorId);
  focusBeforeDialog = document.activeElement;
  shownWatch = id;
  const statusNote = watch.status === 'archive' ? 'Sold archive: this particular piece is no longer listed as available. Explore the vendor for related watches.' : 'Vendor listing: availability and price need confirmation directly with the seller.';
  const specs = [['Era', watch.era], ['Age', ageLabel(watch, currentYear)], ['Classification', isAntique(watch, currentYear) ? 'Antique · 100+ years' : 'Vintage'], ['Dial colour', watch.colour], ['Genre / style', watch.genre], ['Movement', watch.movement], ['Case material', watch.material], ['Reference', watch.reference || 'Not stated']];
  $('#dialog-content').innerHTML = `<div class="detail-layout">${photo(watch, 'detail-photo')}<div class="detail-copy"><p class="eyebrow dark">${escapeHTML(watch.brand)}</p><h2 id="dialog-title">${escapeHTML(watch.model)}</h2><p class="detail-price">${formatPrice(watch)}<small>${watch.price === null ? watch.vendorId === 'pool' ? 'Vendor login required to see price' : 'Enquire with the vendor' : watch.currency + ' · source price, subject to change'}</small></p><dl>${specs.map(([label, value]) => `<div><dt>${label}</dt><dd>${escapeHTML(value)}</dd></div>`).join('')}</dl><div class="detail-vendor"><strong>${escapeHTML(vendor.name)}</strong><span>${escapeHTML(vendor.city)}, ${escapeHTML(vendor.country)}</span><p>${statusNote}</p><small>Researched ${new Date(watch.checkedAt + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}. Details come from the source vendor. “Not stated” means the source did not establish that detail. Dates are approximate.</small></div><a class="button button-purple" href="${escapeHTML(safeURL(watch.url))}" target="_blank" rel="noopener noreferrer">${watch.status === 'archive' ? 'See the archived listing' : 'Visit the original seller'} ${arrow}</a><button class="detail-save" data-save="${watch.id}" aria-pressed="${saved.has(id)}">${saved.has(id) ? '♥ Saved to shortlist' : '♡ Save to shortlist'}</button><p class="detail-terms">Purchase and payment take place on the vendor's website. Augustus's does not take payment or authenticate these watches.</p></div></div>`;
  bindImageFallbacks($('#dialog-content'));
  $('#watch-dialog').showModal();
  document.body.classList.add('dialog-open');
}

function renderVendors() {
  const region = $('#vendor-region').value;
  const vendors = catalogue.vendors.filter(v => !region || regionFor(v.country) === region);
  $('#vendor-total').textContent = vendors.length;
  $('#country-total').textContent = new Set(vendors.map(v => v.country)).size;
  $('#vendor-directory').innerHTML = vendors.map(v => `<article class="vendor-entry"><span class="vendor-region">${escapeHTML(regionFor(v.country))} · ${escapeHTML(v.country)}</span><h3>${escapeHTML(v.name)}</h3><p>${escapeHTML(v.city)}</p><div><button class="text-button" data-vendor="${v.id}">${catalogue.watches.filter(w => w.vendorId === v.id).length} ${catalogue.watches.filter(w => w.vendorId === v.id).length === 1 ? 'watch' : 'watches'} in our edit →</button><a href="${escapeHTML(safeURL(v.url))}" target="_blank" rel="noopener noreferrer" aria-label="Visit ${escapeHTML(v.name)}">${arrow}</a></div></article>`).join('');
}

function populateFilters() {
  const unique = (list, key) => [...new Set(list.map(item => item[key]))].sort((a, b) => a.localeCompare(b));
  const options = list => list.map(value => `<option value="${escapeHTML(value)}">${escapeHTML(value)}</option>`).join('');
  $('#brand').insertAdjacentHTML('beforeend', options(unique(catalogue.watches, 'brand')));
  $('#genre').insertAdjacentHTML('beforeend', options(unique(catalogue.watches, 'genre')));
  $('#country').insertAdjacentHTML('beforeend', options(unique(catalogue.vendors, 'country')));
  $('#currency').insertAdjacentHTML('beforeend', options(unique(catalogue.watches, 'currency')));
  $('#vendor').insertAdjacentHTML('beforeend', catalogue.vendors.map(v => `<option value="${v.id}">${escapeHTML(v.name)}</option>`).join(''));
  const colours = { '': 'All colours', Black: 'Black', White: 'White', Silver: 'Silver', Blue: 'Blue', Cream: 'Cream', Champagne: 'Champagne', Salmon: 'Salmon', Green: 'Green', Grey: 'Grey', Gold: 'Gold' };
  $('#colour-options').innerHTML = Object.entries(colours).map(([value, label]) => `<button type="button" data-colour="${value}" class="colour-chip ${value ? '' : 'all-colours'}" aria-pressed="${value === ''}" title="${label}">${value ? `<span class="colour-dot ${value.toLowerCase()}" aria-hidden="true"></span>` : ''}${label}</button>`).join('');
  const params = new URLSearchParams(location.search);
  for (const key of keys.filter(key => key !== 'colour')) {
    const value = params.get(key) || '';
    if ([...$(`#${key}`).options].some(option => option.value === value)) state[key] = value;
  }
  if (Object.keys(colours).includes(params.get('colour'))) state.colour = params.get('colour');
  state.q = params.get('q') || '';
  state.archives = params.get('archives') === '1';
  state.saved = params.get('saved') === '1';
  const sort = params.get('sort');
  if (['curated', 'oldest', 'newest', 'brand', 'price-low', 'price-high'].includes(sort) && (!sort.startsWith('price-') || state.currency)) state.sort = sort;
}

function bindEvents() {
  $('#search').addEventListener('input', event => change({ q: event.target.value }));
  $('#filters').addEventListener('submit', event => event.preventDefault());
  $('#filters').addEventListener('change', event => {
    const name = event.target.name;
    if (keys.includes(name)) change({ [name]: event.target.value });
    if (name === 'archives') change({ archives: event.target.checked });
  });
  $('#sort').addEventListener('change', event => change({ sort: event.target.value }));
  $('#reset').addEventListener('click', () => reset(true));
  $('#saved-nav').addEventListener('click', () => { change({ saved: !state.saved }); $('#collection').scrollIntoView({ behavior: 'smooth' }); });
  $('#mobile-filters').addEventListener('click', () => {
    const expanded = $('#mobile-filters').getAttribute('aria-expanded') !== 'true';
    $('#mobile-filters').setAttribute('aria-expanded', String(expanded));
    $('#filter-panel').classList.toggle('mobile-open', expanded);
  });
  $('#vendor-region').addEventListener('change', renderVendors);
  document.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.dataset.save) saveWatch(button.dataset.save);
    if (button.dataset.details) showDetails(button.dataset.details);
    if (button.hasAttribute('data-colour')) change({ colour: button.dataset.colour });
    if (button.dataset.clear) change({ [button.dataset.clear]: button.dataset.clear === 'saved' ? false : '' });
    if (button.dataset.preset) {
      const preset = button.dataset.preset;
      change({ age: preset === 'antique' ? 'antique' : '', genre: { dress: 'Dress', chrono: 'Chronograph', pocket: 'Pocket' }[preset] || '' });
    }
    if (button.dataset.vendor) {
      reset(); change({ vendor: button.dataset.vendor, archives: true });
      $('#collection').scrollIntoView({ behavior: 'smooth' });
    }
    if (button.hasAttribute('data-empty-reset')) reset(state.saved && saved.size > 0);
    if (button.hasAttribute('data-page') && !button.disabled) {
      page = Number(button.dataset.page); render();
      $('.results-toolbar').scrollIntoView({ behavior: 'smooth', block: 'start' });
      $('#watch-grid .photo-button')?.focus({ preventScroll: true });
    }
  });
  $('.dialog-close').addEventListener('click', () => $('#watch-dialog').close());
  $('#watch-dialog').addEventListener('click', event => { if (event.target === $('#watch-dialog')) $('#watch-dialog').close(); });
  $('#watch-dialog').addEventListener('close', () => {
    shownWatch = null; document.body.classList.remove('dialog-open');
    if (focusBeforeDialog?.isConnected) focusBeforeDialog.focus(); else $('#saved-nav').focus();
  });
  document.addEventListener('keydown', event => {
    if (event.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName) && !$('#watch-dialog').open) {
      event.preventDefault(); $('#search').focus(); $('#collection').scrollIntoView({ behavior: 'smooth' });
    }
  });
  window.addEventListener('storage', event => {
    if (event.key !== STORAGE_KEY && event.key !== null) return;
    readShortlist(); render();
  });
}

function readShortlist() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    saved = new Set(Array.isArray(stored) ? stored.filter(id => catalogue.watches.some(w => w.id === id)) : []);
  } catch { saved = new Set(); }
}

async function initialize() {
  try {
    const response = await fetch(new URL('./catalogue.json', import.meta.url));
    if (!response.ok) throw new Error('Catalogue unavailable');
    catalogue = await response.json();
    // Put a varied selection of photographed pieces first, while preserving all source records.
    const edit = ['a002', 'a014', 'a022', 'a001', 'a021', 'a006', 'a028', 'a024', 'a003', 'a039', 'a029', 'a027'];
    catalogue.watches.sort((a, b) => {
      const ai = edit.indexOf(a.id); const bi = edit.indexOf(b.id);
      return (ai < 0 ? 999 : ai) - (bi < 0 ? 999 : bi);
    });
    readShortlist();
    populateFilters();
    bindEvents();
    $('#stat-watches').textContent = catalogue.watches.length;
    $('#stat-vendors').textContent = catalogue.vendors.length;
    $('#stat-countries').textContent = new Set(catalogue.vendors.map(v => v.country)).size;
    $('#current-year').textContent = currentYear;
    $('#research-date').textContent = `Collection researched ${new Date(catalogue.updatedAt + 'T12:00:00Z').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}`;
    renderVendors(); render();
  } catch (error) {
    console.error('Unable to load the watch catalogue:', error);
    $('#result-count').textContent = 'The collection could not be loaded.';
    $('#watch-grid').innerHTML = '<div class="empty-state"><h3>The collection needs another moment.</h3><p>Please reload the page to try again.</p><button class="button button-purple" id="retry">Reload the collection</button></div>';
    $('#retry').addEventListener('click', () => location.reload());
  }
}
initialize();
