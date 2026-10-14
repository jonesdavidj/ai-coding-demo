import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await cp(join(root, 'src'), dist, { recursive: true });
const html = await readFile(join(root, 'index.html'), 'utf8');
await writeFile(join(dist, 'index.html'), html.replaceAll('./src/', './'));
console.log('Built Augustus’s Special Watches into dist/.');
