import { journeys } from './config/journeys.js';
import { confidenceLabel } from './config/shopCapabilityDefaults.js';
import { seedShopsByJourney } from './data/seedShops.js';
import { classifyItems } from './domain/classifyItems.js';
import { generateRouteCandidates } from './domain/generateRouteCandidates.js';
import { selectRouteOptions } from './domain/selectRouteOptions.js';
const root = document.getElementById('root');
let selectedJourneyProfileId = 'vauxhall_to_office';
let rawShoppingInput = '';
let routeOptions = [];
let showAlternatives = false;
let capture = false;
let message = '';
let outcomes = {};
const savedOutcomesKey = 'commute-errand-outcomes';
function defaultConstraints(id) {
    const journey = journeys.find((j) => j.id === id);
    return { maxExtraWalkMinutes: journey.defaultMaxExtraWalkMinutes, maxStops: journey.defaultMaxStops, openOnly: true, preferFewerStops: true, avoidLowConfidence: true, arrivalTime: '' };
}
let constraints = defaultConstraints(selectedJourneyProfileId);
function escapeHtml(value) { return value.replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[char]); }
function setState(updates) {
    Object.assign({ selectedJourneyProfileId, rawShoppingInput, routeOptions, showAlternatives, capture, message, outcomes, constraints }, updates);
    if (updates.selectedJourneyProfileId)
        selectedJourneyProfileId = updates.selectedJourneyProfileId;
    if (updates.rawShoppingInput !== undefined)
        rawShoppingInput = updates.rawShoppingInput;
    if (updates.routeOptions)
        routeOptions = updates.routeOptions;
    if (updates.showAlternatives !== undefined)
        showAlternatives = updates.showAlternatives;
    if (updates.capture !== undefined)
        capture = updates.capture;
    if (updates.message !== undefined)
        message = updates.message;
    if (updates.outcomes)
        outcomes = updates.outcomes;
    if (updates.constraints)
        constraints = updates.constraints;
    render();
}
function findRoute() {
    const journey = journeys.find((j) => j.id === selectedJourneyProfileId);
    const parsedItems = classifyItems(rawShoppingInput);
    if (!parsedItems.length)
        return setState({ message: 'Add what you need to buy to find a route.', routeOptions: [] });
    const candidates = generateRouteCandidates(journey, seedShopsByJourney[journey.id], parsedItems, constraints);
    const selected = selectRouteOptions(candidates);
    const closedMessage = constraints.openOnly && constraints.arrivalTime ? ` No worthwhile open-shop detour found for ${constraints.arrivalTime}. Try a different arrival time or untick open shops only.` : 'No worthwhile detour found within your time limit.';
    setState({ routeOptions: selected, showAlternatives: false, capture: false, message: selected.length ? '' : closedMessage });
}
function saveOutcomes() {
    const option = routeOptions[0];
    if (!option)
        return;
    const records = Object.entries(outcomes).map(([itemId, outcome]) => ({ id: `outcome_${Date.now()}_${itemId}`, routeOptionId: option.id, journeyProfileId: option.journeyProfileId, itemId, shopId: option.stops.find((s) => s.itemsToBuy.some((i) => i.id === itemId))?.shopId, outcome, createdAt: new Date().toISOString() }));
    const existing = JSON.parse(localStorage.getItem(savedOutcomesKey) || '[]');
    localStorage.setItem(savedOutcomesKey, JSON.stringify([...existing, ...records]));
    setState({ message: 'Outcome saved for later confidence learning.' });
}
function mapPreview(option) { return `<div class="map-preview"><iframe title="Google map for recommended route" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="${option.map.embedMapsUrl}"></iframe><p>${escapeHtml(option.map.origin.label)} → ${escapeHtml(option.stops.map((s) => s.shopName).join(' → '))} → ${escapeHtml(option.map.destination.label)}</p></div>`; }
function routeCard(option, totalItems) { return `<section class="card hero"><h2>${option.label === 'recommended' ? 'Recommended route' : option.label.replace('_', ' ')}</h2><div class="metrics"><b>Covers: ${option.coveredItems.length} of ${totalItems} items</b><span>Extra walking: +${option.extraWalkMinutes} minutes</span><span>Direct walk: ${option.directWalkMinutes} minutes</span><span>Route walk: ${option.routeWalkMinutes} minutes</span><span>Estimated shop time: ${option.estimatedShopMinutesMin}–${option.estimatedShopMinutesMax} minutes</span><span>Total delay: ${option.totalDelayMinutesMin}–${option.totalDelayMinutesMax} minutes</span></div>${option.stops.map((stop) => `<div class="stop"><h3>${stop.sequence}. ${escapeHtml(stop.shopName)}</h3><ul>${stop.itemsToBuy.map((item) => `<li>${escapeHtml(item.rawText)}: ${confidenceLabel(stop.confidenceByItemId[item.id])} confidence, likely to sell</li>`).join('')}</ul></div>`).join('')}${option.uncoveredItems.length ? `<p class="warning">Not covered: ${escapeHtml(option.uncoveredItems.map((i) => i.rawText).join(', '))}</p>` : ''}<div class="actions"><a class="primary" href="${option.map.externalMapsUrl}" target="_blank">Open in Google Maps</a><button id="mark-done">Start / Mark as done</button></div>${mapPreview(option)}</section>`; }
function render() {
    const parsedItems = classifyItems(rawShoppingInput);
    const selectedOption = routeOptions[0];
    root.innerHTML = `<main><header><p class="eyebrow">Personal commute errands</p><h1>Commute Errand Route Optimiser</h1><p>Pick a regular walk, add what you need to buy, and find the least-annoying useful detour via shops that are likely to sell them.</p></header><section class="card"><h2>Where are you walking from?</h2><div class="route-grid">${journeys.map((j) => `<button class="journey ${selectedJourneyProfileId === j.id ? 'selected' : ''}" data-id="${j.id}">${j.label}</button>`).join('')}</div></section><section class="card"><h2>What do you need to buy?</h2><textarea id="shopping-input" placeholder="Add one item per line, e.g. milk, birthday card, paracetamol">${escapeHtml(rawShoppingInput)}</textarea><div class="constraints"><label>Max extra walking <input id="max-extra" type="number" min="0" max="30" value="${constraints.maxExtraWalkMinutes}"> min</label><label>Max stops <input id="max-stops" type="number" min="1" max="2" value="${constraints.maxStops}"></label><label>Arriving around <input id="arrival-time" type="time" value="${constraints.arrivalTime ?? ''}"></label><label><input id="open-only" type="checkbox" ${constraints.openOnly ? 'checked' : ''}> Open shops only</label><label><input id="prefer-fewer" type="checkbox" ${constraints.preferFewerStops ? 'checked' : ''}> Prefer fewer stops</label></div><button id="find-route" class="primary">Find route</button></section>${message ? `<p class="notice">${message}</p>` : ''}${selectedOption && !capture ? routeCard(selectedOption, parsedItems.length) : ''}${routeOptions.length > 1 && !capture ? `<section class="card"><button id="show-alts">Show alternatives</button>${showAlternatives ? `<div class="alternatives">${routeOptions.map((option) => `<article><h3>${option.label.replace('_', ' ')}</h3><p>${escapeHtml(option.stops.map((s) => s.shopName).join(' + '))}</p><p>Covers ${option.coveredItems.length} of ${parsedItems.length}; +${option.extraWalkMinutes} minutes; confidence ${Math.round(option.confidenceScore * 100)}%</p><a href="${option.map.externalMapsUrl}" target="_blank">Open in maps</a></article>`).join('')}</div>` : ''}</section>` : ''}${selectedOption && capture ? `<section class="card"><h2>How did it go?</h2>${[...selectedOption.coveredItems, ...selectedOption.uncoveredItems].map((item) => `<div class="outcome"><span>${escapeHtml(item.rawText)}</span>${['bought', 'not_found', 'skipped'].map((value) => `<button class="outcome-btn ${outcomes[item.id] === value ? 'selected' : ''}" data-item="${item.id}" data-value="${value}">${value.replace('_', ' ')}</button>`).join('')}</div>`).join('')}<button id="save-outcomes" class="primary">Save</button></section>` : ''}</main>`;
    root.querySelectorAll('.journey').forEach((button) => button.onclick = () => { selectedJourneyProfileId = button.dataset.id; constraints = defaultConstraints(selectedJourneyProfileId); routeOptions = []; capture = false; render(); });
    root.querySelector('#shopping-input')?.addEventListener('input', (event) => rawShoppingInput = event.target.value);
    root.querySelector('#find-route')?.addEventListener('click', () => { constraints = { ...constraints, maxExtraWalkMinutes: Number(root.querySelector('#max-extra').value), maxStops: Number(root.querySelector('#max-stops').value), openOnly: root.querySelector('#open-only').checked, preferFewerStops: root.querySelector('#prefer-fewer').checked, arrivalTime: root.querySelector('#arrival-time').value }; findRoute(); });
    root.querySelector('#mark-done')?.addEventListener('click', () => setState({ capture: true }));
    root.querySelector('#show-alts')?.addEventListener('click', () => setState({ showAlternatives: !showAlternatives }));
    root.querySelectorAll('.outcome-btn').forEach((button) => button.onclick = () => setState({ outcomes: { ...outcomes, [button.dataset.item]: button.dataset.value } }));
    root.querySelector('#save-outcomes')?.addEventListener('click', saveOutcomes);
}
render();
