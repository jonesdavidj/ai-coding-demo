import { copyFile, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { spawn } from 'node:child_process';

const root = new URL('..', import.meta.url).pathname;
const distDir = join(root, 'dist');

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' });
    child.on('exit', (code) => (code === 0 ? resolve() : reject(new Error(`${command} ${args.join(' ')} exited with ${code}`))));
    child.on('error', reject);
  });
}

function commandExists(command) {
  return new Promise((resolve) => {
    const child = spawn(process.platform === 'win32' ? 'where' : 'command', process.platform === 'win32' ? [command] : ['-v', command], { shell: true, stdio: 'ignore' });
    child.on('exit', (code) => resolve(code === 0));
    child.on('error', () => resolve(false));
  });
}

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

await mkdir(distDir, { recursive: true });

if (await commandExists('tsc')) {
  await run('tsc', ['-p', 'tsconfig.json']);
} else {
  console.warn('TypeScript compiler not found; using committed dist JavaScript assets.');
}

await rewriteModuleSpecifiers(distDir);
await copyFile(join(root, 'src/styles.css'), join(distDir, 'styles.css'));

const html = await readFile(join(root, 'index.html'), 'utf8');
const deployHtml = html
  .replace('./src/styles.css', './styles.css')
  .replace('./dist/main.js', './main.js');
await writeFile(join(distDir, 'index.html'), deployHtml);
