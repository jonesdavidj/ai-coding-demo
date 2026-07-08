import type { ItemCategory, ShopCategory } from '../domain/types';
export const shopCapabilityDefaults: Record<ShopCategory, Partial<Record<ItemCategory, number>>> = {
  supermarket:{grocery:.95,fresh_food:.85,food_drink:.95,pharmacy:.55,toiletries:.75,cards_stationery:.45,household:.70},
  convenience_store:{grocery:.85,fresh_food:.45,food_drink:.90,pharmacy:.35,toiletries:.45,cards_stationery:.35,household:.50},
  pharmacy:{pharmacy:.95,toiletries:.90,cards_stationery:.60,household:.30,food_drink:.25},
  stationery:{cards_stationery:.95,office_supplies:.95,gift:.55}, newsagent:{food_drink:.70,cards_stationery:.70,office_supplies:.45,household:.25},
  electronics:{electronics_accessory:.90}, cafe:{food_drink:.85}, bakery:{food_drink:.90}, parcel_shop:{parcel:.95}, florist:{gift:.75,cards_stationery:.40},
  department_store:{toiletries:.70,household:.75,cards_stationery:.65,electronics_accessory:.50,gift:.75}, unknown:{}
};
export function confidenceLabel(score:number): 'high'|'medium'|'low' { if (score>=.75) return 'high'; if (score>=.45) return 'medium'; return 'low'; }
