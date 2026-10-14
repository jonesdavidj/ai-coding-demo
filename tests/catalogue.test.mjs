import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { ageLabel, filterWatches, formatPrice, isAntique, regionFor } from '../src/catalogue.mjs';

const { watches, vendors } = JSON.parse(await readFile(new URL('../src/catalogue.json', import.meta.url), 'utf8'));
const year = 2026;
const filter = state => filterWatches(watches, vendors, state, year);

test('catalogue represents at least 20 independent worldwide vendors, with source listings', () => {
  assert.ok(watches.length >= 40);
  assert.ok(new Set(vendors.map(v => new URL(v.url).hostname.replace(/^www\./, ''))).size >= 20);
  assert.ok(new Set(vendors.map(v => v.country)).size >= 8);
  assert.equal(new Set(vendors.map(v => regionFor(v.country))).size, 5);
  assert.equal(new Set(watches.map(w => w.id)).size, watches.length);
  assert.equal(new Set(watches.map(w => w.url)).size, watches.length);
  for (const vendor of vendors) assert.ok(watches.some(w => w.vendorId === vendor.id), vendor.name);
  for (const watch of watches) {
    const vendor = vendors.find(v => v.id === watch.vendorId);
    assert.ok(vendor);
    assert.equal(new URL(watch.url).protocol, 'https:');
    assert.equal(new URL(watch.url).hostname.replace(/^www\./, ''), new URL(vendor.url).hostname.replace(/^www\./, ''));
    assert.ok(!/\.(jpg|png|webp)(\?|$)/.test(watch.url), 'Buyer link must be a listing, not a photograph');
    assert.ok(watch.yearStart <= watch.yearEnd && watch.yearEnd <= year);
    assert.ok(watch.price === null || (Number.isFinite(watch.price) && watch.price > 0));
  }
});

test('brand, age, colour, genre, and location combine using AND', () => {
  const results = filter({ brand: 'King Seiko', age: '50-74', colour: 'Green', genre: 'Sport', country: 'Canada' });
  assert.equal(results.length, 1);
  assert.equal(results[0].reference, '5626-7160');
  assert.equal(filter({ brand: 'King Seiko', colour: 'Black' }).length, 0);
});

test('search accepts accents, multiple terms, source locations, and years inside approximate decades', () => {
  assert.equal(filter({ q: 'universal geneve compax Tokyo' }).length, 1);
  assert.equal(filter({ q: 'bulova 1955' }).length, 1);
  assert.equal(filter({ q: 'Rolex 6694' }).length, 1);
  assert.equal(filter({ q: 'Rolex 5513' }).length, 1);
  assert.equal(filter({ q: 'seiko green Canada' }).length, 1);
  assert.equal(filter({ q: 'nonexistent rainbow sundial' }).length, 0);
});

test('antique classification requires the entire source date range to be at least 100 years old', () => {
  const antiques = filter({ age: 'antique' });
  assert.ok(antiques.length >= 8);
  assert.ok(antiques.every(w => w.yearEnd <= 1926));
  assert.equal(isAntique({ yearStart: 1920, yearEnd: 1929 }, year), false);
  assert.equal(isAntique({ yearStart: 1926, yearEnd: 1926 }, year), true);
});

test('age filtering handles decade overlap without inventing a precise manufacture year', () => {
  const source = [{ ...watches[0], yearStart: 1950, yearEnd: 1959 }];
  assert.equal(filterWatches(source, vendors, { age: '50-74' }, year).length, 1);
  assert.equal(filterWatches(source, vendors, { age: '75-99' }, year).length, 1);
  assert.equal(ageLabel(source[0], year), 'About 67–76 years old');
});

test('sold archives are excluded by default and explicitly selectable', () => {
  assert.ok(filter({}).every(w => w.status !== 'archive'));
  assert.equal(filter({ archives: true }).length, watches.length);
  assert.ok(filter({ archives: true, vendor: 'vgw' }).some(w => w.status === 'archive'));
});

test('shortlist filtering respects other filters and does not invent saved items', () => {
  const savedIds = new Set(['a001', 'a002', 'does-not-exist']);
  assert.equal(filter({ saved: true, savedIds }).length, 2);
  assert.equal(filter({ saved: true, savedIds, brand: 'Hamilton' }).length, 1);
  assert.equal(filter({ saved: true, savedIds: new Set() }).length, 0);
});

test('price sorts only operate within a selected original currency, with unknown prices last', () => {
  const unsorted = filter({});
  assert.deepEqual(filter({ sort: 'price-low' }).map(w => w.id), unsorted.map(w => w.id));
  for (const currency of ['EUR', 'GBP', 'USD']) {
    const sorted = filter({ currency, sort: 'price-low' });
    assert.ok(sorted.every(w => w.currency === currency));
    const priced = sorted.filter(w => w.price !== null);
    assert.deepEqual(priced.map(w => w.price), priced.map(w => w.price).sort((a, b) => a - b));
    if (sorted.some(w => w.price === null)) assert.equal(sorted.at(-1).price, null);
  }
});

test('original currency and enquiry pricing are preserved', () => {
  assert.match(formatPrice({ price: 1400, currency: 'GBP' }), /£1,400/);
  assert.match(formatPrice({ price: 2490, currency: 'AUD' }), /A\$2,490/);
  assert.equal(formatPrice({ price: null, currency: 'EUR' }), 'Price on enquiry');
});

test('oldest-first, newest-first, and brand sorting do not mutate the catalogue', () => {
  const before = watches.map(w => w.id);
  const old = filter({ sort: 'oldest' });
  assert.equal(old[0].yearStart, 1780);
  assert.ok(old.every((w, i) => i === 0 || w.yearStart >= old[i - 1].yearStart));
  const recent = filter({ sort: 'newest' });
  assert.ok(recent.every((w, i) => i === 0 || w.yearEnd <= recent[i - 1].yearEnd));
  assert.deepEqual(watches.map(w => w.id), before);
});
