import http from 'node:http';
import app from '../worker/index.js';
const port=Number(process.env.PORT||5173);
const server=http.createServer(async(req,res)=>{
 try {
  const result=await app.fetch(new Request('http://localhost:'+port+req.url,{method:req.method}),{}, {waitUntil:()=>{}});
  res.writeHead(result.status,Object.fromEntries(result.headers));
  res.end(Buffer.from(await result.arrayBuffer()));
 } catch {
  res.writeHead(500);res.end('Server error');
 }
});
server.listen(port,'0.0.0.0',()=>console.log('Local: http://localhost:'+port));
