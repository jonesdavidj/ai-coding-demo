import { copyFile, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const distDir = join(root, 'dist');

async function rewriteModuleSpecifiers(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  await Promise.all(entries.map(async (entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) {
      await rewriteModuleSpecifiers(path);
      return;
    }
    if (!entry.isFile() || !entry.name.endsWith('.js')) return;

    const source = await readFile(path, 'utf8');
    const rewritten = source.replace(/(from\s+['"])(\.\.?\/[^'"]+)(['"])/g, (_match, start, specifier, end) => {
      if (/\.[cm]?js$/.test(specifier)) return `${start}${specifier}${end}`;
      return `${start}${specifier}.js${end}`;
    });
    if (rewritten !== source) await writeFile(path, rewritten);
  }));
}

await rm(distDir, { recursive: true, force: true });
await mkdir(distDir, { recursive: true });

await copyFile(join(root, 'src/main.ts'), join(distDir, 'main.js'));

await rewriteModuleSpecifiers(distDir);
await copyFile(join(root, 'src/styles.css'), join(distDir, 'styles.css'));

const html = await readFile(join(root, 'index.html'), 'utf8');
const deployHtml = html
  .replace('./src/styles.css', './styles.css')
  .replace('./dist/main.js', './main.js');
await writeFile(join(distDir, 'index.html'), deployHtml);
