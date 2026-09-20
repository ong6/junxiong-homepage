import { readFileSync, readdirSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
const require = createRequire(import.meta.url);
const inventory = JSON.parse(readFileSync('ui-inventory.json', 'utf8'));
const errors = [];
const walk = (directory) => readdirSync(directory, {withFileTypes:true}).flatMap(entry => entry.isDirectory() ? walk(path.join(directory, entry.name)) : [path.join(directory, entry.name)]);
for (const file of [...walk('components'), ...walk('pages'), ...walk('lib')].filter(file => /\.[jt]sx?$/.test(file))) {
  const source = readFileSync(file,'utf8');
  if (/<canvas\b|(?:from\s*|import\s*\(|require\s*\()\s*['"]three(?:\/[^'"]*)?['"]/.test(source)) errors.push(`${file}: move custom rendering into UI Pack and register a gallery example.`);
}
for (const item of inventory.shared) {
  const source = readFileSync(item.component,'utf8');
  const gallery = readFileSync(item.gallery,'utf8');
  if (!source.includes(`"${item.packageExport}"`) && !source.includes(`'${item.packageExport}'`)) errors.push(`${item.component}: missing declared shared import.`);
  try { require.resolve(item.packageExport); } catch { errors.push(`${item.packageExport}: package export unavailable; build/install UI Pack first.`); }
  if (!gallery.includes(item.packageExport)) errors.push(`${item.gallery}: missing shared collection import.`);
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode=1; }
else console.log(`UI ownership verified: ${inventory.shared.length} shared collections; no local canvas or Three.js renderer.`);
