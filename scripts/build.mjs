import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';

const root = new URL('../', import.meta.url);
const dist = new URL('dist/', root);
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await copyFile(new URL('src/main.js', root), new URL('main.js', dist));
await copyFile(new URL('src/styles.css', root), new URL('styles.css', dist));
const html = await readFile(new URL('index.html', root), 'utf8');
await writeFile(new URL('index.html', dist), html
  .replace('./src/styles.css', './styles.css')
  .replace('./src/main.js', './main.js'));
