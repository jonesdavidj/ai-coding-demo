import {mkdir,rm,writeFile} from 'node:fs/promises';
import app from '../worker/index.js';
const dist=new URL('../dist/',import.meta.url);
await rm(dist,{recursive:true,force:true});
await mkdir(dist,{recursive:true});
for(const [path,file] of [['/','index.html'],['/cabinet.svg','cabinet.svg']]) {
 const response=await app.fetch(new Request('https://build.invalid'+path));
 if(!response.ok)throw new Error('Build failed: '+file);
 await writeFile(new URL(file,dist),await response.text());
}
console.log('Built May Lam static page and illustration. Live catalogue API is served by api/catalogue.js.');
