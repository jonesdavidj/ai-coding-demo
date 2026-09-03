import { shopCapabilityDefaults } from '../config/shopCapabilityDefaults.js';
export function scoreShopForCategory(shop, category) { return Math.max(0, ...shop.categories.map(c => shopCapabilityDefaults[c][category] ?? 0)); }
