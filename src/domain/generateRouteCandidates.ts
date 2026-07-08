import type { JourneyProfile, RouteConstraints, RouteOption, RouteStop, Shop, ShoppingItem } from './types';
import { scoreShopForCategory } from './scoreShop';
import { buildGoogleMapsUrl } from './mapsUrl';
const WALK_MIN_PER_KM = 12;
const COVERAGE_THRESHOLD = .45;
function distanceKm(a:{latitude:number;longitude:number},b:{latitude:number;longitude:number}) { const R=6371; const dLat=(b.latitude-a.latitude)*Math.PI/180; const dLng=(b.longitude-a.longitude)*Math.PI/180; const lat1=a.latitude*Math.PI/180; const lat2=b.latitude*Math.PI/180; const x=Math.sin(dLat/2)**2+Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLng/2)**2; return 2*R*Math.asin(Math.sqrt(x)); }
function walkMinutes(points:{latitude:number;longitude:number}[]) { return Math.max(1, Math.round(points.slice(1).reduce((sum,p,i)=>sum+distanceKm(points[i],p)*WALK_MIN_PER_KM,0))); }
function permutations<T>(arr:T[], max:number) { const out:T[][]=[]; const rec=(prefix:T[], rest:T[])=>{ if(prefix.length) out.push(prefix); if(prefix.length===max) return; rest.forEach((x,i)=>rec([...prefix,x], rest.filter((_,j)=>j!==i))); }; rec([],arr); return out; }
function buildStops(shops:Shop[], items:ShoppingItem[]): RouteStop[] { const assigned = new Set<string>(); return shops.map((shop,index)=>{ const itemsToBuy=items.filter(item=>!assigned.has(item.id) && scoreShopForCategory(shop,item.category)>=COVERAGE_THRESHOLD); itemsToBuy.forEach(i=>assigned.add(i.id)); return { sequence:index+1, shopId:shop.id, shopName:shop.name, location:shop.location, itemsToBuy, confidenceByItemId:Object.fromEntries(itemsToBuy.map(i=>[i.id,scoreShopForCategory(shop,i.category)])) }; }).filter(s=>s.itemsToBuy.length); }
export function generateRouteCandidates(journey:JourneyProfile, shops:Shop[], items:ShoppingItem[], constraints:RouteConstraints): RouteOption[] {
 if(!items.length) return [];
 const directWalkMinutes = walkMinutes([journey.startLocation, journey.destinationLocation]);
 const options: RouteOption[] = [];
 permutations(shops.filter(s=>!constraints.openOnly || s.openingHours?.openNow !== false), Math.min(2,constraints.maxStops)).forEach((shopPath,idx)=>{
  const stops=buildStops(shopPath,items); if(!stops.length) return;
  const routeWalkMinutes=walkMinutes([journey.startLocation,...shopPath.map(s=>s.location),journey.destinationLocation]);
  const coveredItems=stops.flatMap(s=>s.itemsToBuy); const coveredIds=new Set(coveredItems.map(i=>i.id)); const uncoveredItems=items.filter(i=>!coveredIds.has(i.id));
  const confidences=stops.flatMap(s=>Object.values(s.confidenceByItemId)); const confidenceScore=confidences.reduce((a,b)=>a+b,0)/Math.max(1,confidences.length);
  const extraWalkMinutes=Math.max(0,routeWalkMinutes-directWalkMinutes); const estimatedShopMinutesMin=stops.length*2; const estimatedShopMinutesMax=stops.length*4+coveredItems.length;
  const coveredMust=coveredItems.filter(i=>i.priority==='must_have').length; const coveredNice=coveredItems.length-coveredMust; const low=confidences.filter(c=>c<COVERAGE_THRESHOLD).length;
  const routeScore=coveredMust*100+coveredNice*50+confidenceScore*50-extraWalkMinutes*8-stops.length*15-low*20;
  options.push({ id:`${journey.id}_${idx}`, journeyProfileId:journey.id, stops, coveredItems, uncoveredItems, directWalkMinutes, routeWalkMinutes, extraWalkMinutes, estimatedShopMinutesMin, estimatedShopMinutesMax, totalDelayMinutesMin:extraWalkMinutes+estimatedShopMinutesMin, totalDelayMinutesMax:extraWalkMinutes+estimatedShopMinutesMax, confidenceScore, routeScore, label:'alternative' as const, map:{origin:journey.startLocation,destination:journey.destinationLocation,waypoints:stops.map(s=>s.location),externalMapsUrl:buildGoogleMapsUrl(journey.startLocation,journey.destinationLocation,stops.map(s=>s.location))} });
 });
 return options.filter(x => x.extraWalkMinutes<=constraints.maxExtraWalkMinutes).sort((a,b)=>b.routeScore-a.routeScore);
}
