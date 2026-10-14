export const AGE_BANDS = {
  antique: [100, Infinity],
  '75-99': [75, 99],
  '50-74': [50, 74],
  '25-49': [25, 49],
};

export function normalize(value) {
  return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[’']/g, '');
}

export function ageLabel(watch, year = new Date().getFullYear()) {
  const low = year - watch.yearEnd;
  const high = year - watch.yearStart;
  return low === high ? `About ${low} years old` : `About ${low}–${high} years old`;
}

export function isAntique(watch, year = new Date().getFullYear()) {
  return year - watch.yearEnd >= 100;
}

export function filterWatches(watches, vendors, filters = {}, year = new Date().getFullYear()) {
  const vendorMap = new Map(vendors.map(v => [v.id, v]));
  const tokens = normalize(filters.q || '').trim().split(/\s+/).filter(Boolean);
  const band = AGE_BANDS[filters.age];
  const matches = watches.filter(watch => {
    const vendor = vendorMap.get(watch.vendorId);
    if (!vendor) return false;
    if (!filters.archives && watch.status === 'archive') return false;
    if (filters.brand && watch.brand !== filters.brand) return false;
    if (filters.colour && watch.colour !== filters.colour) return false;
    if (filters.genre && watch.genre !== filters.genre) return false;
    if (filters.country && vendor.country !== filters.country) return false;
    if (filters.vendor && watch.vendorId !== filters.vendor) return false;
    if (filters.currency && watch.currency !== filters.currency) return false;
    if (filters.saved && !filters.savedIds?.has(watch.id)) return false;
    if (band) {
      const minAge = year - watch.yearEnd;
      const maxAge = year - watch.yearStart;
      if (filters.age === 'antique' ? minAge < 100 : maxAge < band[0] || minAge > band[1]) return false;
    }
    const searchable = normalize([watch.brand, watch.model, watch.reference, watch.era, watch.colour, watch.genre, watch.material, watch.movement, vendor.name, vendor.country, vendor.city, ageLabel(watch, year), isAntique(watch, year) ? 'antique' : 'vintage'].join(' '));
    return tokens.every(token => /^\d{4}$/.test(token)
      ? searchable.includes(token) || (Number(token) >= watch.yearStart && Number(token) <= watch.yearEnd)
      : searchable.includes(token));
  });
  const sort = filters.sort;
  if (sort === 'oldest') matches.sort((a, b) => a.yearStart - b.yearStart);
  if (sort === 'newest') matches.sort((a, b) => b.yearEnd - a.yearEnd);
  if (sort === 'brand') matches.sort((a, b) => a.brand.localeCompare(b.brand) || a.model.localeCompare(b.model));
  // Native prices can only be compared within one currency. Never silently mix currencies.
  if ((sort === 'price-low' || sort === 'price-high') && filters.currency) {
    matches.sort((a, b) => {
      if (a.price === null) return b.price === null ? 0 : 1;
      if (b.price === null) return -1;
      return sort === 'price-low' ? a.price - b.price : b.price - a.price;
    });
  }
  return matches;
}

export function regionFor(country) {
  if (['United States', 'Canada'].includes(country)) return 'North America';
  if (['Japan', 'Malaysia'].includes(country)) return 'Asia';
  if (country === 'Australia') return 'Oceania';
  if (country === 'South Africa') return 'Africa';
  return 'Europe';
}

export function formatPrice(watch) {
  if (watch.price === null) return 'Price on enquiry';
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: watch.currency, maximumFractionDigits: 0 }).format(watch.price);
}
