import { copyFile, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const dist = join(root, 'dist');
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await copyFile(join(root, 'src/main.js'), join(dist, 'main.js'));
await copyFile(join(root, 'src/styles.css'), join(dist, 'styles.css'));
const html = await readFile(join(root, 'index.html'), 'utf8');
await writeFile(join(dist, 'index.html'), html
  .replace('./src/styles.css', './styles.css')
  .replace('./src/main.js', './main.js'));
