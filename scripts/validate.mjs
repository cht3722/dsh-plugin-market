import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

// The override lets a local DSH installation provide the same pinned validator without reinstalling it.
const moduleId = process.env.DSH_MARKET_VALIDATOR
  ? pathToFileURL(resolve(process.env.DSH_MARKET_VALIDATOR)).href
  : '@deepseek-ai/dsh-plugin-market-index';
const { parseMarketIndex, marketInstallTarget } = await import(moduleId);
const indexUrl = 'https://fuxi-ailabs.github.io/dsh-plugin-market/index.json';
const raw = JSON.parse(await readFile('docs/index.json', 'utf8'));
const index = parseMarketIndex(raw, indexUrl);

// Pages deploys only this allowlisted catalog directory. No plugin archives or source trees belong here.
const allowedTopLevel = new Set(['.nojekyll', 'index.html', 'index.json', 'icons']);
for (const entry of await readdir('docs', { withFileTypes: true })) {
  if (!allowedTopLevel.has(entry.name) || (entry.isDirectory() && entry.name !== 'icons')) {
    throw new Error(`Unapproved publication path: docs/${entry.name}`);
  }
}
for (const entry of await readdir('docs/icons', { withFileTypes: true })) {
  if (!entry.isFile() || !/^[a-z0-9-]+\.(svg|png|jpg|jpeg|webp)$/.test(entry.name)) {
    throw new Error(`Unapproved icon: ${entry.name}`);
  }
}
for (const plugin of index.plugins) {
  if (plugin.icon?.startsWith(new URL('icons/', indexUrl).href)) {
    await readFile(new URL(plugin.icon).pathname.replace('/dsh-plugin-market/', 'docs/'));
  }
  for (const version of plugin.versions) {
    console.log(`${plugin.name}@${version.version}: ${marketInstallTarget(plugin.name, version).spec}`);
  }
}
console.log(`Valid DSH format ${raw.format}: ${index.plugins.length} plugin(s). Publication directory: docs/ only.`);
