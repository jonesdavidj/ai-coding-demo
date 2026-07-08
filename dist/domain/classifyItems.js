import { itemCategoryMap } from '../config/itemCategoryMap.js';
const stopWords = /\b(please|get|buy|pick up|some|a|an|the|and)\b/gi;
export function classifyItems(rawInput) {
    return rawInput.split(/[\n,]+/).map(x => x.replace(stopWords, ' ').trim()).filter(Boolean).slice(0, 10).map((rawText, index) => {
        const normalisedName = rawText.toLowerCase().replace(/[–—]/g, '-').replace(/\s+/g, ' ').trim();
        return { id: `item_${index}_${normalisedName.replace(/[^a-z0-9]+/g, '_')}`, rawText, normalisedName, category: itemCategoryMap[normalisedName] ?? 'unknown', priority: 'must_have' };
    });
}
