import fs from 'node:fs';
import path from 'node:path';

const payload = { ts: new Date().toISOString(), agent: 'Web-Gen-0' };

const targets = [
  path.join(process.cwd(), 'public', 'sig.beacon.json'),
  path.join(process.cwd(), '.out', 'sig.beacon.json'),
];

for (const target of targets) {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, JSON.stringify(payload, null, 2));
}

console.log('sig.beacon.json written', payload);
