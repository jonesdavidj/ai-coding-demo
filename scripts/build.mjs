import { copyFile, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });
await copyFile(join(root, "src/main.js"), join(dist, "main.js"));
await copyFile(join(root, "src/styles.css"), join(dist, "styles.css"));
await cp(join(root, "assets"), join(dist, "assets"), { recursive: true });
const html = (await readFile(join(root, "index.html"), "utf8"))
  .replace("./src/styles.css", "./styles.css")
  .replace("./src/main.js", "./main.js");
await writeFile(join(dist, "index.html"), html);
console.log("Built Casa delle Olive into dist/");
