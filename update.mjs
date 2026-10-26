// A new version of one app into apps.json, the Feather / AltStore source of this repo:
//
//   node update.mjs <bundleIdentifier> <version> <path/to/app.ipa>
//
// The download address comes from apps.config.json (`{version}` in it is replaced), the size
// from the .ipa itself; the newest version goes first and the last ten are kept. Then it checks
// that every app carries only the fields Feather's own source has: Feather on the iPhone refused
// a source that also had build numbers, minimum iOS, permissions and a category. Commit and push
// apps.json afterwards. Never rename or move apps.json: Feather keeps the address it was added
// from, and spins forever once that address is gone.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const file = path.join(here, 'apps.json');
const SOURCE_KEYS = ['name', 'identifier', 'iconURL', 'website', 'apps', 'news'];
const APP_KEYS = ['name', 'bundleIdentifier', 'developerName', 'iconURL', 'localizedDescription', 'subtitle',
  'tintColor', 'versions', 'appPermissions', 'version', 'versionDate', 'size', 'downloadURL'];
const VERSION_KEYS = ['version', 'date', 'size', 'downloadURL'];

function check(src) {
  const extra = (obj, keys, where) => Object.keys(obj).filter(k => !keys.includes(k)).map(k => `${where}.${k}`);
  const bad = [...extra(src, SOURCE_KEYS, 'source')];
  for (const app of src.apps) {
    bad.push(...extra(app, APP_KEYS, app.bundleIdentifier));
    for (const v of app.versions || []) bad.push(...extra(v, VERSION_KEYS, `${app.bundleIdentifier}@${v.version}`));
    if (!app.iconURL || !app.versions?.length) bad.push(`${app.bundleIdentifier}: an icon and a version are needed`);
  }
  if (bad.length) throw new Error('fields Feather may refuse: ' + bad.join(', '));
}

const src = JSON.parse(fs.readFileSync(file, 'utf8'));
const [id, version, ipa] = process.argv.slice(2);
if (id === '--check') {
  check(src);
  console.log(`apps.json: ${src.apps.length} apps, fine`);
  process.exit(0);
}
if (!id || !version || !ipa) {
  console.error('usage: node update.mjs <bundleIdentifier> <version> <ipa>   ·   node update.mjs --check');
  process.exit(1);
}
const config = JSON.parse(fs.readFileSync(path.join(here, 'apps.config.json'), 'utf8'))[id];
const app = src.apps.find(a => a.bundleIdentifier === id);
if (!config || !app) {
  console.error(`${id} is not in apps.json and apps.config.json: add it there first (README)`);
  process.exit(1);
}
const entry = {
  version,
  date: new Date().toISOString().replace(/\.\d+Z$/, 'Z'),
  size: fs.statSync(ipa).size,
  downloadURL: config.downloadURL.replaceAll('{version}', version),
};
app.versions = [entry, ...(app.versions || []).filter(v => v.version !== version)].slice(0, 10);
// The same on the app itself, for readers that look there.
Object.assign(app, { version: entry.version, versionDate: entry.date, size: entry.size, downloadURL: entry.downloadURL });
check(src);
fs.writeFileSync(file, JSON.stringify(src, null, 2) + '\n');
console.log(`apps.json: ${app.name} ${version}, ${entry.size} bytes`);
