import { shopCapabilityDefaults } from '../config/shopCapabilityDefaults';
import type { ItemCategory, Shop } from './types';
export function scoreShopForCategory(shop: Shop, category: ItemCategory): number { return Math.max(0, ...shop.categories.map(c => shopCapabilityDefaults[c][category] ?? 0)); }
