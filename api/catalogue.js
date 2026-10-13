import {SOURCES,catalogue} from '../worker/index.js';
export default async function handler(req,res) {
 if(req.method!=='GET'&&req.method!=='HEAD') {
  res.setHeader('Allow','GET, HEAD');
  return res.status(405).json({error:'Method not allowed'});
 }
 const url=new URL(req.url,'https://site.invalid');
 const source=SOURCES.find(s=>s.id===url.searchParams.get('source')&&s.feed);
 if(!source)return res.status(400).json({error:'Unknown source'});
 const data=await catalogue(source);
 res.setHeader('Cache-Control','public, max-age=0, s-maxage='+(data.status==='ok'?600:60));
 res.setHeader('X-Content-Type-Options','nosniff');
 return res.status(200).json(data);
}
